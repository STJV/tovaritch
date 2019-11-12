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
export default {
  components: {
  },
  inject: ['router'],
  methods: {
    logout () {
      this.$emit('logout')
      this.router.push('/login')
    }
  }
}
</script>