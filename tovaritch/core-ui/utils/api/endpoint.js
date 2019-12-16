import { HTTP_METHOD } from 'tovaritch/core-ui/utils/api/common'
import { REQUEST_STATUS } from 'tovaritch/core-ui/utils/api/common'
import Vue from 'vue'

const _ROOT_URL = '/api'

const _AXIOS_CONFIG = {
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
  withCredentials: true,
  validateStatus () {
    // We handle exception ourselves
    return true
  }
}

export default class Endpoint {
  constructor(url, method) {
    this.url = url
    this.status = REQUEST_STATUS.IDLE
    this.fieldErrors = {}
    this.errors = []
    this.method = method
  }

  load() {
    return _query(get)
  }

  save(data) {
    let method = this.method
    console.assert(
      !(method in [HTTP_METHOD.GET, HTTP_METHOD.OPTIONS]),
      "Save on an API endpoint is only allowed with, post, put, or patch http" +
      "methods."
    )
    return this._query(method, data)
  }

  async _query(method, data) {
    let config = {
      url: this.url,
      baseURL: _ROOT_URL,
      method: method,
      data: data,
      ..._AXIOS_CONFIG
    }

    Vue.set(this, 'status', REQUEST_STATUS.LOADING)
    let response = await axios.request(config);

    let status = response.status
    if ((status >= 200 && status < 300)) {
      return response.data
    }

    let responseData = response.data
    for (let key in responseData) {
      Vue.set(this.fieldErrors, key, responseData[key])
    }
    // TODO : manage errors
  }
}

