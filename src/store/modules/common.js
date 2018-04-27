import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
} from '../types/common';

const state = {
  visible: false,
  message: '',
};


export const getters = {
  getNotificationVisible: state => state.visible,
  getNotificationMessage: state => state.message,
};

const actions = {
  [NOTIFICATION_SHOW]: ({ commit, }, message) => {
    commit(NOTIFICATION_SHOW, message);
  },

  [NOTIFICATION_HIDE]: ({ commit, }) => {
    commit(NOTIFICATION_HIDE);
  },
};

const mutations = {
  [NOTIFICATION_SHOW]: (state, message) => {
    state.message = message;
    state.visible = true;
  },

  [NOTIFICATION_HIDE]: (state) => {
    state.message = '';
    state.visible = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
