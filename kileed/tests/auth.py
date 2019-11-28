# coding: utf-8
#
# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# by Sam Hocevar.
#
# See the COPYING file for more details.
''' Test related to authentication & password reset '''
from django.urls import reverse
from rest_framework.test import APITestCase

from kileed.models import User

class _AuthTestCase(APITestCase):
    """ Base class for auth tests """
    def setUp(self):
        self._email = 'durruti@cnt.org'
        self._password = 'los_solidarios'
        self._username = 'Durruti'
        self._user = User.objects.create_user(self._email, self._password)
        self._user.username = self._username
        self._user.save()

    def _login(self, email=None, password=None):
        url = reverse('login')
        response = self.client.post(url, {
            'email': self._email if email is None else email,
            'password': self._password if password is None else password
            })
        return response

    def _get_user(self):
        url = reverse('user_details')
        return self.client.get(url)

    def _logout(self):
        url = reverse('logout')
        return self.client.post(url)

class LoginTestCase(_AuthTestCase):
    """ Login view tests """

    def test_login(self):
        """ Checks login returns user informations and grants access to
            protected ressources """
        response = self._login()
        self.assertEqual(200, response.status_code)

        data = response.data
        self.assertEqual(data['username'], self._username)
        self.assertEqual(data['email'], self._email)

        response = self._get_user()
        self.assertEqual(200, response.status_code)

        data = response.data
        self.assertEqual(data['username'], self._username)
        self.assertEqual(data['email'], self._email)

    def test_login_failed(self):
        """ Checks that bad login returns a 403 http error """
        response = self._login('david@stealth.nope', 'stohauseth')
        self.assertEqual(403, response.status_code)

        response = self._login(self._email, 'bad_password')
        self.assertEqual(403, response.status_code)

    def test_validate_fields(self):
        """ Checks that email field is correctly validated """
        response = self._login('not_an_email')
        self.assertEqual(400, response.status_code)

class LogoutTestCase(_AuthTestCase):
    """ Logout view tests """
    def test_logout(self):
        """ Checks logout prevent user from accessing protected ressources """
        response = self._login()
        self._logout()
        response = self._get_user()
        self.assertEqual(403, response.status_code)
