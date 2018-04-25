import router from '@/router/router'
import { HOME_PAGE, DASHBOARD_PAGE } from '@/router/routes'
import auth from '@/api/auth'
import store from '@/store/store'
import { LOGIN_MUTATION, LOGOUT_MUTATION } from '@/store/mutations-types'
import { TOKEN_GETTER, AUTHENTICATED_GETTER } from '@/store/getter-types'

export default {
  /**
   * User login.
   */
  login (email, password) {
    return auth.login(email, password).then((response) => {
      this.saveToken(response.data.key)
      router.push(DASHBOARD_PAGE)
    }, (error) => {
      return error.response.data.detail
    })
  },

  /**
   * User logout.
   */
  logout () {
    auth.logout().then(() => {
      router.push(HOME_PAGE)
    })
    this.removeToken()
  },

  /**
   * Saves the token to the storage.
   *
   * @param {string} token
   */
  saveToken (token) {
    store.commit(LOGIN_MUTATION, token)
  },

  removeToken () {
    store.commit(LOGOUT_MUTATION)
  },

  /**
   * Returns TRUE if the current user is authenticated.
   *
   * @return {boolean}
   */
  isAuthenticated () {
    return store.getters[AUTHENTICATED_GETTER]
  },

  /**
   * Returns auth token.
   *
   * @return {*}
   */
  getToken () {
    return store.getters[TOKEN_GETTER]
  }
}
