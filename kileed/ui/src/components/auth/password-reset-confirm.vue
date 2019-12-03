<template>
  <v-container>
    <api-form
      endpoint="/auth/password-reset-confirm/"
      @success="success"
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
      this.$router.push({ name: 'password-reset-confirm-done' })
    }
  }
}
</script>
