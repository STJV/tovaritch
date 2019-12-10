"""Class & utilities related to plugin management."""
from abc import abstractmethod

from django.apps import AppConfig
from django.apps import apps
from django.urls import include
from django.urls import path

class TovaritchPlugin(AppConfig):
    """Base class for Tovarich plugin django apps"""

    def __init__(self, *args, **kwargs):
        """ Constructor.
            Intializes default values for plugin parameters.
        """
        super().__init__(*args, **kwargs)
        if not hasattr(self, 'url_base'):
            self.url_base = self.name.split('.')[-1]

    @abstractmethod
    def get_urls(self):
        """Retrieve api urls for this plugin."""

    @classmethod
    def get_plugins(cls):
        """ Returns the list of Tovaritch plugins registered in Django
            INSTALLED_APPS settings.
        """
        for app_it in apps.get_app_configs():
            if not isinstance(app_it, TovaritchPlugin):
                continue
            yield app_it
