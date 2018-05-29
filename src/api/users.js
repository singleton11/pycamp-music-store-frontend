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
  /**
   * Edit balance of selected user
   *
   * @returns {Promise}
   */
  editBalance({ user, amount, }) {
    const id = user.id ? user.id : user;
    const changeBalanceData = {
      amount,
    };

    return axios.post(`/edit-users/${id}/edit-balance/`, changeBalanceData);
  },
};
