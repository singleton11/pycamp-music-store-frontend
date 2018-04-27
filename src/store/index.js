import Vuex from 'vuex'
import auth from './modules/auth'
import paymentMethod from './modules/paymentMethod'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    paymentMethod
  }
})
