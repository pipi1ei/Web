import { request } from '../request';
import { Message } from 'element-ui';

/**
 * 批量下线媒资
 * @param {String} mediaStr 
 */
export function mediaToOffline(mediaStr) {
  return new Promise((resolve, reject) => {
    log('批量下线媒资：入参：', mediaStr);
    request({
      url: 'anhuimobile/mediaToOffline',
      method: 'post',
      data: { provideIdAndMediaIdStr: mediaStr }
    }).then(res => {
      if (res.code == '0000') {
        Message({
          message: '下线成功',
          type: "success",
          duration: 3 * 1000
        });
        resolve();
      } else {
        Message({
          message: '下线失败',
          type: "error",
          duration: 3 * 1000
        });
      }
    }).catch(err => {
      log('下线媒资失败：error =>',err);
    })
  })
}