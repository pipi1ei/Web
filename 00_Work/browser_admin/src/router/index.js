import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('views/404'),
    hidden: true
  },
  // 配置管理
  {
    path: '/',
    component: Layout,
    redirect: '/tag',
    alwaysShow: true,
    meta: { title: '配置管理', icon: 'configure' },
    children: [
      {
        path: 'tag',
        name: 'tag',
        component: () => import('views/tag/index'),
        meta: { title: '标签配置' }
      },
      {
        path: 'whitelist',
        name: 'whitelist',
        component: () => import('views/whitelist/index'),
        meta: { title: '白名单管理' }
      }
    ]
  },
  // 升级管理
  {
    path: '/upgrade',
    component: Layout,
    redirect: '/upgrade/single',
    alwaysShow: true,
    meta: { title: '升级管理', icon: 'component' },
    children: [
      {
        path: 'single',
        name: 'Single',
        component: () => import('views/upgrade/single/index'),
        meta: { title: '单点升级' }
      },
      {
        path: 'grayscale',
        name: 'Grayscale',
        component: () => import('views/upgrade/grayscale/index'),
        meta: { title: '灰度升级' }
      },
      {
        path: 'all',
        name: 'All',
        component: () => import('views/upgrade/all/index'),
        meta: { title: '全网升级' }
      }
    ]
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]

export const asyncRoutes = [
  // 账号管理
  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    meta: { roles: ['1'] },
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Account',
        component: () => import('views/account/index'),
        meta: { title: '账号管理', roles: ['1'] },
        hidden: true
      }
    ]
  },
  // {
  //   path: '/data',
  //   component: Layout,
  //   redirect: '/data/index',
  //   alwaysShow: true,
  //   meta: { title: '数据管理', icon: 'data', roles: ['1'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('views/data/index'),
  //       name: 'data',
  //       meta: {
  //         title: '数据统计',
  //         roles: ['1']
  //       }
  //     }
  //   ]
  // },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router