<template>
  <v-app>
    <main-toolbar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import router from './router'
import api from './services/api'
import VFormBase from 'vuetify-form-base';  
import MainToolbar from './components/menu/MainToolbar'

export default {
  name: 'App',
  components: {
    VFormBase,
    MainToolbar
  },
  mounted () {
    this.checkLoggedIn()
  },
  data () {
    return {
      drawer: true
    }
  },
  provide: {
    router,
    api
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
