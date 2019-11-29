import axios from 'axios'
import { resolve } from 'dns'


// 1. 封装方式1
export function request(config) {  
  //1. 创建 axios 实例
  // const instance = axios.create({
  //   baseURL: 'http://123.207.32.32',
  //   timeout: 10*1000
  // })

  return new Promise((resolve,reject) => {
    const instance = axios.create({
      baseURL: 'http://123.207.32.32',
      timeout: 10 * 1000
    })

    instance(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 封装方式2
export function request(config) {
  //1. 创建 axios 实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32',
    timeout: 10*1000
  })

  return instance(config)

  // return new Promise((resolve, reject) => {
  //   instance(config)
  //     .then(res => {
  //       resolve(res)
  //     })
  //     .catch(err => {
  //       reject(err)
  //     })
  // })
}