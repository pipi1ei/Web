import { request } from './request'

export function getMediaList(searchParam) {

  let defaults = {
    productName: '',
    pageNum: 1,
    pageSize: 10,
    name: ''
  }

  for (let key in searchParam) {
    defaults[key] = searchParam[key]
  }

  return request({
    url: '/dataManage/queryVideo/searchInputMediaDataByName',
    method: 'post',
    data: {
      'pageNum': defaults.pageNum,
      'pageSize': defaults.pageSize,
      'name': defaults.name,
      'productName': defaults.productName
    }
  })
}

export function getMediaDetails(productName, mediaId) {
  return request({
    url: '/dataManage/queryVideo/searchInputMediaDataByMediaId',
    method: 'post',
    params: {
      mediaId: mediaId,
      productName: productName
    }
  })
}

// export function getMediaList(searchParam) {

//   let defaults = {
//     provideId: '',
//     pageNum: 1,
//     pageSize: 10,
//     name: ''
//   }

//   for (let key in searchParam) {
//     defaults[key] = searchParam[key]
//   }

//   return request({
//     url: '/' + defaults.provideId + '/getMediaListByName',
//     method: 'post',
//     data: {
//       'pageNum': defaults.pageNum,
//       'pageSize': defaults.pageSize,
//       'name': defaults.name
//     }
//   })
// }

// export function getMediaDetails(provideId, mediaId) {
//   return request({
//     url: '/' + provideId + '/getMediaById',
//     method: 'post',
//     params: {
//       mediaId: mediaId
//     }
//   })
// }