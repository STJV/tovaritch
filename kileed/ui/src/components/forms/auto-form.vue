<!-- Copyright © 2019 STJV <contact@stjv.fr>

 This work is free. You can redistribute it and/or modify it under the terms
 of the Do What The Fuck You Want To Public License, Version 2, as published
 by the comrade Sam Hocevar.

 See the COPYING file for more details.

 Auto-generated form based on the return of the option HTTP command on views
-->
<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-container>
          <v-form>
            <component :is="test" />
            <div v-for="field in fields" :key="field.name">
              <component :is="field.type" />
            </div>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn>
          {{ $t('Send password reset email') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { Action as ApiAction } from '@/store/api'
import EmailField from '@/components/common/email-field'
import PasswordField from '@/components/common/password-field'

const ComponentTypes = {
  email: EmailField,
  password: PasswordField,
  string: PasswordField
}

export default {
  components: {
    PasswordField
  },
  props: {
    endpoint: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: 'post'
    }
  },
  data() {
    return {
      fields: {},
      test: EmailField,
      instance: {
      }
    }
  },
  methods: {
    ...mapActions({
      get: ApiAction.GET,
      post: ApiAction.POST,
      options: ApiAction.OPTIONS
    })
  },
  async mounted() {
    let options = await this.options({ url:this.endpoint })
    let actions = options.data.actions
    let method = this.method.toUpperCase()

    if (! (method in actions) ) {
      return
    }

    let newFields = []
    let fields = actions[method]
    for (name in fields){
      let field = fields[name]
      field.type = ComponentTypes[field.type]
      field.name = name
      newFields.push(field)
    }
    this.fields = newFields
  }
}
</script>

