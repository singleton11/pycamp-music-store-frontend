import Vuex from 'vuex';
import Vue from 'vue';
import persistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import paymentMethod from './modules/paymentMethod';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    paymentMethod,
  },
  plugins: [
    persistedState({
      paths: ['auth'],
    }),
  ],
});
