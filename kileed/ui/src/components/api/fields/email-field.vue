<template>
  <v-text-field
    v-model="childValue"
    :error-messages="errorMessages"
    :label="field.label"
    prepend-icon="mail"
    type="text"
    error-count="3"
    v-bind="fieldProps"
  />
</template>

<script>
import FieldMixin from '@/mixins/api/field'

export default {
  mixins: [FieldMixin]
}
</script>
