import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthRoutes from 'tovaritch/core-ui/routes/auth'
import LoginRoutes from 'tovaritch/core-ui/routes/profile'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    ...LoginRoutes,
    ...AuthRoutes
  ]
})
