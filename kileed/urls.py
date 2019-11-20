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
from rest_auth.views import LogoutView
from rest_auth.views import PasswordResetConfirmView
from rest_auth.views import PasswordResetView
from rest_auth.views import UserDetailsView
from rest_framework.routers import DefaultRouter

from kileed.views import LoginView
from kileed.views import UserViewSet

def _get_auth_url():
    login = LoginView.as_view()
    logout = LogoutView.as_view()
    confirm = PasswordResetConfirmView.as_view()
    user = UserDetailsView.as_view()
    reset = PasswordResetView.as_view()

    return include([
        path('/login/', login, name='login'),
        path('/logout/', logout, name='rest_logout'),
        path('/user/', user, name='rest_user_details'),
        path('/confirm/', confirm, name='rest_password_reset_confirm'),
        path('/reset/', reset, name='rest_password_reset'),
    ])

def _get_api_url():
    router = DefaultRouter()
    router.register(r'users', UserViewSet, basename='user')
    auth_url = _get_auth_url()
    return include(
        router.urls +
        [ path('auth', auth_url) ]
    )

urlpatterns = [
    re_path(r'api/', _get_api_url()),
    re_path(r'^(?!api).*$', TemplateView.as_view(template_name="index.html"), name="index"),
]
