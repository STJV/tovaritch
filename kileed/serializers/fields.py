# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
from rest_framework.serializers import CharField as BaseCharField
from rest_framework.serializers import EmailField as BaseEmailField

class VueMixin(object):
    def __init__(self, vuejs_props = {}, from_query=False, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.vuejs_props = vuejs_props
        self.from_query = from_query

class CharField(VueMixin, BaseCharField):
    """ Char field with vuetify props defined in the backend """
    def __init__(self,
        type='text',
        icon=None,
        *args,
        **kwargs):
        if icon is None and type == 'password':
            icon = 'lock'
        super().__init__(
            *args,
            vuejs_props={
                'type': type,
                'prepend-icon': icon
            },
            **kwargs)

class EmailField(VueMixin, BaseCharField):
    """ Email field with vuetify props defined in the backend """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)