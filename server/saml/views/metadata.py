# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
""" View returning the IPD metadata """
from django.http import HttpResponse
from django.views.decorators.cache import never_cache
from saml2.metadata import entity_descriptor
from six import text_type
from saml.utils import load_idp_config

@never_cache
def metadata(request):
    """ Returns an XML with the SAML 2.0 metadata for this Idp.
        The metadata is constructed on-the-fly based on the config dict in the
        django settings.
    """
    config = load_idp_config(request)
    result = entity_descriptor(config)
    content = text_type(result).encode('utf-8')
    return HttpResponse(content=content, content_type="text/xml; charset=utf8")
