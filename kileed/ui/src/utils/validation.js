/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 * 
 * Helpers for form validation
 */
import { $t } from '@/utils/i18n'

/** Returns a lambda that will check if the field is defined.
 * Use it like this :
 * rules [
 *   required('someField')
 * ] 
 * @param {String} fieldName The field to validate
 */
export function required (fieldName) {
  return value => !!value || $t('{field} is required', {
    field: fieldName
  })
}

/** Returns a lambda that will check if the field is defined and is a valid
 * email.
 * Use it like this :
 * rules: [ requiredEmail ('someField') ]
 * @param {String} fieldName The field to validate
 */
export function requiredEmail (fieldName) {
  let msg = $t('{field} is required', {
    field: fieldName
  })
  return (value) => {
    if (!value) {
      return msg
    }

    let pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!pattern.test(value)) {
      return $t('Must be a valid email')
    }

    return true
  }
}
