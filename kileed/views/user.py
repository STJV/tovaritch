# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
''' User views related class & utilities '''
from rest_framework.viewsets import ModelViewSet

from kileed.models import User
from kileed.serializers import UserSerializer

class UserViewSet(ModelViewSet):
    ''' User view set, providing standard user endpoints '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
