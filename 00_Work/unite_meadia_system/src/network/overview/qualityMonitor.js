import { request } from '../request';

/**
 * 查询CP列表
 */
export function getCpInfo() {  
  return request({
    url: '/anhuimobile/getCpInfo',
    method: 'post',
  })
}

/**
 * 获取单个cp总览数据
 * @param {String} cpCode cp唯一id
 */
export function getCpSyncOverview(cpCode){
  cpCode = cpCode || '';
  log('获取单个cp总览数据,入参：',cpCode)
  return request({
    url: `/anhuimobile/getCpSyncOverview?cpCode=${cpCode}`,
    method: 'post'
  })
}