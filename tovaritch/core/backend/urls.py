"""Urls for Tovaritch core."""
from django.urls import include
from django.urls import path
from django.urls import re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from tovaritch.core.utils.plugins import TovaritchPlugin
from tovaritch.core.views import LoginView
from tovaritch.core.views import LogoutView
from tovaritch.core.views import PasswordResetView
from tovaritch.core.views import PasswordResetConfirmView
from tovaritch.core.views import UserViewSet
from tovaritch.core.views import CurrentUserView

def _get_auth_url():
    login = LoginView.as_view()

    logout = LogoutView.as_view()
    reset = PasswordResetView.as_view()
    reset_confirm = PasswordResetConfirmView.as_view()
    user = CurrentUserView.as_view()

    return include([
        path('/login/', login, name='login'),
        path('/logout/', logout, name='logout'),
        path('/password-reset-confirm/',
             reset_confirm,
             name='password_reset_confirm'),
        path('/password-reset/', reset, name='password_reset'),
        path('/user/', user, name='user_details'),
    ])

def _get_api_url():
    router = DefaultRouter()
    router.register(r'users', UserViewSet, basename='user')
    auth_url = _get_auth_url()
    return include(
        router.urls +
        [path('auth', auth_url)]
    )

def _get_plugins_urls():
    for plugin_it in TovaritchPlugin.get_plugins():
        urls = __import__(
            '%s.urls' % plugin_it.name,
            globals(),
            locals(),
            ['urlpatterns']
        )
        yield path('', include(urls.urlpatterns))

urlpatterns = list(_get_plugins_urls()) + [
    re_path(r'api/', _get_api_url()),
    re_path(r'^(?!api).*$', TemplateView.as_view(template_name="index.html"), name="index"),
]
