import request from './request'

// 获取 url 白名单列表
export function getWhitelist({pageNum = 1, pageSize = 10, urlWhite = '', userName = '', startTime = '', endTime = ''} = {}){
  return request({
    url: '/urlWhite/getUrlWhilteList',
    method: 'post',
    data: {
      pageNum,
      pageSize,
      urlWhite,
      userName,
      startTime,
      endTime
    }
  })
}

// 删除白名单
export function deleteWhitelist(id = '') {  
  return request({
    url: '/urlWhite/deleteUrlWhite',
    method: 'post',
    data: {
      id
    }
  })
}

// 新增白名单
export function addWhiteList({urlWhite = '', userName = ''} = {}) {  
  return request({
    url: '/urlWhite/addUrlWhite',
    method: 'post',
    data: {
      urlWhite,
      userName
    }
  })
}