import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthRoutes from '@/routes/auth'
import LoginRoutes from '@/routes/profile'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    ...LoginRoutes,
    ...AuthRoutes
  ]
})
