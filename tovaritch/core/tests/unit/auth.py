"""Unit tests related to authentication & password reset."""
from random import choice
from string import ascii_letters
import re

from django.core import mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from rest_framework.test import APITestCase

from tovaritch.core.models import User

class _AuthTestCase(APITestCase):
    """Base class for auth tests."""

    def setUp(self):
        self._email = 'durruti@cnt.org'
        self._password = 'los_solidarios'
        self._username = 'Durruti'
        self._user = User.objects.create_user(self._email, self._password)
        self._user.username = self._username
        self._user.save()

    def _post(self, view_name, **data):
        url = reverse(view_name)
        return self.client.post(url, dict(**data))

    def _get(self, view_name):
        url = reverse(view_name)
        return self.client.get(url)

    def _login(self, email=None, password=None):
        response = self._post(
            'login',
            email=self._email if email is None else email,
            password=self._password if password is None else password
        )
        return response

    def assert_status(self, expected_code, response):
        """Checks given response has given http status."""
        self.assertEqual(response.status_code, expected_code, response.data)

    def _get_user(self):
        return self._get('user_details')

    def _logout(self):
        return self._post('logout')

class LoginTestCase(_AuthTestCase):
    """Login view tests."""

    def test_login(self):
        """Checks login behaves correctly.

        Check if the view returns the correct user informations and grants
        access to protected ressources.
        """
        response = self._login()
        self.assert_status(200, response)

        data = response.data
        self.assertEqual(data['username'], self._username)
        self.assertEqual(data['email'], self._email)

        response = self._get_user()
        self.assert_status(200, response)

        data = response.data
        self.assertEqual(data['username'], self._username)
        self.assertEqual(data['email'], self._email)

    def test_login_failed(self):
        """Checks that bad login returns a 403 http error.
        """
        response = self._login('david@stealth.nope', 'stohauseth')
        self.assert_status(403, response)

        response = self._login(self._email, 'bad_password')
        self.assert_status(403, response)

    def test_inactive_login_fails(self):
        """Checks that inactive login returns a 403 http error."""
        self._user.is_active = False
        self._user.save()

        response = self._login(self._email, self._password)
        self.assert_status(403, response)

    def test_validate_fields(self):
        """Checks that email field is correctly validated."""
        response = self._login('not_an_email')
        self.assert_status(400, response)

class LogoutTestCase(_AuthTestCase):
    """Logout view tests."""

    def test_logout(self):
        """Checks logout prevent user from accessing protected ressources."""
        response = self._login()
        self._logout()
        response = self._get_user()
        self.assert_status(403, response)

class ResetPasswordTestCase(_AuthTestCase):
    """Password reset views test case."""

    def setUp(self):
        super().setUp()
        self._password = ''.join(choice(ascii_letters) for i in range(12))

    def test_reset_password(self):
        """Checks reset password sends a valid password reset email."""
        # Bad email should send a 200 error
        response = self._reset('bad_email')
        self.assert_status(400, response)

        response = self._reset('bad_email@test.com')
        self.assert_status(200, response)
        self.assertEqual(len(mail.outbox), 0)

        response = self._reset(self._email)
        self.assert_status(200, response)

        uid, token = self._check_mail()

        bad_uid = urlsafe_base64_encode(b'99')
        response = self._confirm(bad_uid, token)
        self.assert_status(400, response)

        response = self._confirm(uid, 'bad_token')
        self.assert_status(400, response)

        response = self._confirm(uid, token, 'not_matching')
        self.assert_status(400, response)

        response = self._confirm(uid, token)
        self.assert_status(200, response)

        response = self._login(self._email, self._password)
        self.assert_status(200, response)

    def _reset(self, email):
        return self._post('password_reset', email=email)

    def _check_mail(self):
        self.assertEqual(1, len(mail.outbox))

        mail_body = mail.outbox[0].body

        pattern = r'http.?://.*\?uid=(?P<uid>[^&]*)&token=(?P<token>[^&|\s]*)'
        pattern = re.compile(pattern)
        match = pattern.search(mail_body)

        uid = match.group('uid')
        token = match.group('token')
        return uid, token

    def _confirm(self, uid, token, confirmation=None):
        if confirmation is None:
            confirmation = self._password

        return self._post(
            'password_reset_confirm',
            new_password1=self._password,
            new_password2=confirmation,
            uid=uid,
            token=token
        )

class ChangePasswordTestCase(_AuthTestCase):
    """Logout view tests."""

    def setUp(self):
        super().setUp()
        self._new_password = 'oops_i_did_it_again'
        # Now you have the song stuck in your head

    def _change_password(self, old_password=None, confirmation=None):
        if old_password is None:
            old_password = self._password

        if confirmation is None:
            confirmation = self._new_password

        return self._post(
            'password_change',
            old_password=old_password,
            new_password1=self._new_password,
            new_password2=confirmation
        )

    def test_change_password_is_protected(self):
        """Checks password is forbidden when not logged in."""
        response = self._change_password()
        self.assert_status(403, response)

    def test_validation(self):
        """Checks old password is checked and confirmation is ok."""
        self._login()

        response = self._change_password(old_password='bad_password')
        self.assert_status(400, response)

        response = self._change_password(confirmation='bad_confirmation')
        self.assert_status(400, response)

    def test_change_password_works(self):
        """Checks password change works."""
        self._login()

        response = self._change_password()
        self.assert_status(200, response)

        # Checks we are still logged in
        response = self._get_user()
        self.assert_status(200, response)

        self._logout()

        response = self._login(password=self._new_password)
        self.assert_status(200, response)
