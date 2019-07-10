# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms of
# the Do What The Fuck You Want To Public License, Version 2, as published by
# Sam Hocevar.
#
# See the COPYING file for more details.
from django.conf import settings
from django.db.models import CASCADE
from django.db.models import CharField
from django.db.models import OneToOneField
from django.db.models import Model
from django.utils.translation import ugettext_lazy as _

from api.models import User

class Member(Model):
    user = OneToOneField(User, on_delete=CASCADE)
    first_name = CharField(_('first name'), max_length=50)
    last_name = CharField(_('last name'), max_length=50)
