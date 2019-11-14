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

export async function apiGet (url) {
  return _apiRequest(url, 'GET')
}

export async function apiPost (url, data) {
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
