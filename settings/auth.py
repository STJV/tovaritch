"""Settings related to authorization stuff."""
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

AUTH_USER_MODEL = 'tovaritch_core.User'

CORS_ORIGIN_ALLOW_ALL = True

ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_USER_EMAIL_FIELD = 'email'
ACCOUNT_LOGOUT_ON_GET = True
