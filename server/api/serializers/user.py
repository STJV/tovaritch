# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
from rest_framework.serializers import ModelSerializer

from api.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username']
