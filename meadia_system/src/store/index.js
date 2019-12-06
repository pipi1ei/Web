import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    provideId: ''
  },
  mutations: {
    updateProvideId(state, value) {
      state.provideId = value
    }
  }
})

export default store