<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Email input field
-->
<template>
  <v-text-field
    v-model="childValue"
    v-bind="field"
    :rules="rules"
    prepend-icon="mail"
    type="text"
    validate-on-blur
  />
</template>

<script>
import { $t } from '@/utils/i18n'

const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
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
    rules () {
      let result = []
      if (this.field.required) {
        result.push(value => !!value || $t('Field is required'))
      }

      result.push(value => {
        return EMAIL_PATTERN.test(value) || $t('Field must be a valid email')
      })

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
