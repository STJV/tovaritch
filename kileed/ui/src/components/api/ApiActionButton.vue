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
    <v-progress-circular v-if="isLoading" indeterminate />
    <v-icon v-if="hasError">
      highlight_off
    </v-icon>
    <v-icon v-if="hasSuceeded">
      check_circle_outline
    </v-icon>
  </v-btn>
</template>

<script>
import { RequestStatus } from '@/utils/api'

export default {
  name: 'ApiActionButton',
  props: {
    action: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      /** Current status */
      status: RequestStatus.NONE
    }
  },
  computed: {
    isIdle () { return this.status === RequestStatus.IDLE },
    isLoading () { return this.status === RequestStatus.LOADING },
    hasError () { return this.status === RequestStatus.ERROR },
    hasSuceeded () { return this.status === RequestStatus.SUCCESS }
  },
  methods: {
    async onClick () {
      if (!this.action) {
        return
      }
      try {
        this.status = RequestStatus.LOADING
        let result = await this.action()
        if (result === false) {
          this.status = RequestStatus.ERROR
        } else {
          this.status = RequestStatus.SUCCESS
        }
      } catch (error) {
        this.status = RequestStatus.ERROR
        throw error
      }
    }
  }
}
</script>
