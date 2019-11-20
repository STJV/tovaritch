<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 The login page, how surprising.
-->
<template>
  <api-form
    endpoint="/auth/login/"
    :ignore-fields="['username']"
    @success="success"
  >
    <template #actions>
      <v-btn :to="{name: 'reset-password'}">
        {{ $t('Forgot your password ?') }}
      </v-btn>
      <v-spacer />
      <v-btn type="submit">
        {{ $t('Login') }}
      </v-btn>
    </template>
  </api-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ApiForm from '@/components/api/api-form'
import { Action as AuthAction } from '@/store/auth'
import { Getter as AuthGetter } from '@/store/auth'
import { $t } from '@/utils/i18n'

export default {
  components: {
    ApiForm
  },
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
    async success () {
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
