<template>
  <editable-field @saved="$emit('saved')" v-bind="$attrs" :label="label">
      <template #edit>
        <v-text-field :label="label" :type="type" v-model="value" @input="$emit('input')"/>
      </template>
      <template #value>
          {{ value }}
      </template>
  </editable-field>
</template>

<script>
import EditableField from './editable-field'

export default {
  components: {
    EditableField
  },
  props: {
    value: {
      type: String,
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String
    }
  }
}
</script>

