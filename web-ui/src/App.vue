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
import VFormBase from 'vuetify-form-base';  
import MainToolbar from './components/menu/MainToolbar'

export default {
  name: 'App',
  components: {
    VFormBase,
    MainToolbar
  },
  mounted () {
  },
  data () {
    return {
      drawer: true
    }
  },
  provide: {
    router,
  },
}
</script>
