/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */
import { ApiError } from '@/utils/api'

export const Action = {
  /** Queries the api using the get method.
   *  Will raise an ApiError in case of an http error.
   * @param url String The relative api url to query
   * @returns Object The query result
  */
  GET: 'get',

  /** Queries the api using the post method
   *  Will raise an ApiError in case of an http error.
   * @param url String The relative api url to query
   * @param data Object Data to send to the API
   * @returns Object The query result
  */
  POST: 'post'
}

export default {
  state: {
    rootUrl: 'http://127.0.0.1:8000/api'
  },
  actions: {
    async [Action.GET] ({ state }, [url]) {
      url = state.rootUrl + '/' + url
      return _apiGet(url)
    },
    async [Action.POST] ({ state }, [url, data]) {
      url = state.rootUrl + '/' + url
      return _apiPost(url, data)
    }
  }
}

async function _apiGet (url) {
  return _apiRequest(url, 'GET')
}

async function _apiPost (url, data) {
  return _apiRequest(url, 'POST', {
    body: JSON.stringify(data)
  }, {
    'Content-type': 'application/json'
  })
}

async function _apiRequest (
  url,
  method,
  options = {},
  headers = {}) {
  let response = await fetch(url, {
    method: method,
    headers: { 
      ...headers
    },
    ...options
  })

  if (!response.ok) {
    throw new ApiError(response)
  }

  let responseBody = await response.text()

  if (responseBody) {
    return JSON.stringify(responseBody)
  }

  return undefined
}
