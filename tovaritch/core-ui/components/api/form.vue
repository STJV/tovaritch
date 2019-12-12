<template>
  <v-form @submit.prevent="submit">
    <v-card title="false" :loading="loading" class="ma-1">
      <v-card-text>
        <slot />
        <v-alert
          v-if="errors.length"
          outlined
          dense
          type="error"
        >
          <div v-for="(error, id) in errors" :key="id">
            {{ error }}
          </div>
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

import { ApiError } from 'tovaritch/core-ui/utils/api'
import { get, login, options, patch, post, put } from 'tovaritch/core-ui/store/api'

export default {
  provide () {
    return {
      formContext: this.context
    }
  },
  props: {
    endpoint: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: post,
      validator: function (value) {
        return value in { get, login, patch, post, put }
      }
    },
    hiddenData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      context: {
        errors: {},
        data: { }
      },
      loading: false,
      errors: []
    }
  },
  async created() {
    if(this.method == put || this.method == patch && this.endpoint) {
      this.context.data = await this.get({url: this.endpoint})
    }
  },
  methods: {
    async submit () {
      this._clearErrors()

      let data = {
        ...this.hiddenData,
        ...this.context.data
      }

      try {
        let result = await this[this.method]({
          url: this.endpoint,
          data: data
        })

        this.$emit('success', result)
      } catch (error) {
        if (!(error instanceof ApiError)) {
          throw error
        }
        this._handleError(error)
      }

      return false
    },
    _clearErrors () {
      this.errors = []
      let fieldErrors = this.context.errors
      for (let field in fieldErrors) {
        fieldErrors[field] = []
      }
    },
    _handleError (error) {
      // Copy per-field errors
      let newErrors = error.getData()
      let fieldErrors = this.context.errors
      let hasFieldErrors = false
      for (let field in fieldErrors) {
        if (newErrors[field]) {
          hasFieldErrors = true
        }
        fieldErrors[field] = newErrors[field]
      }

      // Add global errors
      let errors = this.errors
      let details = error.getDetails()
      if (details) {
        errors.push(details)
      }

      if (newErrors.non_field_errors) {
        this.errors.push(...newErrors.non_field_errors)
      }

      // If no error is found, use the http status text as error description
      if (errors.length === 0 && !hasFieldErrors) {
        errors.push(error.getStatusText())
      }
    },
    ...mapActions({ get, options, login, patch, put, post })
  }
}
</script>
