from django.urls import path

from . import views

app_name = 'djangosaml2idp'

urlpatterns = [
    path('sso', views.sso_entry, name="saml_login_post"),
    path('login', views.LoginProcessView.as_view(), name='saml_login_process'),
    path('metadata/', views.metadata, name='saml2_idp_metadata'),
]
