/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */

/** Exception raised when an error occurs during an API request.
 * (See @/store/api.js)
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

    if (body) {
      let { detail } = JSON.parse(body)
      this._detail = detail
    }
  }

  /** Returns the status code of the request
   * @return {Number} Request status code */
  getStatus () { return this._response.status }

  /** Returns the status description of the request
   * @return {String} Request status description (ex 'Forbidden') */
  getStatusText () { return this._response._statusText }

  /** Returns the response object that was returned by fetch()
   * @return {Object} Response object */
  getResponse () { return this._response }

  /** Returns additionnal informations about the error.
   * @return {String} Additionnal information about the error, deserialized from
   *         the response body */
  getDetail () { return this._detail }
}
