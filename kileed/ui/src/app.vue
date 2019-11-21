<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms of
 the Do What The Fuck You Want To Public License, Version 2, as published by
 Sam Hocevar.

 See the COPYING file for more details.

 This is the main Kileed application page.
 -->
<template>
  <v-app>
    <main-menu v-if="isLoggedIn" />
    <v-content>
      <router-view />
      <api-error-snackbar />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ApiErrorSnackbar from '@/components/api/api-error-snackbar'
import MainMenu from '@/components/menu/main-menu'
import { isLoggedIn } from '@/store/api'

export default {
  name: 'KileedApp',
  components: {
    ApiErrorSnackbar,
    MainMenu
  },
  computed: {
    ...mapGetters({ isLoggedIn })
  },
  async created () {
    await this.redirectToLoginIfn()
  },
  methods: {

    /** Redirects the user to the login page if it's not logged in.
     * Will pass a nextRoute parameter on the url pointing to the current page
     * so the user will be redirected back to where he was once logged in.
    */
    async redirectToLoginIfn () {
      // Redirect to login page if we are not already logged in
      return
      
      let routeName = this.$route.name
      if (this.isLoggedIn || routeName === 'login') {
        return
      }

      this.$router.push({
        name: 'login',
        query: {
          nextRoute: this.$route.path
        }
      })
    }
  }
}
</script>
