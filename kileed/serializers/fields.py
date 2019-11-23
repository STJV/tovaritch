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
    def __init__(self, props = {}, from_query=False, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.props = {}
        self.from_query = from_query

class CharField(VueMixin, BaseCharField):
    """ Char field with vuetify props defined in the backend """
    def __init__(self,
        type='text',
        icon=None,
        should_match=None,
        *args,
        **kwargs):
        super().__init__(*args, **kwargs)
        self.props = {
            'type': type,
            'prepend-icon': icon
        }

class EmailField(VueMixin, BaseCharField):
    """ Email field with vuetify props defined in the backend """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)