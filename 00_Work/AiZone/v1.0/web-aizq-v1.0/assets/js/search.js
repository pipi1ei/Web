var search_current_index = 0,
    search_total_length,
    search_prev_focus,
    search_show_status = false;

function showSearch(data, txt) {
    console.log('showSearch: data = ',data,'txt = ' + txt)
    H5_call_native('native_close_ui_event', {"appid": appid, "token": getToken()}, function (res) {
    });
    var resultDom = document.getElementById("search-result");
    if (resultDom.style.display !== 'block') {
        search_prev_focus = keyboard.getCurrent();
        searchRobotAnimation.start();
    }
    var searchTip = document.getElementById("search-tip");
    if (data.code === 500) {
        searchTip.innerText = "没有找到“" + txt + "”, 为您推荐其它内容";
    } else if (data.code === 9999) {
        searchTip.innerText = "为您推荐以下内容"
    } else {
        searchTip.innerText = "为您找到 “" + txt + "” 相关内容"
    }
    search_show_status = true;
    document.getElementById("search-result").style.display = 'block';
    search_total_length = data.pb.dataList.length;
    document.getElementById('search-list-wrap').innerHTML = template("searchModel", {
        data: data.pb.dataList,
        imgUrl: DDXT_IMG_BASE_URL
    });
    resetSearchList();
    keyboard.setCurrent(
        document.getElementById('search-item-0')
    );
}

function hideSearch() {
    if (document.getElementById("search-result").style.display !== 'block') {
        return
    }
    searchRobotAnimation.stop();
    search_show_status = false;
    document.getElementById("search-result").style.display = 'none';
    keyboard.setCurrent(
        search_prev_focus
    )
}

var searchRobotAnimation = (function () {
    var index = 0,
        num = 7,
        col = 2,
        ele = document.getElementById("search-logo"),
        timer = null;
    return {
        start: function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                index = index < num - 1 ? index + 1 : 0;
                ele.style.backgroundPosition =
                    -(index % col) * 300 + "px " + -parseInt(index / col) * 300 + "px";
                searchRobotAnimation.start();
            }, 200);
        },
        stop: function () {
            clearTimeout(timer);
            index = 0;
            ele.style.backgroundPosition =
                -(index % col) * 300 + "px " + -parseInt(index / col) * 300 + "px";
        },
        show: function () {
            ele.style.display = "block";
        }
    };
})();

function resetSearchList() {
    search_current_index = 0;
    var wrap = document.getElementById("search-list-wrap");
    wrap.style.webkitTransform = "translateX(0px)";
    wrap.style.transform = "translateX(0px)";
}

function searchRefresh(dom, keyName) {
    var index = +dom.getAttribute("data-index"),
        wrap = document.getElementById("search-list-wrap");
    if (keyName) {
        if (index >= search_current_index + 4 || index <= search_current_index) {
            if (keyName === KEY.LEFT) {
                search_current_index = index;
            } else if (keyName === KEY.RIGHT) {
                search_current_index = index - 3;
            }
            wrap.style.webkitTransform = "translateX(" + (-search_current_index * 297) + "px)";
            wrap.style.transform = "translateX(" + (-search_current_index * 297) + "px)";
        }
    }
    document.getElementById('search-left').style.display = search_current_index > 0 ? 'block' : 'none';
    document.getElementById('search-right').style.display = search_current_index + 4 < search_total_length ? 'block' : 'none';
}

var gameList = ["看图猜成语", "垃圾分类大作战", "尖叫大冒险", "姆姆跳跳", "Parkou", "Rolling", "奇妙南瓜夜", "识字打地鼠", "数字拼图大挑战", "果园接水果", "欢乐海钓", "声动情侠斗地主", "疯狂猜猜猜", "拆楼大作战", "球球向前冲", "海底总动员", "小兔过河", "马里奥蛋糕店", "全民捕鱼", "穿越火线", "节奏大师", "熊熊打靶", "熊熊钓鱼", "熊熊滑板", "垃圾分类大作战"];


function getXiriSearchTxt(list, txt) {
    for (var i = 0; i < list.length; i++) {
        if (typeof list[i] === 'string') {
            if (list[i] === txt) {
                return txt;
            }
        } else {
            if (list[i].main === txt || list[i].alias.indexOf(txt) > -1) {
                return list[i].main;
            }
        }
    }
}

