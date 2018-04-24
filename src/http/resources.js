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
  getTracks: {
    method: 'GET',
    url: 'music_store/tracks/'
  },
  getBoughtTracks: {
    method: 'GET',
    url: 'music_store/bought_tracks/'
  },

  getAlbums: {
    method: 'GET',
    url: 'music_store/albums/'
  },
  buyAlbum: {
    method: 'POST',
    url: 'music_store/tracks/{id}/buy'
  },
  getBoughtAlbums: {
    method: 'GET',
    url: 'music_store/bought_albums/'
  },

  getPaymentMethods: {
    method: 'GET',
    url: 'music_store/payment_methods/'
  },
  addPaymentMethod: {
    method: 'POST',
    url: 'music_store/payment_methods/'
  }
}
const musicResource = Vue.resource('auth', {}, musicActions)

export {
  authActions,
  musicActions,
  authResource,
  musicResource
}
