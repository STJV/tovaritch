<template>
  <v-list-item @click="logout()">
    <v-list-item-icon>
        <v-icon>logout</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>Logout</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex';
import { Action as ApiAction } from '../../../store/api'

export default {
  components: {
  },
  inject: ['router'],
  methods: {
    ...mapActions({
      logout: ApiAction.LOGOUT
    })
  }
}
</script>