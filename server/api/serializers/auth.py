# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import PermissionDenied
from rest_framework.serializers import CharField
from rest_framework.serializers import EmailField
from rest_framework.serializers import Serializer

class LoginSerializer(Serializer):
    email = EmailField()
    password = CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context['request']

        user = authenticate(request, email=email, password=password)

        # Did we get back an active user?
        if user is None :
            raise PermissionDenied(_('Unable to log in with provided credentials.'))
        if not user.is_active:
            raise PermissionDenied(_('User account is disabled.'))

        attrs['user'] = user
        return attrs
