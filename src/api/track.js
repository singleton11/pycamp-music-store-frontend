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
   * @param {object} trackId - id of track
   * @returns {Promise}
   */
  getById({ trackId, }) {
    return axios.get(`music_store/tracks/${trackId}/`);
  },

  /**
   * Get full info about all tracks from album
   *
   * @param {object} album - album object, or album id
   * @returns {Promise}
   */
  getTracksFromAlbum({ album, }) {
    const id = album.id ? album.id : album;

    return axios.get(`music_store/tracks/?album=${id}`);
  },

  /**
   * Buy the track
   *
   * @param {object} track - track object, or track id
   * @returns {Promise}
   */
  buy({ track, }) {
    const id = track.id ? track.id : track;

    return axios.post(`music_store/tracks/${id}/buy/`);
  },
};
