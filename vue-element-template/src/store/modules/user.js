import { login, logout, getInfo } from '@/network/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo){
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password}).then(res => {
        const { data } = res
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 登录后获取用户信息
  getInfo({commit, state}){
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(res => {
        const { data } = res
        if(!data){
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },


  logout({commit, state}){
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }){
    return new Promise(resolve => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}