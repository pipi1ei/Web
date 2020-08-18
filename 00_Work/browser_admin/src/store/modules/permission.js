import { constantRoutes, asyncRoutes } from '@/router'

/**
 * 判断用户是否有权限
 * @param roles 路由
 * @param route 当前用户的权限
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归添加动态路由
 * @param routes 动态路由表
 * @param roles 当前用户的权限
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes,
      state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessRoutes
      if (roles.includes('1')) {
        accessRoutes = asyncRoutes || []
      } else {
        accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}