import { request } from '../request';
import { formatDate, getPastDate } from 'utils/utils';

/** 
 * 查询必要字段：柱状图的选择维度
 */
export function getEssentialFieldInfo() {  
  return request({
    url: '/anhuimobile/getEssentialFieldInfo',
    method: 'post'
  })
}

/**
 * 获取媒资监控字段信息 
 * @param params.fieIdCode 字段code 必填
 * @param params.cpCode cp唯一id 非必填
 * @param params.startTime 开始时间 非必填
 * @param params.endTime 结束时间 非必填
 */ 
export function getFieldMonitor(params) {
  let currentDate = formatDate(new Date(), 'yyyy-MM-dd');
  let pastDate = getPastDate(7);
  let defaultParams = {
    fieIdCode: 'director',
    cpCode: '',
    startTime: pastDate,
    endTime: currentDate
  }

  if(params){
    for (let key in params) {
      defaultParams[key] = params[key];
    }
  }

  log('获取媒资字段监控，入参：',defaultParams);
  return request({
    url: '/anhuimobile/getFieldMonitor',
    method: 'post',
    data: defaultParams
  })
}

/**
 * 查询媒资类型分布
 * @param cpCode cp唯一id，cp设为空查询全部
 */
export function getMediaCateDis(cpCode) {  
  cpCode = cpCode || '';
  log('查询媒资类型分布,入参：',cpCode);
  return request({
    url: `/anhuimobile/getMediaTypeOverview?cpCode=${cpCode}`,
    method: 'post',
  })
}