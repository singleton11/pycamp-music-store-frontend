import LoginForm from '@/components/LoginForm'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import PageAlbums from '@/components/PageAlbums'
import PageAlbumDetail from '@/components/PageAlbumDetail'
import PageTracks from '@/components/PageTracks'

import store from '@/store/store'
import { AUTHENTICATED_GETTER } from '@/store/getter-types'

export const HOME_PAGE = '/'
export const LOGIN_PAGE = '/login'
export const DASHBOARD_PAGE = '/dashboard'
export const ALBUMS_PAGE = '/albums'
export const ALBUM_DETAIL_PAGE = '/albums/:id'
export const TRACKS_PAGE = '/tracks'

/**
 * Router checker: If user is not authenticated
 */
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters[AUTHENTICATED_GETTER]) {
    next()
    return
  }
  next({name: 'dashboard'})
}

/**
 * Router checker: If user is authenticated
 */
const ifAuthenticated = (to, from, next) => {
  if (store.getters[AUTHENTICATED_GETTER]) {
    next()
    return
  }
  next({name: 'login'})
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
    component: Dashboard
  },
  {
    path: ALBUMS_PAGE,
    name: 'albums',
    beforeEnter: ifAuthenticated,
    component: PageAlbums
  },
  {
    path: TRACKS_PAGE,
    name: 'tracks',
    beforeEnter: ifAuthenticated,
    component: PageTracks
  },
  {
    path: ALBUM_DETAIL_PAGE,
    name: 'albumDetail',
    beforeEnter: ifAuthenticated,
    component: PageAlbumDetail
  }
]
