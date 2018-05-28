import api from '../../api';

import {
  USER_LIST,
  USER_SELECT,
  USER_DESELECT,
} from '../types/users';

import { AUTH_LOGOUT, } from '../types/auth';

/**
 * Users Vuex Store Module State
 *
 * @property {Array} users - List of users
 * @property {object} selectedUser - Currently selected user from the list
 * @property {number} selectedUserIndex - Index of the currently selected user
 */
const state = {
  users: [],
  selectedUser: null,
  selectedUserIndex: null,
};

/**
 * User Vuex Store Module Getters
 *
 * @property {object} getUserById - Get user by ID from the list
 * @property {object} getSelectedUser - Get currently selected user in the list
 * @property {number} getSelectedUserIndex - Get list index of the currently
 *   selected user
 * @property {Array} getUsers - Get full list of users
 */
export const getters = {
  getUserById: state => state.users.find(item => item.id === item),
  getSelectedUser: state => state.selectedUser,
  getSelectedUserIndex: state => state.selectedUserIndex,
  getUsers: state => state.users,
};

/**
 * User Vuex Store Module Actions
 */
const actions = {
  /**
   * List of users
   *
   * @returns {Promise} - count of albums
   */
  [USER_LIST]: ({ commit, }) => api.user.list()
    .then((response) => {
      commit(USER_LIST, response.data);

      return response.data.count;
    }),

  /**
   * Select the user in the list
   * @param {object} user - USer to be selected
   */
  [USER_SELECT]: ({ commit, }, user) => {
    commit(USER_SELECT, user);
  },

  /**
   * Deselect the user
   */
  [USER_DESELECT]: ({ commit, }) => {
    commit(USER_DESELECT);
  },

};

/**
 * User Vuex Store Module Mutations
 */
const mutations = {

  /**
   * Mutate the user list
   *
   * @param {object} state - state of the module
   * @param {Array} users - Array of users (API response)
   */
  [USER_LIST]: (state, users) => {
    state.users = [
      ...users,
    ];
  },

  /**
   * Mutate the state and set proper reference for state.selectedUser
   *
   * @param {object} state - state of the module
   * @param {object} user - user to be selected
   */
  [USER_SELECT]: (state, user) => {
    state.selectedUserIndex = state.users
      .findIndex(item => item.id === user.id);
    if (state.selectedUserIndex >= 0) {
      state.selectedUser = user;
    } else {
      state.selectedUserIndex = null;
      state.selectedUser = null;
    }
  },

  /**
   * Mutate the state and set proper reference for state.activeAlbum
   *
   * @param {object} state - state of the module
   */
  [USER_DESELECT]: (state) => {
    state.selectedUserIndex = null;
    state.selectedUser = null;
  },

  /**
   * When we send AUTH_LOGOUT action we end up here, and reset the state
   * of the module to empty
   *
   * @param {object} state - state of the module
   */
  [AUTH_LOGOUT]: (state) => {
    state.users = [];
    state.selectedUser = null;
    state.selectedUserIndex = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
