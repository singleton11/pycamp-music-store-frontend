import Vue from 'vue'
import AuthService from '@/services/AuthService'
import {authActions} from '../resources'
import VueResource from 'vue-resource'
Vue.use(VueResource)

/**
 * Set Authorization header.
 */
Vue.http.interceptors.push((request, next) => {
  if (AuthService.isAuthenticated()) {
    request.headers.set('Authorization', `Token ${AuthService.getToken()}`)
  }
  next()
})

/**
 * Refresh token.
 */
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (
      response && response.status === 401 &&
      !(
        request.url === authActions.refreshToken.url &&
        request.method === authActions.refreshToken.method
      )
    ) {
      return AuthService.refreshToken()
        .then(() => Vue.http(request).then(data => data))
    }

    return response
  })
})

export default {}
