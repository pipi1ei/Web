import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建 axios 实例
const service = axios.create({
  baseURL: window.g.baseURL,
  timeout: 60 * 1000
})

// request拦截器
service.interceptors.request.use(config => {
  NProgress.start()
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code != '0000') {
    Message({
      message: res.desc,
      type: 'error',
      duration: 5 * 1000
    })
    NProgress.done()
    return Promise.reject(res.desc || 'error')
  } else {
    NProgress.done()
    return response.data
  }
}, error => {
  console.log('err: ', error)
  Message({
    message: error || '系统异常',
    type: 'error',
    duration: 5 * 1000
  })
  NProgress.done()
})

export default service