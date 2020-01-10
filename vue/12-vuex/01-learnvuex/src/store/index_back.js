import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

const store = new Vuex.Store({
  // 保存状态
  state: {
    counter: 1000,
    students: [
      {id:1, name: 'pipilei', age: 18},
      {id:2, name: 'zhangsan', age: 22},
      {id:3, name: 'lisi', age: 19},
      {id:4, name: 'wangwu', age: 23},
      {id:5, name: 'guapi', age: 25},
    ],
    info: {
      name: 'pipilei',
      age: 18,
      height: 180
    }
  },
  // 定义一些方法，可以改变state 中的属性
  mutations: {
    increment(state,value){
      state.counter += value;
    },
    decrement(state, value){
      state.counter -= value;
    },
    updateInfo(state){
      state.info.name = 'guapi'

      // state.info['address'] = 'hefei'; // 这种方式修改 state 种的值不会响应式改变
      // Vue.set(state.info,'address','anhui')
    }
  },
  actions: {
    aUpdateInfo(context, payload){ 
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('updateInfo')
          console.log(payload)
          resolve('里面已经完成了');
        }, 1000);
      })
    }
  },
  // 类似于组件中的计算属性
  getters: {
    // 参数 state 就是 Vuex.Store 实例中的 state
    powCounter(state){
      return state.counter * state.counter
    },
    ageHeigh20(state) {
      return state.students.filter(value => value.age > 20)
    },

    // getters 就是当前的 getters 对象
    ageHeigh20Counts(state, getters){
      return getters.ageHeigh20.length
    },
    ageHigh(state){
      return function (age) {  
        return state.students.filter(value => value.age > age)
      }
    }
  },

  // 将 store 里的数据再进行模块划分
  modules: {
    a: {
      state: {},
      mutations: {},
      actions: {},
      getters: {}
    },
    b: {
      state: {},
      mutations: {},
      actions: {},
      getters: {}
    }
  }
})

export default store