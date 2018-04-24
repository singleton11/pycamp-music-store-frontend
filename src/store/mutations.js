import { LOGIN_MUTATION, LOGOUT_MUTATION } from './mutations-types'

/* eslint-disable no-param-reassign */
export default {

  [LOGIN_MUTATION] (state, token) {
    state.auth.token = token
    state.auth.authenticated = true
  },
  [LOGOUT_MUTATION] (state) {
    state.auth.token = null
    state.auth.authenticated = false
  }
}
