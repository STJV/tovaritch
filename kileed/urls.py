# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
""" Urls for Kileed core """
from django.urls import path
from rest_framework.routers import DefaultRouter

from kileed.views import UserViewSet
from kileed.views import login
from kileed.views import logout
from kileed.views import me

def _get_router_urls():
    router = DefaultRouter()
    router.register(r'users', UserViewSet, basename='user')
    return router.urls

urlpatterns = [
    path('auth/login', login),
    path('auth/logout', logout),
    path('auth/me', me),
] + _get_router_urls()
