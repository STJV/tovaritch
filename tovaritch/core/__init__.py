from os.path import abspath
from os.path import dirname
from os.path import join

from django.apps import AppConfig

_MODULE_PATH = join(abspath(dirname(__file__)), 'backend')

class Config(AppConfig):
    """AppConfig implementation for Tovaritch core."""
    name = 'tovaritch.core'
    label = 'tovaritch_core'
    path = _MODULE_PATH

__path__ = [_MODULE_PATH]