<template>
  <div id="app">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App'
}

// axios 基本使用
// axios({
//   url: 'http://123.207.32.32:8000/home/multidata',
//   method: 'get'
// }).then(res => {
//   console.log(res)
// })

// axios({
//   url: 'http://123.207.32.32:8000/home/data',
//   // 专门针对 get 请求的参数拼接
//   params: {
//     type: 'pop',
//     page: '1'
//   }
// }).then(res => console.log(res))

// 2. axios 发送并发请求
axios.defaults.baseURL = 'http://123.207.32.32:8000';
axios.defaults.timeout = 5000

axios.all([
  axios({
    url: '/home/multidata'
  }),
  axios({
    url: '/home/data',
    params: {
      type: 'pop',
      page: 1
    }
  })
]).then(results => {
  console.log(results)
})

// 创建 axios 实例
const instance1 = axios.create({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 5000
})

instance1({
  url: '/home/multidata'
}).then(res => {
  console.log(res)
})

const instance2 = axios.create({
  baseURL: '111.222.222.111',
  timeout: 10000
})

instance2({
  url: '/home/data',
  params: {
    type: 'pop',
    page: 1
  }
}).then(res => {
  console.log(then)
})

</script>

<style>
</style>
