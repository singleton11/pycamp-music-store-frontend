import PageEditableUsers from '../components/PageEditableUsers.vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import Home from '../components/Home.vue';
import PagePayments from '../components/PagePayments.vue';
import PageTracks from '../components/PageTracks.vue';
import PageAlbums from '../components/PageAlbums.vue';
import PageTransactions from '../components/PageTransactions.vue';
import { CheckAuthorization, CheckAuthorizationFalse, CheckAdmin} from './utils';

export const HOME_PAGE = '/';
export const LOGIN_PAGE = '/login';
export const REGISTER_PAGE = '/register';
export const PAYMENTS_PAGE = '/payments';
export const TRACKS_PAGE = '/tracks';
export const ALBUMS_PAGE = '/albums';
export const TRANSACTIONS_PAGE = '/transactions';

export const EDIT_USERS_PAGE = '/edit-users';


export default [
  {
    path: LOGIN_PAGE,
    name: 'login',
    component: LoginForm,
    beforeEnter: CheckAuthorizationFalse,
  },
  {
    path: REGISTER_PAGE,
    name: 'register',
    component: RegisterForm,
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
  {
    path: ALBUMS_PAGE,
    name: 'albums',
    component: PageAlbums,
    beforeEnter: CheckAuthorization,
  },
  {
    path: TRANSACTIONS_PAGE,
    name: 'transactions',
    component: PageTransactions,
    beforeEnter: CheckAuthorization,
  },
  {
    path: EDIT_USERS_PAGE,
    name: 'edit-users',
    component: PageEditableUsers,
    beforeEnter: CheckAdmin,
  },
];
