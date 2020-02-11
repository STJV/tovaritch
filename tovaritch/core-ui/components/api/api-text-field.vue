<template>
  <api-field :object="object" :name="field" v-slot="slot">
    <v-text-field
      v-model="slot.field.value"
      :id="slot.field.name"
      outlined
      :error-messages="slot.field.errors"
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
