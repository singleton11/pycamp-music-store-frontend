import axios from './axios'

export default {
  /**
   * Get track info by id
   *
   * @param {String} trackId - track id
   * @returns {Promise}
   */
  getTrack (trackId) {
    return axios.get('music_store/tracks/' + trackId + '/')
  },

  /**
   * Get all tracks
   *
   * @param {String} search - string for searching
   * @returns {Promise}
   */
  getTracks (search = '') {
    return axios.get('music_store/tracks/', {params: {search}})
  },

  /**
   * Get all bought tracks
   *
   * @returns {Promise}
   */
  getBoughtTracks () {
    return axios.get('music_store/bought_tracks/')
  },

  /**
   * Buy track by id
   *
   * @returns {Promise}
   */
  buyTrack (trackId) {
    return axios.post('music_store/tracks/' + trackId + '/buy/')
  },

  /**
   * Get album info by id
   *
   * @param {String} albumId - album id
   * @returns {Promise}
   */
  getAlbum (albumId) {
    return axios.get('music_store/albums/' + albumId + '/')
  },

  /**
   * Get all albums
   *
   * @param {String} search - string for searching
   * @returns {Promise}
   */
  getAlbums (search = '') {
    return axios.get('music_store/albums/', {params: {search}})
  },

  /**
   * Get all bought albums
   *
   * @returns {Promise}
   */
  getBoughtAlbums () {
    return axios.get('music_store/bought_albums/')
  },

  /**
   * Buy album by id
   *
   * @returns {Promise}
   */
  buyAlbum (albumId) {
    return axios.post('music_store/albums/' + albumId + '/buy/')
  }
}
