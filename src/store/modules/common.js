import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
  NOTIFICATION_SHOW_WARNING,
  NOTIFICATION_SHOW_DANGER,
  NOTIFICATION_SHOW_SUCCESS,
  NOTIFICATION_SHOW_INFO,
  NOTIFICATION_SET_TIMER,
} from '../types/common';

const state = {
  // Notification
  visible: false,
  level: '',
  message: '',
  timer: null,
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
   * @param data.message - message to show
   * @param data.level - message level
   */
  [NOTIFICATION_SHOW]: ({ commit, }, data) => {
    commit(NOTIFICATION_SHOW, data);

    const t = setTimeout(() => {
      commit(NOTIFICATION_HIDE);
    }, 10000);

    commit(NOTIFICATION_SET_TIMER, t);
  },

  /**
   * Actions for show notification with defined level
   *
   * @param message - message to show
   */
  [NOTIFICATION_SHOW_WARNING]: ({ dispatch, }, message) => {
    dispatch(NOTIFICATION_SHOW, { message, level: 'warning', });
  },
  [NOTIFICATION_SHOW_DANGER]: ({ dispatch, }, message) => {
    dispatch(NOTIFICATION_SHOW, { message, level: 'danger', });
  },
  [NOTIFICATION_SHOW_SUCCESS]: ({ dispatch, }, message) => {
    dispatch(NOTIFICATION_SHOW, { message, level: 'success', });
  },
  [NOTIFICATION_SHOW_INFO]: ({ dispatch, }, message) => {
    dispatch(NOTIFICATION_SHOW, { message, level: 'info', });
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

  /**
   * Mutation for delete old timer and set new timer to close notification
   */
  [NOTIFICATION_SET_TIMER]: (state, timer) => {
    clearTimeout(state.timer);
    state.timer = timer;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
