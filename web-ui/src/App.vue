<template>
  <v-app dark>
    <v-app-bar dense app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Kileed</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
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
    }
  },
  methods: {
    checkLoggedIn () {
      this.$session.start()
      if (!this.$session.has('token')) {
        router.push('/auth')
      }
    }
  }
}
</script>
