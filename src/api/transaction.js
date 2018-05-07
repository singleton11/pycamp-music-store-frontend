import axios from './axios';

export default {
  /**
   * Get all transactions
   *
   * @returns {Promise}
   */
  list() {
    return axios.get('music_store/transactions/');
  },
};
