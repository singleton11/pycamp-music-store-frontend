import LoginForm from '@/components/LoginForm'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

export const HOME_PAGE = '/'
export const LOGIN_PAGE = '/login'
export const DASHBOARD_PAGE = '/dashboard'

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
  }
]
