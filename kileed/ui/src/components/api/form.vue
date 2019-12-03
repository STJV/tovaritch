<template>
  <v-form @submit.prevent="submit">
    <v-card title="false" :loading="loading">
      <v-card-text>
        <slot name="help" />
        <slot />
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

import { ApiError } from '@/utils/api'
import { get, login, options, patch, post, put } from '@/store/api'

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
    }
  },
  data () {
    return {
      context: {
        errors: {},
        data: { }
      },
      loading: false,
      error: ''
    }
  },
  methods: {
    async submit () {
      try {
        let result = await this[this.method]({
          url: this.endpoint,
          data: this.context.data
        })

        this.$emit('success', result)
      } catch (error) {
        if (!(error instanceof ApiError)) {
          throw error
        }

        let newErrors = error.getData()
        let errors = this.context.errors
        for (let field in newErrors) {
          errors[field] = newErrors[field]
        }

        this.error = error.getDetails()

        if (!errors && !this.error) {
          this.error = error.getStatusText()
        }
      }

      return false
    },
    ...mapActions({ get, options, login, patch, put, post })
  }
}
</script>
