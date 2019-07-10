<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="login_form">
              <v-text-field prepend-icon="mail" v-model="credentials.email" label="Email" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="credentials.password" label="Password" id="password" type="password"></v-text-field>
            </v-form>
            <v-alert v-if="error" dense outlined type="error" class="text-truncate">
              {{error}}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'Auth',
  data: () => ({
    credentials: {},
    valid: true,
    loading: false,
    error: ''
  }),
  methods: {
    login () {
      if (this.$refs.login_form.validate()) {
        this.loading = true
        axios.post('http://localhost:8000/api/auth/', this.credentials).then(res => {
          this.$session.start()
          this.$session.set('token', res.data.token)
          router.push('/')
        }).catch(e => {
          this.error = e.response.data['non_field_errors'][0]
          this.loading = false
        })
      }
    }
  }
}
</script>
