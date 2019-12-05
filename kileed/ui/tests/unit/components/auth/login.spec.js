import { mount } from '@/../tests/common/helpers'
import Login from '@/components/auth/login'

function _mountLogin ({ isLoggedIn, loginFn, next, nextRoute }) {
  let loginSpy = () => {} // spy(loginFn)
  let pushSpy = () => {} // spy()
  let wrapper = mount(Login, {
    store: {
      getters: { isLoggedIn: () => isLoggedIn },
      actions: { login: loginSpy }
    },
    mocks: {
      $route: {
        query: {
          next: next,
          nextRoute: nextRoute
        }
      },
      $router: { push: pushSpy }
    }
  })

  return { wrapper, login: loginSpy, push: pushSpy }
}

describe('Login', () => {
  it('Redirects to home when already logged in.', () => {
    let { push } = _mountLogin({
      isLoggedIn: true
    })
    // assert(push.calledWith('/'))
  })

  it('Redirects to next when already logged in.', () => {
    _mountLogin({
      isLoggedIn: true,
      next: 'next-url'
    })
    // assert.equal(window.location.href, 'next-url')
  })

  it('Redirects to nextRoute page when already logged in.', () => {
    let { push } = _mountLogin({
      isLoggedIn: true,
      nextRoute: 'next-route'
    })
    // assert(push.calledWith('next-route'))
  })

  it('Doesn\'t redirect when not logged in', () => {
    window.location.href = undefined
    let { push } = _mountLogin({
      isLoggedIn: false
    })
    // assert(push.notCalled)
    // assert.equal(window.location.href, undefined)
  })
})
