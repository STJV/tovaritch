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
import { mapGetters } from 'vuex'
import { Getter as ApiGetter } from '../../store/api'

export default {
  name: 'MainToolbar',
  components: {
    MainMenu
  },
  computed: {
    ...mapGetters({
      isLoggedIn: ApiGetter.IS_LOGGED_IN
    })
  },
  mounted () {
  }
}
</script>
