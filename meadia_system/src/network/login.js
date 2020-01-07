import { request } from './request'

// export function login(username, password) {
//   return request({
//     url: '/login',
//     method: 'post',
//     data: {
//       'userName': username,
//       'password': password
//     }
//   })
// }

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      'userName': username,
      'password': password
    }
  })
}