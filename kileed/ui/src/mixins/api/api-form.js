import { mapActions } from 'vuex'

import { ApiError } from '@/utils/api'
import { get, login, options, patch, post, put } from '@/store/api'

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
        return value in { get, login, patch, post, put }
      }
    }
  },
  data () {
    return {
      data: {},
      error: '',
      fieldErrors: {},
      loading: false
    }
  },
  methods: {
    async submit (event) {
      if (!event.target.validate()) {
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
        this.error = error.getDetails()
        this.fieldErrors = error.getData()
      }

      return false
    },
    ...mapActions({ get, options, login, patch, put, post })
  }
}
