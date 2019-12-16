<template>
    <api-object v-bind="$attrs">
      <template v-slot="api">
        <v-form @submit.prevent="onSubmit(api.object)">
          <v-card title="false"
            :loading="api.object.isLoading"
            class="ma-1">
            <v-card-text>
              <slot :object="api.object" />
              <v-alert
                v-if="api.object.errors.length"
                outlined
                dense
                type="error"
              >
              <div v-for="(error, id) in api.object.errors" :key="id">
                {{ error }}
              </div>
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <slot name="actions">
              <v-spacer />
              <v-btn type="submit">
                {{ $t('Submit') }}
              </v-btn>
            </slot>
          </v-card-actions>
        </v-card>
      </v-form>
    </template>
  </api-object>
</template>

<script>
import ApiObject from 'tovaritch/core-ui/components/api/api-object'

export default {
  components: {
    ApiObject
  },
  methods: {
    async onSubmit(object) {
      if (await object.save()) {
        this.$emit('saved')
      }
    }
  }
}
</script>
