<template>
  <div id="app">
    {{ name }} ---- {{ id }} ---- {{ n }}
    <button @click="active()">click</button>
  </div>
</template>

<script>
import { reactive, computed, onMounted, toRefs } from '@vue/composition-api'

export default {
  // vue 3.0 为组件提供的新的属性。为 composition-api 提供了统一的入口
  // 第一个参数： props
  // 第二个参数：上下文对象
  setup(props, {root}){
    // 创建响应式数据，reactive 返回一个响应式对象
    const state = reactive({
      name: 'pipilei',
      id: 1,

      // 计算属性
      n: computed(() => state.id - 1)
    })
    
    // 定义方法，相当于vue2 中的 methods
    const active = () => {
      console.log(123)
      return state.id += 1
    }

    // return state; // 返回该响应式数据对象，供模板来使用
    return {
      // toRefs 函数可以将 reactive 创建出来的数据转化为响应式的数据，因为 es6的 扩展运算符和解构会将 reactive 的响应式取消掉
      ...toRefs(state),
      active
    }
  },
}
</script>

<style>

</style>
