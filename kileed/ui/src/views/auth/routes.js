/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */
import PasswordReset from '@/components/auth/password-reset'
import PasswordResetConfirm from '@/components/auth/password-reset-confirm'
import PasswordResetConfirmDone from '@/components/auth/password-reset-confirm-done'
import PasswordResetDone from '@/components/auth/password-reset-done'
import Login from '@/components/auth/login'
import LoginView from '@/views/auth/login'

export default [{
  path: '/auth',
  component: LoginView,
  children: [{
    path: 'login',
    name: 'login',
    component: Login
  }, {
    path: 'password-reset',
    name: 'password-reset',
    component: PasswordReset
  }, {
    path: 'password-reset-done',
    name: 'password-reset-done',
    component: PasswordResetDone
  }, {
    path: 'password-reset-confirm',
    name: 'password-reset-confirm',
    component: PasswordResetConfirm
  }, {
    path: 'password-reset-confirm-done',
    name: 'password-reset-confirm-done',
    component: PasswordResetConfirmDone
  }]
}]
