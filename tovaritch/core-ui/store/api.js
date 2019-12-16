import ApiObject from 'tovaritch/core-ui/utils/api/object'
import ApiEndPoint from 'tovaritch/core-ui/utils/api/endpoint'
import { API_URLS } from 'tovaritch/core-ui/utils/api/urls'
import { HTTP_METHOD } from 'tovaritch/core-ui/utils/api/common'

/** Action : Will try to login
 * @param {String} url The relative api url to query
 * @param {Object} data Data to send to the API
 * @returns {Object} The query result
*/
export const query = 'query'

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

export default {
  actions: {
    async [query] ({ commit }, {url, method, data}) {
      let config = {
        url: this.url,
        baseURL: _ROOT_URL,
        method: method,
        data: data,
        ..._AXIOS_CONFIG
      }

      let response = await axios.request(config);

      let status = response.status
      if ((status >= 200 && status < 300)) {
        return response.data
      }
    }
  }
}

