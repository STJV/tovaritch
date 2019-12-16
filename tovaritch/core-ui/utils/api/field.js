import { REQUEST_STATUS } from 'tovaritch/core-ui/utils/api/common'

/** Model af an ApiObject field. */
export default class ApiField {
  constructor(endpoint, name, value) {
    this.endpoint = endpoint
    this.name = name
    this.status = REQUEST_STATUS.IDLE
    this.value = value
    this.endpoint.fieldErrors[this.name] = []
  }

  errors() {
    return this.endpoint.fieldErrors[this.name]
  }

  async save() {
    let endpoint = this.endpoint
    console.assert(
      endpoint.method === patch,
      "Save single field is only allowed with http patch method."
    )
    this.status = REQUEST_STATUS.LOADING
    await endpoint.save({ [this.name]: this.value })
    this.status = REQUEST_STATUS.IDLE
  }
}
