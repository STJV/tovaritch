<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Button performing an action on the api, displaying a loding animated icon
 and an icon when the action finished.
-->
<template>
  <v-btn @click="onClick">
    <slot />
    <v-progress-circular v-if="isLoading" indeterminate/>
    <v-icon v-if="hasError">highlight_off</v-icon>
    <v-icon v-if="hasSuceeded">check_circle_outline</v-icon>
  </v-btn>
</template>

<script>
import { ApiError } from '@/utils/api'

const Status = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success'
}

export default {
     name: 'ApiActionButton',
  data () {
    return {
      /** Current status */
      status: 'idle'
    }
  },
  props: {
    action: {
      type: Function
    }
  },
  computed: {
    isIdle() { return this.status == Status.IDLE },
    isLoading() { return this.status == Status.LOADING },
    hasError() { return this.status == Status.ERROR },
    hasSuceeded() { return this.status == Status.SUCCESS },
  },
  methods: {
    async onClick() {
      if (!this.action) {
        return
      }
      try {
        this.status = Status.LOADING
        let result = await this.action()
        this.status = result === false ? Status.ERROR : Status.SUCCESS
      } catch(error) {
        this.status = Status.ERROR
        throw error
      }
    }
  }
}
</script>

