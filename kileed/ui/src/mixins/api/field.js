/* Copyright © 2019 STJV <contact@stjv.fr>
 * 
 * This work is free. You can redistribute it and/or modify it under the terms
 * of the Do What The Fuck You Want To Public License, Version 2, as published
 * by the comrade Sam Hocevar.
 * 
 * See the COPYING file for more details.
 * 
 * Common mixin for all form input fields
 */

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
    }
  }
}
