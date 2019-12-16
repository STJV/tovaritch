<template>
  <v-list-item id="logout-menu" @click="click()">
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
import { logout } from 'tovaritch/core-ui/store/user'

export default {
  methods: {
    ...mapActions({
      logout
    }),

    /** Logs out, and redirect to the login page.
     * The current page route is transferred as an url parameter to the login
     * page, so the user is redirected back to the current page if he logs in
     * again.
     */
    async click () {
      await this.logout()
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
