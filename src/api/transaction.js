import axios from './axios';

export default {
  /**
   * Get all transactions
   *
   * @param {int} page - page for display
   * @returns {Promise}
   */
  list({ page = 1, }) {
    return axios.get('music_store/transactions/', { params: { page, }, });
  },
};
