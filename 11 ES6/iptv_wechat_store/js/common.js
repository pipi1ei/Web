/* 根据设备屏幕宽度将px转变成rem*/
(function px2rem(){
    var html_Element = document.documentElement;
    if (html_Element.clientWidth > 1080){
        document.documentElement.style.fontSize = 50 + 'px';
    }  else if (html_Element.clientWidth < 320){
        document.documentElement.style.fontSize = 14.81 + 'px';
    } else {
        document.documentElement.style.fontSize = html_Element.clientWidth/1080 * 50 + 'px';
    }
})();
/*window.addEventListener("resize",px2rem);*/

(function (w, d, s) {
    var l = 'IFlyCollector', f = d.getElementsByTagName(s)[0], j = d.createElement(s), w = window;
    w[l] = {}; var c = w[l]; c._o = function (a) { return function () { (c._e = c._e || []).push([a, arguments]) } };
    var e = ['init', 'onEvent', 'onError', 'bindUser', 'updateCustomConfig','setChannel','setAppVersion'];
    for (var i = 0; i < e.length; i++) { c[e[i]] = c._o.call(null, e[i]) }
    j.async = true; j.src = 'http://logconf.iflytek.com/entry.js'; f.parentNode.insertBefore(j, f);
})(window, document, 'script');

/**
 * 初始化埋点
 * @param isDebug 是否开启调试模式
 * @param collectUrl 数据上报地址
 * @param configUrl 服务配置地址
 * @param channel 应用渠道
 */
function initBuryPoint(isDebug,collectUrl,configUrl) {
    IFlyCollector.init({
        appId:'2849b4f038',
        host:window.location.href,
        debug:isDebug,
        spa:false,
        collectUrl:collectUrl,
        configUrl:configUrl
    });
}

/**
 * 自定义事件
 * @param id 事件id，不可为空
 * @param udmap 事件详细信息，json类型，不可为空
 * @param mid 模块id(moduleId)，
 * @param oid 行为对象id(objectId)
 * @param ext 扩展信息
 */
function onEvent(id,udmap,mid,oid,ext) {
    IFlyCollector.onEvent(id,udmap,mid,oid,ext);
}