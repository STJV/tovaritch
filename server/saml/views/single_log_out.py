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
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from saml2 import BINDING_HTTP_REDIRECT
from saml2 import BINDING_HTTP_POST
from saml2.server import Server

from saml.utils import load_idp_config

@never_cache
@csrf_exempt
@require_http_methods(["GET", "POST"])
@login_required
def single_log_out(request):
    """ Entrypoint view for SSO """
    logout(request)
    data = request.GET
    binding = BINDING_HTTP_REDIRECT
    idp = Server(config=load_idp_config(request))
    req_info = idp.parse_logout_request(data['SAMLRequest'], binding)
    message = req_info.message
    response = idp.create_logout_response(message, [binding])
    http_args = idp.apply_binding(
        binding=binding,
        msg_str="%s" % response,
        destination=response.destination,
        relay_state=data['RelayState'],
        response=True)
    http_response = HttpResponse(http_args['data'], status=300)
    for header, value in http_args['headers']:
        http_response[header] = value

    return http_response
