var TAG = "AI_LivingRoom", 
    GET_DATA_DATE = localStorage.getItem("get_data_date"),  //缓存数据日期
    CACHE_DATA = localStorage.getItem('page_data'),         //缓存数据
    switchMore = {
        life: false,
        skill: false
    }, 
    skillLen = 0, 
    lifeLen = 0, 
    scenes = {
        "header-mine": {
            words: ['我的']
        },
        "header-help": {
            words: ['帮助']
        },
        "main-4": {
            words: ['爱看']
        },
        "main-5": {
            words: ['爱玩']
        },
        "main-8": {
            words: ['交互少儿']
        },
        "main-9": {
            words: ['声控游戏']
        },
        "main-10": {
            words: ['生活服务']
        },
        "main-11": {
            words: ['实用技能']
        },
        "to_top": {
            words: ['回到顶部'],
            action: function () {
                keyboard.setCurrent(document.getElementById("main-1"))
            }
        },
        "tgsz": {
            word: ['糖果识字', '糖果10字'],
            action: function () {
                goJump('{"opType":"app",' +
                    '"pkgName":"com.iflytek.tgsz",' +
                    '"clsName":"com.iflytek.duduclass.SplashActivity",' +
                    '"params":[{"key":"source","value":"entry=aiArea","type":"String"}]}'
                );
            }
        }
    };


/* 设置生活服务和实用技能模块的更多按钮是否显示 */
function changeSwitchMore(key, type) {
    console.log('changeSwitchMore: key = ',key,'type = ',type)
    if (type === undefined) type = !switchMore[key];
    if (typeof type !== 'boolean') return;
    if (switchMore[key] === type) return;
    switchMore[key] = type;
    if (type === true) {
        document.getElementById(key + '-more').classList.add('selected');
        document.getElementById(key + '-more-list').style.display = 'block';
    } else {
        document.getElementById(key + '-more').classList.remove('selected');
        document.getElementById(key + '-more-list').style.display = 'none';
    }
}

/* 拦截按键操作 */
function appIntercept(key) {
    console.log('appIntercept: key = ',key);
    if (key === KEY.LEFT || key === KEY.RIGHT) return false;
    // 获取当前获得焦点的元素
    var prev = keyboard.getCurrent();
    if (switchMore.life) {
        if (key === KEY.UP && prev.getAttribute('id') === 'skill-more') {
            keyboard.setCurrent(document.getElementById('life-' + lifeLen));
            return true;
        } else if (key === KEY.UP && prev.getAttribute('id').indexOf('skill') === 0 && prev.id.split('-')[1] < 4) {
            var nEle = lifeLen;
            switch (+prev.id.split('-')[1]) {
                case 1:
                    nEle = Math.floor(lifeLen / 3) * 3 + 1;
                    break;
                case 2:
                    nEle = (lifeLen % 3 < 2) ? lifeLen : lifeLen - 1;
                    break;
            }
            keyboard.setCurrent(document.getElementById('life-' + nEle));
            return true;
        }
    } else if (key === KEY.DOWN && prev.parentElement.id === 'life-item-app-list') {
        document.getElementById('skill-more')
            ? keyboard.setCurrent(document.getElementById('skill-more'))
            : keyboard.setCurrent(document.getElementById('skill-' + prev.id.split('-')[1]));
        return true;
    } else if (!switchMore.skill && key === KEY.DOWN && prev.parentElement.id === 'skill-item-list') {
        return prev.id.split('-')[1] > 3;
    }
    return false;
}

try {
    CACHE_DATA = JSON.parse(CACHE_DATA);
} catch (e) {
    CACHE_DATA = '';
}

function filterImg(url) {
    return url.indexOf("http") === 0 ? url : (BASE_IMG_URL + url);
}

template.defaults.imports.filterImg = function (url) {
    return filterImg(url);
};

// 机器人动画
var robotAnimation = (function () {
    var index = 0,
        num = 64,
        col = 10,
        ele = document.getElementById("robot_img"),
        timer = null;
    return {
        start: function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                index = index < num - 1 ? index + 1 : 0;
                ele.style.backgroundPosition =
                    -(index % col) * 160 + "px " + -parseInt(index / col) * 160 + "px";
                robotAnimation.start();
            }, 100);
        },
        stop: function () {
            clearTimeout(timer);
            index = 0;
            ele.style.backgroundPosition =
                -(index % col) * 160 + "px " + -parseInt(index / col) * 160 + "px";
        },
        show: function () {
            ele.style.display = "block";
        }
    };
})();


