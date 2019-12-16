<template>
  <div>
    <slot :object="object" />
  </div>
</template>

<script>
import { REQUEST_STATUS } from 'tovaritch/core-ui/utils/api/common'
import ApiObject from 'tovaritch/core-ui/utils/api/object'
import { query } from 'tovaritch/core-ui/store/api'

import Vue from 'vue'
import { mapActions } from 'vuex'

export default {
  props: {
    url: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true,
      validator: function (value) {
        return value in HTTP_METHOD
      }
    },
    initialData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      object: {
        errors: [],
        fields: {},
        status: REQUEST_STATUS.IDLE,
        save() { this.save() }
      }
    }
  },
  methods: {
    ...mapActions({query}),
    save() {
      let data = {}
      let fields = this.object.fields

      for (let key in fields) {
        let field = fields[key]
        data[key] = field.value
      }

      this.status = REQUEST_STATUS.LOADING
      let result = await this.endpoint.save(data)
      this.status = REQUEST_STATUS.IDLE

      let status = response.status
      if ((status >= 200 && status < 300)) {
        return
      }

      let responseData = response.data

      for (let key in responseData) {
        if ( !(key in fields)) {
          Vue.set(this.object.fields, key, { errors: [] })
        }
        fields[key].errors = responseData[key]
      }
    }
  }
}
</script>

