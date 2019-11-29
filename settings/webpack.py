"""Webpack loader settings."""
from os.path import join

from settings.base import BASE_DIR
from settings.base import DEBUG

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': DEBUG,
        'BUNDLE_DIR_NAME': '/bundles/',
        'STATS_FILE': join(BASE_DIR, 'kileed', 'ui', 'webpack-stats.json'),
    }
}