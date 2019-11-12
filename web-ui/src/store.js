import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default  new Vuex.Store({
  state: {
    loggedInUser: ''
  },
  mutations: {
    login(state, user) {
      state.loggedInUser = user
    },
    logout(state) {
      state.loggedInUser = null
    }
  },
  getters: {
    loggedInUser: state => state.loggedInUser
  }
})