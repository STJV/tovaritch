import Vue from 'vue'

import '@/plugins/axios'
import i18n from '@/plugins/i18n'
import loginGuard from '@/plugins/login-guard'
import router from '@/plugins/router'
import store from '@/plugins/vuex'
import vuetify from './plugins/vuetify'

import App from '@/app'

loginGuard(router, store)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: function (h) { return h(App) }
}).$mount('#app')
