import Vue from 'vue'
import VueSession from 'vue-session'

import i18n from '@/plugins/i18n'
import router from '@/plugins/router'
import store from '@/plugins/vuex'
import vuetify from '@/plugins/vuetify'
import loginGuard from '@/plugins/login-guard'
import App from '@/app'

Vue.config.productionTip = false
Vue.use(VueSession)

loginGuard(router, store)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: function (h) { return h(App) }
}).$mount('#app')
