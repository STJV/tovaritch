/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 * 
 * Various helpers and classes related to API access and querying.
 */

/** Enum giving the status of an api request.
 *  Usefull in multiple UI components that calls the API.
 */
export const RequestStatus = {
  NONE: 'none',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'error'
}

/** Exception raised when an error occurs during an API request.
 * (See @/store/api.js)  LOADING: 'loading',
*/
export class ApiError extends Error {
  /**
   * Constructor
   * @param {Object} response The response object returned by fetch.
   * @param {String} body The response body as a string
   * @param {...any} params additionnal params forwarded to the Error
   * constructor.
   */
  constructor (response, body, ...params) {
    super(response.statusText, ...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }

    this.name = 'ApiError'
    this._response = response

    if (response.data) {
      this._details = response.data.detail
    }
  }

  /** Returns the status code of the request
   * @return {Number} Request status code */
  getStatus () { return this._response.status }

  /** Returns the status description of the request
   * @return {String} Request status description (ex 'Forbidden') */
  getStatusText () { return this._response.statusText }

  /** Returns the response object that was returned by fetch()
   * @return {Object} Response object */
  getResponse () { return this._response }

  /** Returns additionnal informations about the error.
   * @return {String} Additionnal information about the error, deserialized from
   *         the response body */
  getDetails () { return this._details }

  /** Returns the response data
   * @return {Object} The response data object */
  getData () { return this._response.data }
}

/** All API endpoints */
export const EndPoints = {
  auth: {
    login: '/auth/login/',
    logout: '/auth/logout/',
    reset_password: '/auth/confirm/',
    forgot_password: '/auth/reset/',
    user_details: '/auth/user/'
  }
}
