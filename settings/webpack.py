# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
""" Webpack loader settings """
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