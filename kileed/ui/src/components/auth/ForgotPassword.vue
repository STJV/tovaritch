<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 The login page, how surprising.
-->
<template>
  <v-card>
    <v-card-text>
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
      <v-btn color="primary" @click="requestPasswordReset({ email })">
        Request Password Reset
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { Action as ApiAction } from '@/store/auth'

export default {
  data: () => ({
    email: '',
    loading: false
  }),
  methods: {
    ...mapActions({
      requestPasswordReset: ApiAction.REQUEST_PASSWORD_RESET
    })
  }
}
</script>
