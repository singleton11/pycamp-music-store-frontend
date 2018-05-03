import Vuex from 'vuex';
import Vue from 'vue';
import persistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import paymentMethod from './modules/paymentMethod';
import common from './modules/common';
import account from './modules/account';
import track from './modules/track';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    paymentMethod,
    common,
    account,
    track,
  },
  plugins: [
    persistedState({
      paths: [
        'auth',
      ],
    }),
  ],
});
