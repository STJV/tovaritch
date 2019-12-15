<template>
  <div v-bind:class="classes" tabindex="0" @focus="onEdit">
    <fieldset v-bind:class="classes">
      <legend> {{ label }}</legend>
      <div class="value">
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
    <div
      ref="editElement"
      class="edit"
      v-if="editing"
      @focusout="save"
      @keyup.enter="save">
      <slot name="edit">
      </slot>
    </div>
      <div role="alert" class="error--text">
        <slot name="errors">
          <v-messages v-model="errors" />
        </slot>
      </div>
  </div>
</template>

<script>
import Themeable from 'vuetify/lib/mixins/themeable'
import { focus } from 'vue-focus'

export default {
  mixins: [Themeable],
  directives: { focus },
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
        'editable-field',
        this.themeClasses,
        ...(this.status =='error' ? ['error--text'] : [])
      ]
    },
    editClasses() {
      return [
        'editable-field-edit',
        this.themeClasses,
      ]
    }
  },
  methods: {
    save() {
      this.editing = false
      if (this.editing) {
        this.$emit('save')
      }
    },
    onEdit(args) {
      this.$emit('edit')
      this.editing = true
    }
  }
}
</script>

<style lang="sass">
+theme(editable-field) using($material)
  position: relative
  & .v-messages
    color: currentColor
    margin-top: 5px
    padding-left: 10px

  & .value
    color: map-deep-get($material, 'text', 'primary')
    margin-bottom: 7px
    margin-left: 5px
    margin-left: 5px

  & .edit
    background-color: map-get($material, 'cards')
    position: absolute
    top: 15px
    left: 10px
    right: 10px
    z-index: 1

  & legend
    font-size: 80%
    padding-left: 4px
    padding-right: 4px

  & fieldset
    border-color: currentColor
    border-radius: $border-radius-root
    border-style: solid
    border-width: $btn-outline-border-width
    cursor: pointer
    display: flex
    padding: 5px
    vertical-align: middle

</style>