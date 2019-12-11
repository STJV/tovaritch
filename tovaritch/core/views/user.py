"""User views related class & utilities."""
from rest_framework.viewsets import ModelViewSet

from tovaritch.core.models import User
from tovaritch.core.serializers import UserSerializer

class UserViewSet(ModelViewSet):
    """User view set, providing standard user endpoints."""

    queryset = User.objects.all()
    serializer_class = UserSerializer
