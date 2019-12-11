"""Tests related class & utilities."""
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

class TestView(GenericAPIView):
    """ Dummy view to test plugin system. """

    permission_classes = (AllowAny,)

    def get(self, request):
        """ Dummy view. """
        return Response({"succeed": True}, status=status.HTTP_200_OK)
