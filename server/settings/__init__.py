# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
from split_settings.tools import optional, include

include(
    'base.py',
    'auth.py',
    'database.py',
    'i18n.py',
    'rest.py',
    'templates.py',
    'wsgi.py',
)


