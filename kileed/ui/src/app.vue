<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms of
 the Do What The Fuck You Want To Public License, Version 2, as published by
 Sam Hocevar.

 See the COPYING file for more details.

 This is the main Kileed application page.
 -->
<template>
  <v-app>
    <main-menu v-if="isLoggedIn" />
    <v-content>
      <router-view />
      <api-error-snackbar />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import ApiErrorSnackbar from '@/components/api/api-error-snackbar'
import MainMenu from '@/components/menu/main-menu'
import { isLoggedIn } from '@/store/api'

export default {
  name: 'KileedApp',
  components: {
    ApiErrorSnackbar,
    MainMenu
  },
  computed: {
    ...mapGetters({ isLoggedIn })
  }
}
</script>
