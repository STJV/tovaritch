import Vue from 'vue'

import 'tovaritch/core-ui/plugins/axios'
import i18n from 'tovaritch/core-ui/plugins/i18n'
import loginGuard from 'tovaritch/core-ui/plugins/login-guard'
import router from 'tovaritch/core-ui/plugins/router'
import store from 'tovaritch/core-ui/plugins/vuex'
import vuetify from 'tovaritch/core-ui/plugins/vuetify'

import App from 'tovaritch/core-ui/app'

loginGuard(router, store)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: function (h) { return h(App) }
}).$mount('#app')
