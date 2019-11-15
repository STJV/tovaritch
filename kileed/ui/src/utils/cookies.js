/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */

/** Retrieves the value of a cookie by name.
 * @param {String} name The name of the cookie to get
 * @return {String} The value of the cookie, or null if not found
 */
export function getCookie (name) {
  if (!document.cookie) {
    return null
  }

  const results = document.cookie.split(';')
    .map(it => it.trim())
    .filter(it => it.startsWith(name + '='))

  if (results.length === 0) {
    return null
  }

  let value = results[0].split('=')[1]

  return decodeURIComponent(value)
}
