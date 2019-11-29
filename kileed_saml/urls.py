from django.urls import include
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

from api.views import UserViewSet
from api.views import login
from api.views import logout
from api.views import me

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('auth/login', login),
    path('auth/logout', logout),
    path('auth/me', me),
] + router.urls


