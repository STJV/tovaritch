/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */
import Vue from 'vue'
import router from './router'
import VueSession from 'vue-session'

import KileedApp from './KileedApp.vue'
import store from '@/store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueSession)

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(KileedApp) }
}).$mount('#app')
