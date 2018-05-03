import axios from './axios';

export default {
  /**
   * @summary Get all tracks
   *
   * @returns {Promise}
   */
  list(search) {
    return axios.get('music_store/tracks/', { params: { search, }, });
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
