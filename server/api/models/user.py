# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
from __future__ import unicode_literals
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from django.db.models import BooleanField
from django.db.models import CharField
from django.db.models import DateTimeField
from django.db.models import EmailField
from django.db.models import ImageField
from django.utils.translation import ugettext_lazy as _

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        '''
        Creates and saves a User with the given email and password.
        '''
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = CharField(_('user name'), max_length=32)
    email = EmailField(_('email address'), unique=True)
    date_joined = DateTimeField(_('date joined'), auto_now_add=True)
    is_active = BooleanField(_('active'), default=True)
    avatar = ImageField(upload_to='avatars/', null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def email_user(self, subject, message, from_email=None, **kwargs):
        '''
        Sends an email to this User.
        '''
        send_mail(subject, message, from_email, [self.email], **kwargs)
