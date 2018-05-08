import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
  NOTIFICATION_SHOW_WARNING,
  NOTIFICATION_SHOW_DANGER,
  NOTIFICATION_SHOW_SUCCESS,
  NOTIFICATION_SHOW_INFO,
} from '../types/common';

const state = {
  // Notification
  visible: false,
  level: '',
  message: '',
};


export const getters = {
  getNotificationVisible: state => state.visible,
  getNotificationMessage: state => state.message,
  getNotificationLevel: state => state.level,
};

const actions = {
  /**
   * Action for show default notification
   *
   * @param message - message to show
   */
  [NOTIFICATION_SHOW]: ({ dispatch, }, message) => {
    dispatch(NOTIFICATION_SHOW_INFO, message);
  },

  /**
   * Actions for show notification with defined level
   *
   * @param message - message to show
   */
  [NOTIFICATION_SHOW_WARNING]: ({ commit, }, message) => {
    commit(NOTIFICATION_SHOW, { message, level: 'warning', });
  },
  [NOTIFICATION_SHOW_DANGER]: ({ commit, }, message) => {
    commit(NOTIFICATION_SHOW, { message, level: 'danger', });
  },
  [NOTIFICATION_SHOW_SUCCESS]: ({ commit, }, message) => {
    commit(NOTIFICATION_SHOW, { message, level: 'success', });
  },
  [NOTIFICATION_SHOW_INFO]: ({ commit, }, message) => {
    commit(NOTIFICATION_SHOW, { message, level: 'info', });
  },

  /**
   * Action for hide notification
   */
  [NOTIFICATION_HIDE]: ({ commit, }) => {
    commit(NOTIFICATION_HIDE);
  },
};

const mutations = {
  /**
   * Mutation for set notification text, level and visible of notification
   *
   * @param state - current state
   * @param message - notification message
   * @param level - notification level
   */
  [NOTIFICATION_SHOW]: (state, { message, level, }) => {
    state.message = message;
    state.level = level;
    state.visible = true;
  },

  /**
   * Mutation for hide notification
   */
  [NOTIFICATION_HIDE]: (state) => {
    state.message = '';
    state.level = '';
    state.visible = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
