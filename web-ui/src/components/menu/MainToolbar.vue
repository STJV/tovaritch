<template>
  <v-app-bar dense app @logout="onLoggedOut()" v-if="loggedIn">
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
  mounted () {
  },
  data() {
    return {
      loggedIn: true
    }
  },
  methods: {
    loggedOut () {
      this.loggedIn = false
    }
  }
}
</script>
