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

export default {
  state: {
    rootUrl: 'http://localhost:8000/api',
    _axiosConfig: { 
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFTOKEN',
      withCredentials: true,
      validateStatus () {
        // We handle exception ourselves
        return true
      }
    }
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
    async _apiRequest ({ state }, { method, url, data, ignoreStatus }) {
      let config = {
        url: url,
        baseURL: state.rootUrl,
        method: method,
        data: data,
        ...state._axiosConfig
      }
      let response = await axios.request(config)

      let status = response.status
      if ((status < 200 || status >= 300) && !ignoreStatus.includes(status)) {
        throw new ApiError(response)
      }

      return response
    }
  }
}
