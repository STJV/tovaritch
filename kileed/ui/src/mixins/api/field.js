/* Copyright © 2019 STJV <contact@stjv.fr>
 * 
 * This work is free. You can redistribute it and/or modify it under the terms
 * of the Do What The Fuck You Want To Public License, Version 2, as published
 * by the comrade Sam Hocevar.
 * 
 * See the COPYING file for more details.
 * 
 * Common mixin for all form input fields
 */

export default {
  props: {
    field: {
      type: Object,
      default: () => {}
    },
    form_data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    fieldValue: {
      get: function () {
        return ''//this.form_data[this.field.name]
      },
      set: function (value) {
        this.form_data[this.field.name] = value
      }
    },
    bindableProps () {
      let result = {}
      for (let key in this.field) {
        if (key === 'style') {
          continue
        }

        result[key] = this.field[key]
      }

      let props = this.field.props
      if (props) {
        for (let key in props) {
          result[key] = props[key]
        }
      }

      return result
    }
  }
}
