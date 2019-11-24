# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
""" Authentification related views """
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from django.views.decorators.debug import sensitive_post_parameters
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from kileed.serializers import LoginSerializer
from kileed.serializers import PasswordResetConfirmSerializer
from kileed.serializers import PasswordResetSerializer
from kileed.serializers import UserSerializer

class LoginView(GenericAPIView):
    """
    Logins the user, starts his session and returns user informations on
    success.
    """
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    @method_decorator(sensitive_post_parameters('password'))
    def dispatch(self, request, *args, **kwargs):
        return super(LoginView, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        """ Performs login """
        serializer = self.get_serializer(
            data=request.data,
            context={'request': request}
        )

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        django_login(self.request, user)
        user_serializer = UserSerializer(user)

        return Response(user_serializer.data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    """
    Logouts the current user form the session
    """
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        django_logout(request)
        return Response(
            {"detail": _("Successfully logged out.")},
            status=status.HTTP_200_OK
        )

class PasswordResetConfirmView(GenericAPIView):
    """
    Resets the password given a token and a user id
    """
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = (AllowAny,)

    @method_decorator(sensitive_post_parameters('password', 'confirmation'))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": _("Password has been reset.")}
        )

class PasswordResetView(GenericAPIView):
    """
    Calls Django Auth PasswordResetForm save method.
    Accepts the following POST parameters: email
    Returns the success/fail message.
    """
    serializer_class = PasswordResetSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(
            domain_override=None,
            subject_template_name='registration/password_reset_subject.txt',
            email_template_name='registration/password_reset_email.html',
            use_https=False,
            from_email=None,
            request=request,
            html_email_template_name=None,
            extra_email_context=None)

        return Response(
            {"detail": _("Password reset e-mail has been sent.")},
            status=status.HTTP_200_OK
        )