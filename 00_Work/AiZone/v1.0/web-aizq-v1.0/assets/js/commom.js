/**
 * Created by xuzhang2 on 2017/4/18.
 */

/**
 * 按键
 */
var KEY = {
    "BACK": "BACK",
    "OK": "OK",
    "PREV_PAGE": "PREV_PAGE",
    "NEXT_PAGE": "NEXT_PAGE",
    "LEFT": "LEFT",
    "UP": "UP",
    "RIGHT": "RIGHT",
    "DOWN": "DOWN",
    "VOLUME_UP": "VOLUME_UP",
    "VOLUME_DOWN": "VOLUME_DOWN",
    "MUTE": "MUTE",
    "SOUNDTRACK": "SOUNDTRACK",
    "PAUSE": "PAUSE",
    "FF": "FF",
    "FR": "FR",
    "VIRTUAL_EVENT": "VIRTUAL_EVENT",
}

var KEY_VIRTUAL = {
    "EVENT_MEDIA_END": "EVENT_MEDIA_END", //视频播放结束
}

/**
 * 按键码
 */
var KEY_MAP = {
    "8": "BACK",
    "187": "BACK",
    "13": "OK",
    "33": "PREV_PAGE",
    "34": "NEXT_PAGE",
    "37": "LEFT",
    "65": "LEFT",
    "97": "LEFT", // 安卓新加
    "38": "UP",
    "87": "UP",
    "119": "UP", // 安卓新加
    "39": "RIGHT",
    "68": "RIGHT",
    "100": "RIGHT", // 安卓新加
    "40": "DOWN",
    "83": "DOWN",
    "115": "DOWN", // 安卓新加
    "259": "VOLUME_UP",
    "199": "VOLUME_UP",
    "260": "VOLUME_DOWN",
    "188": "VOLUME_DOWN",
    "261": "MUTE",
    "262": "SOUNDTRACK",
    "263": "PAUSE",
    "264": "FF",
    "265": "FR",
    "271": "PAUSE",
    "768": "VIRTUAL_EVENT",
}

/**
 * 样式添加、删除扩展
 */
if (!("classList" in document.documentElement)) {
    // defineProperty IE9之后存在
    // HTMLElement IE8及其以下不支持哦
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function () {
            var self = this;

            function update(fn) {
                return function (value) {
                    var classes = className.split(/\s+/g),
                        index = classes.indexOf(value);

                    fn(classes, index, value);
                    className = classes.join(" ");
                }
            }

            return {
                add: update(function (classes, index, value) {
                    if (!~index) classes.push(value);
                }),

                remove: update(function (classes, index) {
                    if (~index) classes.splice(index, 1);
                }),

                toggle: update(function (classes, index, value) {
                    if (~index)
                        classes.splice(index, 1);
                    else
                        classes.push(value);
                }),

                contains: function (value) {
                    return !!~className.split(/\s+/g).indexOf(value);
                },

                item: function (i) {
                    return className.split(/\s+/g)[i] || null;
                }
            }
        }
    });
}

/**
 * 简单的模板
 * @type {{updateView}}
 */
var template = (function () {
    var getViewSingle = function (data, templete) {
        for (keyName in data) {
            templete = templete.replace(new RegExp("\\\{" + keyName + "\\\}", "g"), data[keyName])
        }
        return templete;
    }

    var updateView = function (el, data, templete) {
        var root = document.getElementById(el);
        var domString = "";
        if (data instanceof Array) {
            for (var i = 0; i < data.length; i++) {
                domString += getViewSingle(data[i], templete);
            }
        } else {
            domString += getViewSingle(data, templete);
        }
        root.innerHTML = domString;
    }

    return {
        updateView: updateView
    }

}());

/**
 * 扩展string方法
 */
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g"); //TODO 这个在索引大于9时会有问题
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}
String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
}

/**
 * 工具类
 * @type {{queryString, getTime}}
 */
