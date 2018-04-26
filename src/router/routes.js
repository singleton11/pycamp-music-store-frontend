import LoginForm from '@/components/LoginForm'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import PagePayments from '@/components/PagePayments'

export const HOME_PAGE = '/'
export const LOGIN_PAGE = '/login'
export const DASHBOARD_PAGE = '/dashboard'
export const PAYMENTS_PAGE = '/payments'

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
    path: PAYMENTS_PAGE,
    name: 'payments',
    component: PagePayments
  }
]
