import Vue from 'vue'
import './interceptors'
import config from '@/config'

Vue.http.options.root = config.api.url

// Auth resources

const authActions = {
  login: { method: 'POST', url: 'auth/login/' },
  logout: { method: 'GET', url: 'auth/logout/' }
  // refreshToken: { method: 'PUT', url: 'auth' },
  // resetPassword: { method: 'POST', url: 'auth/password/reset' },
  // confirmResetPassword: { method: 'PUT', url: 'auth/password/reset' },
  // setPassword: { method: 'PUT', url: 'auth/password' }
}
const authResource = Vue.resource('auth', {}, authActions)

const musicActions = {
  getTracks: { method: 'GET', url: 'music_store/tracks/' },
  getAlbums: { method: 'GET', url: 'music_store/albums/' }
}
const musicResource = Vue.resource('auth', {}, musicActions)

export {
  authActions,
  musicActions,
  authResource,
  musicResource
}
