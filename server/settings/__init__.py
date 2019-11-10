# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
""" Settings package, including splitted settings files """
from split_settings.tools import optional, include

include(
    'auth.py',
    'base.py',
    'database.py',
    'i18n.py',
    'rest.py',
    'saml.py',
    'templates.py',
    'wsgi.py',
    optional('/etc/kileed/settings.py')
)
