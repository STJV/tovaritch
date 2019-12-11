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
import { mapGetters } from 'vuex'

import ApiErrorSnackbar from 'tovaritch/core-ui/components/api/api-error-snackbar'
import MainMenu from 'tovaritch/core-ui/components/menu/main-menu'
import { isLoggedIn } from 'tovaritch/core-ui/store/api'

export default {
  name: 'TovaritchApp',
  components: {
    ApiErrorSnackbar,
    MainMenu
  },
  computed: {
    ...mapGetters({ isLoggedIn })
  }
}
</script>
