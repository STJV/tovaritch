# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
"""
Site urls configuration
"""
from django.urls import include
from django.urls import re_path

urlpatterns = [
    # Core application urls
    re_path('', include('kileed.urls')),
]
