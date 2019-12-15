<template>
  <editable-field
    @save="onSave"
    v-bind="$attrs"
    :label="label"
   >
      <template #edit>
          <v-text-field
            class="elevation-10"
            :autofocus="true"
            :type="type"
            @focus="onFocus"
            dense
            hide-details
            ref="textField"
            solo
            outlined
            v-model="editedValue"
          />
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
  },
  data() {
    return {
      editedValue: undefined
    }
  },
  watch: {
    value(val) {
      this.editedValue = val
    }
  },
  mounted() {
    this.editedValue = this.value
  },
  methods: {
    async onFocus() {
        let textField = this.$refs.textField
        let input = textField.$el.querySelector('input')
        input.select()
    },
    async onEdit() {
    },
    async onSave(event) {
      this.$emit('save', this.editedValue)
    }
  }
}
</script>
