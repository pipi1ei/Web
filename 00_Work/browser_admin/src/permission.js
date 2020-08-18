import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getUserId } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

// 免登录白名单
const whiteList = ['/login']
let hasAdd = false

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)

  const userId = getUserId()
  if (userId) {  // 判断用户是否登录
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      // 判断用户是否由权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        // 没有权限重新获取权限
        try {
          const roles = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (err) {
          // 获取权限出错
          await store.dispatch('user/resetUserId')
          Message.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {    // 没有登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})