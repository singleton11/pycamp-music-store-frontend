import axios from 'axios'
import config from '@/config'
import store from '@/store'

// create instance with baseURL
const instance = axios.create({
  baseURL: config.api.url
})

//
// Provides auth header token dynamically with each API
// request, taken from a store
//
instance.interceptors.request.use(function (request) {
  if (store.getters.isAuthenticated) {
    request.headers.Authorization = `Token ${store.getters.getToken}`
  }
  return request
})

export default instance
