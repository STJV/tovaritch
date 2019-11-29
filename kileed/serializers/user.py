# coding: utf-8
#
# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# by Sam Hocevar.
#
# See the COPYING file for more details.
''' Kileed custom user serializing & related utilities '''
from rest_framework.serializers import HyperlinkedModelSerializer

from kileed.models import User

class UserSerializer(HyperlinkedModelSerializer):
    ''' Kileed custom user serializer.
        Keep the less possible stuff here. Use additionnal Django apps to add
        fields & features to the core user, so they can be deactivated easily.
    '''
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'avatar']
