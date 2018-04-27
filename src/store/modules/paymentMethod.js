import api from '../../api';

import {
  PAYMENT_METHOD_LIST,
  PAYMENT_METHOD_SELECT,
  PAYMENT_METHOD_EDIT,
  PAYMENT_METHOD_DELETE,
  PAYMENT_METHOD_SAVE,
} from '../types/paymentMethod';

import { AUTH_LOGOUT } from '../types/auth';

/**
 * Payment method Vuex Store Module State
 *
 * @property {Array} paymentMethod - List of payment methods
 * @property {object} activePaymentMethod - Currently selected payment method from the list
 * @property {number} activePaymentMethodIndex - Index of the currently selected payment method
 * @property {object} newPaymentMethod - Sample object data defaults used a new payment method
 */
const state = {
  paymentMethods: [],
  activePaymentMethod: null,
  activePaymentMethodIndex: null,
  newPaymentMethod: {
    id: null,
    title: '',
    is_default: false,
  },
};

/**
 * Payment method Vuex Store Module Getters
 *
 * @property {object} getPaymentMethodById - Get payment method by ID from
 *   the list
 * @property {object} getActivePaymentMethod - Get currently selected payment
 *   method in the list
 * @property {number} getActivePaymentMethodIndex - Get list index of the
 *   currently selected payment method
 * @property {Array} getPaymentMethods - Get full list of payment method
 */
export const getters = {
  getPaymentMethodById: st =>
    st.paymentMethods.find(paymentMethod => paymentMethod.id === paymentMethod),
  getActivePaymentMethod: st => st.activePaymentMethod,
  getActivePaymentMethodIndex: st => st.activePaymentMethodIndex,
  getPaymentMethods: st => st.paymentMethods,
  getNewPaymentMethod: st => st.newPaymentMethod,
};

/**
 * Payment method Vuex Store Module Actions
 */
const actions = {
  /**
   * List payment methods
   *
   * @returns {Promise} List of payment methods
   */
  [PAYMENT_METHOD_LIST]: ({ commit }) => api.paymentMethod.list().then((response) => {
    commit(PAYMENT_METHOD_LIST, response.data);
  }),

  /**
   * Select the payment method in the list
   * @param {object} paymentMethod - Payment method to be selected
   */
  [PAYMENT_METHOD_SELECT]: ({ commit }, paymentMethod) => {
    commit(PAYMENT_METHOD_SELECT, paymentMethod);
  },

  /**
   * Edit (update) payment method
   * @param {object} update - Information about field and value that we're
   *     changing
   * @property {string} update.field - Name of the field of payment method
   * @property {string} update.value - Value of the field
   */
  [PAYMENT_METHOD_EDIT]: ({ commit }, update) => {
    commit(PAYMENT_METHOD_EDIT, update);
  },

  /**
   * Save (update) payment method
   * If paymentMethod.id != null, then we update the record through API
   * otherwise we create a new record through API
   *
   * @param {object} paymentMethod - Payment method to be created or updated
   */
  [PAYMENT_METHOD_SAVE]: ({ commit }, paymentMethod) =>
    api.paymentMethod.save({ paymentMethod }).then((response) => {
      commit(PAYMENT_METHOD_SAVE, response.data);
    }),

  /**
   * Delete the payment method
   *
   * @param {object} paymentMethod
   */
  [PAYMENT_METHOD_DELETE]: ({ commit }, paymentMethod) => {
    if (!paymentMethod.id) {
      commit(PAYMENT_METHOD_DELETE, paymentMethod);

      return Promise.resolve(true);
    }

    return api.paymentMethod.disable({ paymentMethod }).then(() => {
      commit(PAYMENT_METHOD_DELETE, paymentMethod);
    });
  },
};

/**
 * Payment method Vuex Store Module Mutations
 */
const mutations = {

  /**
   * Mutate the state.paymentMethods variable based on the agents param, which
   * is API based json response
   *
   * @param {object} st - state of the module
   * @param {Array} paymentMethods - Array of payment methods (API response)
   */
  [PAYMENT_METHOD_LIST]: (st, paymentMethods) => {
    st.paymentMethods = [
      ...paymentMethods,
    ];
  },

  /**
   * Mutate the state and set proper reference for state.activePaymentMethod
   *
   * @param {object} state - state of the module
   * @param {object} paymentMethod - payment method to be selected
   */
  [PAYMENT_METHOD_SELECT]: (st, paymentMethod) => {
    st.activePaymentMethodIndex = st.paymentMethods.findIndex(item => item.id === paymentMethod.id);
    if (st.activePaymentMethodIndex >= 0) {
      st.activePaymentMethod = paymentMethod;
    } else {
      st.activePaymentMethodIndex = null;
      st.activePaymentMethod = null;
    }
  },

  /**
   * Mutate state.activePaymentMethod by modifying key/value of the record
   *
   * @param {object} state - state of the module
   * @param {object} { field, value, } - patch for the record
   */
  [PAYMENT_METHOD_EDIT]: (st, { field, value }) => {
    Object.assign(st.activePaymentMethod, {
      [field]: value,
    });
  },

  /**
   * Mutate payment method
   *
   * @param {object} st - state of the module
   * @param {object} agent - updated agent
   */
  [PAYMENT_METHOD_SAVE]: (st, paymentMethod) => {
    if (paymentMethod.id === st.activePaymentMethod.id) {
      Object.assign(st.activePaymentMethod, paymentMethod);
    } else {
      st.paymentMethods.push(paymentMethod);
    }
    if (!paymentMethod.is_default) {
      return;
    }
    const oldDefault = st.paymentMethods
      .find(item => item.is_default && item.id !== paymentMethod.id);
    oldDefault.is_default = false;
  },

  /**
   * Mutate state.paymentMethods by deleting the payment method from the list
   * of payment methods
   *
   * @param {object} st - state of the module
   * @param {object} paymentMethod - payment method to be deleted
   */
  [PAYMENT_METHOD_DELETE]: (st, paymentMethod) => {
    const idx = st.paymentMethods.findIndex(item => item.id === paymentMethod.id);

    st.paymentMethods.splice(idx, 1);

    // jump to previous index and select previous
    // house automatically
    st.activePaymentMethodIndex -= 1;
    if (!st.activePaymentMethodIndex) {
      st.activePaymentMethodIndex = 0;
    }
    st.activePaymentMethod =
      st.paymentMethods[st.activePaymentMethodIndex];
  },

  /**
   * When we send AUTH_LOGOUT action we then endup here, and reset the state
   * of the module to empty
   *
   * @param {object} st - state of the module
   */
  [AUTH_LOGOUT]: (st) => {
    st.paymentMethods = [];
    st.activePaymentMethod = null;
    st.activePaymentMethodIndex = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
