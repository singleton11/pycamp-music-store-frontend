// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import Store from './store/store'
import router from './router/router'

Vue.config.productionTip = false

Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: Store,
  router,
  components: { App },
  template: '<App/>'
})
