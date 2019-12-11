<template>
  <v-container>
    <api-form
      v-if="!missingParams"
      :hidden-data="data"
      endpoint="/auth/password-reset-confirm/"
      @success="success"
    >
      <api-input
        field="new_password1"
        :label="$t('Password')"
        icon="lock"
        type="password"
      />
      <api-input
        field="new_password2"
        :label="$t('Confirmation')"
        icon="lock"
        type="password"
      />
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
import ApiForm from 'tovaritch/core-ui/components/api/form'
import ApiInput from 'tovaritch/core-ui/components/api/input'

export default {
  components: {
    ApiForm,
    ApiInput
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
    success () {
      this.$router.push({ name: 'password-reset-confirm-done' })
    }
  }
}
</script>
