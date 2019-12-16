import ApiObject from 'tovaritch/core-ui/utils/api/object'
import ApiEndPoint from 'tovaritch/core-ui/utils/api/endpoint'
import { API_URLS } from 'tovaritch/core-ui/utils/api/urls'
import { HTTP_METHOD } from 'tovaritch/core-ui/utils/api/common'

/** Action : Will try to login
 * @param {String} url The relative api url to query
 * @param {Object} data Data to send to the API
 * @returns {Object} The query result
*/
export const login = 'login'

/** Action : Log outs the currently logged in user
*/
export const logout = 'logout'

/** Returns true if an user is currently logged in.
 * @type {Boolean}
*/
export const isLoggedIn = 'isLoggedIn'

/** Returns the current logged in user.
 * @type {Object}
*/
export const currentUser = 'currentUser'

export default {
  getters: {
    [isLoggedIn]: state => !!state.user,
    [currentUser]: state => state.user
  },
  actions: {
    async [login] ({ commit }, args) {
      let id;
      if (args) {
          id = args
      }

      if (id == undefined) {
        let user = new ApiObject(API_URLS.AUTH.CURRENT_USER, HTTP_METHOD.GET)

        if (!await user.load()) {
          return false
        }

        id = user.id.value
      }

      let user = new ApiObject(`${API_URLS.USERS}/${id}`, HTTP_METHOD.PATCH)
      commit('_login', user)
    },
    async [logout] ({ commit }) {
      let logout = new ApiEndPoint(API_URLS.AUTH.LOGOUT, HTTP_METHOD.POST)
      if (await logout.save()) {
        commit('_logout')
      }
    }
  },
  mutations: {
    _login (state, user) {
      state.user = user
    },
    _logout (state) {
      state.user = null
    }
  }
}
