import {
  AUTH_LOGIN,
  AUTH_LOGOUT
} from '../types/auth'
// import persistedState from 'vuex-persistedstate'
import api from '@/api'

/**
 * Auth Vuex Store Module State
 *
 * @property {string} token - user token
 * @property {bool} authenticated
 */
const state = {
  token: null,
  authenticated: false
}

/**
 * Auth Vuex Store Module Getters
 *
 * @property {string} getToken - Get current token
 * @property {bool} isAuthenticated
 */
export const getters = {
  getToken: state => state.token,
  isAuthenticated: state => state.authenticated
}

/**
 * Auth Vuex Store Module Actions
 */
const actions = {
  /**
   * @param user - credentials of the user
   */
  [AUTH_LOGIN]: ({commit}, user) => {
    return api.auth.login(user.email, user.password).then((response) => {
      commit(AUTH_LOGIN, response.data.key)
    })
  },
  [AUTH_LOGOUT]: ({commit}) => {
    return api.auth.logout().then(() => {
      commit(AUTH_LOGOUT)
    })
  }
}

/**
 * Auth Vuex Store Module Mutations
 */
const mutations = {
  [AUTH_LOGIN]: (state, token) => {
    state.auth.token = token
    state.auth.authenticated = true
  },

  [AUTH_LOGOUT]: (state) => {
    state.auth.token = null
    state.auth.authenticated = false
  }
}

// const plugins = [
//   persistedState({
//     paths: ['token', 'authenticated']
//   })
// ]
export default {
  state,
  getters,
  actions,
  mutations // ,
  // plugins
}