// 获取元素距离文档顶部的高度
function getElementTop(element) {
    // 获取元素相对文档活已定位元素的高度
    var actualTop = element.offsetTop;
    // 获取最近的有定位的父级元素
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop
}

/**
 * 机器人说话文本动画
 * @param {String} text
 */
function robotTextAnimation(text) {
    var ele = document.getElementById("robot_tip"),
        isHiddenComplete = false;
    clearInterval(window.robotTextAnimationInterval);
    // clearTimeout(window.robotTTSTimeout);
    // cancelTTS();
    // if (text !== 'null' && text) {
    //     window.robotTTSTimeout = setTimeout(function () {
    //         callTTS(text);
    //     }, 500);
    // }
    ele.style.display = "block";
    robotAnimation.start();
    window.robotTextAnimationInterval = setInterval(function () {
        var eleOpactiy = +ele.style.opacity;
        if (eleOpactiy < 0.04) {
            isHiddenComplete = true;
            if (!text) {
                ele.innerText = "";
                ele.style.opacity = 0;
                ele.style.display = "none";
                clearInterval(window.robotTextAnimationInterval);
                robotAnimation.stop();
                return;
            } else {
                ele.innerText = text;
            }
        } else if (eleOpactiy >= 0.5 && isHiddenComplete) {
            clearInterval(window.robotTextAnimationInterval);
        }
        ele.style.opacity = isHiddenComplete
            ? eleOpactiy + 0.04
            : eleOpactiy - 0.04;
    }, 50);
}

// 是否支持 css transform 属性
var supportTransform = false;
if (
    "MozTransform" in document.documentElement.style ||
    "WebkitTransform" in document.documentElement.style ||
    "OTransform" in document.documentElement.style ||
    "msTransform" in document.documentElement.style
) {
    supportTransform = true;
}
var windowScrollTop = 0;

/* 文档滚动方法 */
function windowScrollTo(top) {
    if (top < -document.getElementById('content').offsetHeight + 500) return;
    if (top > 0) top = 0;
    if (supportTransform) {
        document.getElementById("content").style.webkitTransform =
            "translateY(" + top + "px)";
        document.getElementById("content").style.transform =
            "translateY(" + top + "px)";
    } else {
        document.getElementById("content").style.top = top + "px";
    }
    windowScrollTop = top;
}

// 区域选中事件
var lastLineLength = 1;
// 失去焦点不滚动
document.addEventListener("focusOut", function (e) {
    focusElementTitleScroll(e.elem, false);
});

// 获得焦点时title如果过长则滚动
document.addEventListener(
    "focusIn",
    function (e) {
        console.log('focusIn',e)
        if (!e.elem.classList.contains("search-item")) {
            windowScrollTo(-getElementTop(e.elem) + 164);
            var bubbleTip = e.elem.getAttribute("data-bubbletip");
            robotTextAnimation(bubbleTip);
            focusElementTitleScroll(e.elem, true);
        } else {
            searchRefresh(e.elem, e.keyName);
            focusElementTitleScroll(e.elem, true, 15);
        }
        console.timeEnd("focusIn");
        IFlyCollector.setAppVersion("1.0.0");
        IFlyCollector.onEvent(
            "FT4000",
            {
                page: pageName,
                position: e.elem.getAttribute("data-posid") || e.elem.getAttribute('id'),
                actName: e.elem.getAttribute("data-actname"),
                module: e.elem.getAttribute('id').split('-')[0] || e.elem.getAttribute('id'),
                isVoiceUser: isVoiceUser + "",
                openSource: OPEN_SOURCE,
                stbid: stbid
            },
            10
        );
    },
    false
);

/* 跳转到其他H5或安卓方法 */
function goJump(accessopen) {
    console.log('goJump: accessopen = ', accessopen)
    hideSearch();
    localStorage.setItem("id", keyboard.getCurrent().getAttribute("id"));
    localStorage.setItem("index:top", windowScrollTop);
    nativeAccessOpen(accessopen);
}

document.addEventListener("eval", function () {
    console.log('eval event')
    // cancelTTS();
    var ele = keyboard.getCurrent();
    IFlyCollector.setAppVersion("1.0.0");
    IFlyCollector.onEvent(
        "FT4001",
        {
            page: pageName,
            position: ele.getAttribute("data-posid") || ele.getAttribute('id'),
            actName: ele.getAttribute("data-actname"),
            module: ele.getAttribute('id').split('-')[0],
            isVoiceUser: isVoiceUser + "",
            openSource: OPEN_SOURCE,
            stbid: stbid
        },
        10
    );
    if (ele.classList.contains("nav-item")) {
        var to = document.getElementById(ele.getAttribute("data-to"));
        to && keyboard.setCurrent(to);
        return;
    }
    if (ele.classList.contains('switchMore')) {
        var type = ele.getAttribute('data-type');
        changeSwitchMore(type);
        return;
    }
    goJump(ele.getAttribute("data-accessopen"));
});

