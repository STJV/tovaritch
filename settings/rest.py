"""Rest framework settings."""

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_METADATA_CLASS': 'kileed.utils.metadata.VueFormMetadata'
}

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'kileed.serializers.UserSerializer',
    'PASSWORD_RESET_SERIALIZER': 'kileed.serializers.PasswordResetSerializer',
    'LOGIN_SERIALIZER': 'kileed.serializers.LoginSerializer',
}