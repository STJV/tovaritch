/** Enum giving the status of an api request.
 *  Usefull in multiple UI components that calls the API.
 */
export const REQUEST_STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
}

export const HTTP_METHOD = {
    GET: 'get',
    OPTIONS: 'options',
    PATCH: 'patch',
    POST: 'post',
    PUT: 'put'
}

/** Exception raised when an error occurs during an API request.
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
