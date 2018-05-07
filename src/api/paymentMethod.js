import axios from './axios';

export default {
  /**
   * Get all payment methods
   *
   * @returns {Promise}
   */
  list() {
    return axios.get('music_store/payment_methods/');
  },

  /**
   * Create a New payment method
   *
   * @param {object} paymentMethod - payment method object
   * @returns {Promise}
   */
  create({ paymentMethod, }) {
    return axios.post('music_store/payment_methods/', paymentMethod);
  },

  /**
   * Update an Existing payment method
   *
   * @param {object} paymentMethod - payment method object
   * @returns {Promise}
   */
  update({ paymentMethod, }) {
    return axios.put(`music_store/payment_methods/${paymentMethod.id}/`, paymentMethod);
  },

  /**
   * Save or Update payment method
   *
   * @param {object} paymentMethod - payment method object
   * @returns {Promise}
   */
  save({ paymentMethod, }) {
    const operation = paymentMethod.id ? this.update : this.create;

    return operation({ paymentMethod, });
  },

  /**
   * Method for delete the payment Method
   *
   * @param {object} paymentMethod - payment method object
   * @returns {Promise}
   */
  disable({ paymentMethod, }) {
    return axios.delete(`music_store/payment_methods/${paymentMethod.id}/`);
  },
};
