/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */
import axios from 'axios'

import { ApiError } from '@/utils/api'

/** Action : Queries the api using the get method.
 *  Will raise an ApiError in case of an http error.
 * @param {String} url The relative api url to query
 * @returns {Object} The query result
*/
export const get = 'get'

/** Action : Will try to login
 * @param {String} url The relative api url to query
 * @param {Object} data Data to send to the API
 * @returns {Object} The query result
*/
export const login = 'login'

/** Action : Queries the api using the post method
 *  Will raise an ApiError in case of an http error.
 * @param {String} url The relative api url to query
 * @returns {Object} The query result
*/
export const options = 'options'

/** Queries the api using the post method.
 *  Will raise an ApiError in case of an http error.
 * @param {String} url The relative api url to query
 * @param {Object} data Data to send to the API
 * result status is in this array.
 * @returns {Object} The query result
*/
export const post = 'post'

/** The currently logged in user
 * @type {Object}
*/
export const isLoggedIn = 'isLoggedIn'

export default {
  state: {
    _lastError: null,
    rootUrl: 'http://localhost:8000/api',
    axiosConfig: { 
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFTOKEN',
      withCredentials: true,
      validateStatus () {
        // We handle exception ourselves
        return true
      }
    },
    user: null
  },
  getters: {
    [isLoggedIn]: state => !!state.user
  },
  actions: {
    async [get] ({ state }, { url }) {
      return _processRequest(state, url, 'get')
    },
    async [login] ({ state, commit }, { url, data }) {
      if (state.user) {
        return state.user
      }
      let user = await _processRequest(state, url, 'post', data)
      commit('_login', user)
      return user
    },
    async [options] ({ state }, { url }) {
      return _processRequest(state, url, 'options')
    },
    async [post] (state, { url, data }) {
      return _processRequest(state, url, 'post', data)
    }
  },
  mutations: {
    _login (state, user) {
      state.user = user
    },
    _logout (state) {
      state.user = null
    }
  }
}

async function _processRequest (state, url, method, data) {
  let config = {
    url: url,
    baseURL: state.rootUrl,
    method: method,
    data: data,
    ...state.axiosConfig
  }
  let response = await axios.request(config)

  let status = response.status
  if ((status >= 200 || status < 300)) {
    return response.data
  }

  throw new ApiError(response)
}
