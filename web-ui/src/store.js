import Vuex from 'vuex'

Vue.use(Vuex)

export default  new Vuex.Store({
  state: {
    loggedInUser: ''
  },
  mutations: {
    loggedIn(state, user) {
      state.loggedInUser = user
    },
    loggedOut(state) {
      state.loggedInUser = null
    }
  },
  getters: {
    loggedInUser: state => state.loggedInUser
  }
})