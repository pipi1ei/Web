import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
  baseURL: window.g.BASE_URL,
  timeout: 60 * 1000
})

// request 拦截
service.interceptors.request.use(config => {
  NProgress.start()
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// response 拦截
service.interceptors.response.use(response => {
  NProgress.done()
  const res = response.data
  if(res.code != '0000'){
    Message({
      message: res.desc,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(res.desc || 'error')
  }else{
    return res
  }
}, error => {
  console.log('err: ', error)
  Message({
    message: error || '系统异常',
    type: 'error',
    duration: 5 * 1000
  })
  NProgress.done()
  return Promise.reject(error)
})

export default service