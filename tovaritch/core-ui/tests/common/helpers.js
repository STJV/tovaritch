import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount as baseMount } from '@vue/test-utils'

// Patches because vue unit tests sucks
global.requestAnimationFrame = (cb) => cb()

global.window = Object.create(window)
Object.defineProperty(window, 'location', {
  value: {
    href: undefined
  }
})

/* Using global vue instance instead of localVue because of
 * https://github.com/vuetifyjs/vuetify/issues/4068. We should switch back
 * to localVue when this is fixed.
 */
Vue.use(Vuetify)
Vue.use(Vuex)

export function mount (component, { store, mocks }) {
  store = new Vuex.Store(store)

  let wrapper = baseMount(component, {
    mocks: {
      $store: store,
      $t: key => key,
      ...mocks
    },
    stubs: ['router-link', 'router-view'],
    sync: false
  })

  Object.assign(wrapper, {
    type (text, selector) {
      let node = this.find(selector)
      node.element.value = text
      node.trigger('input')
    },
    async click (selector) {
      let node = this.find(selector)
      await node.trigger('click')
      await node.vm.$nextTick()
    },
    async submit (selector) {
      let node = this.find(selector)
      await node.trigger('submit')
      await node.vm.$nextTick()
    }
  })

  return wrapper
}
