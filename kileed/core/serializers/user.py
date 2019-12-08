"""Kileed custom user serializing & related utilities."""
from rest_framework.serializers import HyperlinkedModelSerializer

from kileed.core.models import User

class UserSerializer(HyperlinkedModelSerializer):
    """Kileed custom user serializer.

    Keep the less possible stuff here. Use additionnal Django apps to add fields
    & features to the core user, so they can be deactivated easily.
    """

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'avatar']