/* 节流函数 */
function throttle(fun, delay) {
    var last, deferTimer;
    return function (args) {
        var that = this;
        var _args = arguments;
        var now = +new Date();
        if (last && now < last + delay) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
            }, delay);
        } else {
            last = now;
            fun.apply(that, _args);
        }
    };
}

var keyFn = throttle(function (name) {
    keyboard.keyEventHandle(name);
}, 200);
document.onkeydown = function (evt) {
    console.time("focusIn");
    evt.preventDefault();
    var name = getKeyName(evt.keyCode);
    if (name === KEY.BACK) {
        history.back && history.back();
        return;
    }
    // 拦截生活服务、技能按键
    if (appIntercept(name)) {
        return;
    }
    // keyFn(name);
    keyboard.keyEventHandle(name);
};

var initialId = null; // 初始焦点id
var qs = utils.queryString();

function xiriHandler() {
    loadXiri(scenes, function (command) {
        if (scenes[command]) {
            if (typeof scenes[command].action === "function") {
                scenes[command].action();
            } else if (document.getElementById(command)) {
                goJump(document.getElementById(command).getAttribute("data-accessopen"))
            }
        }
    });
}

;(function beforeGetData() {
    if (
        localStorage.getItem("id") &&
        qs['source'] === 'back'
    ) {
        initialId = localStorage.getItem("id");
        localStorage.getItem("index:top") && windowScrollTo(localStorage.getItem("index:top"));
    }
    if (window.ENABLE_ANIMATE_SCROLL) {
        setTimeout(function () {
            document.getElementById("content").style.transition = "transform 0.3s ease-out";
            document.getElementById("content").style.webkitTransition =
                "-webkit-transform 0.3s ease-out";
        }, 500);
    }
    try {
        buildWeatherMap();
        if (localStorage.getItem("index:weather")) {
            onGetWeatherNlpResult(JSON.parse(localStorage.getItem("index:weather")))
        }
        if (localStorage.getItem("index:stock")) {
            onGetStockNlpResult(JSON.parse(localStorage.getItem("index:stock")))
        }
    } catch (e) {
        console.log("init get nlp result error");
    }
})();

if (CACHE_DATA && GET_DATA_DATE && +new Date - parseInt(GET_DATA_DATE) < DATA_CACHE_TIME) {
    fillContent(CACHE_DATA);
}
window.onload = function () {
    setTimeout(function () {
        historyEvent(function () {
            if (document.getElementById("search-result").style.display === 'block') {
                hideSearch();
                pushHistory();
                return;
            }
            // cancelTTS();
            nativeCloseNlp();
            H5_call_native('native_finish', {}, function (res) {
            })
        })
    }, 400);
    onLoadPage();
    initConfig("aiLivingRoom");
    if (!(CACHE_DATA && GET_DATA_DATE && +new Date - parseInt(GET_DATA_DATE) < DATA_CACHE_TIME)) {
        getUserActiveState(function () {
            initData(function () {
                getAuthToken(function () {
                    setWebPageInfo("aiLivingRoom");
                });
            });
        });
    } else {
        getUserActiveState(function () {
            getAuthToken(function () {
                setWebPageInfo("aiLivingRoom");
            });
        });
    }
};

function onGetWeatherNlpResult(data) {
    localStorage.setItem("index:weather", JSON.stringify(data));
    var semantic = JSON.parse(data.semantic);
    var weatherData = semantic.data.result[0];
    var weatherLogoPath =
        "./assets/images/weather/" + getWeatherName(weatherData.weather) + ".png";
    console.log("weatherLogoPath --> " + weatherLogoPath);
    $("#weather_item_logo").attr("src", weatherLogoPath);
    $("#weather_cityName").html(weatherData.city);
    $("#weather_tempRange").html(weatherData.tempRange);
    $("#weather_lastUpdateTime").html(
        "最近更新" + formatDate(new Date(), "MM/dd hh:mm")
    );
}

function onGetStockNlpResult(data) {
    localStorage.setItem("index:stock", JSON.stringify(data));
    console.log("onGetStockNlpResult --> \n" + JSON.stringify(data));
    var semantic = JSON.parse(data.semantic);
    var stockData = semantic.data.result[0];
    $("#stock_currentPrice").text(stockData.currentPrice.substring(0, 7));
    $("#stock_riseRate").text(stockData.riseRate);
    if (parseFloat(stockData.riseRate) < 0) {
        $("#stock_riseRate").css({color: "green"});
    }
    $("#stock_lastUpdateTime").html(
        "最近更新" + formatDate(new Date(), "MM/dd hh:mm")
    );
}

