// 根级别的 mutation
const mutations = {
  increment(state, value) {
    state.counter += value;
  },
  decrement(state, value) {
    state.counter -= value;
  },
  updateInfo(state) {
    state.info.name = 'guapi'

    // state.info['address'] = 'hefei'; // 这种方式修改 state 种的值不会响应式改变
    // Vue.set(state.info,'address','anhui')
  }
}

export default mutations