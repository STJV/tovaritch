<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Reset password form done page.
-->
<template>
  <v-container>
    <v-card>
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
export default {
}
</script>
