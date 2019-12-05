import { mount } from '@/../tests/common/helpers'
import Login from '@/components/auth/login'

function _mountLogin ({ isLoggedIn, loginFn, next, nextRoute }) {
  let loginSpy = jest.fn(loginFn)
  let pushSpy = jest.fn()
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

describe('login component', () => {
  it('Redirects to home when already logged in.', () => {
    let { push } = _mountLogin({
      isLoggedIn: true
    })
    expect(push.mock.calls[0][0]).toBe('/')
  })

  it('Redirects to next when already logged in.', () => {
    _mountLogin({
      isLoggedIn: true,
      next: 'next-url'
    })
    expect(window.location.href).toBe('next-url')
  })

  it('Redirects to nextRoute page when already logged in.', () => {
    let { push } = _mountLogin({
      isLoggedIn: true,
      nextRoute: 'next-route'
    })
    expect(push.mock.calls[0][0]).toBe('next-route')
  })

  it('Doesn\'t redirect when not logged in', () => {
    window.location.href = undefined
    let { push } = _mountLogin({
      isLoggedIn: false
    })
    expect(push.mock.calls.length).toBe(0)
    expect(window.location.href).toBeUndefined()
  })
})
