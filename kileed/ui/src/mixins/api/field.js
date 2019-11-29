export default {
  props: {
    field: {
      type: Object,
      default: () => {}
    },
    'error-messages': {
      type: Array,
      default: () => []
    },
    value: {
      default: () => undefined
    }
  },
  data: () => ({
    childValue: undefined
  }),
  computed: {
    error () {
      return this.errorMessages.length !== 0
    },
    fieldProps () {
      return this.field.vuejs_props
    }
  },
  watch: {
    childValue (value) {
      this.$emit('input', value)
    },
    value (value) {
      this.childValue = value
    }
  }
}
