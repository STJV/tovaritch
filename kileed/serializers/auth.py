# Copyright © 2019 STJV <contact@stjv.fr>
#
# This work is free. You can redistribute it and/or modify it under the terms
# of the Do What The Fuck You Want To Public License, Version 2, as published
# the comrade Sam Hocevar.
#
# See the COPYING file for more details.
import rest_auth.serializers

class PasswordResetSerializer(rest_auth.serializers.PasswordResetSerializer):
    """ Used to override get_email_options, to customize mail sending (like the
    templates used) """

    def get_email_options(self):
        return {
            'email_template_name': 'auth/password_reset_email.html'
        }
