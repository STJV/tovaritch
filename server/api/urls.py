# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
from django.urls import path
from django.urls import include
from rest_framework_jwt.views import obtain_jwt_token
from api.views import UserViewSet
from api.views import logout
from api.views import login
from api.views import get_token
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('auth/login', login),
    path('auth/logout', logout),
    path('auth/get-token', get_token),
] + router.urls

