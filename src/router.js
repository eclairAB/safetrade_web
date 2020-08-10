import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('./components/pages-landing/Login.vue')
const Signup = () => import('./components/pages-landing/Signup.vue')
const ChartPage = () => import('./components/pages-dashboard/ChartPage.vue')
const Contact = () => import('./components/pages-dashboard/Contact.vue')
const Dashboard = () => import('./components/pages-dashboard/Dashboard.vue')
const Market = () => import('./components/pages-dashboard/TradeMarket.vue')
const Profile = () => import('./components/pages-dashboard/Profile.vue')
const Requests = () =>
  import('./components/pages-dashboard/admin-req/Requests.vue')
const Transactions = () =>
  import('./components/pages-dashboard/Transactions.vue')
const Wallet = () => import('./components/pages-dashboard/Wallet.vue')

const PageNotFound = () => import('./pages/PageNotFound')

// ------------------------------------------------------------------------------------------
Vue.use(Router)

const router = new Router({
  mode: 'history', // This will remove the `#/` in the url
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        guestRequired: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        guestRequired: true,
      },
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        loginRequired: true,
      },
      children: [
        {
          path: '/',
          name: 'wallet',
          component: Wallet,
        },
        {
          path: '/trade-market',
          name: 'trade-market',
          component: Market,
        },
        {
          path: '/transactions',
          name: 'transactions',
          component: Transactions,
        },
        {
          path: '/contact',
          name: 'contact',
          component: Contact,
        },
        {
          path: '/profile',
          name: 'profile',
          component: Profile,
        },
        {
          path: '/chart-page',
          name: 'chart-page',
          component: ChartPage,
        },
        // Admin routes
        {
          path: '/requests',
          name: 'requests',
          component: Requests,
          meta: {
            adminRequired: true,
          },
        },
      ],
    },
    { path: '*', component: PageNotFound },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.loginRequired)) {
    if (localStorage.getItem('token') == null) {
      next({
        name: 'login',
        params: { nextUrl: to.fullPath },
      })
    } else {
      if (to.matched.some((record) => record.meta.adminRequired)) {
        const user = JSON.parse(localStorage.getItem('user') || {})
        if (user.is_staff || user.is_superuser) {
          next()
        } else {
          next({ name: 'wallet' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some((record) => record.meta.guestRequired)) {
    if (localStorage.getItem('token')) {
      next({
        name: 'wallet',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
