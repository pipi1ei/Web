import { login, logout, getInfo, updatePassword } from 'network/user'
import { getUserId, setUserId, removeUserId } from 'utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    name: '',                 // 账户名
    password: '',             // 密码
    roles: [],                // 权限。1：root权限， 2：普通用户
    userId: getUserId()       // 用户ID，记录用户是否登录
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PASSWORD: (state, password) => {
    state.password = password
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        userName: username.trim(),
        password: password
      }).then(res => {
        log('login: res = ', res)
        const { data } = res
        commit('SET_NAME', username)
        commit('SET_PASSWORD', password)
        commit('SET_USERID', data.userId)
        setUserId(data.userId)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const userId = state.userId || getUserId()
      getInfo(userId).then(res => {
        log('getInfo: res = ', res)
        const { data } = res
        if (!data) {
          reject('验证失败，请重新登录')
        }

        const { roleId, userName, password } = data
        commit('SET_ROLES', JSON.parse(roleId || '[]'))
        commit('SET_NAME', userName)
        commit('SET_PASSWORD', password)
        resolve(JSON.parse(roleId || '[]'))
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeUserId()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // 重置 userId
  resetUserId({ commit }) {
    return new Promise(resolve => {
      removeUserId()
      commit('RESET_STATE')
      resolve()
    })
  },

  // 修改密码
  updatePassword(context, userInfo) {
    log('updatePassword', userInfo)
    const { userId, password, newPassword } = userInfo
    return new Promise((resolve, reject) => {
      updatePassword({ userId, password, newPassword })
        .then(res => {
          resolve()
        }).catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}