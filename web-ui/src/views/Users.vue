<!--
  Copyright © 2019 STJV <contact@stjv.fr>

  This work is free. You can redistribute it and/or modify it under the terms
  of the Do What The Fuck You Want To Public License, Version 2, as published
  by the comrade Sam Hocevar.

  See the COPYING file for more details.
-->
<template>
  <v-list dense>
    <v-subheader>Users</v-subheader>
    <v-list-item v-for="(it, id) in users" :key="id">
        <v-list-item-avatar >
          <v-img :src="it.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>it.email</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Users',
  data: () => ({
    users: {},
    loading: false
  }),
  methods: {
    mounted () {
      api.get('users').then(response => (this.users = response))
    }
  }
}
</script>
