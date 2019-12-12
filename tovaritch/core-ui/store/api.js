import axios from 'axios'

import { ApiError } from 'tovaritch/core-ui/utils/api'
import { EndPoints } from 'tovaritch/core-ui/utils/api'

/** Action : Will try to login
 * @param {String} url The relative api url to query
 * @param {Object} data Data to send to the API
 * @returns {Object} The query result
*/
export const login = 'login'

/** Action : Log outs the currently logged in user
*/
export const logout = 'logout'

/** Queries the api using the specified method.
 *  Will raise an ApiError in case of an http error.
 * @param {String} url The relative api url to query
 * @param {Object} data (for post, patch and put) Data to send to the API.
 * result status is in this array.
 * @returns {Object} The query result
*/
export const get = 'get'
export const options = 'options'
export const patch = 'patch'
export const post = 'post'
export const put = 'put'

/** Action : Tries to update the current user data, by querying it. If the user
 *  has a session, it will log him in.
 * @returns {Object/boolean} The user data, or false if no user have a session
*/
export const refreshLogin = 'refreshLogin'

/** Returns true if an user is currently logged in.
 * @type {Boolean}
*/
export const isLoggedIn = 'isLoggedIn'

/** Returns the current logged in user.
 * @type {Object}
*/
export const currentUser = 'currentUser'

export default {
  state: {
    _lastError: null,
    rootUrl: '/api',
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
    [isLoggedIn]: state => !!state.user,
    [currentUser]: state => state.user
  },
  actions: {
    async [get] ({ state }, { url }) {
      let response = await _processRequest(state, url, 'get')
      return _handleResponse(response)
    },
    async [login] ({ state, commit }, { url, data }) {
      if (state.user) {
        return state.user
      }
      let response = await _processRequest(state, url, 'post', data)
      let user = _handleResponse(response)
      commit('_login', user)
      return user
    },
    async [logout] ({ state, commit }) {
      let response = await _processRequest(state, EndPoints.auth.logout, 'post')
      _handleResponse(response)
      commit('_logout')
    },
    async [options] ({ state }, { url }) {
      let response = await _processRequest(state, url, 'options')
      return _handleResponse(response)
    },
    async [patch] ({ state }, { url, data }) {
      let response = await _processRequest(state, url, 'patch', data)
      return _handleResponse(response)
    },
    async [put] ({ state }, { url, data }) {
      let response = await _processRequest(state, url, 'put', data)
      return _handleResponse(response)
    },
    async [post] ({ state }, { url, data }) {
      let response = await _processRequest(state, url, 'post', data)
      return _handleResponse(response)
    },
    async [refreshLogin] ({ state, commit }) {
      let response = await _processRequest(
        state,
        EndPoints.auth.current_user,
        'get'
      )
      // Just return false if user is not logged in
      if (response.status === 403) {
        return false
      }
      let user = _handleResponse(response)
      commit('_login', user)
      return user
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
  return axios.request(config)
}

function _handleResponse (response) {
  let status = response.status
  if ((status >= 200 && status < 300)) {
    return response.data
  }

  throw new ApiError(response)
}
