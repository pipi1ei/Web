import { request } from './request';

/* 获取cp列表 */
export function getCpList(){
  return request({
    url: '/anhuimobile/getCpInfo',
    method: 'post',
  })
}

/**
 * 查询媒资数据列表
 * @param {Object} params 请求参数
 */
export function getMediaData(params) {
  let defaultParam = {
    cpCode: '',         //cp唯一id
    pageNum: 1,         //页数
    pageSize: 15,       //每页展示多少数据
    name: '',           //媒资名称
    startTime: '',      //开始时间
    endTime: '',        //结束时间
    status: ''          //媒资状态，0：上线，1：下线，2：剔除，查询全部设为空
  }

  if(params){
    for(let prop in params){
      defaultParam[prop] = params[prop]; 
    }
  }

  log('查询媒资数据,入参: ', defaultParam);
  return request({
    url: 'anhuimobile/getMediaData',
    method: 'post',
    data: defaultParam
  })
}

/**
 * 导出媒资数据
 * @param {Object} params 
 */
export function exportMediaData(params) {  
  let defaultParam = {
    cpCode: '',         //cp唯一id
    name: '',           //媒资名称
    startTime: '',      //开始时间
    endTime: '',        //结束时间
    status: ''          //媒资状态，0：上线，1：下线，2：剔除，查询全部设为空
  }

  if (params) {
    for (let prop in params) {
      defaultParam[prop] = params[prop];
    }
  }

  log('导出媒资数据,入参: ', defaultParam);
  return request({
    url: 'anhuimobile/exportMediaData',
    method: 'post',
    data: defaultParam
  })
}