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

/**
 * Get all payment methods
 *
 * @returns {Promise}
 */
export function getPaymentMethods () {
  return axios.get('music_store/payment_methods/')
}

/**
 * Method to edit paymentMethod
 *
 * @param {Object} data - object with 'id', 'title' and 'is_default' fields
 * @returns {Promise}
 */
export function editPaymentMethod (data) {
  return axios.put('music_store/payment_methods/' + data.id + '/', {
    title: data.title,
    is_default: data.is_default
  })
}

/**
 * Method for add the payment Method
 *
 * @param {Object} data - object with 'title' and 'is_default' fields
 * @returns {Promise}
 */
export function addPaymentMethod (data) {
  return axios.post('music_store/payment_methods/', {
    title: data.title,
    is_default: data.is_default
  })
}

/**
 * Method for delete the payment Method
 *
 * @param {Object} paymentId - `id` of payment method
 * @returns {Promise}
 */
export function delPaymentMethod (paymentId) {
  return axios.delete('music_store/payment_methods/' + paymentId + '/')
}

export default {
  getTrack,
  getTracks,
  getAlbum,
  getAlbums,
  getPaymentMethods,
  editPaymentMethod,
  addPaymentMethod,
  delPaymentMethod
}
