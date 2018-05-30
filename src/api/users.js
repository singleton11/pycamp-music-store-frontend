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
  /**
   * Create new user on server
   *
   * @returns {Promise}
   */
  addNewUser({ userToAdd, }) {
    return axios.post('/edit-users/', userToAdd);
  },
  /**
   *
   *
   * @param editedUser
   * @returns {*|PromiseLike<HttpResponse>|AxiosPromise<any>}
   */
  editUser({ editedUser, }) {
    const id = editedUser.id;

    return axios.patch(`/edit-users/${id}/`, editedUser);
  },
  /**
   *
   * @param userToDelete
   * @returns {*}
   */
  deleteUser({ userToDelete, }) {
    const id = userToDelete.id;

    return axios.delete(`/edit-users/${id}/`);
  },
};
