import LoginForm from '../components/LoginForm.vue';
import Home from '../components/Home.vue';
import PagePayments from '../components/PagePayments.vue';

export const HOME_PAGE = '/';
export const LOGIN_PAGE = '/login';
export const PAYMENTS_PAGE = '/payments';

export default [
  {
    path: LOGIN_PAGE,
    name: 'login',
    component: LoginForm,
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
  },
];
