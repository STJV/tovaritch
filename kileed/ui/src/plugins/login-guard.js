/* Copyright © 2019 STJV <contact@stjv.fr>
 *
 * This work is free. You can redistribute it and/or modify it under the terms of
 * the Do What The Fuck You Want To Public License, Version 2, as published by
 * Sam Hocevar.
 * 
 * See the COPYING file for more details.
 */
import { isLoggedIn, refreshLogin } from '@/store/api'

// Redirects to login page if the user is not currently logged in
export default function (router, store) {
  router.beforeEach(async (to, from, next) => {
    let matched = to.matched
    if (!(matched.length !== 0 && matched[0].path === '/auth') &&
        !store[isLoggedIn] &&
        !await store.dispatch(refreshLogin)) {
      next({
        name: 'login',
        query: {
          nextRoute: to.path
        }
      })
    } else {
      next()
    }
  })
}
