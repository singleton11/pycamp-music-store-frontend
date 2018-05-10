import { TRANSACTION_LIST, } from '../types/transaction';
import { AUTH_LOGOUT, } from '../types/auth';

/**
 * Transaction Vuex Store Module State
 *
 * @property {Array} transactions - List of transactions
 */
const state = {
  transactions: [],
};

/**
 * Transaction Vuex Store Module Getters
 *
 * @property {Array} getTransactions - Get full list of transactions
 */
export const getters = {
  getTransactions: state => state.transactions,
};

/**
 * Transaction Vuex Store Module Mutations
 */
const mutations = {

  /**
   * Mutate the transactions list
   *
   * @param {object} state - state of the module
   * @param {Array} transactions - Array of transactions (API response)
   * @param {Array} page - current page
   */
  [TRANSACTION_LIST]: (state, transactions) => {
    state.transactions = [
      ...transactions,
    ];
  },

  /**
   * When we send AUTH_LOGOUT action we then endup here, and reset the state
   * of the module to empty
   *
   * @param {object} state - state of the module
   */
  [AUTH_LOGOUT]: (state) => {
    state.transactions = [];
  },
};

export default {
  state,
  getters,
  mutations,
};
