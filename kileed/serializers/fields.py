# coding: utf-8
#
# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# by Sam Hocevar.
#
# See the COPYING file for more details.
''' Django rest framework's field overrides.
    Those overrides add some metadata to fields, that will be transmitted
    through an OPTIONS request on the API, and will allow to automatically
    contstruct UI for certain parts of the API. See kileed.utils.metadata to see
    how those metadata are sent to the frontend.
'''
from rest_framework.serializers import CharField as BaseCharField
from rest_framework.serializers import EmailField as BaseEmailField

class VueMixin:
    ''' Common mixin for all fields that should be rendered client side by the
        vuetify UI generation. '''

    def __init__(self, *args, vuejs_props=None, from_query=False, **kwargs):
        ''' Constructor

            Parameters :
            ------------
            vuejs_props : Dictionnary meant to be v-bound on the client to the
                          vuejs component constructed to edit this field.

            from_query : Boolean Specifies weither, instead of creating an input
                         on the client side for this field, it's value should be
                         read from the url parameters (?myfield=....). '''
        super().__init__(*args, **kwargs)
        self.vuejs_props = vuejs_props
        self.from_query = from_query

class CharField(VueMixin, BaseCharField):
    ''' Django rest framework's char field override for automatic UI
        contsruction client side. '''

    def __init__(self, *args, input_type='text', icon=None, **kwargs):
        ''' Constructor.

            Parameters:
            -----------
            input_type : String The type of the constructed UI input (ex. :
                         'password')
            icon : String The name of the icon to append to the constructed UI
                   input. '''
        if icon is None and type == 'password':
            icon = 'lock'
        super().__init__(
            *args,
            vuejs_props={
                'type': input_type,
                'prepend-icon': icon
            },
            **kwargs)

class EmailField(VueMixin, BaseEmailField):
    ''' Django rest framework's email field override for automatic UI
        contsruction client side. '''
