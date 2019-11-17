/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 * 
 * Internationalization helpers
 */
import i18n from '@/plugins/i18n'

export function $t (...args) {
  return i18n.t(...args)
}
