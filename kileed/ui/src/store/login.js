/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */
/** Login related store module.
 * Contains actions & state related to login and password recovery. Calls
 * api 
 */
import { ApiError } from '@/utils/api'
import { Action as ApiAction } from '@/store/api'

export const Action = {
  /** Logins in the backend
   * @param email : User email
   * @param password : User password
  */
  LOGIN: 'login',

  /** Logouts from the backend
   * @param email : User email
   * @param password : User password
  */
  LOGOUT: 'logout',

  /** Refreshes the login state. */
  REFRESH_LOGIN: 'refreshLogin'
}

export const Getter = {
  IS_LOGGED_IN: 'isLoggedIn'
}

export default {
  state: {
    userInfos: null
  },

  actions: {
    async [Action.LOGIN] ({ commit, dispatch }, [email, password]) {
      const userInfos = await dispatch(ApiAction.POST, ['auth/login', {
        email: email,
        password: password
      }])
      commit('_login', userInfos)
    },
    async [Action.LOGOUT] ({ commit, dispatch }) {
      await dispatch(ApiAction.POST, ['auth/logout'])
      commit('_logout')
    },
    async [Action.REFRESH_LOGIN] ({ commit, dispatch }) {
      try {
        const userInfos = await dispatch(ApiAction.GET, ['auth/user'])
        commit('_login', userInfos)
        return true
      } catch (e) {
        if (e instanceof ApiError) {
          commit('_logout')
          return false
        }
        throw e
      }
    }
  },
  mutations: {
    _login (state, userInfos) {
      state.userInfos = userInfos
    },
    _logout (state) {
      state.userInfos = null
    }
  },
  getters: {
    [Getter.IS_LOGGED_IN]: state => !!state.userInfos
  }
}
