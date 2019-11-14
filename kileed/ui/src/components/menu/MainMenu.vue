<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <v-app-bar-nav-icon v-on="on" />
    </template>
    <v-list dense>
      <v-list-item
        link
        :to="{path: 'users'}"
      >
        <v-list-item-icon>
          <v-icon>logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title :to="{path: 'users'}">
            Logout
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-spacer />
      <logout />
    </v-list>
  </v-menu>
</template>

<script>
import Logout from './items/Logout'

export default {
  name: 'MainMenu',
  components: {
    Logout
  },
  data () {
    return {
      drawer: true
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
