/* log 方法，通过开关控制log是否开启 */
export function log() {  
  if(window.g.logSwitch){
    console.log.apply(console,arguments);
  }
}

/* 格式化数字，每3位加一个逗号 */
export function formatNum(val) {  
  if (typeof val === "number" || typeof val === "string") {
    var str = val.toString();
    var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    val = str.replace(reg, "$1,");
    return val;
  }
}


/** 格式化时间 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substring(str.length)
}

/** 
 * 获取过去的时间
 * @param days : 过去的天数
 * @return 过去日期的 'yyyy-MM-dd' 格式
*/
export function getPastDate(days) {
  const oneDay = 24 * 60 * 60 * 1000;
  let currentTimestamp = Date.now();
  let pastTimestamp = currentTimestamp - days * oneDay;
  return formatDate(new Date(pastTimestamp), 'yyyy-MM-dd');
}

/**
 * json数组转字符串
 * @param {*} jsonArray json数组
 */
export function arr2string(jsonArray) {  
  jsonArray = JSON.parse(jsonArray || '[]');
  return jsonArray.length > 0 ? jsonArray.join('，') : '空';
}