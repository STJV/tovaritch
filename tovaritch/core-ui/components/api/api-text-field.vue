<template>
  <api-field :object="object" :name="field" v-slot="field">
    <v-text-field
      outlined
      :id="field.name"
      v-model="field.value"
      :error-messages="field.errors"
      :label="label"
    />
  </api-field>
</template>

<script>
import ApiField from 'tovaritch/core-ui/components/api/api-field'

export default {
  components: {
    ApiField
  },
  props: {
    object: {
      type: Object,
    },
    field: {
      type: String,
    },
    label: {
      type: String,
    }
  }
}
</script>
