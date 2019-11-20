# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
""" Authentification related serializers """
from django.contrib.auth import authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework.exceptions import PermissionDenied
from rest_framework.serializers import CharField
from rest_framework.serializers import EmailField
from rest_framework.serializers import Serializer

class LoginSerializer(Serializer):
    """ Validates login """
    email = EmailField(
        label="Email",
        required=True,
    )

    password = CharField(
        label="Email",
        required=True,
        style={'type': 'password'},
    )

    def create(self, validated_data):
        raise NotImplementedError

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context['request']

        user = authenticate(
            request,
            email=email,
            password=password
        )

        if not user:
            msg = _('Unable to log in with provided credentials.')
            raise PermissionDenied(msg)

        if not user.is_active:
            msg = _('User account is disabled.')
            raise PermissionDenied(msg)

        attrs['user'] = user
        return attrs

class PasswordResetSerializer(Serializer):
    """ Used to override get_email_options, to customize mail sending (like the
    templates used) """

    def get_email_options(self):
        return {
            'email_template_name': 'auth/password_reset_email.html'
        }
