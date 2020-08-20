import { request } from '../request';

/** 
 * 获取媒资数据概况 
 */
export function getOverviewData() {  
  return request({
    url: '/anhuimobile/getSyncOverview',
    method: 'post'
  })
}

/**
 * 查询CP排行榜
 */
export function getCpLeaderboard() {
  return request({
    url: 'anhuimobile/getCpLeaderboard',
    method: 'post'
  })
}

/**
 * 查询媒资类型列表
 */
export function getMediaTypeList(){
  return request({
    url: 'anhuimobile/getMediaTypeInfo',
    method: 'post'
  })
}

/**
 * 查询高质量媒资排行榜
 * @param typeCode cp唯一id，cp设为空查询全部
 */
export function getHighQualityRank(typeCode) {  
  typeCode = typeCode || '';
  log('查询高质量媒资排行榜,入参：',typeCode);
  return request({
    url: `anhuimobile/getHighQualityLeaderboard?typeCode=${typeCode}`,
    method: 'post'
  })
}
