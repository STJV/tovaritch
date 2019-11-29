<!--
  Copyright © 2019 STJV <contact@stjv.fr>

  This work is free. You can redistribute it and/or modify it under the terms
  of the Do What The Fuck You Want To Public License, Version 2, as published
  by the comrade Sam Hocevar.

  See the COPYING file for more details.
-->
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

import ApiForm from '@/components/api/api-form'
import { isLoggedIn } from '@/store/api'

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
