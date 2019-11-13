/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const Action = {
    GET: "Get",
    GET_TOKEN: "GetToken",
    LOGIN: "login",
    REFRESH_LOGIN: "checkLoggedIn",
    LOGOUT: "logout",
    POST: "post",
};

export const Mutation = {
  LOGIN: "login",
  LOGOUT: "logout",
}

export const Getter = {
  IS_LOGGED_IN: "isLoggedIn"
}

export default {
  state: {
      userInfos: null,
      rootUrl: "https://kileed.oi.lan/api/v1"
  },
  actions: {
      async [Action.GET]({state}, [url]) {
        url = state.rootUrl + '/' + url
        return await axios.get(url)
      },
      async [Action.POST]({state}, [url, data]) {
        url = state.rootUrl + '/' + url
        return await axios.post(url, data)
      },
      async [Action.REFRESH_LOGIN]({commit, dispatch}) {
        try {
          const {data: userInfos} = await dispatch(Action.GET, ['auth/me'])
          commit(Mutation.LOGIN, userInfos)
          return true
        }
        catch(e) {
          if(e.isAxiosError && e.response.status == 403) {
            commit(Mutation.LOGOUT)
            return false
          }
          throw e
        }
      },
      async [Action.LOGIN]({commit, dispatch}, [email, password]) {
        const {data: userInfos} = await dispatch(Action.POST, ['auth/login',{
            email: email,
            password: password
        }])
        commit(Mutation.LOGIN, userInfos)
      },
      async [Action.LOGOUT]({commit, dispatch}) {
        await dispatch(Action.POST, ['auth/logout'])
        commit(Mutation.LOGOUT)
      },
  },
  mutations: {
    [Mutation.LOGIN](state, userInfos) {
      state.userInfos = userInfos
    },
    [Mutation.LOGOUT](state) {
      state.userInfos = null
    }
  },
  getters: {
    [Getter.IS_LOGGED_IN]: state => !!state.userInfos
  }
}