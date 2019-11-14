import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify' // path to vuetify export
import VueSession from 'vue-session'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(VueSession)

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
