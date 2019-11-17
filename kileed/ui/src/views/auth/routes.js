/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */
import ForgotPassword from '@/components/auth/forgot-password'
import ResetPassword from '@/components/auth/reset-password'
import Login from '@/components/auth/login'
import LoginView from '@/views/auth/login'

export default [{
  path: '/login',
  component: LoginView,
  children: [{
    path: '',
    name: 'login',
    component: Login
  }, {
    path: 'forgot-password',
    name: 'forgot-password',
    component: ForgotPassword
  }, {
    path: 'reset-password',
    name: 'reset-password',
    component: ResetPassword
  }]
}]
