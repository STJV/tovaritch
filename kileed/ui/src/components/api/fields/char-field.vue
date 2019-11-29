<template>
  <v-text-field
    v-model="childValue"
    v-bind="fieldProps"
    :type="field.vuejs_props.type"
    :label="field.label"
    :error-messages="errorMessages"
    error-count="3"
  />
</template>

<script>
import FieldMixin from '@/mixins/api/field'

export default {
  mixins: [FieldMixin]
}
</script>
