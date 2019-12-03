<template>
  <v-text-field
    v-model="value"
    :error-messages="errors"
    :label="label"
    :prepend-icon="icon"
    :type="type"
    error-count="3"
  />
</template>

<script>
import ApiFieldMixin from '@/mixins/api/field'

export default {
  mixins: [ApiFieldMixin],
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>
