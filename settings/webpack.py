"""Webpack loader settings."""
from os.path import join

from settings.base import BASE_DIR
from settings.base import DEBUG

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': join(BASE_DIR, 'build', 'webpack-stats.json'),
    }
}