import axios from './axios';

export default {
  /**
   * Get user information
   *
   * @returns {Promise}
   */
  getInfo() {
    return axios.get('music_store/account/');
  },
};
