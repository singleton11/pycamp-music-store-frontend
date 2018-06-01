import api from '../../api';

import { ACCOUNT_UPDATE_INFO, } from '../types/account';
import { AUTH_LOGOUT, } from '../types/auth';

/**
 * Account Vuex Store Module State
 *
 * @property {string} email - user email
 * @property {number} balance - user balance
 * @property {boolean} is_staff - user is staff or not
 * @property {boolean} is_superuser - user is superuser or not
 */
const state = {
  email: null,
  balance: null,
  is_staff: false,
  is_superuser: false,
};

/**
 * Account Vuex Store Module Getters
 *
 * @property {object} getEmail - Get user's email
 * @property {object} getBalance - Get user's balance
 * @property {object} getAdmin - Get user's balance
 */
export const getters = {
  getEmail: state => state.email,
  getBalance: state => state.balance,
  isAdmin: state => state.is_superuser,
};

/**
 * Account Vuex Store Module Actions
 */
const actions = {
  /**
   * Update the balance
   */
  [ACCOUNT_UPDATE_INFO]: ({ commit, }) => {
    api.account.getInfo().then((response) => {
      commit(ACCOUNT_UPDATE_INFO, response.data);
    });
  },
};

/**
 * Account Vuex Store Module Mutations
 */
const mutations = {
  /**
   * Mutate user information
   *
   * @param {object} state -  state of the module
   * @param {object} data - account information
   */
  [ACCOUNT_UPDATE_INFO]: (state, data) => {
    state.email = data.email;
    state.balance = data.balance;
    state.is_staff = data.is_staff;
    state.is_superuser = data.is_superuser;
  },

  /**
   * When we send AUTH_LOGOUT action we then endup here, and reset the state
   * of the module to empty
   *
   * @param {object} state - state of the module
   */
  [AUTH_LOGOUT]: (state) => {
    state.email = '';
    state.balance = 0;
    state.is_staff = false;
    state.is_superuser = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
