<template>
  <v-app-bar dense app @logout="onLoggedOut()" v-if="isLoggedIn">
      <v-toolbar-title class="headline">
      <span>KILEED</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <main-menu/>
  </v-app-bar>
</template>

<script>
import MainMenu from './MainMenu'

export default {
  name: 'MainToolbar',
  components: {
    MainMenu
  },
  inject: ['api'],
  computed: {
    isLoggedIn () {
      return this.$store.getters.loggedInUser != null
    }
  },
  mounted () {
  }
}
</script>
