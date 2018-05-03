import LoginForm from '../components/LoginForm.vue';
import Home from '../components/Home.vue';
import PagePayments from '../components/PagePayments.vue';
import PageTracks from '../components/PageTracks.vue';
import { CheckAuthorization, CheckAuthorizationFalse, } from './utils';


export const HOME_PAGE = '/';
export const LOGIN_PAGE = '/login';
export const PAYMENTS_PAGE = '/payments';
export const TRACKS_PAGE = '/tracks';


export default [
  {
    path: LOGIN_PAGE,
    name: 'login',
    component: LoginForm,
    beforeEnter: CheckAuthorizationFalse,
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
    beforeEnter: CheckAuthorization,
  },
  {
    path: TRACKS_PAGE,
    name: 'tracks',
    component: PageTracks,
    beforeEnter: CheckAuthorization,
  },
];
