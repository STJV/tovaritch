# coding: utf-8
#
# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# by Sam Hocevar.
#
# See the COPYING file for more details.
''' Authentication related Django serializers.
    Includes login, logout, password reset, password change... '''
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.utils.translation import ugettext_lazy as _
from rest_framework.exceptions import PermissionDenied
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import Serializer
from rest_framework.serializers import ValidationError

from kileed.serializers.fields import EmailField
from kileed.serializers.fields import CharField

class LoginSerializer(Serializer):
    ''' On validation, tries to authenticate the user with the provided email
        and password.If the email or password is incorrect, or if the user is
        not active, validation will raise a PermissionError, else it'll return
        the authenticated user models instance. '''
    email = EmailField(
        label="Email",
        required=True,
    )

    password = CharField(
        icon='lock',
        label="Password",
        required=True,
        type='password',
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

class CurrentUserSerializer(ModelSerializer):
    ''' Serializes the current logged in user '''
    class Meta:
        model = get_user_model()
        fields = '__all__'

class PasswordResetSerializer(Serializer):
    ''' Serializer using django.contrib.auth.PasswordResetForm to send users
        email to reset their passwords. '''
    email = EmailField(required=True)

    def create(self, validated_data):
        raise NotImplementedError

    def save(self, **kwargs):
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

class PasswordResetConfirmSerializer(Serializer):
    ''' Serializer changing the password for a user.
        On validation, checks if the given token, password & confirmation are
        valid, and if the password respects the password policy. Records the new
        password on save. '''
    password = CharField(
        type='password',
        max_length=128
    )
    confirmation = CharField(
        type='password',
        max_length=128
    )
    # See kileed.utils.metadata for informations about the from_query parameter.
    uid = CharField(from_query=True)
    token = CharField(from_query=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.form = None

    def create(self, validated_data):
        raise NotImplementedError

    def validate(self, attrs):
        uid = attrs['uid']
        uid = uid_decoder(uid)
        uid = force_text(uid)
        user_model = get_user_model()
        user = user_model.objects.get(pk=uid)

        self.form = SetPasswordForm(
            user=user,
            data={
                'new_password1': attrs['password'],
                'new_password2': attrs['confirmation']
            }
        )
        if not self.form.is_valid():
            form_errors = self.form.errors
            errors = {}
            if 'new_password2' in form_errors:
                errors = form_errors['new_password2']

            raise ValidationError({
                'password': errors,
                'confirmation': errors,
            })

        token_generator = default_token_generator
        token = attrs['token']
        if not token_generator.check_token(user, token):
            raise ValidationError(_('Invalid token'))

        return attrs

    def save(self, **kwargs):
        return self.form.save()
