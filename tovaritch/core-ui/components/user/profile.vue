<template>
  <v-container>
    <v-layout>
      <v-flex xs2>
        <v-card>
          <v-container class="ma-2">
            <v-img width="128" height="128" :src="avatar" />
          </v-container>
          <v-card-actions>
            <v-btn outlined>
              Upload Avatar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <api-form :endpoint="`/users/${currentUser.id}/`" method="put">
          <api-input
            id="username"
            field="username"
            :label="$t('User Name')"
            icon="account_circle"
          />
          <api-input
            id="email"
            field="email"
            :label="$t('Email')"
            icon="mail"
          />
          <template #actions>
            <v-spacer />
            <v-btn type="submit">
              {{ $t('Save') }}
            </v-btn>
          </template>
        </api-form>
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
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import ApiForm from 'tovaritch/core-ui/components/api/form'
import ApiInput from 'tovaritch/core-ui/components/api/input'
import { isLoggedIn } from 'tovaritch/core-ui/store/api'
import { currentUser } from 'tovaritch/core-ui/store/api'
import DefaultAvatar from 'tovaritch/core-ui/assets/img/default-avatar.png'

export default {
  components: {
    ApiForm,
    ApiInput
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
