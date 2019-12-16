<template>
  <div>
    <slot :object="object" />
  </div>
</template>

<script>
import { HTTP_METHOD } from 'tovaritch/core-ui/utils/api/common'
import ApiObject from 'tovaritch/core-ui/utils/api/object'
import Vue from 'vue'

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
  computed: {
    object() {
      return new ApiObject(this.url, this.method, this.initialData)
    }
  }
}
</script>
