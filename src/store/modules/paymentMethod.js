import api from '../../api';

import {
  PAYMENT_METHOD_LIST,
  PAYMENT_METHOD_SELECT,
  PAYMENT_METHOD_EDIT,
  PAYMENT_METHOD_DELETE,
  PAYMENT_METHOD_SAVE,
  PAYMENT_METHOD_DISABLE_DEFAULT,
} from '../types/paymentMethod';

import { AUTH_LOGOUT, } from '../types/auth';

/**
 * Payment method Vuex Store Module State
 *
 * @property {Array} paymentMethod - List of payment methods
 * @property {object} activePaymentMethod - Currently selected payment method
 *   from the list
 * @property {number} activePaymentMethodIndex - Index of the currently selected
 *   payment method
 * @property {object} newPaymentMethod - Sample object data defaults used a new
 *   payment method
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
  getPaymentMethodById: state => paymentMethodId => state.paymentMethods
    .find(item => item.id === paymentMethodId),
  getActivePaymentMethod: state => state.activePaymentMethod,
  getActivePaymentMethodIndex: state => state.activePaymentMethodIndex,
  getPaymentMethods: state => state.paymentMethods,
  getNewPaymentMethod: state => state.newPaymentMethod,
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
  [PAYMENT_METHOD_LIST]: ({ commit, }) => api.paymentMethod.list()
    .then((response) => {
      commit(PAYMENT_METHOD_LIST, response.data);
    }),

  /**
   * Select the payment method in the list
   * @param {object} paymentMethod - Payment method to be selected
   */
  [PAYMENT_METHOD_SELECT]: ({ commit, }, paymentMethod) => {
    commit(PAYMENT_METHOD_SELECT, paymentMethod);
  },

  /**
   * Edit (update) payment method
   * @param {object} update - Information about field and value that we're
   *   changing
   * @property {string} update.field - Name of the field of payment method
   * @property {string} update.value - Value of the field
   */
  [PAYMENT_METHOD_EDIT]: ({ commit, }, update) => {
    commit(PAYMENT_METHOD_EDIT, update);
  },

  /**
   * Save (update) payment method
   * If paymentMethod.id != null, then we update the record through API
   * otherwise we create a new record through API
   *
   * @param {object} paymentMethod - Payment method to be created or updated
   */
  [PAYMENT_METHOD_SAVE]: ({ commit, }, paymentMethod) =>
    api.paymentMethod.save({ paymentMethod, }).then((response) => {
      if (response.data.is_default) {
        commit(PAYMENT_METHOD_DISABLE_DEFAULT);
      }
      commit(PAYMENT_METHOD_SAVE, response.data);
    }),

  /**
   * Delete the payment method
   *
   * @param {object} paymentMethod
   */
  [PAYMENT_METHOD_DELETE]: ({ commit, }, paymentMethod) => {
    if (!paymentMethod.id) {
      commit(PAYMENT_METHOD_DELETE, paymentMethod);

      /* eslint-disable-next-line */
      return Promise.resolve(true);
    }

    return api.paymentMethod.disable({ paymentMethod, }).then(() => {
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
   * @param {object} state - state of the module
   * @param {Array} paymentMethods - Array of payment methods (API response)
   */
  [PAYMENT_METHOD_LIST]: (state, paymentMethods) => {
    state.paymentMethods = [
      ...paymentMethods,
    ];
  },

  /**
   * Mutate the state and set proper reference for state.activePaymentMethod
   *
   * @param {object} state -  state of the module
   * @param {object} paymentMethod - payment method to be selected
   */
  [PAYMENT_METHOD_SELECT]: (state, paymentMethod) => {
    state.activePaymentMethodIndex = state.paymentMethods
      .findIndex(item => item.id === paymentMethod.id);
    if (state.activePaymentMethodIndex >= 0) {
      state.activePaymentMethod = paymentMethod;
    } else {
      state.activePaymentMethodIndex = null;
      state.activePaymentMethod = null;
    }
  },

  /**
   * Mutate state.activePaymentMethod by modifying key/value of the record
   *
   * @param {object} state -  state of the module
   * @param {object} { field, value, } - patch for the record
   */
  [PAYMENT_METHOD_EDIT]: (state, { field, value, }) => {
    Object.assign(state.activePaymentMethod, {
      [field]: value,
    });
  },

  /**
   * Mutate payment method
   *
   * @param {object} state -  state of the module
   * @param {object} paymentMethod - updated payment method
   */
  [PAYMENT_METHOD_SAVE]: (state, paymentMethod) => {
    if (state.activePaymentMethod &&
      paymentMethod.id === state.activePaymentMethod.id) {
      Object.assign(state.activePaymentMethod, paymentMethod);
    } else {
      state.paymentMethods.push(paymentMethod);
    }
  },

  /**
   * Remove the "is_default" flag of the default method
   *
   * @param {object} state -  state of the module
   */
  [PAYMENT_METHOD_DISABLE_DEFAULT]: (state) => {
    const oldDefault = state.paymentMethods.find(item => item.is_default);

    if (oldDefault) {
      oldDefault.is_default = false;
    }
  },

  /**
   * Mutate state.paymentMethods by deleting the payment method from the list
   * of payment methods
   *
   * @param {object} state - state of the module
   * @param {object} paymentMethod - payment method to be deleted
   */
  [PAYMENT_METHOD_DELETE]: (state, paymentMethod) => {
    const idx = state.paymentMethods
      .findIndex(item => item.id === paymentMethod.id);

    state.paymentMethods.splice(idx, 1);

    // jump to previous index and select previous
    // house automatically
    state.activePaymentMethodIndex -= 1;
    if (!state.activePaymentMethodIndex) {
      state.activePaymentMethodIndex = 0;
    }
    state.activePaymentMethod =
      state.paymentMethods[state.activePaymentMethodIndex];
  },

  /**
   * When we send AUTH_LOGOUT action we then endup here, and reset the state
   * of the module to empty
   *
   * @param {object} state - state of the module
   */
  [AUTH_LOGOUT]: (state) => {
    state.paymentMethods = [];
    state.activePaymentMethod = null;
    state.activePaymentMethodIndex = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
