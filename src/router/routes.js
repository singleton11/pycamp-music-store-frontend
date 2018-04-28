import LoginForm from '../components/LoginForm.vue';
import Home from '../components/Home.vue';
import PagePayments from '../components/PagePayments.vue';
import store from '../store';

export const HOME_PAGE = '/';
export const LOGIN_PAGE = '/login';
export const PAYMENTS_PAGE = '/payments';


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
];
