import api from '../../api';

import {
  ALBUM_BUY,
  ALBUM_LIST,
  ALBUM_SEARCH,
  ALBUM_SELECT,
  ALBUM_UNSELECT,
} from '../types/album';

import { AUTH_LOGOUT, } from '../types/auth';

/**
 * Album Vuex Store Module State
 *
 * @property {Array} albums - List of albums
 * @property {object} activeAlbum - Currently selected album from the list
 * @property {number} activeAlbumIndex - Index of the currently selected album
 */
const state = {
  albums: [],
  activeAlbum: null,
  activeAlbumIndex: null,
};

/**
 * Album Vuex Store Module Getters
 *
 * @property {object} getAlbumById - Get album by ID from the list
 * @property {object} getActiveAlbum - Get currently selected album in the list
 * @property {number} getActiveAlbumIndex - Get list index of the currently
 *   selected album
 * @property {Array} getAlbums - Get full list of albums
 */
export const getters = {
  getAlbumById: state => state.albums.find(item => item.id === item),
  getActiveAlbum: state => state.activeAlbum,
  getActiveAlbumIndex: state => state.activeAlbumIndex,
  getAlbums: state => state.albums,
};

/**
 * Album Vuex Store Module Actions
 */
const actions = {
  /**
   * List albums
   *
   * @returns {Promise} List of albums
   */
  [ALBUM_LIST]: ({ commit, }) => api.album.list()
    .then((response) => {
      commit(ALBUM_LIST, response.data);
    }),

  /**
   * Search albums
   *
   * @returns {Promise} List of founded albums
   */
  [ALBUM_SEARCH]: ({ commit, getters, }) =>
    api.album.list(getters.getSearchText).then((response) => {
      commit(ALBUM_LIST, response.data);
    }),

  /**
   * Select the album in the list
   * @param {object} album - Album to be selected
   */
  [ALBUM_SELECT]: ({ commit, }, album) => {
    commit(ALBUM_SELECT, album);
  },

  /**
   * Unselect the album
   */
  [ALBUM_UNSELECT]: ({ commit, }) => {
    commit(ALBUM_UNSELECT);
  },

  /**
   * Buy the active album
   *
   * @param {object} album
   */
  [ALBUM_BUY]: ({ commit, getters, }) => {
    api.album.buy({ album: getters.getActiveAlbum, })
      .then(() => {
        commit(ALBUM_BUY);
      });
  },
};

/**
 * Album method Vuex Store Module Mutations
 */
const mutations = {

  /**
   * Mutate the album list
   *
   * @param {object} state - state of the module
   * @param {Array} albums - Array of albums (API response)
   */
  [ALBUM_LIST]: (state, albums) => {
    state.albums = [
      ...albums,
    ];
  },

  /**
   * Mutate the state and set proper reference for state.activeAlbum
   *
   * @param {object} state - state of the module
   * @param {object} album - album to be selected
   */
  [ALBUM_SELECT]: (state, album) => {
    state.activeAlbumIndex = state.albums
      .findIndex(item => item.id === album.id);
    if (state.activeAlbumIndex >= 0) {
      state.activeAlbum = album;
    } else {
      state.activeAlbumIndex = null;
      state.activeAlbum = null;
    }
  },

  /**
   * Mutate the state and set proper reference for state.activeAlbum
   *
   * @param {object} state - state of the module
   */
  [ALBUM_UNSELECT]: (state) => {
    state.activeAlbumIndex = null;
    state.activeAlbum = null;
  },

  /**
   * Buy album
   *
   * @param {object} state - state of the module
   * @param {object} album - album to be selected
   */
  [ALBUM_BUY]: (state) => {
    state.activeAlbum.is_bought = true;
  },

  /**
   * When we send AUTH_LOGOUT action we then endup here, and reset the state
   * of the module to empty
   *
   * @param {object} state - state of the module
   */
  [AUTH_LOGOUT]: (state) => {
    state.albums = [];
    state.activeAlbum = null;
    state.activeAlbumIndex = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
