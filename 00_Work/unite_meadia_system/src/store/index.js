import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 用户信息
    userInfo: {},
    // 当前牌照商信息
    currentCp: {},
    //媒资详情页信息
    mediaDetails: {}
  },
  mutations: {
    updateUserInfo(state, value) {
      state.userInfo = value
    },
    updateCurrentCp(state,value){
      state.currentCp = value
    },
    saveMediaDetails(state, value) {
      state.mediaDetails = value
    }
  }
})

export default store