import { request } from './request'

/* 登录页的请求方法写在这里 */
export function login(username, password) {
  return request({
    url: '/system/login',
    method: 'post',
    data: {
      'userName': username,
      'password': password
    }
  })
}