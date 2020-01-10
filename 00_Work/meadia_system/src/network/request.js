import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'

axios.defaults.baseURL = window.g.requestUrl
axios.defaults.timeout = 5000

/* 拦截请求 */
axios.interceptors.request.use(config => {
  NProgress.start();
  return config
}, err => {
  console.log(err)
})

/* 拦截响应 */
axios.interceptors.response.use(response => {
  NProgress.done()
  const res = response.data;
  if (res.code == '0000') {
    return res
  } else if (res.code == '0103') {
    Message({
      message: '账号或者密码错误，请重新登录',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject('error')
  } else {
    Message({
      message: res.desc || '系统出错啦',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject('error')
  }
}, err => {
  console.log(err)
  NProgress.done();
  Message({
    message: '请求失败，过会再试试吧',
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(err)
})

export function request(config) {
  return axios(config)
}