import axios from './axios';

/**
 * Get user balance
 *
 * @returns {Promise}
 */
function getBalance() {
  return axios.get('music_store/account/');
}

export default {
  getBalance,
};
