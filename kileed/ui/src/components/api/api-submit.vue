<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

-->
<template>
  <v-btn type="submit">
    <slot>{{ $t('Submit') }}</slot>
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
  computed: {
    isIdle () { return this.$parent.status === RequestStatus.IDLE },
    isLoading () { return this.$parent.status === RequestStatus.LOADING },
    hasError () { return this.$parent.status === RequestStatus.ERROR },
    hasSuceeded () { return this.$parent.status === RequestStatus.SUCCESS }
  }
}
</script>
