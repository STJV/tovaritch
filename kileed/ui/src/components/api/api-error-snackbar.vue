<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Snackbar displaying the last error that occured when querying the API
-->
<template>
  <v-snackbar v-model="isVisible" color="error" :timeout="3000">
    <v-icon>warning</v-icon>
    {{ errorMessage }}
    <v-btn text @click="isVisible = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      /** Snackbar visibility */
      isVisible: false,

      /** Formatted api error message */
      errorMessage: ''
    }
  },
  computed: {
  },
}
</script>
