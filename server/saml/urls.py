from django.urls import path

from .views import metadata
from .views import single_log_out
from .views import single_sign_on

app_name = 'saml'

urlpatterns = [
    path('sso', single_sign_on, name="single_sign_on"),
    path('slo', single_log_out, name="single_log_out"),
    path('metadata/', metadata, name='metadata'),
]
