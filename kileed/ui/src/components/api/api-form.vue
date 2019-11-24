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
        <slot name="help-text" />
        <div v-for="(field, name) in fields" :key="name">
          <component
            :is="field.type"
            v-model="data[name]"
            :error-messages="errorMessages[name]"
            :field="field"
          />
        </div>
        <v-alert
          v-if="errorDetails"
          outlined
          dense
          type="error"
        >
          {{ errorDetails }}
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
import { ApiError } from '@/utils/api'
import { get } from '@/store/api'
import { login } from '@/store/api'
import { options } from '@/store/api'
import { post } from '@/store/api'

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
      }
    }
  },
  data () {
    return {
      fields: {},
      data: {},
      errorMessages: {},
      loading: false,
      errorDetails: ''
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

    let fields = Object.entries(actions[method])

    let fromQuery = ([, it]) => it.from_query

    let formFields = fields.filter(it => !fromQuery(it))
    let queryFields = fields.filter(it => fromQuery(it))

    formFields = Object.fromEntries(formFields)
    queryFields = Object.fromEntries(queryFields)

    for (let key in queryFields) {
      this.data[key] = this.$route.query[key]
    }

    for (let key in formFields) {
      let value = formFields[key]
      value.type = FieldsComponents[value.type]
    }

    this.fields = formFields
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
      } catch (error) {
        if (!(error instanceof ApiError)) {
          throw error
        }
        this.errorDetails = error.getDetails()
        this.errorMessages = error.getData()
      }

      return false
    },
    ...mapActions({ get, options, login, post })
  }
}
</script>