var utils = (function () {
    /**
     * 获取url参数
     * @returns {{}}
     */
    var queryString = function () {
        //获取url中"?"符后的字串
        var url = location.search;
        var params = {};
        if (url.indexOf("?") != -1) {
            var str = url.split("?")[1]
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                params[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return params;
    };


    /**
     * 获取时间，hh:MM的格式
     * @returns {string}
     */
    var getTime = function () {
        var date = new Date();
        var hh = date.getHours();
        if (hh < 10) hh = '0' + hh;
        var mm = date.getMinutes();
        if (mm < 10) mm = '0' + mm;
        var str = hh + ":" + mm;
        return str;
    }

    return {
        queryString: queryString,
        getTime: getTime
    }
})();

/**
 * 模态框
 */
var modelDialog = (function () {
    var show = function (html) {
        if (document.getElementsByClassName("modelDialog").length <= 0) {
            var modelDialog = document.createElement("div");
            modelDialog.classList.add("modelDialog");
            modelDialog.innerHTML = html;
            document.body.appendChild(modelDialog);
        }
    }

    var hide = function () {
        var modelDialogs = document.getElementsByClassName("modelDialog");
        for (var i = 0; i < modelDialogs.length; i++) {
            document.body.removeChild(modelDialogs[i]);
        }
    }

    var has = function () {
        var modelDialogs = document.getElementsByClassName("modelDialog");
        return modelDialogs.length > 0;
    }

    return {
        show: show,
        hide: hide,
        has: has
    }
})();



function ajax(config) {
    var url = config.url;
    var data = config.data;
    var type = (config.type || 'GET').toUpperCase();
    var contentType = config.contentType || 'application/x-www-form-urlencoded';
    var dataType = config.dataType;
    var headers = config.headers || [];
    var fnSuccess = config.success;
    var fnError = config.error;
    var longLink = config.longLink;
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            var rsp = xmlhttp.responseText || xmlhttp.responseXML;
            if (dataType == 'json')
                rsp = eval("(" + rsp + ")");
            if (xmlhttp.status == 200)
                call(fnSuccess, [xmlhttp, rsp]);
            else
                call(fnError, [xmlhttp, rsp]);
        }
    };

    xmlhttp.open(type, url, true);
    for (var i = 0; i < headers.length; ++i) {
        xmlhttp.setRequestHeader(headers[i].name, headers[i].value);
    }
    xmlhttp.setRequestHeader('Content-Type', contentType);

    if (typeof data == 'object' && contentType == 'application/x-www-form-urlencoded') {
        var s = '';
        for (attr in data) {
            s += attr + '=' + data[attr] + '&';
        }
        if (s) {
            s = s.substring(0, s.length - 1);
        }
        xmlhttp.send(s);
    } else
        xmlhttp.send(data);
}


function call(fn, args) {
    this.isArray = function (args) {
        return args instanceof Array;
    }
    if (typeof fn == "string" && fn !== '') {
        return eval("(" + fn + ")");
    } else if (typeof fn == "function") {
        if (!this.isArray(args)) {
            var temp = [];
            for (var i = 1; i < arguments.length; i++)
                temp.push(arguments[i]);
            args = temp;
        }
        return fn.apply(window, args);
    }
}
function getComputedTranslateY(obj) {
    if (!window.getComputedStyle) return;
    var style = getComputedStyle(obj),
        transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
}
function focusElementTitleScroll(dom, shouldScroll, len) {
    if (!dom) return;
    if (!len) len = 8;
    var titleWrap = dom.getElementsByClassName("scroll_title");
    if (titleWrap.length === 0) return;
    var title = titleWrap[0].innerText;
    if (title.length <= len) return;
    if (shouldScroll) {
        titleWrap[0].innerHTML =
            '<marquee behavior="behavior">' + titleWrap[0].innerText + "</marquee>";
    } else {
        titleWrap[0].innerHTML = titleWrap[0].innerText;
    }
}
