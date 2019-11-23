# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
""" Authentification related serializers """
from django.contrib.auth import authenticate
from django.contrib.auth.forms import PasswordResetForm
from django.utils.translation import ugettext_lazy as _
from rest_framework.exceptions import PermissionDenied
from rest_framework.serializers import CharField
from rest_framework.serializers import EmailField
from rest_framework.serializers import Serializer
from rest_framework.serializers import ValidationError

class LoginSerializer(Serializer):
    """ Validates login """
    email = EmailField(
        label="Email",
        required=True,
    )

    password = CharField(
        label="Password",
        required=True,
        style={
            'vuetify': {
                'type': 'password',
                'prepend-icon': 'lock'
            }
        },
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
            raise PermissionDenied(_('Login denied.'))

        if not user.is_active:
            raise PermissionDenied(_('Account is disabled.'))

        attrs['user'] = user
        return attrs

class PasswordResetSerializer(Serializer):
    """
    Serializer for requesting a password reset e-mail.
    """
    email = EmailField(required=True)

    def save(self):
        request = self.context.get('request')
        reset_form = PasswordResetForm(data=request.data)
        if not reset_form.is_valid():
            raise ValidationError(reset_form.errors)

        reset_form.save(
            domain_override=None,
            subject_template_name='auth/password_reset_subject.txt',
            email_template_name='auth/password_reset_email.html',
            use_https=True,
            request=request,
            html_email_template_name=None,
            extra_email_context=None)
