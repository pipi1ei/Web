import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'

// 网络请求url放到单独的配置文件中
axios.defaults.baseURL = window.g.requestUrl;

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
  } else if (res.code == '9999') {
    console.log('请求异常');
    Message({
      message: res.desc || '请求异常',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject('请求异常')
  } else if (res.code == '0001'){
    console.log('参数非法');
    Message({
      message: res.desc || '参数非法',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject('参数非法')
  }else {
    console.log(res)
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