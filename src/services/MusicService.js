import music from '@/api/music'
import {ALBUM_MUTATION, TRACK_MUTATION} from '@/store/mutations-types'
import store from '@/store/store'
export default {
  /**
   * Get array of all tracks info
   */
  getTracks () {
    return music.getTracks().then((response) => {
      let items = response.data
      items.forEach((item) => {
        this.saveTrack(item)
      })
      return items
    })
  },

  /**
   * Get array of all bought tracks info
   */
  getBoughtTracks () {
    return music.getBoughtTracks().then((response) => {
      return response.data
    })
  },

  /**
   * Get array of all albums info
   */
  getAlbums () {
    return music.getAlbums().then((response) => {
      let items = response.data
      items.forEach((item) => {
        this.saveAlbum(item)
      })
      return items
    })
  },

  /**
   * Get array of all bought albums info
   */
  getBoughtAlbums () {
    return music.getBoughtAlbums().then((response) => {
      return response.data
    })
  },

  /**
   * Saves the track to the storage.
   *
   * @param {string} track
   */
  saveTrack (track) {
    store.commit(TRACK_MUTATION, track)
  },

  /**
   * Saves the album to the storage.
   *
   * @param {string} album
   */
  saveAlbum (album) {
    store.commit(ALBUM_MUTATION, album)
  }
}
