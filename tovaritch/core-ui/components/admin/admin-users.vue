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
  }
}
</script>

