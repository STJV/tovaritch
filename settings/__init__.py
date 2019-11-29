"""Settings package, including splitted settings files."""
from split_settings.tools import optional, include

include(
    'auth.py',
    'base.py',
    'database.py',
    'email.py',
    'i18n.py',
    'rest.py',
    'templates.py',
    'wsgi.py',
    'webpack.py',
    optional('/etc/kileed/settings.py')
)
