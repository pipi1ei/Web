import axios from 'axios'

export function request(config) {  
  // 1. 创建 axios 实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 10 * 1000
  })

  // 2. axios 请求拦截
  instance.interceptors.request.use(config => {
    return config
  },
  err => {
    console.log(err)
  })

  // 3 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 4 发送请求
  return instance(config)
}