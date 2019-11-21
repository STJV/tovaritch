<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Auto-generated form based on the return of the option HTTP command on views
-->
<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-card title="false" :loading="loading">
      <v-card-text>
        <div v-for="(field, name) in fields" :key="name">
          <component
            :is="field.type"
            v-model="data[name]"
            :field="field"
          />
        </div>
        <v-alert
          v-if="error"
          outlined
          dense
          type="error"
        >
          {{ error }}
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <slot name="actions">
          <v-spacer />
          <v-btn type="submit">
            {{ $t('Submit') }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

import EmailField from '@/components/api/fields/email-field'
import PasswordField from '@/components/api/fields/char-field'
import { get } from '@/store/api'
import { options } from '@/store/api'
import { post } from '@/store/api'
import { login } from '@/store/api'

const FieldsComponents = {
  EmailField: EmailField,
  CharField: PasswordField
}

export default {
  props: {
    endpoint: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: post,
      validator: function (value) {
        return value in { get, login, post }
      },
    }
  },
  data () {
    return {
      fields: {},
      data: {},
      loading: false,
      error: ''
    }
  },
  async mounted () {
    let result = await this.options({ url: this.endpoint })
    let actions = result.actions

    // TODO : Clean this
    let method = this.method

    if (method === login) {
      method = post
    }

    method = method.toUpperCase()

    if (!(method in actions)) {
      return
    }

    let fields = actions[method]

    for (let it in fields) {
      let field = fields[it]
      field.type = FieldsComponents[field.type]
    }
    this.fields = fields
  },
  methods: {
    async submit () {
      if (!this.$refs.form.validate()) {
        return false
      }

      try {
        let result = await this[this.method]({
          url: this.endpoint,
          data: this.data
        })
        this.$emit('success', result)
      } catch(error) {
        if(!(error instanceof ApiError) || !error.getDetails()) {
          throw error
        }
        this.errorDetails = error.getDetails()
      }

      return false
    },
    ...mapActions( { get, options, login, post })
  }
}
</script>
