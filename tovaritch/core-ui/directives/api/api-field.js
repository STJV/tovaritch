
export default {
  bind(el, binding, vnode) {
    vnode.componentInstance.$on('save', (value) => {
      let { endpoint, field } = binding.value
      let result = vnode.context.$store.dispatch('put', {
          url: endpoint,
          data: {
              [field]: vnode.value
          }
        }
      )
    })
  },
}