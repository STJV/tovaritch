/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */
import { apiGet, apiPost, ApiError } from '../utils/api'

export const Action = {
  GET: 'get',
  GET_TOKEN: 'GetToken',
  LOGIN: 'login',
  REFRESH_LOGIN: 'checkLoggedIn',
  LOGOUT: 'logout',
  POST: 'post'
}

export const Mutation = {
  LOGIN: 'login',
  LOGOUT: 'logout'
}

export const Getter = {
  IS_LOGGED_IN: 'isLoggedIn'
}

export default {
  state: {
    userInfos: null,
    rootUrl: 'http://127.0.0.1:8000/api'
  },
  actions: {
    async get ({ state }, [url]) {
      url = state.rootUrl + '/' + url
      return apiGet(url)
    },
    async [Action.POST] ({ state }, [url, data]) {
      url = state.rootUrl + '/' + url
      return apiPost(url, data)
    },
    async [Action.REFRESH_LOGIN] ({ commit, dispatch }) {
      try {
        const userInfos = await dispatch(Action.GET, ['auth/me'])
        commit(Mutation.LOGIN, userInfos)
        return true
      } catch (e) {
        if (e instanceof ApiError) {
          commit(Mutation.LOGOUT)
          return false
        }
        throw e
      }
    },
    async [Action.LOGIN] ({ commit, dispatch }, [email, password]) {
      const userInfos = await dispatch(Action.POST, ['auth/login', {
        email: email,
        password: password
      }])
      commit(Mutation.LOGIN, userInfos)
    },
    async [Action.LOGOUT] ({ commit, dispatch }) {
      await dispatch(Action.POST, ['auth/logout'])
      commit(Mutation.LOGOUT)
    }
  },
  mutations: {
    [Mutation.LOGIN] (state, userInfos) {
      state.userInfos = userInfos
    },
    [Mutation.LOGOUT] (state) {
      state.userInfos = null
    }
  },
  getters: {
    [Getter.IS_LOGGED_IN]: state => !!state.userInfos
  }
}
