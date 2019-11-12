import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify' // path to vuetify export
import VueSession from 'vue-session'
import Vuex from 'vuex'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueSession)
Vue.use(Vuex)

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
