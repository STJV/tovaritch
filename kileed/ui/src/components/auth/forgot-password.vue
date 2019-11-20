<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 The login page, how surprising.
-->
<template>
  <v-container>
    <v-card v-if="!requestDone">
      <v-card-text>
        <v-container>
          <p>
            {{ $t('Enter your email, we will send you a mail with a link to' +
              ' reset you password.') }}
          </p>
          <v-form ref="emailForm" v-model="isFormValid">
            <email-field v-model="email" />
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn>
          {{ $t('Send password reset email') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="requestDone">
      <v-card-text>
        <p>
          {{ $t('If the provided email was correct, you should receive a message' +
            ' with a link to reset your password.') }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn :to="{ name: 'login' }" :disabled="!isFormValid">
          {{ $t('Back to login Page') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import EmailField from '@/components/api/fields/email-field'
import { Action as ApiAction } from '@/store/auth'
import { RequestStatus } from '@/utils/api'
import { requiredEmail } from '@/utils/validation'
import { $t } from '@/utils/i18n'

export default {
  components: {
    EmailField
  },
  data: () => ({
    email: '',
    isFormValid: true,
    status: RequestStatus.NONE,
    emailRules: [ requiredEmail($t('Email')) ]
  }),
  computed: {
    requestDone () {
      return this.status === RequestStatus.SUCCESS
    }
  },
  methods: {
    async requestPasswordReset () {
      this.$refs.emailForm.validate()
      if (!this.isFormValid) {
        return
      }
      let email = this.email
      await this.$store.dispatch(ApiAction.REQUEST_PASSWORD_RESET, { email })
      this.status = RequestStatus.SUCCESS
    }
  }
}
</script>
