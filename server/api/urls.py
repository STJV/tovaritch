# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from api.views import UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('auth/', obtain_jwt_token),
] + router.urls

