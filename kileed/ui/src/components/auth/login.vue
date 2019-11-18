<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 The login page, how surprising.
-->
<template>
  <v-card>
    <v-card-text>
      <v-form v-model="isFormValid">
        <email-field v-model="email" />
        <password-field v-model="password" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        small
        depressed
        :to="{name: 'forgot-password'}"
      >
        {{ $t('Forgot your password ?') }}
      </v-btn>
      <v-spacer />
      <api-request-btn :action="login" :disabled="!isFormValid">
        {{ $t('Login') }}
      </api-request-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ApiRequestBtn from '@/components/api/api-request-btn'
import EmailField from '@/components/common/email-field'
import PasswordField from '@/components/common/password-field'
import { Action as AuthAction } from '@/store/auth'
import { Getter as AuthGetter } from '@/store/auth'
import { required, requiredEmail } from '@/utils/validation'
import { $t } from '@/utils/i18n'

export default {
  components: {
    ApiRequestBtn,
    EmailField,
    PasswordField
  },
  data: () => ({
    email: '',
    password: '',
    isFormValid: false,
    passwordRules: [ required($t('Password')) ]
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
      if (!this.isFormValid) {
        return
      }
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
