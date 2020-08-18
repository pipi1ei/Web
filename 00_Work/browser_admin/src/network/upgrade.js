// 升级相关接口

import request from './request'

/* ------------------------- 单点升级 ------------------------- */
// 获取单点升级列表
export function getSingleUpgrade({ channelId = 'C340201', pageNum = 1, pageSize = 10 } = {}) {
  return request({
    url: '/upgrade/getSingleUpgrade',
    method: 'post',
    data: {
      channelId,
      pageNum,
      pageSize
    }
  })
}

// 新增单点升级
export function addSingleUpgrade({ channelId = 'C340201', strategyType = 'stbid', strategyValue = '', upgradeInfo = '', description = '' } = {}) {
  return request({
    url: '/upgrade/addSingleUpgrade',
    method: 'post',
    data: {
      channelId,
      strategyType,
      strategyValue,
      upgradeInfo,
      description
    }
  })
}

// 删除单点升级
export function deleteSingleUpgrade({ channelId = 'C340201', strategyType = 'stbid', strategyValue = '' } = {}) {
  return request({
    url: '/upgrade/deleteSingleUpgrade',
    method: 'post',
    data: {
      channelId,
      strategyType,
      strategyValue
    }
  })
}

/* ------------------------- 灰度升级 ------------------------- */
// 获取灰度升级列表
export function getGrayscaleUpgrade({ channelId = 'C340201', pageNum = 1, pageSize = 10 } = {}) {
  return request({
    url: '/upgrade/getGrayscaleUpgrade',
    method: 'post',
    data: {
      channelId,
      pageNum,
      pageSize
    }
  })
}

// 新增灰度升级
export function addGrayscaleUpgrade({ channelId = 'C340201', strategyType = '型号', strategyValue = '', upgradeCount = '0', upgradeInfo = '', status = '1', description = '' } = {}) {
  return request({
    url: '/upgrade/addGrayscaleUpgrade',
    method: 'post',
    data: {
      channelId,
      strategyType,
      strategyValue,
      upgradeCount,
      upgradeInfo,
      status,
      description
    }
  })
}

// 删除灰度升级
export function deleteGrayscaleUpgrade({ channelId = 'C340201', strategyType = '型号', strategyValue = '' } = {}) {
  return request({
    url: '/upgrade/deleteGrayscaleUpgrade',
    method: 'post',
    data: {
      channelId,
      strategyType,
      strategyValue
    }
  })
}

// 更新灰度升级
export function updateGrayscaleUpgrade({ channelId = 'C340201', strategyType = '型号', strategyValue = '', upgradeCount = '', upgradeInfo = '', status = '', description = '' } = {}) {
  return request({
    url: '/upgrade/updateGrayscaleUpgrade',
    method: 'post',
    data: {
      channelId,
      strategyType,
      strategyValue,
      upgradeCount,
      upgradeInfo,
      status,
      description
    }
  })
}

/* ------------------------- 全网升级 ------------------------- */
// 获取全网升级列表
export function getGlobalUpgrade({ channelId = 'C340201', pageNum = 1, pageSize = 10 } = {}) {
  return request({
    url: '/upgrade/getGlobalUpgrade',
    method: 'post',
    data: {
      channelId,
      pageNum,
      pageSize
    }
  })
}

// 新增灰度升级
export function addGlobalUpgrade({ channelId = 'C340201', strategyType = '型号', strategyValue = '', upgradeInfo = '', status = '1', description = '' } = {}) {
  return request({
    url: '/upgrade/addGlobalUpgrade',
    method: 'post',
    data: {
      channelId,
      strategyType,
      strategyValue,
      upgradeInfo,
      status,
      description
    }
  })
}

// 删除全网升级
export function deleteGlobalUpgrade({ channelId = 'C340201', strategyType = '型号', strategyValue = '' } = {}) {
  return request({
    url: '/upgrade/deleteGlobalUpgrade',
    method: 'post',
    data: {
      channelId,
      strategyType,
      strategyValue
    }
  })
}

// 更新全网升级
export function updateGlobalUpgrade({ channelId = 'C340201', strategyType = '型号', strategyValue = '', upgradeInfo = '', status = '', description = '' } = {}) {
  return request({
    url: '/upgrade/updateGlobalUpgrade',
    method: 'post',
    data: {
      channelId,
      strategyType,
      strategyValue,
      upgradeInfo,
      status,
      description
    }
  })
}