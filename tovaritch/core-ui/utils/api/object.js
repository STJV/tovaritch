import ApiField from 'tovaritch/core-ui/utils/api/field'
import ApiEndPoint from 'tovaritch/core-ui/utils/api/endpoint'
import { REQUEST_STATUS } from 'tovaritch/core-ui/utils/api/common'
import { HTTP_METHOD } from './common'

export default class ApiObject {
  constructor(url, method, initialData) {
    this.endpoint = new ApiEndPoint(url, method)
    this.fields = {}
    this.status = REQUEST_STATUS.IDLE
    this.method = method

    if (initialData != undefined) {
      for (key in initialData) {
        let field = this.getField(key)
        field.value = initialData[key]
      }
    }
  }

  errors() {
    return this.endpoint.errors
  }

  getField(name) {
    let fields = this.fields
    if (!(name in fields)) {
      fields[name] = new ApiField(this.endpoint, name)
    }

    return fields[name]
  }

  async load() {
    let method = this.method

    if (method == HTTP_METHOD.PUT || method == HTTP_METHOD.PATCH || method == HTTP_METHOD.GET) {
      this.status = REQUEST_STATUS.LOADING
      let data = await this.endpoint.load()
      this.status = REQUEST_STATUS.IDLE

      for (let key in data) {
        let field = this.getField(key)
        field.value = data[key]
      }

      return true
    }
  }

  async save() {
    let data = {}
    let fields = this.fields
    for (let key in fields) {
      let field = fields[key]
      data[key] = field.value
    }
    this.status = REQUEST_STATUS.LOADING
    let result = await this.endpoint.save(data)
    this.status = REQUEST_STATUS.IDLE
    return true
  }
}