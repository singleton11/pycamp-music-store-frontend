// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
import Vue from 'vue';
import store from './store/index';
import router from './router/router';
import App from './App.vue';

/* eslint-disable-next-line */
new Vue({
  el: '#app',
  store,
  router,
  components: { App, },
  template: '<App/>',
});
