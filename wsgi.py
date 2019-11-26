# coding: utf-8
#
# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# by Sam Hocevar.
#
# See the COPYING file for more details.
''' WSGI config for server project.
    It exposes the WSGI callable as a module-level variable named
    ``application``.
    For more information on this file, see
    https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/ '''
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')

application = get_wsgi_application()
