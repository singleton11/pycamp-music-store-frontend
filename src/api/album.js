import axios from './axios';

export default {
  /**
   * Get all albums
   *
   * @param {string} search - string for search
   * @param {number} page - current page
   * @returns {Promise}
   */
  list({ search, page, }) {
    return axios.get('music_store/albums/', { params: { search, page, }, });
  },

  /**
   * Buy the album
   *
   * @param {(object|number)} album - album for buy
   * @param {(object|number)} payment - payment method for buy
   * @returns {Promise}
   */
  buy({ album, payment, }) {
    const id = album.id ? album.id : album;
    const paymentId = payment.id ? payment.id : payment;

    return axios.post(`music_store/albums/${id}/buy/${paymentId}/`);
  },
};
