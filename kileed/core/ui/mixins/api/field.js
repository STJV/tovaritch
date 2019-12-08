export default {
  inject: ['formContext'],
  props: {
    field: {
      type: String
    }
  },
  data () {
    return {
      context: { errors: {}, data: {} }
    }
  },
  created () {
    this.context = this.formContext
    this.$set(this.context.data, this.field, '')
    this.$set(this.context.errors, this.field, [])
  },
  computed: {
    hasError () {
      return this.errors() && this.errors().length !== 0
    },
    errors () {
      return this.context.errors[this.field]
    },
    value: {
      get () { return this.context.data[this.field] },
      set (newValue) { this.context.data[this.field] = newValue }
    }
  }
}
