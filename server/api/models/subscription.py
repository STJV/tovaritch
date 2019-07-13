# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
from django.conf import settings
from django.db.models import CASCADE
from django.db.models import CharField
from django.db.models import DateTimeField
from django.db.models import DurationField
from django.db.models import FloatField
from django.db.models import ForeignKey
from django.db.models import Model
from django.utils.translation import ugettext_lazy as _

from api.models import Member

class Subscription(Model):
    member = ForeignKey(Member, on_delete=CASCADE)
    paid_date = DateTimeField(_('paid date'))
    end_date = DateTimeField(_('end date'))
    value = FloatField(_('value'))
