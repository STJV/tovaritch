# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
""" Sign on view for SAML """
from django.contrib.auth import logout as django_logout
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

class LogoutView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        django_logout(request)
        return Response()
