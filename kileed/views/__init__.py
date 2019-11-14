# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
""" Views for Kileed core """
from .login import LoginView
from .logout import LogoutView
from .me import MeView
from .user import UserViewSet

login = LoginView.as_view()
logout = LogoutView.as_view()
me = MeView.as_view()
