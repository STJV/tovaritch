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
   * @returns {Object} The query result
  */
  GET: 'get',

  /** Queries the api using the post method
   *  Will raise an ApiError in case of an http error.
   * @param {String} url The relative api url to query
   * @param {Object} data Data to send to the API
   * @returns {Object} The query result
  */
  POST: 'post'
}

export default {
  state: {
    rootUrl: 'https://kileed.oi.lan/api',
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
    async [Action.GET] ({ dispatch }, [url]) {
      return dispatch('_apiRequest', ['get', url])
    },
    async [Action.POST] ({ dispatch }, [url, data]) {
      return dispatch('_apiRequest', ['post', url, data])
    },
    async _apiRequest ({ state, commit }, [method, url, data]) {
      let config = {
        url: url,
        baseURL: state.rootUrl,
        method: method,
        data: data,
        ...state._axiosConfig
      }
      let response = await axios.request(config)

      if (response.status < 200 || response.status >= 300) {
        throw new ApiError(response)
      }

      return response
    }
  }
}
