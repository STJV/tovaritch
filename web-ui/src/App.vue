<template>
  <v-app>
    <main-toolbar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import MainToolbar from './components/menu/MainToolbar'
import VFormBase from 'vuetify-form-base';  
import router from './router'
import { Action as ApiAction } from './store/api'
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    VFormBase,
    MainToolbar
  },
  async created () {
    if(!await this.refreshLogin()) {
      this.$router.push({
        name: "login",
        query: {
          nextRoute: this.$route.path
        }
      })
    }
  },
  methods: {
    ...mapActions({
      refreshLogin: ApiAction.REFRESH_LOGIN
    })
  }
}
</script>
