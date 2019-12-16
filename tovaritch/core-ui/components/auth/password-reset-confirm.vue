<template>
  <v-container>
    <api-form
      :initial-data="data"
      @saved="onSaved"
      endpoint="/auth/password-reset-confirm/"
      method="POST"
      v-if="!missingParams"
    >
      <template v-slot:default="object">
        <api-text-field
          :label="$t('Password')"
          :object="object"
          field="new_password1"
          prepend-icon="lock"
          type="password"
        />
        <api-input
          :label="$t('Confirmation')"
          :object="object"
          field="new_password2"
          prepend-icon="lock"
          type="password"
        />
      </template>
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
    <v-alert v-if="missingParams" outlined type="error">
      {{ $t('Missing uid or token, check the reset link is correct.') }}
    </v-alert>
  </v-container>
</template>

<script>
import ApiForm from 'tovaritch/core-ui/components/api/api-text-field'
import ApiTextField from 'tovaritch/core-ui/components/api/api-text-field'
import { isLoggedIn } from 'tovaritch/core-ui/store/user'

export default {
  components: {
    ApiForm,
    ApiTextField
  },
  data () {
    return {
      missingParams: false,
      data: {}
    }
  },
  mounted () {
    let uid = this.$route.query.uid
    let token = this.$route.query.token

    if (!uid || !token) {
      this.missingParams = true
    }

    this.data = {
      uid: uid,
      token: token
    }
  },
  methods: {
    onSaved () {
      this.$router.push({ name: 'password-reset-confirm-done' })
    }
  }
}
</script>
