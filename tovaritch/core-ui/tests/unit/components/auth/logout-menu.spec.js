import { mount } from 'tovaritch/core-ui/tests/common/helpers'
import LogoutMenu from 'tovaritch/core-ui/components/auth/logout-menu'

describe('logout-menu component', () => {
  let logout, push, wrapper
  beforeEach(() => {
    logout = jest.fn()
    push = jest.fn()
    wrapper = mount(LogoutMenu, {
      store: {
        actions: { logout: logout }
      },
      mocks: {
        $route: { path: 'current-route' },
        $router: { push: push }
      }
    })
  })

  it('Logouts and redirect on click', async () => {
    await wrapper.click('#logout-menu')
    expect(logout.mock.calls.length).toBe(1)
    expect(push.mock.calls[0][0]).toMatchObject({
      name: 'login',
      query: {
        nextRoute: 'current-route'
      }
    })
  })
})
