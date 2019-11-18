<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Text field with validation
-->
<template>
  <v-text-field
    v-model="childValue"
    :label="$t('Password')"
    :rules="rules"
    prepend-icon="lock"
    required
    type="password"
  />
</template>

<script>
import { $t } from '@/utils/i18n'

export default {
  props: {
    label: {
      type: String,
      default: $t('Password')
    },
    required: {
      type: Boolean,
      default: true
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
    rules() {
      let result = []
      if(this.required) {
        result.push(value => !!value || $t('Field is required'))
      }

      return result
    } 
  },
  watch: {
    childValue(value) {
      this.$emit('input', value);
    }
  }
}
</script>
