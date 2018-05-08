import axios from './axios';

export default {
  /**
   * Get all tracks
   *
   * @returns {Promise}
   */
  list(search) {
    return axios.get('music_store/tracks/', { params: { search, }, });
  },

  /**
   * Get track by id
   *
   * @param {number} trackId - id of track
   * @returns {Promise}
   */
  getById({ trackId, }) {
    return axios.get(`music_store/tracks/${trackId}/`);
  },

  /**
   * Get full info about all tracks from album
   *
   * @param {(object|number)} album - album for getting tracks
   * @returns {Promise}
   */
  getTracksFromAlbum({ album, }) {
    const id = album.id ? album.id : album;

    return axios.get(`music_store/tracks/?album=${id}`);
  },

  /**
   * Buy the track
   *
   * @param {(object|number)} track - track object, or track id
   * @param {(object|number)} payment - payment method for buy
   * @returns {Promise}
   */
  buy({ track, payment, }) {
    const id = track.id ? track.id : track;
    const paymentId = payment.id ? payment.id : payment;

    return axios.post(`music_store/tracks/${id}/buy/${paymentId}/`);
  },
};
