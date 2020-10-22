import {loadingShow, loadingHide, faildMsg} from './../toast/toast.js';


/**
 * ajax 请求封装
 * @param {String} url 后台接口
 * @param {Array} data 参数
 * @param {Object} options 
 * @param {Boolean} [options.showLoading=true] 是否打开loading
 * @param {String} [options.contentType='application/x-www-form-urlencoded'] 发送数据的格式
 * @param {Boolean} [options.processData=true]
 * @param {String} [options.type='POST'] 请求类型
 * @param {Boolean} [options.async=true] 是否异步
 * @param {Function} [options.syncFun=null] 同步请求时的回调
 * @param {Boolean} [options.isHtmlEncode=true] 返回数据是否进行前端解码 含有富文本标签内容数据请设置为 false
 * @param {Boolean} [options.selfDefineErrorHandle=false] 返回数据  code !== 1 时自定义错误处理
 * @return {Promise|undefined} 异步请求时返回 Promise 对象，同步请求返回 undefined
 */
function getAjaxData(url, data = null, options = {}) {
  let _options = $.extend({
    showLoading: true,
    contentType: 'application/x-www-form-urlencoded',
    processData: true,
    type: 'POST',
    async: true,
    syncFun: null,
    loadingContainer: $('body'),
    isHtmlEncode: true,
    selfDefineErrorHandle: false
  }, options);

  var urlParam = !!url && url.indexOf('http://') > -1 ? url : 'http://' + url;

  if(_options.type.toLowerCase() == "get") {
    urlParam += '&time_stamp=' + new Date().getTime()
  }

  if(!_options.async) { // 同步不适用 promise
    $.ajax({
      url: urlParam,
      contentType: _options.contentType,
      processData: _options.processData,
      dataType: 'json',
      type: _options.type,
      async: _options.async,
      data,
      beforeSend: function() {
        if(_options.showLoading) {
          loadingShow(_options.loadingContainer)
        }
      },
      complete: function(XMLHttpRequest, textStatus) {
        if(_options.showLoading) {
          loadingHide()
        }
        let sessionStatus = XMLHttpRequest.getResponseHeader('sessionStatus');
        if(sessionStatus == 'TIMEOUT') {
          let win = window;
          while (win != win.top) {
            win = win.top
          }

          win.location.href = XMLHttpRequest.getResponseHeader('CONTEXTPATH');
        }
      },
      success: result => {
        if(result.code != 1 && _options.selfDefineErrorHandle) {
          faildMsg(result.subMsg)
        } else {
          let {res} = result;
          if(_options.isHtmlEncode) {
            res = htmlEncode(result)
          }
          _options.syncFun && _options.syncFun(res);
        }
      },
      error: function(res, opts) {
        faildMsg(res.responseText)
      }
    })
    return;
  }

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      url: urlParam,
      contentType: _options.contentType,
      processData: _options.processData,
      dataType: 'json',
      type: _options.type,
      data,
      beforeSend: function() {
        if(_options.showLoading) {
          loadingShow(_options.loadingContainer)
        }
      },
      complete: function(XMLHttpRequest, textStatus) {
        if(_options.showLoading) {
          loadingHide()
        }
        let sessionStatus = XMLHttpRequest.getResponseHeader('sessionstatus');
        if(sessionStatus == 'TIMEOUT') {
          let win = window;
          while (win != win.top) {
            win = win.top
          }

          win.location.href = XMLHttpRequest.getResponseHeader('CONTEXTPATH');
        }
      },
      success: result => {
        if(result.code != 1 && _options.selfDefineErrorHandle) {
          faildMsg(result.subMsg || result.msg)
        } else {
          let {res} = result
          if(_options.isHtmlEncode) {
            res = htmlEncode(result)
          }
          resolve && resolve(res)
        }
      },
      error: (response, opts) => {
        if(response.responseJSON && !_options.selfDefineErrorHandle) {
          faildMsg(response.responseJSON.subMsg || response.responseJSON.msg)
        } else if(!_options.selfDefineErrorHandle) {
          faildMsg(response.responseText)
        }

        reject && reject(response)
      }
    })
  })
  return promise;
}

// 前端解码
function htmlEncode(str) {
  if(typeof str == 'object') {
    str = JSON.stringify(str)
  }

  str = str.replace(/&quot;/g, '\\"');
  str = htmlStrDecode(str)
  str = JSON.parse(str)
  return str
}

// 标签字符串 decode
function htmlStrDecode(str) {
  var temp = document.createElement('div');
  temp.innerHTML = str;
  var outputStr = temp.innerText || temp.textContent;
  temp = null;
  return outputStr;
}

export default getAjaxData;