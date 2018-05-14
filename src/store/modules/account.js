import api from '../../api';

import {
  ACCOUNT_UPDATE_INFO,
  ACCOUNT_DECREASE_BALANCE,
} from '../types/account';
import { AUTH_LOGOUT, } from '../types/auth';

/**
 * Account Vuex Store Module State
 *
 * @property {string} email - user email
 * @property {number} balance - user balance
 */
const state = {
  email: null,
  balance: null,
};

/**
 * Account Vuex Store Module Getters
 *
 * @property {object} getEmail - Get user's email
 * @property {object} getBalance - Get user's balance
 */
export const getters = {
  getEmail: state => state.email,
  getBalance: state => state.balance,
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

  /**
   * Decrease the user balance
   */
  [ACCOUNT_DECREASE_BALANCE]: ({ commit, }, amount) => {
    commit(ACCOUNT_DECREASE_BALANCE, amount);
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
  },

  /**
   * Mutate user balance
   *
   * @param {object} state -  state of the module
   * @param {object} amount - sum for decreasing
   */
  [ACCOUNT_DECREASE_BALANCE]: (state, amount) => {
    state.balance -= amount;
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
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
