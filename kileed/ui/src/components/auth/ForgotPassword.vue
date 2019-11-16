<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 The login page, how surprising.
-->
<template>
  <v-container>
    <v-card v-if="status != 'success'">
      <v-card-text >
        <v-form ref="login_form">
          <v-text-field
            v-model="email"
            prepend-icon="mail"
            label="Email"
            type="text"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <api-action-button color="primary" :action="requestPasswordReset">
          Request Password Reset
        </api-action-button>
      </v-card-actions>
    </v-card>
    <v-card v-if="status === 'success'">
      <v-card-text>
        <p>If it was correct, a reset link has been sent to your email.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn :to="{ name: 'login' }">
          Back to login Page
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import ApiActionButton from '@/components/api/ApiActionButton'
import { mapActions } from 'vuex'
import { Action as ApiAction } from '@/store/auth'

export default {
  components: {
    ApiActionButton
  },
  data: () => ({
    email: '',
    status: "idle"
  }),
  methods: {
    async requestPasswordReset() {
      let email = this.email
      await this.$store.dispatch(ApiAction.REQUEST_PASSWORD_RESET, { email })
      this.status = 'success'
    }
  }
}
</script>
