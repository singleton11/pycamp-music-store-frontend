import axios from './axios';

/**
 * Login user
 *
 * @param {String} email - user email
 * @param {String} password - user password
 * @returns {Promise}
 */
function login(email, password) {
  return axios.post('auth/login/', { email, password, });
}

/**
 * Logout user
 *
 * @returns {Promise}
 */
function logout() {
  return axios.get('auth/logout/');
}

/**
 * Register new user
 *
 * @returns {Promise}
 */
/* eslint-disable-next-line */
function register(user) {
  return axios.post('auth/register/', {
    email: user.email,
    password1: user.password1,
    password2: user.password2,
    first_name: user.firstName,
    last_name: user.lastName,
  });
}

export default {
  login,
  logout,
  register,
};
