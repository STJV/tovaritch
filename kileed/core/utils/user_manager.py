"""Custom Kileed user manager class & related utilities."""
from __future__ import unicode_literals
from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    """Custom user manager.

    The login is made with the email and the minimum fields are kept in the
    user. To add field, add a model referencing the user and it's associated ui
    & features, and add it in an additional django app, so features can be
    easily turned off.
    """

    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        """Create a new user from given email and password."""
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create a new super user from given email and password."""
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

    def _create_user(self, email, password, **extra_fields):
        """Create and saves a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
