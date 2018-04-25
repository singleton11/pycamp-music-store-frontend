import LoginForm from '@/components/LoginForm'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

import store from '@/store/store'
import { AUTHENTICATED_GETTER } from '@/store/getter-types'

export const HOME_PAGE = '/'
export const LOGIN_PAGE = '/login'
export const DASHBOARD_PAGE = '/dashboard'

/**
 * Router Decorator: If user is not authenticated
 */
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters[AUTHENTICATED_GETTER]) {
    next()
    return
  }
  next(DASHBOARD_PAGE)
}

/**
 * Router Decorator: If user is authenticated
 */
const ifAuthenticated = (to, from, next) => {
  if (store.getters[AUTHENTICATED_GETTER]) {
    next()
    return
  }
  next(LOGIN_PAGE)
}

export default [
  {
    path: LOGIN_PAGE,
    name: 'login',
    component: LoginForm,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: HOME_PAGE,
    name: 'home',
    component: Home
  },
  {
    path: DASHBOARD_PAGE,
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: ifAuthenticated
  }
]
