import axios from './axios';

export default {
  /**
   * Get all users
   *
   * @returns {Promise}
   */
  list() {
    return axios.get('/edit-users/');
  },
};