function xiriSearch(type, txt) {
    if (type === 'list') {
        switch (txt) {
            case "糖果识字":
                goJump('{"opType":"app",' +
                    '"pkgName":"com.iflytek.tgsz",' +
                    '"clsName":"com.iflytek.duduclass.SplashActivity",' +
                    '"params":[{"key":"source","value":"entry=aiArea","type":"String"}]}'
                );
                break;
            case "交互绘本":
                goJump("{\"opType\":\"app\"," +
                    "\"pkgName\":\"com.iflytek.duduclass\"," +
                    "\"clsName\":\"com.iflytek.duduclass.SplashActivity\"," +
                    "\"params\":[{\"key\":\"source\",\"value\":\"entry=column-aiArea&code=Picture\",\"type\":\"String\"}]}");
                break;
            case "交互动画":
                goJump("{\"opType\":\"app\"," +
                    "\"pkgName\":\"com.iflytek.duduclass\"," +
                    "\"clsName\":\"com.iflytek.duduclass.SplashActivity\"," +
                    "\"params\":[{\"key\":\"source\",\"value\":\"entry=column-aiArea&code=story\",\"type\":\"String\"}]}");
                break;
            case "英语课堂":
                goJump("{\"opType\":\"app\"," +
                    "\"pkgName\":\"com.iflytek.duduclass\"," +
                    "\"clsName\":\"com.iflytek.duduclass.SplashActivity\"," +
                    "\"params\":[{\"key\":\"source\",\"value\":\"entry=column-aiArea&code=englishABC\",\"type\":\"String\"}]}");
                break;
        }
    } else if (type === 'tgsz') {
        goJump('{"opType":"app",' +
            '"pkgName":"com.iflytek.tgsz",' +
            '"clsName":"com.iflytek.duduclass.SplashActivity",' +
            '"params":[{"key":"source","value":"entry=aiArea","type":"String"}]}'
        );
    } else if (type === 'rzk') {
        goJump('{' +
            '"opType": "app",' +
            '"pkgName": "com.iflytek.duduclass",' +
            '"clsName": "com.iflytek.duduclass.SplashActivity",' +
            '"params": [{"key": "source", "value": "entry=column-aiArea&code=englishCard", "type": "String"}]' +
            '}');
    } else if (type === 'game') {
        goJump('{' +
            '"opType": "app",' +
            '"pkgName": "com.iflytek.yyt",' +
            '"clsName": "com.iflytek.yyt.SplashActivity",' +
            '"params": [{"key": "source", "value": "entry=game-aiArea&code=' + getXiriSearchTxt(GAME_LIST, txt) + '", "type": "String"}]' +
            '}');
    } else if (type === 'video') {
        getSearchResult(getXiriSearchTxt(VIDEO_LIST, txt));
    }
}

function nlp_search(data, responseCallback) {
    var service = data.service;
    var token = data.token;
    var semantic = JSON.parse(data.semantic);
    var linkId = data.linkId;
    console.log("nlp_search" + data.semantic);
    var resObj = {};
    if (semantic.semantic && semantic.semantic.length > 0 && semantic.semantic[0].slots) {
        var keyword = semantic.semantic[0].slots.pop().value;
        if ("认知卡" === keyword) {
            goJump('{' +
                '"opType": "app",' +
                '"pkgName": "com.iflytek.duduclass",' +
                '"clsName": "com.iflytek.duduclass.SplashActivity",' +
                '"params": [{"key": "source", "value": "entry=column-aiArea&code=englishCard", "type": "String"}]' +
                '}');
            return;
        }
        if (gameList.indexOf(keyword) > -1) {
            goJump('{' +
                '"opType": "app",' +
                '"pkgName": "com.iflytek.yyt",' +
                '"clsName": "com.iflytek.yyt.SplashActivity",' +
                '"params": [{"key": "source", "value": "entry=game-aiArea&code=' + keyword + '", "type": "String"}]' +
                '}');
            return;
        }
        getSearchResult(keyword, function (xhr, status) {
            resObj.data = {
                "asrToken": data.token,
                "handled": status === 'success' && xhr.responseJSON && xhr.responseJSON.pb.dataList.length > 0
            }; // false表示客户端处理
            if (responseCallback) {
                responseCallback(JSON.stringify(resObj));
            }
        });
    }
}

function getSearchResult(keyWord, callback) {
    $.ajax({
        url: DDXT_BASE_URL + "service/searchService.jsp?method=ajaxSearchSeriesByKeyword&keyword=" + keyWord,
        dataType: "jsonp",
        success: function (result) {
            console.log("getSearchResult::" + JSON.stringify(result));
            showSearch(result, keyWord, callback);
        },
        complete: function (xhr, status) {
            try {
                typeof callback === 'function' && callback(xhr, status);
            } catch (e) {
                console.log(e);
            }
        }
    });
}