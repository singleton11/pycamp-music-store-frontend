import api from '../../api';
import { AUTH_LOGIN, AUTH_LOGOUT } from '../types/auth';

/**
 * Auth Vuex Store Module State
 *
 * @property {string} token - user token
 * @property {bool} authenticated
 */
const state = {
  token: null,
  authenticated: false,
};

/**
 * Auth Vuex Store Module Getters
 *
 * @property {string} getToken - Get current token
 * @property {bool} isAuthenticated
 */
export const getters = {
  getToken: st => st.token,
  isAuthenticated: st => st.authenticated,
};

/**
 * Auth Vuex Store Module Actions
 */
const actions = {
  /**
   * @param user - credentials of the user
   */
  [AUTH_LOGIN]: ({ commit }, user) => api.auth.login(user.email, user.password).then((response) => {
    commit(AUTH_LOGIN, response.data.key);
  }),
  [AUTH_LOGOUT]: ({ commit }) => api.auth.logout().then(() => {
    commit(AUTH_LOGOUT);
  }),
};

/**
 * Auth Vuex Store Module Mutations
 */
const mutations = {
  [AUTH_LOGIN]: (st, token) => {
    st.token = token;
    st.authenticated = true;
  },

  [AUTH_LOGOUT]: (st) => {
    st.token = null;
    st.authenticated = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
