# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
""" SAML configuration helpers """

from django.urls import reverse
from saml2 import BINDING_HTTP_REDIRECT
from saml2.config import IdPConfig
from saml2.saml import NAMEID_FORMAT_EMAILADDRESS
from saml2.saml import NAMEID_FORMAT_UNSPECIFIED
from saml2.sigver import get_xmlsec_binary
from settings.base import BASE_DIR
from settings.base import DEBUG

def load_idp_config(request):
    """ Loads the idp configuration """
    xml_sec_binary = get_xmlsec_binary(['/opt/local/bin', '/usr/bin/xmlsec1'])
    entity_id = request.build_absolute_uri(reverse('saml:metadata'))
    entity_id = 'https' + entity_id[4:-1]
    sso_url = request.build_absolute_uri(reverse('saml:single_sign_on'))
    sso_url = 'https' + sso_url[4:]
    _config = {
        'debug' : DEBUG,
        'xmlsec_binary': xml_sec_binary,
        'entityid': entity_id,
        'description': 'Kileed SAML IDP',
        'service': {
            'idp': {
                'name': 'Django localhost IdP',
                'endpoints': {
                    'single_sign_on_service': [
                        (sso_url, BINDING_HTTP_REDIRECT),
                    ],
                },
                'name_id_format': [
                    NAMEID_FORMAT_EMAILADDRESS,
                    NAMEID_FORMAT_UNSPECIFIED
                ],
                'sign_response': True,
                'sign_assertion': False,
            },
        },
        'metadata': {
            'local': [
                '/srv/saml_config/sp_metadata.xml'
            ]
        },
        'key_file': BASE_DIR + '/dev/snakeoil.key',
        'cert_file': BASE_DIR + '/dev/snakeoil.crt',
        'encryption_keypairs': [{
            'key_file': BASE_DIR + '/dev/snakeoil.key',
            'cert_file': BASE_DIR + '/dev/snakeoil.crt',
        }],
        'valid_for': 365 * 24,
    }
    result = IdPConfig()
    result.load(_config)
    return result

def load_sp_config(entity_id):
    """ Returns the configuration of the given sp """
    sp_config = {
        'https://cloud.oi.lan/index.php/apps/user_saml/saml/metadata': {
            'attribute_mapping': {
                'email': 'email',
                'username': 'username',
            }
        }
    }
    return sp_config[entity_id]
