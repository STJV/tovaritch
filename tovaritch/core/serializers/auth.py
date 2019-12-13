"""Authentication related Django serializers.

Includes login, logout, password reset, password change...
"""
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.utils.translation import ugettext_lazy as _
from rest_framework.exceptions import PermissionDenied
from rest_framework.serializers import CharField
from rest_framework.serializers import EmailField
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import Serializer
from rest_framework.serializers import ValidationError

class LoginSerializer(Serializer):
    """Validates and login given user.

    On validation, tries to authenticate the user with the provided email and
    password.If the email or password is incorrect, or if the user is not
    active, validation will raise a PermissionError, else it'll return the
    authenticated user models instance.
    """

    email = EmailField(required=True)
    password = CharField(required=True)

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

        attrs['user'] = user
        return attrs

class CurrentUserSerializer(ModelSerializer):
    """Serializes the current logged in user."""

    class Meta:
        model = get_user_model()
        fields = '__all__'

class PasswordResetSerializer(Serializer):
    """Serializer to send a password reset email.

    Uses django.contrib.auth.PasswordResetForm to send users email to reset
    their passwords.
    """

    email = EmailField(required=True)

    def create(self, validated_data):
        raise NotImplementedError

    def save(self, **kwargs):
        request = self.context.get('request')
        reset_form = PasswordResetForm(data=request.data)
        assert reset_form.is_valid()

        reset_form.save(
            domain_override=None,
            subject_template_name='auth/password_reset_subject.txt',
            email_template_name='auth/password_reset_email.html',
            use_https=True,
            request=request,
            html_email_template_name=None,
            extra_email_context=None)

class PasswordResetConfirmSerializer(Serializer):
    """Serializer reseting the password for a user.

    On validation, checks if the given token, password & confirmation are valid,
    and if the password respects the password policy. Records the new password
    on save.
    """

    new_password1 = CharField(max_length=128)
    new_password2 = CharField(max_length=128)
    uid = CharField()
    token = CharField()

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
        try:
            user = user_model.objects.get(pk=uid)
        except user_model.DoesNotExist:
            raise ValidationError(_('Invalid uid'))

        self.form = SetPasswordForm(
            user=user,
            data=attrs
        )

        if not self.form.is_valid():
            raise ValidationError(self.form.errors)

        token_generator = default_token_generator
        token = attrs['token']
        if not token_generator.check_token(user, token):
            raise ValidationError(_('Invalid token'))

        return attrs

    def save(self, **kwargs):
        return self.form.save()

class PasswordChangeSerializer(Serializer):
    """Serializer to validate and save password change."""
    old_password = CharField(max_length=128)
    new_password1 = CharField(max_length=128)
    new_password2 = CharField(max_length=128)

    set_password_form_class = SetPasswordForm

    form = None

    def create(self, validated_data):
        raise NotImplementedError

    def validate(self, attrs):
        request = self.context['request']
        user = request.user
        self.form = PasswordChangeForm(user=user, data=attrs)
        if not self.form.is_valid():
            raise ValidationError(self.form.errors)
        return attrs

    def save(self, **kwargs):
        self.form.save()
        request = self.context['request']
        user = request.user
        update_session_auth_hash(request, user)
