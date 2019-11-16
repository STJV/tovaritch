<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 The main application menu
-->
<template>
  <v-app-bar
    dense
    app
  >
    <v-toolbar-title class="headline">
      <span>KILEED</span>
    </v-toolbar-title>
    <v-spacer />
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon v-on="on" />
      </template>
      <v-list dense>
        <v-spacer />
        <logout-menu />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import LogoutMenu from '@/components/auth/logout-menu'

export default {
  name: 'MainMenu',
  components: {
    LogoutMenu
  }
}
</script>
