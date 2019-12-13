<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="users"
            item-key="email"
          />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { get } from 'tovaritch/core-ui/store/api'

export default {
  components: {
  },
  data() {
    return {
      users: [],
      headers: [
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
      ]
    }
  },
  async mounted() {
      await this.refresh()
  },
  methods: {
      async refresh() {
          this.users = await this.get({url: '/users/'})
      },
      ...mapActions([ get ])
  }
}
</script>

