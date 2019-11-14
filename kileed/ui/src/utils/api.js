export class ApiError extends Error {
  constructor (response, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }

    this.name = 'ApiError'

    this.response = response
    this.status = response.status
    this.statusText = response.statusText
  }
}
