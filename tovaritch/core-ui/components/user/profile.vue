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
        <template v-slot="object">
          <api-field v-slot="field" :object="currentUser" field="username">
            <editable-text-field
              v-model="field.value"
              :label="$t('Username')"/>
          </api-field>
          <api-field v-slot="field" :object="currentUser" field="email">
            <editable-text-field
              v-model="field.value"
              :label="$t('Email')"
            />
          </api-field>
        </template>
      </v-flex>

      <v-flex xs3>
        <api-form endpoint="/auth/password-change/" method="POST">
          <template v-slot="object">
            <v-card-title>Password Reset</v-card-title>
            <api-text-field
              :label="$t('Old Password')"
              :object="object"
              field="old_password"
              prepend-icon="lock"
              type="password"
            />
            <api-text-field
              :label="$t('New Password')"
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
import ApiField from 'tovaritch/core-ui/directives/api/api-field'
import ApiForm from 'tovaritch/core-ui/components/api/api-form'
import ApiTextField from 'tovaritch/core-ui/components/api/api-text-field'
import DefaultAvatar from 'tovaritch/core-ui/assets/img/default-avatar.png'
import EditableTextField from 'tovaritch/core-ui/components/common/editable-text-field'
import { currentUser } from 'tovaritch/core-ui/store/user'
import { mapGetters } from 'vuex'

export default {
  components: {
    ApiField,
    ApiForm,
    ApiTextField,
    EditableTextField
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
