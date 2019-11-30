"""Test related to authentication & password reset."""
from splinter import Browser
from rest_framework.test import APILiveServerTestCase

class _AuthTestCase(APILiveServerTestCase):
    """Base class for auth tests."""

    def setUp(self):
        self.browser = Browser('firefox', headless=True)

    def tearDown(self):
        self.browser.quit()

class LoginTestCase(_AuthTestCase):
    """Logout view tests."""

    def test_login(self):
        """Checks login works"""
        browser = self.browser
        browser.visit(self.live_server_url)
        self.assertEqual(browser.title, 'Django Vue Integration')
