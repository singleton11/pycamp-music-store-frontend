import axios from './axios'

/**
 * Login user
 *
 * @param {String} email - user email
 * @param {String} password - user password
 * @returns {Promise}
 */
export function login (email, password) {
  return axios.post('auth/login/', { email, password })
}

/**
 * Logout user
 *
 * @returns {Promise}
 */
function logout () {
  return axios.get('auth/logout/')
}

export default {
  login,
  logout
}
