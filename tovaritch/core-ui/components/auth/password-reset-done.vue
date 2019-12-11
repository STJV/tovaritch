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
