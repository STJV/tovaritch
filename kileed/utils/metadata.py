# coding: utf-8
#
# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# by Sam Hocevar.
#
# See the COPYING file for more details.
''' Metadata related class & utilites, to customize data sent in reponse to
    OPTIONS request. '''
from collections import OrderedDict
from rest_framework.metadata import BaseMetadata

class VueFormMetadata(BaseMetadata):
    ''' Metadata override that reads and transmits some information added on
        fields declared in kileed.serializer.fields, and related to UI
        generation on the client side (like input icons, type of inputs...) '''

    def determine_metadata(self, request, view):
        metadata = OrderedDict()
        metadata['name'] = view.get_view_name()
        if hasattr(view, 'get_serializer'):
            actions = _get_actions(view)
            if actions:
                metadata['actions'] = actions
        return metadata

def _get_actions(view):
    actions = {}
    for method in set(view.allowed_methods):
        if method.lower() == 'options':
            continue
        serializer = view.get_serializer()
        actions[method] = _fields_metadata(serializer)

    return actions

def _fields_metadata(serializer):
    if hasattr(serializer, 'child'):
        serializer = serializer.child

    result = OrderedDict()
    for name, field in serializer.fields.items():
        result[name] = {
            'type': type(field).__name__,
            'vuejs_props': getattr(field, 'vuejs_props', {}),
            'from_query': getattr(field, 'from_query'),
            'readonly': getattr(field, 'read_only', False),
            'label': getattr(field, 'label', None),
            'initial': getattr(field, 'initial', None)
        }
    return result
