<template>
  <v-app>
    <v-app-bar dense app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Kileed</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Users</v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      fixed
    >
      <v-list dense>
        <v-list-item link :to="{path: 'users'}">
          <v-list-item-icon>
            <v-icon>email</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title :to="{path: 'users'}">Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import router from './router'
export default {
  name: 'App',
  components: {
  },
  mounted () {
    this.checkLoggedIn()
  },
  data () {
    return {
      drawer: true
    }
  },
  methods: {
    checkLoggedIn () {
      this.$session.start()
      if (!this.$session.has('token')) {
        router.push('/login')
      }
    }
  }
}
</script>
