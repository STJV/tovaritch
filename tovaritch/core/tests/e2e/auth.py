"""Test related to authentication & password reset."""
from splinter import Browser
from rest_framework.test import APILiveServerTestCase
from tovaritch.core.models import User

class _AuthTestCase(APILiveServerTestCase):
    """Base class for auth tests."""

    def setUp(self):
        self.browser = Browser('firefox', headless=True)
        self._email = 'durruti@cnt.org'
        self._password = 'los_solidarios'
        self._user = User.objects.create_user(self._email, self._password)

    def tearDown(self):
        self.browser.quit()

class LoginTestCase(_AuthTestCase):
    """Login related test case."""

    def test_login(self):
        """Checks login works"""
        browser = self.browser
        browser.visit(self.live_server_url)

        self.assertEqual(browser.title, 'Django Vue Integration')
        browser.find_by_css('#email input').fill(self._email)
        browser.find_by_css('#password input').fill(self._password)

        submit = browser.find_by_css('button[type=submit]')
        submit.click()

        browser.find_by_id('main-menu-toggle').click()
        browser.find_by_id('logout-menu').click()
