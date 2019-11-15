<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Snackbar displaying the last error that occured when querying the API
-->
<template>
  <v-snackbar color="error" v-model="isVisible" timeout="3000">
      <v-icon>warning</v-icon>
      {{errorMessage}}
      <v-btn text @click="isVisible = false">
        <v-icon>close</v-icon>
      </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import { Getter as ApiGetter } from '@/store/api'
import { Mutation as ApiMutation } from '@/store/api'

export default {
  data() {
    return {
      /** Snackbar visibility */
      isVisible: false,

      /** Formatted api error message */
      errorMessage: ''
    }
  },
  watch: {
    /** Watch for the store's api error message */
    [ApiGetter.LAST_ERROR](value) {
      if(!value) {
        message = ''
        return
      }

      let status = value.getStatus()
      let statusText = value.getStatusText()
      let message = `API Error : ${status} (${statusText})`
      
      let details = value.getDetails()
      if(details) {
        message = ` ${message} : ${details}`
      }
      
      this.errorMessage = message
      this.isVisible = true
    }
  },
  computed: {
    ...mapGetters([
      ApiGetter.LAST_ERROR
    ])
  }
}
</script>

