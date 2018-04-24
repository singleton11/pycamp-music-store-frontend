import router from '@/router/router'
import { HOME_PAGE, DASHBOARD_PAGE } from '@/router/routes'
import { authResource } from '@/http/resources'
import store from '@/store/store'
import { LOGIN_MUTATION, LOGOUT_MUTATION } from '@/store/mutations-types'
import { TOKEN_GETTER, AUTHENTICATED_GETTER } from '@/store/getter-types'

export default {
  /**
   * Attempt user login.
   *
   * @param {string} email User email
   * @param {string} password User password
   */
  login (email, password) {
    return authResource.login({ email, password }).then((response) => {
      this.saveToken(response.body.key)
      router.push(DASHBOARD_PAGE)
    }, (error) => {
      alert(error.bodyText)
    })
  },

  /**
   * Refreshes the auth token.
   */
  refreshToken () {
    return authResource.refreshToken().then((response) => {
      this.saveToken(response.body.key)
      return response.body.key
    })
  },

  /**
   * User logout.
   */
  logout () {
    authResource.logout().then(() => {
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
