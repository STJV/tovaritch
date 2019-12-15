<template>
  <div v-bind:class="classes">
    <v-menu v-model="editing" top>
      <template v-slot:activator="{ on }">
        <fieldset v-bind:class="errorClass" v-on="on">
          <legend> {{ label }}</legend>
          <div class="editable-field-value">
            <slot name="value" />
          </div>
          <v-spacer />
          <div class="status-feedback">
              <v-progress-circular
                v-if="status === 'loading'"
                indeterminate color="success"
              />
              <v-icon
                color="error"
                v-if="status === 'error'">
                error_outline
              </v-icon>
              <v-icon
                color="success"
                v-if="status === 'success'"
              >
                check
              </v-icon>
          </div>
        </fieldset>
        <div role="alert" class="error--text">
          <slot name="errors">
            <v-messages v-model="errors" />
          </slot>
        </div>
      </template>
      <v-container>
        <v-col>
          <slot name="edit">
          </slot>
          <v-btn @click='onSave'>
            <v-icon>check</v-icon>
          </v-btn>
        </v-col>
      </v-container>
    </v-menu>
  </div>
</template>

<script>
import Themeable from 'vuetify/lib/mixins/themeable'

export default {
  mixins: [Themeable],
  name: 'editable-field',
  props: {
    label: {
      type: String,
    },
    status: {
      type: String,
      default: 'none',
       validator: function (value) {
        return ['none', 'loading', 'error', 'success'].indexOf(value) !== -1
      }
    },
    errors: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      editing: false
    }
  },
  computed: {
    classes() {
      return [
        this.name,
        this.themeClasses
      ]
    }
  },
  methods: {
    onSave() {
      this.editing = false
      this.$emit('saved')
    },
    onFocus(args) {
      //this.editing = true
    }
  }
}
</script>

<style lang="sass">
+theme(editable-field) using($material)
  & v-menu
    background-color: map-get($material-dark, 'cards')

  & .editable-field-value
    color: map-deep-get($material, 'text', 'primary')
    margin-left: 5px

  & fieldset
    border-color: currentColor
    border-radius: $border-radius-root
    border-style: solid
    border-width: $btn-outline-border-width
    cursor: pointer
    display: flex
    padding: 5px
    vertical-align: middle

  & .value
    margin-bottom: 7px
    margin-left: 5px

  & .v-messages
    color: currentColor
    margin-top: 5px
    padding-left: 10px

  & legend
    font-size: 80%
    padding-left: 4px
    padding-right: 4px

</style>