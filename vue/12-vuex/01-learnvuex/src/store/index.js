import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

const state = {
  counter: 1000,
  students: [
    { id: 1, name: 'pipilei', age: 18 },
    { id: 2, name: 'zhangsan', age: 22 },
    { id: 3, name: 'lisi', age: 19 },
    { id: 4, name: 'wangwu', age: 23 },
    { id: 5, name: 'guapi', age: 25 },
  ],
  info: {
    name: 'pipilei',
    age: 18,
    height: 180
  }
}

const modules = {
  cart,
  products
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})

export default store