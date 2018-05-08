import Vue from 'vue';
import store from './store/index';
import router from './router/router';
import App from './App.vue';

Vue.prototype.$eventHub = new Vue(); // global Event Bus

/* eslint-disable-next-line */
new Vue({
  el: '#app',
  store,
  router,
  components: { App, },
  template: '<App/>',
});
