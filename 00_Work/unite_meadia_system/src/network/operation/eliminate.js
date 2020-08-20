import { request } from '../request';
import { Message } from 'element-ui'

/**
 * 批量上线媒资
 * @param {String} mediaStr 
 */
export function mediaToOnline(mediaStr) {  
  return new Promise((resolve, reject) => {
    log('批量上线媒资：入参：', mediaStr);
    request({
      url: 'anhuimobile/mediaToOnline',
      method: 'post',
      data: { provideIdAndMediaIdStr: mediaStr }
    }).then(res => {
      if (res.code == '0000') {
        Message({
          message: '上线成功',
          type: "success",
          duration: 3 * 1000
        });
        resolve();
      } else {
        Message({
          message: '上线失败',
          type: "error",
          duration: 3 * 1000
        });
      }
    }).catch(err => {
      log('上线媒资失败：error =>', err);
    })
  })
}