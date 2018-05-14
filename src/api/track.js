import axios from './axios';

export default {
  /**
   * Get all tracks
   *
   * @param {string} search - string for search
   * @param {number} page - current page
   * @returns {Promise}
   */
  list({ search, page, }) {
    return axios.get('music_store/tracks/', { params: { search, page, }, });
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

    return axios.get('music_store/tracks/', {
      params: { album: id, page_size: 100, },
    });
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

  /**
   * Like the track
   *
   * @param {(object|number)} track - track object, or track id
   * @returns {Promise}
   */
  like({ track, }) {
    const id = track.id ? track.id : track;

    return axios.post(`music_store/tracks/${id}/like/`);
  },

  /**
   * Unlike the track
   *
   * @param {(object|number)} track - track object, or track id
   * @returns {Promise}
   */
  unlike({ track, }) {
    const id = track.id ? track.id : track;

    return axios.delete(`music_store/tracks/${id}/like/`);
  },

  /**
   * Listen the track
   *
   * @param {(object|number)} track - track object, or track id
   * @returns {Promise}
   */
  listen({ track, }) {
    const id = track.id ? track.id : track;

    return axios.post(`music_store/tracks/${id}/listen/`);
  },
};