/**
 * render 函数，给html中的class 为 img-btn 元素添加对应的属性，类名，img src
 */

function render(eles, list, type) {
    for (
        var i = 0;
        i < (eles.length < list.length ? eles.length : list.length);
        i++
    ) {
        eles[i].index = i;
        eles[i].getElementsByTagName("img")[0].src = filterImg(list[i].showUrl);
        eles[i].setAttribute("name", eles[i].id);
        eles[i].setAttribute("data-pkgname", list[i].pkgName);
        eles[i].setAttribute("data-actName", list[i].actName);
        eles[i].setAttribute("data-httpurl", list[i].httpUrl);
        eles[i].setAttribute("data-triggertext", list[i].triggerText);
        eles[i].setAttribute("data-bubbletip", list[i].bubbleTip);
        eles[i].setAttribute("data-accessopen", list[i].accessOpen);
        eles[i].setAttribute("data-posid", eles[i].id);
        if (list[i].bubbleTip && list[i].openType !== 'skill') {
            scenes[list[i].id] = {
                words: list[i].bubbleTip.split(',')
            }
        }
        if (type === 'app') {
            eles[i].classList.add('icon_' + list[i].tag);
            eles[i].getElementsByClassName('item-app-title')[0].innerText = list[i].actName;
            eles[i].getElementsByClassName('item-app-tips')[0].innerText = list[i].subTitle;
        } else if (list[i].show_bgUrl) {
            eles[i].classList.add("should_auto_height");
            eles[i].style.backgroundSize = "100%";
        }
    }
}

/**
 *
 * @param {*} result 数据
 */
