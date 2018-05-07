import api from '../../api';

import { ACCOUNT_BALANCE_UPDATE, } from '../types/account';
import { AUTH_LOGOUT, } from '../types/auth';

/**
 * Account Vuex Store Module State
 *
 * @property {number} balance - user balance
 */
const state = {
  balance: null,
};

/**
 * Account Vuex Store Module Getters
 *
 * @property {object} getBalance - Get user's balance
 */
export const getters = {
  getBalance: state => state.balance,
};

/**
 * Account Vuex Store Module Actions
 */
const actions = {
  /**
   * Update the balance
   */
  [ACCOUNT_BALANCE_UPDATE]: ({ commit, }) => {
    api.account.getBalance().then((response) => {
      commit(ACCOUNT_BALANCE_UPDATE, response.data.balance);
    });
  },
};

/**
 * Account Vuex Store Module Mutations
 */
const mutations = {
  /**
   * Set balance to state
   *
   * @param {object} state -  state of the module
   * @param {object} balance - current balance
   */
  [ACCOUNT_BALANCE_UPDATE]: (state, balance) => {
    state.balance = balance;
  },

  /**
   * When we send AUTH_LOGOUT action we then endup here, and reset the state
   * of the module to empty
   *
   * @param {object} state - state of the module
   */
  [AUTH_LOGOUT]: (state) => {
    state.balance = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
