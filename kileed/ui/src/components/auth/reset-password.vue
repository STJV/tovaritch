<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 The page allowing to reset password 
-->
<template>
  <v-container>
    <v-card v-if="!requestDone">
      <v-card-text>
        <v-container>
          <p>{{ $t('Please choose a new password.') }}</p>
          <password-field v-model="password" />
          <password-field v-model="confirmation" />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn>
          {{ $t('Reset password') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="requestDone">
      <v-card-text>
        <p>
          {{ $t('Password was reset.') }}
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
import { Action as ApiAction } from '@/store/auth'
import { RequestStatus } from '@/utils/api'

export default {
  data: () => ({
    password: '',
    confirmation: '',
    status: RequestStatus.NONE
  }),
  computed: {
    requestDone () {
      return this.status === RequestStatus.SUCCESS
    }
  },
  methods: {
    async resetPassword () {
      await this.$store.dispatch(ApiAction.CONFIRM_PASSWORD_RESET, {
        newPassword1: this.password,
        newPassword2: this.confirmation,
        token: this.$route.query.token,
        uid: this.$route.query.uid
      })
      this.status = RequestStatus.SUCCESS
    }
  }
}
</script>
