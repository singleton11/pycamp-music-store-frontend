import api from '../../api';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, } from '../types/auth';

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
  getToken: state => state.token,
  isAuthenticated: state => state.authenticated,
};

/**
 * Auth Vuex Store Module Actions
 */
const actions = {
  /**
   * @param user - credentials of the user
   */
  [AUTH_LOGIN]: ({ commit, }, user) => api.auth.login(user.email, user.password)
    .then((response) => {
      if (response.data) {
        commit(AUTH_LOGIN, response.data.key);

        return response;
      }
      throw response;
    }),

  /**
   * Logout user from app
   */
  [AUTH_LOGOUT]: ({ commit, }) => api.auth.logout().then(() => {
    commit(AUTH_LOGOUT);
  }),

  /**
   * Register new user from credentials
   *
   * @param user - credentials of the user
   */
  /* eslint-disable-next-line */
  [AUTH_REGISTER]: ({ commit }, user) => {
    return api.auth.register(user).then(response => response.data);
  },
};

/**
 * Auth Vuex Store Module Mutations
 */
const mutations = {
  [AUTH_LOGIN]: (state, token) => {
    state.token = token;
    state.authenticated = true;
  },

  [AUTH_LOGOUT]: (state) => {
    state.token = null;
    state.authenticated = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
