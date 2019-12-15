<template>
  <v-card>
    <v-layout>
      <v-flex xs2>
        <v-container class="ma-0">
          <v-img width="128" height="128" :src="avatar" />
        </v-container>
        <v-card-actions>
          <v-btn outlined>
            Upload Avatar
          </v-btn>
        </v-card-actions>
      </v-flex>
      <v-flex xs3>
        <editable-text-field
          v-model="currentUser.username"
          v-api-field="{
            endpoint: `/users/${currentUser.id}`,
            field: 'username'
          }"
          :errors="['error 1', 'error 2']"
          :label="$t('Username')"
          status='error'/>
        <editable-text-field
          v-model="currentUser.email"
          v-api-field="`/users/${currentUser.id}#email`"
          :label="$t('Email')"
        />
      </v-flex>
      <v-flex xs3>
        <api-form endpoint="/auth/password-change/" method="post">
          <v-card-title>Password Reset</v-card-title>
          <api-input
            id="old-password"
            field="old_password"
            :label="$t('Old Password')"
            type="password"
            icon="lock"
          />
          <api-input
            id="password"
            field="new_password1"
            :label="$t('New Password')"
            type="password"
            icon="lock"
          />
          <api-input
            id="confirmation"
            field="new_password2"
            :label="$t('Confirmation')"
            type="password"
            icon="lock"
          />
          <template #actions>
            <v-spacer />
            <v-btn type="submit">
              {{ $t('Save') }}
            </v-btn>
          </template>
        </api-form>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import ApiForm from 'tovaritch/core-ui/components/api/form'
import ApiInput from 'tovaritch/core-ui/components/api/input'
import EditableTextField from 'tovaritch/core-ui/components/common/editable-text-field'
import ApiField from 'tovaritch/core-ui/directives/api/api-field.js'
import { isLoggedIn } from 'tovaritch/core-ui/store/api'
import { currentUser } from 'tovaritch/core-ui/store/api'
import DefaultAvatar from 'tovaritch/core-ui/assets/img/default-avatar.png'

export default {
  components: {
    ApiForm,
    ApiInput,
    EditableTextField
  },
  directives: {
    ApiField
  },
  data() {
    return {
      avatar: DefaultAvatar
    }
  },
  computed: {
    ...mapGetters({ currentUser })
  },
  methods: {
  }
}
</script>
