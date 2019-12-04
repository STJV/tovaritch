import { mount } from '@vue/test-utils'
import ApiForm from '@/components/api/form'
import { assert } from 'assert'

describe('ApiForm', () => {
  const wrapper = mount(ApiForm)
  wrapper.endpoint = 'dummy_endpoint'

  it('Sends request on submit', () => {
    wrapper.find('button').click()
    let error = wrapper.find('v-alert').text()
    assert.match(error, /^Not Found/)
  })
})
