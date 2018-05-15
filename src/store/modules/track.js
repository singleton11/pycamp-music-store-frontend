import api from '../../api';

import {
  TRACK_BUY,
  TRACK_LIST,
  TRACK_SELECT,
  TRACK_UNSELECT,
  TRACK_GET_BY_ID,
  TRACK_ADD_TO_LIST,
  TRACK_LIKE,
} from '../types/track';

import { AUTH_LOGOUT, } from '../types/auth';
import { ACCOUNT_DECREASE_BALANCE, } from '../types/account';

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
  getTrackById: state => trackId =>
    state.tracks.find(item => item.id === trackId),
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
   * @param {string} search - search text
   * @param {number} page - current page
   * @returns {Promise} - count of tracks
   */
  [TRACK_LIST]: ({ commit, }, { search, page, }) => api.track.list({
    search, page,
  }).then((response) => {
    commit(TRACK_LIST, response.data.results);

    return response.data.count;
  }),

  /**
   * Get track by ID
   *
   * @returns {Promise} Track info
   */
  [TRACK_GET_BY_ID]: ({ commit, getters, }, trackId) => {
    const track = getters.getTrackById(trackId);

    if (track) {
      return track;
    }

    return api.track.getById({ trackId, }).then((response) => {
      commit(TRACK_ADD_TO_LIST, response.data);

      return response.data;
    });
  },

  /**
   * Select the track in the list
   *
   * @param {object} track - Track to be selected
   */
  [TRACK_SELECT]: ({ commit, }, track) => {
    commit(TRACK_SELECT, track);
  },

  /**
   * Unselect the track
   */
  [TRACK_UNSELECT]: ({ commit, }) => {
    commit(TRACK_UNSELECT);
  },

  /**
   * Buy the active track
   */
  [TRACK_BUY]: ({ commit, getters, dispatch, }) => api.track.buy({
    track: getters.getActiveTrack,
    payment: getters.getActivePaymentMethod,
  }).then((data) => {
    const fullContent = data.data.content;

    commit(TRACK_BUY, fullContent);
    dispatch(ACCOUNT_DECREASE_BALANCE, getters.getActiveTrack.price);
  }),

  /**
   * Like or Unlike active track
   */
  [TRACK_LIKE]: ({ commit, getters, }) => {
    const track = getters.getActiveTrack;

    if (track.is_liked) {
      // delete like
      return api.track.unlike({ track, }).then((data) => {
        commit(TRACK_LIKE, false);

        return data;
      });
    }

    // set like
    return api.track.like({ track, }).then((data) => {
      commit(TRACK_LIKE, true);

      return data;
    });
  },
};

/**
 * Track Vuex Store Module Mutations
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
   * Add track to list
   *
   * @param {object} state - state of the module
   * @param {Array} tracks - Array of tracks (API response)
   */
  [TRACK_ADD_TO_LIST]: (state, track) => {
    state.tracks.push(track);
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
   * Mutate the state and set proper reference for state.activeTrack
   *
   * @param {object} state - state of the module
   */
  [TRACK_UNSELECT]: (state) => {
    state.activeTrack = null;
    state.activeTrackIndex = null;
  },

  /**
   * Buy track and mutate it's content
   *
   * @param {object} state - state of the module
   * @param {string} fullContent - full content of track
   */
  [TRACK_BUY]: (state, fullContent) => {
    state.activeTrack.is_bought = true;
    state.activeTrack.content = fullContent;
  },

  /**
   * Like or Unlike track track
   *
   * @param {object} state - state of the module
   * @param {bool} like - like track (true) or unlike (false)
   */
  [TRACK_LIKE]: (state, like) => {
    state.activeTrack.is_liked = like;
    state.activeTrack.count_likes += like ? 1 : -1;
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
