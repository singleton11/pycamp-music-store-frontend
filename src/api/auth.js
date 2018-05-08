import axios from './axios';

export default {
  /**
   * Login user
   *
   * @param {String} email - user email
   * @param {String} password - user password
   * @returns {Promise}
   */
  login(email, password) {
    return axios.post('auth/login/', { email, password, });
  },

  /**
   * Logout user
   *
   * @returns {Promise}
   */
  logout() {
    return axios.get('auth/logout/');
  },

  /**
   * Register new user
   *
   * @returns {Promise}
   */
  register(user) {
    return axios.post('auth/register/', {
      email: user.email,
      password1: user.password,
      password2: user.passwordConfirmation,
      first_name: user.firstName,
      last_name: user.lastName,
    });
  },
};
