import PasswordReset from 'tovaritch/core-ui/components/auth/password-reset'
import PasswordResetConfirm from 'tovaritch/core-ui/components/auth/password-reset-confirm'
import PasswordResetConfirmDone from 'tovaritch/core-ui/components/auth/password-reset-confirm-done'
import PasswordResetDone from 'tovaritch/core-ui/components/auth/password-reset-done'
import Login from 'tovaritch/core-ui/components/auth/login'
import LoginView from 'tovaritch/core-ui/views/login'

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
