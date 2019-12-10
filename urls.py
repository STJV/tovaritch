"""Site routes configuration."""
from django.urls import include
from django.urls import re_path

urlpatterns = [
    # Core application urls
    re_path('', include('tovaritch.core.urls')),
]
