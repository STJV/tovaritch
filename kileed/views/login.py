# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
""" API login end point """
from django.contrib.auth import login as django_login
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from kileed.serializers import UserSerializer
from kileed.serializers.login import LoginSerializer

class LoginView(GenericAPIView):
    """ Login endpoint, providing a post method accepting a mail and a password.
        Will return either a 403 error, or logged in user informations, as
        serialized by the UserSerializer."""
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        """ Post handler """
        serializer = self.get_serializer(
            data=self.request.data,
            context={'request': request})

        # Login & password are checked in the serializer
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        django_login(request, user)

        user_serializer = UserSerializer(user)
        return Response(user_serializer.data, status=HTTP_200_OK)
