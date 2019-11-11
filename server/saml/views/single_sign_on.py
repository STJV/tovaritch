# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
""" Sign on view for SAML """
from django.http import HttpResponse
from django.views.decorators.cache import never_cache
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from saml2 import BINDING_HTTP_REDIRECT
from saml2.authn_context import AuthnBroker
from saml2.authn_context import PASSWORD
from saml2.authn_context import authn_context_class_ref
from saml2.ident import NameID
from saml2.server import Server

from saml.utils import load_idp_config
from saml.utils import load_sp_config

@never_cache
@csrf_exempt
@require_http_methods(["GET", "POST"])
@login_required
def single_sign_on(request):
    """ Entrypoint view for SSO """
    data = request.GET
    binding = BINDING_HTTP_REDIRECT
    idp = Server(config=load_idp_config(request))
    req_info = idp.parse_authn_request(data['SAMLRequest'], binding)
    resp_args = idp.response_args(req_info.message)
    sp_config = load_sp_config(resp_args['sp_entity_id'])
    user = request.user
    user_id = 'user_%i' % user.id

    req_authn_context = req_info.message.requested_authn_context or PASSWORD
    authn = AuthnBroker()
    authn.add(authn_context_class_ref(req_authn_context), "")

    identity = _get_identity(request.user, sp_config)
    identity['user_id'] = user_id

    name_id = NameID(
        format=resp_args['name_id_policy'].format,
        sp_name_qualifier=resp_args['sp_entity_id'],
        text=user_id)

    authn_resp = idp.create_authn_response(
        identity=identity,
        userid=user_id,
        name_id=name_id,
        authn=authn.get_authn_by_accr(req_authn_context),
        sign_response=idp.config.getattr("sign_response", "idp") or False,
        sign_assertion=idp.config.getattr("sign_assertion", "idp") or False,
        **resp_args)

    http_args = idp.apply_binding(
        binding=resp_args['binding'],
        msg_str="%s" % authn_resp,
        destination=resp_args['destination'],
        relay_state=data['RelayState'],
        response=True)

    return HttpResponse(http_args['data'])

def _get_identity(user, sp_config):
    """ Returns fields of the given identity """
    sp_mapping = sp_config.get('attribute_mapping', {'username': 'username'})
    return {
        out_attr: getattr(user, user_attr)
        for user_attr, out_attr in sp_mapping.items()
        if hasattr(user, user_attr)
    }
