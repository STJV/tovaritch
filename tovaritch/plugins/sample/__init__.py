""" Sample plugin for Tovaritch... """
from os.path import abspath
from os.path import dirname
from os.path import join

from django.apps import AppConfig

from tovaritch.core.utils.plugins import TovaritchPlugin

_MODULE_PATH = join(abspath(dirname(__file__)), 'backend')
__path__ = [_MODULE_PATH]

class Config(TovaritchPlugin):
    """AppConfig implementation for Tovaritch Sample Plugin."""
    name = 'tovaritch.plugins.sample'
    label = 'tovaritch_sample'
    path = _MODULE_PATH
