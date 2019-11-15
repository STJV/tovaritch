<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 The login page, how surprising.
-->
<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md4
      >
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="login_form">
              <v-text-field
                v-model="email"
                prepend-icon="mail"
                label="Email"
                type="text"
              />
              <v-text-field
                id="password"
                v-model="password"
                prepend-icon="lock"
                label="Password"
                type="password"
              />
            </v-form>
            <v-alert
              v-if="error"
              dense
              outlined
              type="error"
              class="text-truncate"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              @click="login()"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { Action as AuthAction } from '@/store/auth'
import { Getter as AuthGetter } from '@/store/auth'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Auth',
  data: () => ({
    email: '',
    password: '',
    valid: true,
    loading: false,
    error: ''
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: AuthGetter.IS_LOGGED_IN
    })
  },
  created () {
    if (this.isLoggedIn) {
      this.redirectToNext()
    }
  },
  methods: {
    ...mapActions({
      apiLogin: AuthAction.LOGIN
    }),

    /** Login, and redirect to next page if successfull */
    async login () {
      await this.apiLogin([this.email, this.password])
      this.redirectToNext()
    },

    /** Redirects to the wanted page after login.
     * Either redirects to the url given as ?next=https://somewhere, or pushes
     * a route on the current site if an url parameter nextRoute is given
     * (pushing a route avoids reloading the page). */
    redirectToNext () {
      let next = this.$route.query.next
      let nextRoute = this.$route.query.nextRoute
      let router = this.$router

      if (next) {
        // External url
        window.location.href = next
      } else if (nextRoute) {
        // Vuejs route
        router.push(nextRoute)
      } else {
        // None defined, go to home
        router.push('/')
      }
    }
  }
}
</script>
