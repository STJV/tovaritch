<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Auto-generated form based on the return of the option HTTP command on views
-->
<template>
  <v-form ref="form" v-model="isValid" @submit.prevent="submit">
    <v-card title="false" :loading="loading">
      <v-card-text>
        <v-container>
          <div v-for="(field, name) in fields" :key="name">
            <component
              :is="field.type"
              v-model="data[name]"
              :field="field"
            />
          </div>
        </v-container>
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
import EmailField from '@/components/api/fields/email-field'
import PasswordField from '@/components/api/fields/char-field'
import { Action as ApiAction } from '@/store/api'
import { mapActions } from 'vuex'

const FieldsComponents = {
  EmailField: EmailField,
  CharField: PasswordField
}

export const Provide = {
  REQUEST_STATUS: 'requestStatus'
}

function normalizeField (field) {
  field.type = FieldsComponents[field.type]
}

export default {
  props: {
    endpoint: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: 'post'
    },
    ignoreFields: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      fields: {},
      data: {},
      isValid: false,
      loading: false
    }
  },
  async mounted () {
    let options = await this.options({ url: this.endpoint })
    let actions = options.data.actions
    let method = this.method.toUpperCase()

    if (!(method in actions)) {
      return
    }

    let fields = actions[method]
    let newFields = {}

    for (let it in fields) {
      if (this.ignoreFields.includes(it)) {
        continue
      }

      let field = fields[it]
      normalizeField(field)
      newFields[it] = field
    }
    this.fields = newFields
  },
  methods: {
    async submit () {
      this.$refs.form.validate()

      if (!this.isValid) {
        return false
      }

      this.loading = true
      let result = await this[this.method]({
        url: this.endpoint,
        data: this.data
      })
      this.loading = false

      this.$emit('success', result)
      return false
    },
    ...mapActions({
      get: ApiAction.GET,
      post: ApiAction.POST,
      options: ApiAction.OPTIONS
    })
  }
}
</script>
