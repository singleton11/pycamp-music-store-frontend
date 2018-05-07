import axios from './axios';

export default {
  /**
   * Get user balance
   *
   * @returns {Promise}
   */
  getBalance() {
    return axios.get('music_store/account/');
  },
};
