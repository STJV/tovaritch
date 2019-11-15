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

export const Action = {
  /** Queries the api using the get method.
   *  Will raise an ApiError in case of an http error.
   * @param {String} url The relative api url to query
   * @param {Array} ignore_status Do not throw an exception if the request
   * result status is in this array.
   * @returns {Object} The query result
  */
  GET: 'get',

  /** Queries the api using the post method
   *  Will raise an ApiError in case of an http error.
   * @param {String} url The relative api url to query
   * @param {Object} data Data to send to the API
   * @param {Array} ignoreStatus Do not throw an ApiError if the request
   * result status is in this array.
   * @returns {Object} The query result
  */
  POST: 'post'
}

export const Mutation = {
  /** Clears the last error. */
  CLEAR_ERROR: 'clearError'
}

export const Getter = {
  /** The last ApiError that was raised during an api call
   * @type {Object}
  */
  LAST_ERROR: 'getLastError'
}

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
    }
  },
  getters: {
    [Getter.LAST_ERROR]: state => state._lastError
  },
  actions: {
    async [Action.GET] ({ dispatch }, { url, ignoreStatus }) {
      return dispatch('_apiRequest', {
        method: 'get',
        url,
        ignoreStatus
      })
    },
    async [Action.POST] ({ dispatch }, { url, data, ignoreStatus }) {
      return dispatch('_apiRequest', {
        method: 'post',
        url,
        data,
        ignoreStatus
      })
    },
    async _apiRequest ({ state, commit }, { method, url, data, ignoreStatus }) {
      let config = {
        url: url,
        baseURL: state.rootUrl,
        method: method,
        data: data,
        ...state.axiosConfig
      }
      let response = await axios.request(config)

      let status = response.status
      if ((status < 200 || status >= 300) &&
        (!ignoreStatus || !ignoreStatus.includes(status))) {
        let error = new ApiError(response)
        commit('_setLastError', error)
        throw error
      }

      return response
    }
  },
  mutations: {
    [Mutation.CLEAR_ERROR] (state) {
      state.lastError = null
    },
    _setLastError (state, error) {
      state._lastError = error
    }
  }
}
