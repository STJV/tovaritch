/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */
import Vue from 'vue'
import VueSession from 'vue-session'

import i18n from '@/plugins/i18n'
import router from '@/plugins/router'
import store from '@/plugins/vuex'
import vuetify from '@/plugins/vuetify'
import App from '@/app'

Vue.config.productionTip = false
Vue.use(VueSession)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: function (h) { return h(App) }
}).$mount('#app')
