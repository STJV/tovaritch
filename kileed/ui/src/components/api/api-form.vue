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
            <div v-for="(field, name) in fields" :key="name">
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

const FieldsComponents = {
  email: EmailField,
  password: PasswordField,
  string: EmailField
}

function normalizeField (field) {
  field.type = FieldsComponents[field.type]
}

export default {
  components: {
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
  data () {
    return {
      fields: {},
      instance: {
      }
    }
  },
  async mounted () {
    let options = await this.options({ url: this.endpoint })
    let actions = options.data.actions
    let method = this.method.toUpperCase()

    if (!(method in actions)) {
      return
    }

    let fields = actions[method]
    for (let it in fields) {
      normalizeField(fields[it])
    }
    this.fields = fields
  },
  methods: {
    ...mapActions({
      get: ApiAction.GET,
      post: ApiAction.POST,
      options: ApiAction.OPTIONS
    })
  }
}
</script>
