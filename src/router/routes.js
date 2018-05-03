import LoginForm from '../components/LoginForm.vue';
import Home from '../components/Home.vue';
import PagePayments from '../components/PagePayments.vue';
import PageTracks from '../components/PageTracks.vue';
import PageAlbums from '../components/PageAlbums.vue';
import store from '../store';

export const HOME_PAGE = '/';
export const LOGIN_PAGE = '/login';
export const PAYMENTS_PAGE = '/payments';
export const TRACKS_PAGE = '/tracks';
export const ALBUMS_PAGE = '/albums';


/**
 * Router checker: If user is authenticated
 */
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();

    return;
  }
  next({ name: 'login', });
};


/**
 * Router checker: If user is not authenticated
 */
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();

    return;
  }
  next({ name: 'payments', });
};

export default [
  {
    path: LOGIN_PAGE,
    name: 'login',
    component: LoginForm,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: HOME_PAGE,
    name: 'home',
    component: Home,
  },
  {
    path: PAYMENTS_PAGE,
    name: 'payments',
    component: PagePayments,
    beforeEnter: ifAuthenticated,
  },
  {
    path: TRACKS_PAGE,
    name: 'tracks',
    component: PageTracks,
    beforeEnter: ifAuthenticated,
  },
  {
    path: ALBUMS_PAGE,
    name: 'albums',
    component: PageAlbums,
    beforeEnter: ifAuthenticated,
  },
];
