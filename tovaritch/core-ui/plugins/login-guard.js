import { isLoggedIn, login } from 'tovaritch/core-ui/store/user'

// Redirects to login page if the user is not currently logged in
export default function (router, store) {
  router.beforeEach(async (to, from, next) => {
    let matched = to.matched
    if (!(matched.length !== 0 && matched[0].path === '/auth') &&
        !store[isLoggedIn] &&
        !await store.dispatch(login)) {
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
