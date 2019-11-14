<!--
  Copyright © 2019 STJV <contact@stjv.fr>

  This work is free. You can redistribute it and/or modify it under the terms
  of the Do What The Fuck You Want To Public License, Version 2, as published
  by the comrade Sam Hocevar.

  See the COPYING file for more details.
-->
<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="login_form">
              <v-text-field prepend-icon="mail" v-model="email" label="Email" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="password" label="Password" id="password" type="password"></v-text-field>
            </v-form>
            <v-alert v-if="error" dense outlined type="error" class="text-truncate">
              {{error}}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import { Action as ApiAction } from '../store/api'
import { Getter as ApiGetter } from '../store/api'

export default {
  name: 'Auth',
  data: () => ({
    email: "",
    password: "",
    valid: true,
    loading: false,
    error: ''
  }),
  computed: {
    ...mapGetters({
        isLoggedIn: ApiGetter.IS_LOGGED_IN
    }),
  },
  created () {
    if(this.isLoggedIn) {
      this.redirectToNext()
    }
  },
  methods: {
    ...mapActions({
        apiLogin: ApiAction.LOGIN
    }),
    async login() {
      await this.apiLogin([this.email, this.password])
      this.redirectToNext()
    },
    redirectToNext() {
      let next = this.$route.query.next
      let nextRoute = this.$route.query.nextRoute
      let router = this.$router

      // External url
      if(next) {
        window.location.href = next;
      }
      // Vuejs route
      else if(nextRoute) {
        router.push(nextRoute)
      }
      // None defined, go to home
      else {
        router.push("/")
      }
    }
  }
}
</script>
