/* 封装常用方法 */

/*  ajax 方法封装: 缺点：1.参数顺序无法改变，2.参数无默认值

    @type: 请求方式：'get' 或 'post';
    @url: 请求的url
    @params: 请求参数：格式为：username=" + username;
    @async: 是否异步请求，true：异步，false：同步
    @dataType: 返回数据类型：'json'：json格式数据, 'xml'：xml格式数据
    @callback: 请求结果回调
*/   
var myAjax = function(type,url,params,async,dataType,callback){
    // 1. 创建 XMLHttpRequest 对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 2 准备发送网络请求
    if(type.toLowerCase() == 'get'){
        if(params && params != ''){
            url += '?' + params;
        }
    }
    xhr.open(type,url,async);

    // 3.开始发送网络请求
    if(type.toLowerCase() == 'get'){
        xhr.send(null);
    }else if(type.toLowerCase() == 'post'){
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(params);
    }

    // 4.指定回调函数
    if(async){
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var result = null;
                if(dataType.toLowerCase() == 'json'){
                    result =  xhr.respondText;
                }else if(dataType.toLowerCase() == 'xml'){
                    result =  xhr.respondXML;
                }else{
                    result =  xhr.respondText;
                }
                if(callback){
                    callback(result);
                }
            }
        }
    }else{
        if(xhr.readyState == 4 && xhr.status == 200){
            var result = null;
            if(dataType.toLowerCase() == 'json'){
                result =  xhr.respondText;
            }else if(dataType.toLowerCase() == 'xml'){
                result =  xhr.respondXML;
            }else{
                result =  xhr.respondText;
            }
            if(callback){
                callback(result);
            }
        }
    }
    
}

/* 第二种 Ajax 封装方法，以对象作为参数 */
var myAjax2 = function(obj){
    //定义默认参数
    var defaults = {
        type: 'get',
        url: '#',
        data: {},
        async: true,
        dataType: 'json',
        success: function(result){console.log(result)}
    }
    //obj 中的属性覆盖到 defaults 中的属性
    //1.如果有一些属性只存在obj中，会给defaults 中增加属性
    //2.如果有一些属性在obj和defaults中都存在，会覆盖defaults中的属性
    //3.如果有一些属性只存在defaults中，会保留 defaults 中的属性
    for(var key in obj){
        defaults[key] = obj[key];
    }

    // 1. 创建 XMLHttpRequest 对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    // 得到请求的参数
    var params = '';
    for(var attr in defaults.data){
        params += attr + '=' + defaults.data[attr] + '&';
    }
    if(params){
        params = params.substring(0, params.length - 1);
    }

    // 2 准备发送网络请求
    if(defaults.type.toLowerCase() == 'get'){
        defaults.url += '?' + params;
    }
    xhr.open(defaults.type, defaults.url, defaults.async);

    // 3.开始发送网络请求
    if(defaults.type.toLowerCase() == 'get'){
        xhr.send(null);
    }else if(defaults.type.toLowerCase() == 'post'){
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(params);
    }

    // 4.指定回调函数
    if(defaults.async){
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var result = null;
                if(defaults.dataType.toLowerCase() == 'json'){
                    result =  xhr.respondText;
                }else if(defaults.dataType.toLowerCase() == 'xml'){
                    result =  xhr.respondXML;
                }else{
                    result =  xhr.respondText;
                }
                if(callback){
                    defaults.success(result);
                }
            }
        }
    }else{
        if(xhr.readyState == 4 && xhr.status == 200){
            var result = null;
            if(defaults.dataType.toLowerCase() == 'json'){
                result =  xhr.respondText;
            }else if(defaults.dataType.toLowerCase() == 'xml'){
                result =  xhr.respondXML;
            }else{
                result =  xhr.respondText;
            }
            if(callback){
                defaults.success(result);
            }
        }
    }
}

/* 跨域请求方法 */
var cross = function(obj){
    // 创建默认参数对象
    var defaults = {
        type: 'get',
        url: '#',
        data: {},
        success: function(data){},
        jsonp: 'callback',
        jsonpCallback: 'pipilei'
    }
    for(var key in obj){
        defaults[key] = obj[key];
    }

    // 拼接请求 url 参数
    var params = '';
    for(var attr in defaults.data){
        params += attr + '=' + defaults.data[attr] + '&';
    }
    if(params){
        params = params.substring(0, params.length - 1);
        defaults.url += '?' + params;
    }
    defaults.url += '&' + defaults.jsonp + '=' + defaults.jsonpCallback;

    // 动态创建 script 标签
    var script = document.createElement('script');
    script.src = defaults.url;

    // 定义服务器调用的函数名
    window[defaults.jsonpCallback] = function(data){
        defaults.success(data);
    }

    // 将 script 标签添加到 head 标签中
    var head = document.querySelector('head');
    head.appendChild(script);
}


/* 封装 Ajax 方法：同源请求采用 ajax 方法，非同源请求采用跨域方法 */
var ajax = function(obj){
    if(obj.dataType.toLowerCase() == 'jsonp'){
        cross(obj);
    }else{
        myAjax2(obj);
    }
}

/** 防抖函数 */
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
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

function padLeftZero(str){
  return ('00' + str).substring(str.length)
}

// 判断一个参数的类型
export function type(target) {
  // 1. 分两类：原始值、引用值
  var template = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'number-Object',
    '[object Boolean]': 'boolean-Object',
    '[object String]': 'string-Object',
  }
  if (target === null) {
    return 'null'
  }
  const ret = typeof (target)
  if (ret === 'object') {
    var str = Object.prototype.toString.call(target)
    return template[str]
  } else {
    return ret
  }
}

/* 数组去重方法 */
Array.prototype.unique = function () {
  let obj = {}
  var arr = []
  for (let index = 0; index < this.length; index++) {
    if (!obj[this[index]]) {
      obj[this[index]] = '#'
      arr.push(this[index])
    }
  }
  return arr
}

/* 深度克隆方法 */
function deepClone(origin, target){
  var target = target || {}
  var toString = Object.prototype.toString
  var arrStr = '[Object Array]'
  for (let prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      origin[prop] = (origin[prop] !== 'null' && typeof (origin[prop])) ? [] : {}
      deepClone(origin[prop], target[prop])
    } else {
      target[prop] = origin[prop]
    }
  }
  return target
}

/* 圣杯模式实现 JavaScript 继承 */
const inherit = (function(){
  function F(){}
  return function(Target, Origin){
    F.prototype = Origin.prototype
    Target.prototype = new F()
    Target.prototype.constructor = Target
    Target.prototype.uber = Origin.prototype
  }
}())
