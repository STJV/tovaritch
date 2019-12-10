"""Killed custom user model & related utilities."""
from __future__ import unicode_literals
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db.models import BooleanField
from django.db.models import CharField
from django.db.models import DateTimeField
from django.db.models import EmailField
from django.db.models import ImageField
from django.utils.translation import ugettext_lazy as _

from tovaritch.core.utils import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    """Tovaritch user model.

    The model is wanted as light as possible, features and new linked fields
    being added via additionnal django applications.
    """

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    username = CharField(_('user name'), max_length=32)
    email = EmailField(_('email address'), unique=True)
    date_joined = DateTimeField(_('date joined'), auto_now_add=True)
    is_active = BooleanField(_('active'), default=True)
    avatar = ImageField(upload_to='avatars/', null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
