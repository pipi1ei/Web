// 标签配置接口

import request from './request'

// 获取标签列表数据
export function getTagList({ pageNum = 1, pageSize = 10, userName = '', startTime = '', endTime = '', tagName = '', tagUrl = '', } = {}) {
  return request({
    url: '/tagUrl/getTagUrlList',
    method: 'post',
    data: {
      pageNum,
      pageSize,
      userName,
      startTime,
      endTime,
      tagName,
      tagUrl,
    }
  })
}

// 新增标签
export function addTag({ tagName = '', tagUrl = '', urlWhite = '', info = '', userName = '' } = {}) {
  return request({
    url: '/tagUrl/addTagUrl',
    method: 'post',
    data: {
      tagName,
      tagUrl,
      urlWhite,
      info,
      userName
    }
  })
}

// 删除标签
export function deleteTag(id = '') {
  return request({
    url: '/tagUrl/deleteTagUrl',
    method: 'post',
    data: {
      id
    }
  })
}