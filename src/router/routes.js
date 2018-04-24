import LoginForm from '@/components/LoginForm'
import Dashboard from '@/components/Dashboard'

export const HOME_PAGE = '/'
export const DASHBOARD_PAGE = '/dashboard'

export default [
  {
    path: HOME_PAGE,
    name: 'Login',
    component: LoginForm
  },
  {
    path: DASHBOARD_PAGE,
    name: 'Dashboard',
    component: Dashboard
  }
]
