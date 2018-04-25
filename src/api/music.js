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
 * @param {String} search - string for searching
 * @returns {Promise}
 */
export function getTracks (search = '') {
  let q = ''
  if (search) {
    q = '?search=' + search
  }
  return axios.get('music_store/tracks/' + q)
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
 * Buy track by id
 *
 * @returns {Promise}
 */
export function buyTrack (trackId) {
  return axios.post('music_store/tracks/' + trackId + '/buy/')
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
 * @param {String} search - string for searching
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
  buyTrack,
  getAlbum,
  getAlbums,
  getBoughtAlbums,
  buyAlbum
}
