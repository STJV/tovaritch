""" Sample plugin urls config. """
from django.urls import path

from tovaritch.plugins.sample.views.test import TestView

urlpatterns = [
    path('api/sample/test', TestView.as_view(), name='sample_test'),
]
