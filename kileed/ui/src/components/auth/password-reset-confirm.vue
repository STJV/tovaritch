<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Reset password confirmation form
-->
<template>
  <v-container>
    <api-form
      v-if="!success"
      endpoint="/auth/password-reset-confirm/"
      @success="success = true"
    >
      <template #help-text>
        {{ $t('Please provide a new password.') }}
      </template>
      <template #actions>
        <v-spacer />
        <v-btn type="submit">
          {{ $t('Save') }}
        </v-btn>
      </template>
    </api-form>
    <v-card v-if="success">
      <v-card-text>
        <p>
          {{ $t('Your password was reset.') }}
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
