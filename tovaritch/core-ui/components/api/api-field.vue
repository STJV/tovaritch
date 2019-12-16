<template>
  <div>
    <slot :value="field.value" :errors="field.errors" :status="status" />
  </div>
</template>

<script>
import Vue from 'vue'

import ApiObject from 'tovaritch/core-ui/utils/api/object'
import { REQUEST_STATUS } from 'tovaritch/core-ui/utils/api/common'

export default {
  props: {
    object: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      field: {
        errors: [],
        value: undefined,
      },
      status: REQUEST_STATUS.IDLE
    }
  },
  watch: {
    object: 'refreshObject',
    name: 'refreshObject',
  },
  created() {
    this.refreshObject()
  },
  methods: {
    refreshObject() {
      let object = this.object
      let name = this.name
      if (name in object) {
        this.field = object.field
      }
      else {
        Vue.set(this.object, this.name, this.field)
      }
    }
  }
}
</script>
