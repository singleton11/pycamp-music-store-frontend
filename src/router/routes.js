import LoginForm from '@/components/LoginForm'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import PageAlbums from '@/components/PageAlbums'
import PageTracks from '@/components/PageTracks'

export const HOME_PAGE = '/'
export const LOGIN_PAGE = '/login'
export const DASHBOARD_PAGE = '/dashboard'
export const ALBUMS_PAGE = '/albums'
export const TRACKS_PAGE = '/tracks'

export default [
  {
    path: LOGIN_PAGE,
    name: 'login',
    component: LoginForm
  },
  {
    path: HOME_PAGE,
    name: 'home',
    component: Home
  },
  {
    path: DASHBOARD_PAGE,
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: ALBUMS_PAGE,
    name: 'albums',
    component: PageAlbums
  },
  {
    path: TRACKS_PAGE,
    name: 'tracks',
    component: PageTracks
  }
]
