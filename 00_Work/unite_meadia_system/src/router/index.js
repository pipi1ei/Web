import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('components/login/Login');
const Layout = () => import('components/Layout');

// 媒资数据概览相关组件
const MediaOverview = () => import('views/overview/media_overview/MediaOverview');
const MediaQualityMonitor = () => import('views/overview/monitor/MediaQualityMonitor');

// 媒资管理相关组件
const MediaList = () => import('views/manage/list/MediaList');
const MediaDetails = () => import('views/manage/details/MediaDetails');

// 媒资运营相关组件
const MediaOnline = () => import('views/operation/online/MediaOnline');
const MediaOffline = () => import('views/operation/offline/MediaOffline');
const MediaEliminate = () => import('views/operation/eliminate/MediaEliminate');

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/layout',
    component: Layout,
    redirect: '/manage/list',
    children: [
      {
        path: '/overview/media_overview',
        component: MediaOverview
      },
      {
        path: '/overview/monitor',
        component: MediaQualityMonitor
      },
      {
        path: '/manage/list',
        component: MediaList
      },
      {
        path: '/manage/details',
        component: MediaDetails
      },
      {
        path: '/operate/online',
        component: MediaOnline
      },
      {
        path: '/operate/offline',
        component: MediaOffline
      },
      {
        path: '/operate/eliminate',
        component: MediaEliminate
      },
    ]
  }
]

const router = new Router({
  routes,
  mode: 'hash'
})

/* 路由前先判断是否登录，未登录路由到登录页 */
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('userInfo')
  if (token || to.path === '/login') {
    next()
  } else {
    window.sessionStorage.clear();
    next('/login')
  }
})

export default router