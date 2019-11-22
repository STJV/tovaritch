<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 The page allowing to reset password 
-->
<template>
  <v-container>
    <v-card>
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
    <v-card>
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

export default {
  data: () => ({
    password: '',
    confirmation: ''
  }),
  methods: {
    async resetPassword () {
    }
  }
}
</script>
