import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthRoutes from 'tovaritch/core-ui/routes/auth'
import LoginRoutes from 'tovaritch/core-ui/routes/profile'
import AdminRoutes from 'tovaritch/core-ui/routes/admin'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    ...LoginRoutes,
    ...AuthRoutes,
    ...AdminRoutes
  ]
})
