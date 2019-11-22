<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Reset password form
-->
<template>
  <v-container>
    <api-form
      v-if="!success"
      endpoint="/auth/password-reset/"
      @success="success = true"
    >
      <template #help-text>
        {{ $t('Enter your email, we will send you a link to reset your ' +
          'password.') }}
      </template>
      <template #actions>
        <v-spacer />
        <v-btn type="submit">{{ $t('Send reset link') }}</v-btn>
      </template>
    </api-form>
    <v-card v-if="success">
      <v-card-text>
        <p>
          {{ $t('If the provided email was correct, you should receive a ' +
            'message with a link to reset your password.') }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn :to="{ name: 'login' }">
          {{ $t('Back to login Page') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import ApiForm from '@/components/api/api-form'

export default {
  components: {
    ApiForm
  },
  data: () => ({
    success: false
  })
}
</script>
