/* 封装常用方法 */

/* 获取URL中的参数 */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); // 匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; // 返回参数值
}

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
        jsonp: 'callback',  // 服务器规定的回调方法参数名字，通过该名字取到对应的方法，然后返回这个方法的调用，将结果作为参数传递过来
        jsonpCallback: 'pipilei'  // 自定义的回调方法名，传不传不影响
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

/**
 * 获取过去的时间
 * @param days : 过去的天数
 * @return 过去日期的 'yyyy-MM-dd' 格式
*/
export function getPastDate(days) {
  const oneDay = 24 * 60 * 60 * 1000;
  var currentTimestamp = Date.parse(new Date());
  var pastTimestamp = currentTimestamp - days * oneDay;
  return formatDate(new Date(pastTimestamp), 'yyyy-MM-dd');
}


/* 格式化数字，每3位加一个逗号 */
export function formatNum(val) {
  if (typeof val === "number") {
    var str = val.toString();
    var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    val = str.replace(reg, "$1,");
    return val;
  }
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

/* 编辑函数，实现myChildren 功能，解决以前部分浏览器兼容问题 */
Element.prototype.myChildren = function(){
  var children = {
    length : 0,
    push: Array.prototype.push,
    splice: Array.prototype.splice
  }
  const originChildrenNodes = this.childNodes
  const len = originChildrenNodes.length
  for(let i = 0; i < len; i++){
    if(originChildrenNodes[i].nodeType === 1){
      children.push(originChildrenNodes[i])
    }
  }
  return children
}


/* 封装一个函数，返回一个元素的第n层父元素 */
function getParent(element, n) {
  while (element && n) {
    element = element.parentElement
    n--
  }
  return element
}


/* 自己封装 hasChildren 方法(是否有元素节点)，不可用 children 属性 */
Element.prototype.hasChildren = function () {
  const originChildNodes = this.childNodes
  for (let i = 0; i < originChildNodes.length; i++) {
    if (originChildNodes[i].nodeType === 1) {
      return true
    }
  }
  return false
}


/** 封装函数，返回元素 e 的第 n 个兄弟元素节点。n 为正，返回后面的兄弟元素节点，n为负，返回前面的，为0返回自己 */
function getSibling(e, n) {
  while (e && n) {
    if (n > 0) {
      if(e.nextElementSibling){
        e = e.nextElementSibling
      }else{
        for(e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);
      }
      n--
    } else if (n < 0) {
      if (e.previousElementSibling) {
        e = e.previousElementSibling
      } else {
        for (e = e.previousElementSibling; e && e.nodeType != 1; e = e.previousElementSibling);
      }
      n++
    }
  }
  return e
}

/**封装 insertAfter，功能类似 insertBefore */
Element.prototype.insertAfter = function(target, after){
  const before = after.nextElementSibling;
  if(before){
    this.insertBefore(target, before)
  }else{
    this.appendChild(target)
  }
}


/**封装兼容方法，求滚动条滚动距离 getScrollOffset() */
function getScrollOffset(){
  if(window.pageXOffset){
    return {
      X: window.pageXOffset,
      Y: window.pageYOffset
    }
  }else{
    return {
      X: document.body.scrollLeft + document.documentElement.scrollLeft,
      Y: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

/**封装兼容方法，返回浏览器视口尺寸 getViewportOffset() */
function getViewportOffset() {  
  if(window.innerWidth){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }else{
    if(window.compatMode == "CSS1Compat"){
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }else if(window.compatMode == 'BackCompat'){
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    }
  }
}

/* 封装获取元素属性的方法 */
function getStyle(element, prop){
  if(window.getComputedStyle){
    return window.getComputedStyle(element, null)[prop]
  }else{
    return element.currentStyle[prop]
  }
}

/* 封装事件处理函数 */
function addEvent(element, type, handle){
  if(element.addEventListener){
    element.addEventListener(type, handle, false)
  }else if(element.attachEvent){
    element.attachEvent('on'+type, function(){
      handle.call(element)
    })
  }else{
    element['on' + type] = handle
  }
}

/* 封装取消冒泡的函数 */
function stopBubble(event){
  if (event.stopPropagation){
    event.stopPropagation()
  }else{
    event.cancelBubble = true
  }
}

/* 封装阻止默认事件的函数 */
function cancelHandler(event) {  
  if(event.preventDefault){
    event.preventDefault()
  }else{
    event.returnValue = false
  }
}

/* 对象继承方法 */
const inherit = (function(){
  const F = function(){}
  return function(Target, Origin){
    F.prototype = Origin.prototype
    Target.prototype = new F()
    Target.prototype.constructor = Target
    Target.prototype.uber = Origin.prototype
  }
}())

// 滚动组件，步骤：
// 1、先scrollItem.init(要放置的元素id,滚动语列表)
// 2、scrollItem.startScroll()
var scrollItem = {
  numberIndex: 1,
  wordsList: [],
  init: function (id, wordsList) {
    wordsList.push(wordsList.slice(0, 1));
    scrollItem.wordsList = wordsList;
    var htmlString = '<div class="sc_lines clearfix" style="position: relative;top: -0.04rem;">';
    for (var i = 0; i < wordsList.length; i++) {
      htmlString += '<div class="sc_numberLines" style="opacity: 0.2;padding:0 0.11rem;height: 0.42rem;line-height: 0.42rem;margin: 0.2rem;font-weight: bold;color: rgba(219,209,197,1);background: rgba(120,57,22, 1);border-radius: 0.21rem;width: -webkit-fit-content;">' + wordsList[i] + '</div>';
    }
    htmlString += '</div>';
    $(id).css({
      "overflow": "hidden",
      "height": "0.62rem",
      "text-align": "left",
      "width": "5.04rem",
      "position": "fixed",
      "font-size": "0.28rem",
      "font-weight": "bolder",
      "line-height": "0.24rem"
    })
    $(id).append(htmlString);
  },
  startScroll: function () {
    scrollItem.numberIndex = 1;
    $('.sc_lines .sc_numberLines:eq(' + (1) + ')').css("opacity", 1);
    ChangeNumberTimerID = setInterval(function () {
      $('.sc_lines').children().css("opacity", 0.2);
      if (scrollItem.numberIndex < scrollItem.wordsList.length) {
        scrollItem.numberIndex++;
        scrollItem.scroll(scrollItem.numberIndex);
      }
    }, 3500)
    $('.sc_lines .sc_numberLines:eq(' + (0) + ')').css("opacity", 1);
  },
  scroll: function (i) {
    topVal = 0.62 * (1 - i);
    $(".sc_lines").animate({
      // -0.35 -0.45  
      top: topVal + "rem"
    }, 1500, function () {
      if (scrollItem.numberIndex >= scrollItem.wordsList.length) {
        $(".sc_lines").animate({ top: "-0.0rem" }, 0);
        $('.sc_lines .sc_numberLines:eq(' + (0) + ')').css("opacity", 1);
        scrollItem.numberIndex = 1;
      }
    });
    $('.sc_lines .sc_numberLines:eq(' + (i - 1) + ')').css("opacity", 1);
  }
}


/* px2rem */
(function (doc, win) {
  // 基准字体大小
  var baseSize = 100;
  // 设计稿宽度
  var designWidth = 1920;
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = baseSize * (clientWidth / designWidth) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


/**异步加载图片 */
function loadImgAsync(url) {  
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = function(){
      resolve(image)
    }

    image.onerror = function () {  
      reject(new Error('Could not load image at ' + url))
    }

    image.src = url
  })
}


/**
 * 判断对象所有的key值是否为空
 * @param {any} obj 要判断的对象
 * @param {Array<string>} excludeProps 不需要判断的属性
 * @param {Array<any>} emptyList 为空的值
 * @return {boolean} 
 */
function isEmpty(obj, excludeProps, emptyList) {
  let result = true;
  if (obj === null || obj === undefined) return true;
  if (isObject(obj)) {
    if (Object.keys(obj).length) {
      for (let key in obj) {
        if (!excludeProps.includes(key)) {
          const item = obj[key];
          if (isObject(item) || isArray(item)) {
            result = isEmpty(item, excludeProps, emptyList);
          } else {
            if (!emptyList.includes(item)) {
              result = false
            }
          }
          if (!result) return false;
        }
      }
    }
  } else if (isArray(obj)) {
    if (obj.length) {
      for (let item of obj) {
        if (isObject(item) || isArray(item)) {
          result = isEmpty(item, excludeProps, emptyList);
        } else {
          if (!emptyList.includes(item)) {
            result = false;
          }
        }
        if (!result) return false;
      }
    }
  } else {
    result = emptyList.includes(obj);
  }
  return result;
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isArray(obj) {
  return Array.isArray(obj)
}