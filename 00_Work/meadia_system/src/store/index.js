import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    productName: []
  },
  mutations: {
    updateProductName(state, value) {
      state.productName = value
    }
  }
})

export default store