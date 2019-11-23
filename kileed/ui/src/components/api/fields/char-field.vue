<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Text field, to be used with api OPTIONS metadata
-->
<template>
  <v-text-field
    v-model="childValue"
    v-bind="bindable"
    :rules="rules"
    required
  />
</template>

<script>
import { $t } from '@/utils/i18n'

export default {
  props: {
    field: {
      type: Object,
      default: () => {}
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      childValue: this.value
    }
  },
  computed: {
    bindable () {
      let result = {}
      for (let key in this.field) {
        if (key === 'style') {
          continue
        }

        result[key] = this.field[key]
      }

      let props = this.field.props
      if (props) {
        for (let key in props) {
          result[key] = props[key]
        }
      }

      return result
    },
    rules () {
      let result = []
      if (this.field.required) {
        result.push(value => !!value || $t('Field is required'))
      }

      return result
    } 
  },
  watch: {
    childValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
