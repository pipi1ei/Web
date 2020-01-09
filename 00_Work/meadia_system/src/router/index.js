import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('components/login/Login')
const Home = () => import('views/home/Home')
const HomeMain = () => import('views/home/children/HomeMain')

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/home/search',
    children: [
      {
        path: '/home/search',
        component: HomeMain
      }
    ]
  }
]

const router = new Router({
  routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('productName')
  if (token) {
    next()
  } else if (to.path === '/login') {
    next()
  } else {
    window.sessionStorage.clear();
    next('/login')
  }
})

export default router