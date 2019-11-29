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
