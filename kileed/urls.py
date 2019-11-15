# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
""" Urls for Kileed core """
from django.urls import include
from django.urls import path
from django.urls import re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from kileed.views import UserViewSet
from kileed.views import login
from kileed.views import logout
from kileed.views import me

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    re_path(r'api/' ,include(router.urls)),
    re_path(r'^.*$', TemplateView.as_view(template_name="index.html"), name="index"),
]
