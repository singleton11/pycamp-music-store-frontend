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
 * Get all bought tracks
 *
 * @returns {Promise}
 */
export function getBoughtTracks () {
  return axios.get('music_store/bought_tracks/')
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
export function getAlbums (search = '') {
  let q = ''
  if (search) {
    q = '?search=' + search
  }
  return axios.get('music_store/albums/' + q)
}

/**
 * Get all bought albums
 *
 * @returns {Promise}
 */
export function getBoughtAlbums () {
  return axios.get('music_store/bought_albums/')
}

/**
 * Buy album by id
 *
 * @returns {Promise}
 */
export function buyAlbum (albumId) {
  return axios.post('music_store/albums/' + albumId + '/buy/')
}

export default {
  getTrack,
  getTracks,
  getBoughtTracks,
  getAlbum,
  getAlbums,
  getBoughtAlbums,
  buyAlbum
}
