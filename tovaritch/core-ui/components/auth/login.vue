<template>
  <api-form @saved="onSuccess" url="/auth/login/" method="POST">
    <template v-slot="api">
      <api-text-field
        :label="$t('Email')"
        :object="api.object"
        field="email"
        prepend-icon="mail"
      />
      <api-text-field
        :label="$t('Password')"
        :object="api.object"
        field="password"
        prepend-icon="mail"
        type="password"
      />
    </template>

    <template #actions>
      <v-btn :to="{name: 'password-reset'}">
        {{ $t('Forgot your password ?') }}
      </v-btn>
      <v-spacer />
      <v-btn type="submit">
        {{ $t('Login') }}
      </v-btn>
    </template>
  </api-form>
</template>

<script>
import { mapGetters } from 'vuex'

import ApiForm from 'tovaritch/core-ui/components/api/api-form'
import ApiTextField from 'tovaritch/core-ui/components/api/api-text-field'
import { isLoggedIn } from 'tovaritch/core-ui/store/user'

export default {
  components: {
    ApiForm,
    ApiTextField
  },
  computed: {
    ...mapGetters({ isLoggedIn })
  },
  created () {
    if (this.isLoggedIn) {
      this.redirectToNext()
    }
  },
  methods: {
    async onSuccess () {
      this.redirectToNext()
    },

    /** Redirects to the wanted page after login.
     * Either redirects to the url given as ?next=https://somewhere, or pushes
     * a route on the current site if an url parameter nextRoute is given
     * (pushing a route avoids reloading the page). */
    redirectToNext () {
      let next = this.$route.query.next
      let nextRoute = this.$route.query.nextRoute
      let router = this.$router

      if (next) {
        // External url
        window.location.href = next
      } else if (nextRoute) {
        // Vuejs route
        router.push(nextRoute)
      } else {
        // None defined, go to home
        router.push('/')
      }
    }
  }
}
</script>
