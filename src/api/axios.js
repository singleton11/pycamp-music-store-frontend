import axios from 'axios';
import config from '../config';
import store from '../store';
import { AUTH_LOGOUT, } from '../store/types/auth';

// create instance with baseURL
const instance = axios.create({
  baseURL: config.api.url,
});

//
// Provides auth header token dynamically with each API
// request, taken from a store
//
instance.interceptors.request.use((request) => {
  if (store.getters.isAuthenticated) {
    request.headers.Authorization = `Token ${store.getters.getToken}`;
  }

  return request;
});

instance.interceptors.response.use(response => response, (error) => {
  if (error.response.status === 403 &&
    error.response.data.detail === 'Invalid token.') {
    store.commit(AUTH_LOGOUT);
  }

  return error;
});

export default instance;
