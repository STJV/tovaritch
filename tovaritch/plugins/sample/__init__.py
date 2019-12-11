""" Sample plugin for Tovaritch... """
from tovaritch.core.utils.plugins import TovaritchPlugin

class Config(TovaritchPlugin):
    """AppConfig implementation for Tovaritch Sample Plugin."""
    name = 'tovaritch.plugins.sample'
    label = 'tovaritch_sample'
