import axios from './axios';

export default {
  /**
   * @summary Get all tracks
   *
   * @returns {Promise}
   */
  list() {
    return axios.get('music_store/tracks/');
  },

  /**
   * @summary Buy the track
   *
   * @param {object} track - payment method data, or it's `id`
   * @returns {Promise}
   */
  buy({ track, }) {
    const id = track.id ? track.id : track;

    return axios.post(`music_store/tracks/${id}/buy/`);
  },
};
