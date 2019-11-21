<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 The logout menu item.
-->
<template>
  <v-list-item @click="logout()">
    <v-list-item-icon>
      <v-icon>logout</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ $t('Logout') }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
    }),

    /** Logs out, and redirect to the login page.
     * The current page route is transferred as an url parameter to the login
     * page, so the user is redirected back to the current page if he logs in
     * again.
     */
    async logout () {
      //await this.apiLogout()
      // Redirect to login page after logout
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
