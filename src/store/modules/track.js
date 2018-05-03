import api from '../../api';

import {
  TRACK_BUY,
  TRACK_LIST,
  TRACK_SELECT,
  TRACK_SEARCH,
} from '../types/track';

import { AUTH_LOGOUT, } from '../types/auth';

/**
 * Track Vuex Store Module State
 *
 * @property {Array} tracks - List of tracks
 * @property {object} activeTrack - Currently selected track from the list
 * @property {number} activeTrackIndex - Index of the currently selected track
 */
const state = {
  tracks: [],
  activeTrack: null,
  activeTrackIndex: null,
};

/**
 * Track Vuex Store Module Getters
 *
 * @property {object} getTrackById - Get track by ID from
 *   the list
 * @property {object} getActiveTrack - Get currently selected track in the list
 * @property {number} getActiveTrackIndex - Get list index of the currently
 *   selected track
 * @property {Array} getTracks - Get full list of tracks
 */
export const getters = {
  getTrackById: state => state.tracks.find(item => item.id === item),
  getActiveTrack: state => state.activeTrack,
  getActiveTrackIndex: state => state.activeTrackIndex,
  getTracks: state => state.tracks,
};

/**
 * Track Vuex Store Module Actions
 */
const actions = {
  /**
   * List tracks
   *
   * @returns {Promise} List of tracks
   */
  [TRACK_LIST]: ({ commit, }) => api.track.list()
    .then((response) => {
      commit(TRACK_LIST, response.data);
    }),

  /**
   * Search tracks
   *
   * @returns {Promise} List of founded tracks
   */
  [TRACK_SEARCH]: ({ commit, getters, }) =>
    api.track.list(getters.getSearchText).then((response) => {
      commit(TRACK_LIST, response.data);
    }),

  /**
   * Select the track in the list
   * @param {object} track - Track to be selected
   */
  [TRACK_SELECT]: ({ commit, }, track) => {
    commit(TRACK_SELECT, track);
  },

  /**
   * Buy the active track
   *
   * @param {object} track
   */
  [TRACK_BUY]: ({ commit, getters, }) => {
    api.track.buy({ track: getters.getActiveTrack, })
      .then(() => {
        commit(TRACK_BUY);
      });
  },
};

/**
 * Track method Vuex Store Module Mutations
 */
const mutations = {

  /**
   * Mutate the track list
   *
   * @param {object} state - state of the module
   * @param {Array} tracks - Array of tracks (API response)
   */
  [TRACK_LIST]: (state, tracks) => {
    state.tracks = [
      ...tracks,
    ];
  },

  /**
   * Mutate the state and set proper reference for state.activeTrack
   *
   * @param {object} state - state of the module
   * @param {object} track - track to be selected
   */
  [TRACK_SELECT]: (state, track) => {
    state.activeTrackIndex = state.tracks
      .findIndex(item => item.id === track.id);
    if (state.activeTrackIndex >= 0) {
      state.activeTrack = track;
    } else {
      state.activeTrackIndex = null;
      state.activeTrack = null;
    }
  },


  /**
   * Buy track
   *
   * @param {object} state - state of the module
   * @param {object} track - track to be selected
   */
  [TRACK_BUY]: (state) => {
    state.activeTrack.is_bought = true;
  },

  /**
   * When we send AUTH_LOGOUT action we then endup here, and reset the state
   * of the module to empty
   *
   * @param {object} state - state of the module
   */
  [AUTH_LOGOUT]: (state) => {
    state.tracks = [];
    state.activeTrack = null;
    state.activeTrackIndex = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
