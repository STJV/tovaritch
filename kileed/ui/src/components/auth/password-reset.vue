<template>
  <v-container>
    <api-form
      endpoint="/auth/password-reset/"
      @success="success"
    >
      <template #help-text>
        {{ $t('Enter your email, we will send you a link to reset your ' +
          'password.') }}
      </template>
      <template #actions>
        <v-spacer />
        <v-btn type="submit">
          {{ $t('Send reset link') }}
        </v-btn>
      </template>
    </api-form>
  </v-container>
</template>

<script>
import ApiForm from '@/components/api/form'

export default {
  components: {
    ApiForm
  },
  methods: {
    success () {
      this.$router.push({ name: 'password-reset-done' })
    }
  }
}
</script>
