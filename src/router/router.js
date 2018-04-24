import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: window.location.pathName,
  // linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
})

export default router
