import music from '@/api/music'
import {ALBUM_MUTATION, TRACK_MUTATION} from '@/store/mutations-types'
import store from '@/store/store'
import {TRACK_GETTER} from '@/store/getter-types'
export default {

  /**
   * Get one track.
   * Try get info from state, and if it's not exists, load from api
   */
  getTrack (trackId) {
    let track = store.getters[TRACK_GETTER](trackId)
    if (track) {
      return new Promise((resolve, reject) => {
        resolve()
      }).then(() => track)
    }
    return music.getTrack(trackId).then((response) => {
      let item = response.data
      this.saveTrack(item)
      return item
    })
  },

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
   * Get one album.
   * Try get info from state, and if it's not exists, load from api
   */
  getAlbum (albumId) {
    let album = store.getters[TRACK_GETTER](albumId)
    if (album) {
      return new Promise((resolve, reject) => {
        resolve()
      }).then(() => album)
    }
    return music.getAlbum(albumId).then((response) => {
      let item = response.data
      this.saveTrack(item)
      return item
    })
  },

  /**
   * Get array of all albums info
   */
  getAlbums (search = '') {
    return music.getAlbums(search).then((response) => {
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
   * Buy album
   */
  buyAlbum (albumId) {
    return music.buyAlbum(albumId).then(response => {
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
