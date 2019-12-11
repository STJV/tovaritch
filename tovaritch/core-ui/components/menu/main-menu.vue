<template>
  <v-app-bar
    dense
    app
  >
    <v-toolbar-title class="headline">
      <span>TOVARICH</span>
    </v-toolbar-title>
    <v-spacer />
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon v-on="on" />
      </template>
      <v-list dense>
        <v-list-item :to="{name: 'profile' }">
          <v-list-item-icon>
            <v-icon>account_circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('Profile') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-spacer />
        <logout-menu />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import LogoutMenu from 'tovaritch/core-ui/components/auth/logout-menu'

export default {
  name: 'MainMenu',
  components: {
    LogoutMenu
  }
}
</script>
