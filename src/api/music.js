import axios from './axios'

/**
 * Get track info by id
 *
 * @param {String} trackId - track id
 * @returns {Promise}
 */
export function getTrack (trackId) {
  return axios.get('music_store/tracks/' + trackId + '/')
}

/**
 * Get all tracks
 *
 * @returns {Promise}
 */
export function getTracks () {
  return axios.get('music_store/tracks/')
}

/**
 * Get album info by id
 *
 * @param {String} albumId - album id
 * @returns {Promise}
 */
export function getAlbum (albumId) {
  return axios.get('music_store/albums/' + albumId + '/')
}

/**
 * Get all albums
 *
 * @returns {Promise}
 */
export function getAlbums () {
  return axios.get('music_store/albums/')
}

export default {
  getTrack,
  getTracks,
  getAlbum,
  getAlbums
}