function fillContent(result) {
    // 按键绑定
    if (initialId) {
        keyboard.setCurrent(document.getElementById(initialId));
    } else {
        keyboard.setCurrent(
            document.getElementById('main-1')
        );
    }
    robotAnimation.show();

    localStorage.setItem("page_data", JSON.stringify(result));

    // title
    try {
        var titleData = JSON.parse(result.popularStatement.says[0]);
        for (var key in titleData) {
            var element = titleData[key];
            if (key === 'header') {
                document.getElementsByClassName(key + "-logo")[0].src = filterImg(element.title);
                var txt = typeof element.subTitle === 'string' ? element.subTitle : element.subTitle.join("&emsp;&emsp;");
                if (txt.length > 35) {
                    txt = '<marquee behavior="behavior">' + txt + "</marquee>"
                }
                document.getElementsByClassName(key + "-subtitle")[0].innerHTML = txt;
            } else {
                if (/.*(gif|png|jpe?g)$/.test(element.title)) {
                    document.getElementsByClassName(key + "-logo")[0].src = filterImg(element.title);
                } else {
                    document.getElementsByClassName(key + "-title")[0].innerText = element.title;
                }
                document.getElementsByClassName(key + "-subtitle")[0].innerText = element.subTitle;
            }
        }
    } catch (e) {
        console.error(e)
    }
    // top运营位
    var eles = Array.prototype.concat.apply([], document
            .getElementById("main")
            .getElementsByClassName("img-btn")),
        list = result.carousels.activityList.slice(0, 7);
    render(eles, list);

    // 交互少儿
    var childrenEles = document.getElementById('children').getElementsByClassName('img-btn'),
        childrenIList = result.operationActivities.activityList;
    render(childrenEles, childrenIList);

    // 声控游戏
    var gameList = [], gameEles = document.getElementById('game').getElementsByClassName('img-btn');
    for (i = 0; i < result.wonderfulRecommendation.activityList.length; i++) {
        gameList = gameList.concat(result.wonderfulRecommendation.activityList[i])
    }
    render(gameEles, gameList);

    // 区域数据 popularApps
    var popularApps = result.popularApps.activityList;
    var skillList = [], lifeList = [], recommendList = [], topList = [],
        childrenList = [], childrenIpList = [], bookList = [], enlightenmentList = [], txList = [];
    for (var i = 0; i < popularApps.length; i++) {
        var actName = popularApps[i].actName.split("|");
        if (actName.length === 1) {
            continue;
        }
        popularApps[i].actName = actName[1];
        switch (actName[0].toLowerCase()) {
            case 'life':
                lifeList.push(popularApps[i]);
                break;
            case 'recommend':
                recommendList.push(popularApps[i]);
                break;
            case 'skill':
                skillList.push(popularApps[i]);
                break;
            case 'top':
                topList.push(popularApps[i]);
                break;
            case 'children':
                childrenList.push(popularApps[i]);
                break;
            case 'ip':
                childrenIpList.push(popularApps[i]);
                break;
            case 'book':
                bookList.push(popularApps[i]);
                break;
            case 'enlightenment':
                enlightenmentList.push(popularApps[i]);
                break;
            case 'tx':
                txList.push(popularApps[i]);
                break;
        }
    }
    // TOP榜单
    var topEles = document.getElementById("toplist").getElementsByClassName('focusElement');
    for (var i = 0; i < topList.length; i++) {
        topEles[i].index = i;
        if (i % 4 === 0) {
            topEles[i].getElementsByTagName("img")[0].src = filterImg(topList[i].showUrl);
            document.getElementsByClassName("toplist-item-title")[i / 4].innerText = topList[i].actName;
        } else {
            topEles[i].getElementsByTagName("div")[0].innerText = topList[i].actName;
        }
        scenes[topEles[i].id] = {
            words: topList[i].bubbleTip.split(',')
        }
        topEles[i].setAttribute("name", topEles[i].id);
        topEles[i].setAttribute("data-pkgname", topList[i].pkgName);
        topEles[i].setAttribute("data-actName", topList[i].actName);
        topEles[i].setAttribute("data-httpurl", topList[i].httpUrl);
        topEles[i].setAttribute("data-triggertext", topList[i].triggerText);
        topEles[i].setAttribute("data-bubbletip", topList[i].bubbleTip);
        topEles[i].setAttribute("data-accessopen", topList[i].accessOpen);
        topEles[i].setAttribute("data-posid", topEles[i].id);
    }
    // 互动绘本
    render(document.getElementsByClassName('book-item'), bookList);
    // 亲子启蒙
    render(document.getElementsByClassName('enlightenment-item'), enlightenmentList);
    // AI童学
    render(document.getElementsByClassName("tx-item"), txList);
    // 生活服务
    render(
        document.getElementById('life-item-app-list').getElementsByClassName('focusElement'),
        lifeList.slice(0, 3),
        'app'
    );
    if (lifeList.length > 3) {
        document.getElementById("life-more-list").innerHTML = template(
            "appModel", {
                data: lifeList.slice(3),
                id: 'life',
                startIndex: 3,
                down: 'skill'
            }
        );
    } else {
        document.getElementById('life-more').parentNode.removeChild(document.getElementById('life-more'));
    }
    // 实用技能
    render(
        document.getElementById('skill-item-list').getElementsByClassName('focusElement'),
        skillList.slice(0, 6),
        'app'
    );
    if (skillList.length > 6) {
        document.getElementById("skill-more-list").innerHTML = template(
            "appModel", {
                data: skillList.slice(6),
                id: 'skill',
                startIndex: 6
            }
        );
    } else {
        document.getElementById('skill-more').parentNode.removeChild(document.getElementById('skill-more'));
    }
    skillLen = skillList.length;
    lifeLen = lifeList.length;
    // ip推荐位
    render(document.getElementsByClassName('children_ip '), childrenIpList.slice(0, 6));
    xiriHandler();
}

function initData(callback) {
    var params = {
        channelId: channelId,
        // "channelId": 'C330201',
        ipUrl: ipUrl,
        stbId: stbid,
        xiriVersion: xiriVersion,
        token: videoToken,
        activation: isVoiceUser ? "activated" : "notActive"
    };

    // console.log(TAG + " initData params-->" + JSON.stringify(params));
    console.log(TAG + " initData params-->" ,params);
    $.ajax({
        url: AI_LIVINGROOM_CONTENT_URL,
        type: "POST",
        dataType: "json",
        timeout: 15000,
        contentType: "application/json",
        data: JSON.stringify(params),
        success: function (data) {
            // console.log(TAG + " initData " + JSON.stringify(data));
            console.log(TAG + " initData,result --> ",data);
            if (data.code === "0000") {
                GET_DATA_DATE = +new Date();
                localStorage.setItem('get_data_date', GET_DATA_DATE);
                var result = data.data;
                fillContent(result);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            console.log(TAG + " initData complete --> " + textStatus);
            if (textStatus === "timeout") {
                console.log(TAG + " initData 请求超时，请稍后重试");
            }
            typeof callback === 'function' && callback();
        },
        error: function (err) {
            console.log(
                TAG + " initData 网络请求出错，请稍后重试:" + JSON.stringify(err)
            );
        }
    });
}