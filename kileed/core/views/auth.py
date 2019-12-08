"""Authentification related views."""
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from django.views.decorators.debug import sensitive_post_parameters
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from kileed.core.serializers import CurrentUserSerializer
from kileed.core.serializers import LoginSerializer
from kileed.core.serializers import PasswordResetConfirmSerializer
from kileed.core.serializers import PasswordResetSerializer
from kileed.core.serializers import UserSerializer

class LoginView(GenericAPIView):
    """Logs the user in.

    starts his session and returns user informations on success.
    """

    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    @method_decorator(sensitive_post_parameters('password'))
    def dispatch(self, request, *args, **kwargs):
        return super(LoginView, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        """Perform login.

        Post parameters :
        -----------------
        email : string The mail of the user to login.
        password : string The password
        """
        serializer = self.get_serializer(
            data=request.data,
            context={'request': request}
        )

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        django_login(self.request, user)
        user_serializer = UserSerializer(user)

        return Response(user_serializer.data, status=status.HTTP_200_OK)

class CurrentUserView(RetrieveAPIView):
    """Gets the current logged-in user."""

    serializer_class = CurrentUserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

class LogoutView(APIView):
    """Logouts the current user form the session."""

    permission_classes = (AllowAny,)

    def post(self, request):
        """Post method."""
        django_logout(request)
        return Response(
            {"detail": _("Successfully logged out.")},
            status=status.HTTP_200_OK
        )

class PasswordResetConfirmView(GenericAPIView):
    """Resets the password given a reset token and a user id.

    Token and id are the one sent by mail by calling the PasswordResetView
    """

    serializer_class = PasswordResetConfirmSerializer
    permission_classes = (AllowAny,)

    @method_decorator(sensitive_post_parameters('password', 'confirmation'))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        """Post method.

        Post parameters :
        -----------------
        uid : string The uid given in the link mailed by the
                     PasswordResetView
        token : string The token given in the link mailed by the
                       Password reset view
        new_password_1 : Password
        new_password_2 : Password confirmation
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": _("Password has been reset.")}
        )

class PasswordResetView(GenericAPIView):
    """Sends a reset password email.

    Uses Django Auth PasswordResetForm to validate email and send the password
    """

    serializer_class = PasswordResetSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        """Post method.

        Post parameters :
        -----------------
        email : string The email of the user to which send a reset password
                       email.
        """
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
