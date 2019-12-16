<template>
  <v-container>
    <api-form
      @saved="onSaved"
      url="/auth/password-reset/"
      method="POST"
    >
      <template v-slot="object">
      {{ $t('Enter your email, we will send you a link to reset your ' +
        'password.') }}
        <api-text-field
          :label="$t('Email')"
          :object="object.object"
          field="email"
          prepend-icon="mail"
        />
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
import ApiForm from 'tovaritch/core-ui/components/api/api-form'
import ApiTextField from 'tovaritch/core-ui/components/api/api-text-field'

export default {
  components: {
    ApiForm,
    ApiTextField
  },
  methods: {
    onSaved () {
      this.$router.push({ name: 'password-reset-done' })
    }
  }
}
</script>
