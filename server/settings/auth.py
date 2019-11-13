# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
""" Settings related to authorization stuff """
from datetime import timedelta

_PREFIX = 'django.contrib.auth.password_validation.'
AUTH_PASSWORD_VALIDATORS = [{
        'NAME': _PREFIX + 'UserAttributeSimilarityValidator',
    }, {
        'NAME': _PREFIX + 'MinimumLengthValidator',
    }, {
        'NAME': _PREFIX + 'CommonPasswordValidator',
    }, {
        'NAME': _PREFIX + 'NumericPasswordValidator',
    }]

CSRF_COOKIE_NAME = "XSRF-TOKEN"

JWT_AUTH = {
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LEEWAY': 0,
    'JWT_EXPIRATION_DELTA': timedelta(seconds=86400),
    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=7),
}

CORS_ORIGIN_ALLOW_ALL = True

AUTH_USER_MODEL = 'api.User'
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_AUTHENTICATION_METHOD = 'email'

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_USER_EMAIL_FIELD = 'email'
ACCOUNT_LOGOUT_ON_GET = True

AUTH_USER_MODEL = 'api.User'

REST_AUTH_SERIALIZERS = {
    "USER_DETAILS_SERIALIZER": "models.serializers.CustomUserDetailsSerializer",
}
