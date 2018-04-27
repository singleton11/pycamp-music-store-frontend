import axios from './axios'

export default {
  /**
   * @summary Get all payment methods
   *
   * @returns {Promise}
   */
  list () {
    return axios.get('music_store/payment_methods/')
  },

  /**
   * @summary Create a New payment method
   *
   * @param {object} paymentMethod - payment method data
   * @returns {Promise}
   */
  create ({ paymentMethod }) {
    return axios.post('music_store/payment_methods/', paymentMethod)
  },

  /**
   * @summary Update an Existing payment method
   *
   * @param {object} paymentMethod - payment method data
   * @returns {Promise}
   */
  update ({ paymentMethod }) {
    const id = paymentMethod.id
    return axios.put('music_store/payment_methods/' + id + '/', paymentMethod)
  },

  save ({ paymentMethod }) {
    const operation = paymentMethod.id ? this.update : this.create
    return operation({ paymentMethod })
  },

  /**
   * Method for delete the payment Method
   *
   * @param {Object} paymentId - `id` of payment method
   * @returns {Promise}
   */
  disable ({ paymentMethod }) {
    const id = paymentMethod.id
    return axios.delete('music_store/payment_methods/' + id + '/')
  }
}
