
export default {
  bind(el, binding, vnode) {
    el.addEventListener('saved', () => {
      let { endpoint, field } = binding.value
      let result = vnode.$store.dispatch('put', {
          url: endpoint,
          data: {
              [field]: vnode.value
          }
        }
      )
    })
  },
}