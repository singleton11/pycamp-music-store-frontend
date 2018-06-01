import axios from './axios';

export default {
  /**
   * Get all users
   *
   * @returns {Promise}
   */
  list() {
    return axios.get('/admin/users/');
  },
  /**
   * Edit balance of selected user
   *
   * @param {object} user - user to edit balance
   * @param {number} amount - amount to add to user's balance
   * @returns {Promise}
   */
  editBalance({ user, amount, }) {
    const id = user.id ? user.id : user;
    const changeBalanceData = {
      amount,
    };

    return axios.post(`/admin/users/${id}/edit-balance/`, changeBalanceData);
  },
  /**
   * Create new user on server
   *
   * @param {object} userToAdd - new user to create
   * @returns {Promise}
   */
  addNewUser({ userToAdd, }) {
    return axios.post('/admin/users/', userToAdd);
  },
  /**
   * Edit user on server
   *
   * @param {object} editedUser - user to edit
   * @returns {Promise}
   */
  newUser({ editedUser, }) {
    const id = editedUser.id;

    return axios.patch(`/admin/users/${id}/`, editedUser);
  },
  /**
   * Delete user on server
   *
   * @param {object} userToDelete - user to delete
   * @returns {Promise}
   */
  deleteUser({ userToDelete, }) {
    const id = userToDelete.id;

    return axios.delete(`/admin/users/${id}/`);
  },
};
