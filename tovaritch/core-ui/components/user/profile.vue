<template>
  <api-form endpoint="/auth/user/" method="put">
    <template #actions>
      <v-btn type="submit">
        {{ $t('Save') }}
      </v-btn>
    </template>
  </api-form>
</template>

<script>
import { mapGetters } from 'vuex'

import ApiForm from 'tovaritch/core-ui/components/api/form'
import { isLoggedIn } from 'tovaritch/core-ui/store/api'

export default {
  components: {
    ApiForm
  },
  computed: {
    ...mapGetters({ isLoggedIn })
  },
  methods: {
  }
}
</script>
