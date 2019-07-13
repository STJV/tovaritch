# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
from django.conf import settings
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAdminUser

from api.models import User
from api.serializers import UserSerializer

class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer