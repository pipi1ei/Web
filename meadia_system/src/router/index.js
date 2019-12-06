import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('components/login/Login')
const Search = () => import('components/search/Search')
// const Details = () => import('views/details/Details')
const Home = () => import('views/home/Home')
const HomeMain = () => import('views/home/children/HomeMain')

Vue.use(Router)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  // { path: '/details', component: Details },
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
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('provideId')
  if (token){
    next()
  } else if(to.path === '/login'){
    next()
  }else{
    next('/login')
  }
  // next()
})

export default router