import axios from 'axios'
import AuthService from '@/services/AuthService'
import config from '@/config'

// create instance with baseURL
const instance = axios.create({
  baseURL: config.api.url
})

//
// Provides auth header token dynamically with each API
// request, taken from a store
//
instance.interceptors.request.use(function (request) {
  if (AuthService.isAuthenticated()) {
    request.headers.Authorization = `Token ${AuthService.getToken()}`
  }
  return request
})

export default instance
