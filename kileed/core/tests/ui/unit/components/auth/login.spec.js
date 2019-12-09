import { mount } from '@/../tests/common/helpers'
import Login from '@/components/auth/login'
import { ApiError } from '@/utils/api'

function _mountLogin ({ isLoggedIn, next, nextRoute }) {
  let loginSpy = jest.fn()
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
  it('Redirect to home when already logged in', () => {
    let { push } = _mountLogin({
      isLoggedIn: true
    })
    expect(push.mock.calls[0][0]).toBe('/')
  })

  it('Redirect to next when already logged in', () => {
    _mountLogin({
      isLoggedIn: true,
      next: 'next-url'
    })
    expect(window.location.href).toBe('next-url')
  })

  it('Redirect to nextRoute when already logged in', () => {
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

  it('Submit correctly and redirect on login success', async () => {
    let { wrapper, login, push } = _mountLogin({
      isLoggedIn: false,
      nextRoute: 'next-route'
    })

    wrapper.type('test_email', 'input[id=email]')
    wrapper.type('test_password', 'input[id=password]')
    await wrapper.submit('form')

    expect(push.mock.calls.length).toBe(1)
    expect(login.mock.calls[0][1]).toMatchObject({
      url: '/auth/login/',
      data: { email: 'test_email', password: 'test_password' }
    })
    expect(push.mock.calls[0][0]).toBe('next-route')
  })

  it('Doesn\'t redirect on login failure', async () => {
    let { wrapper, login, push } = _mountLogin({
      isLoggedIn: false
    })
    login.mockRejectedValue(new ApiError({ data: {} }))
    await wrapper.submit('form')
    expect(push.mock.calls.length).toBe(0)
  })
})
