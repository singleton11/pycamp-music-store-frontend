import axios from './axios';

export default {
  /**
   * Get all albums
   *
   * @returns {Promise}
   */
  list(search) {
    return axios.get('music_store/albums/', { params: { search, }, });
  },

  /**
   * Buy the album
   *
   * @param {object} album - album for buy
   * @param {object} payment - payment method for buy
   * @returns {Promise}
   */
  buy({ album, payment, }) {
    const id = album.id ? album.id : album;
    const paymentId = payment.id ? payment.id : payment;

    return axios.post(`music_store/albums/${id}/buy/${paymentId}/`);
  },
};
