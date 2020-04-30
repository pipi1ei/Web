/**
  * 拦截后退按键事件
 *
 */
function historyEvent(callback) {
    pushHistory();
    window.addEventListener('popstate', function (e) {
        callback()
    }, false)
}
function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, "title", "#");
}
// 拦截后退按键事件end

/**
 * 获取URL中的参数
 * @param {参数名} name 
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; // 返回参数值
}

//点击埋点
function addCensusEvent(code) {
    H5_call_native('native_census_event', {
        "eventType": 1,
        "customJson": JSON.stringify({
            "code": code,
            "eventTime": new Date().getTime(),
        })
    }, function (response) {
        console.log("点击埋点 native_census_event --> " + JSON.stringify(response));
    });
}

// 非语音埋点
function addNoVoiceCensusEvent(eventCode, curPageName, openPageName, businessType, openType, stayTime, key, value) {
    var paramJSON = {
        "eventCode": eventCode,
        "eventTime": new Date().getTime(),
        "openPageName": openPageName.length == 0 ? "" : (openPageName + "_" + window.location.href),
        "curPageName": curPageName.length == 0 ? "" : (curPageName + "_" + window.location.href),
        "topActivity": "com.iflytek.xiri.webview.WebviewActivity",
        "openType": openType,
        "type": businessType,
        "stayTime": stayTime,
        "featuresName": openPageName.length == 0 ? "" : (openPageName + "_" + window.location.href),
        "featuresStatus": "success",
    };
    if (key && value) {
        paramJSON.key = value;
    }
    H5_call_native('native_census_event', {
        "eventType": 1,
        "customJson": JSON.stringify(paramJSON)
    }, function (response) {
        console.log("非语音埋点 native_census_event --> " + JSON.stringify(response));
    });
}

//语音埋点
function addVoiceCensusEvent(linkId, bizType, eventFunc, featuresCustom, featuresName) {
    var param = {
        "businessEnd_featuresName": featuresName,
        "businessEnd_featuresStatus": "success",
        "businessEnd_businessType": bizType
    };
    if (featuresCustom) {
        param.businessEnd_featuresCustom = featuresCustom
    }
    H5_call_native('native_census_event', {
        "eventType": 0,
        "_linkId": linkId,
        "eventFunction": eventFunc,
        "customJson": JSON.stringify(param)
    }, function (response) {
        console.log("语音埋点 native_census_event --> " + JSON.stringify(response));
    });
}
/**
 *初始化iData埋点
 *
 * @param {*} environment 环境
 * @param {*} projectName 项目名称
 * @param {*} stbId 机顶盒唯一标识码stbId
 */
function initBuryPoint(environment, projectName, stbId) {
    var param = {
        appId: 'D395069269',   //stbID
        host: window.location.href,
        debug: (environment == 'dev' || environment == 'test') ? true : false,
        spa: false,
    }
    if (iData.collectUrl) {
        param.collectUrl = iData.collectUrl;
    }
    if (iData.configUrl) {
        param.configUrl = iData.configUrl;
        param.analysisUrl = iData.configUrl;
    }
    IFlyCollector.init(param)
    IFlyCollector.setChannel(projectName)
    IFlyCollector.setDuid(stbId)
}

// 根据页面url中配的opensource值来区分页面进入方式，然后埋点
// urlVal：opensource值，代表意义如下：
// 'voice' ：语音
// 'operationPush' ： 消息推送
// 'epgFeatured' ： epg推荐位
// 'voiceArea' ： AI客厅（语音专区）
// buryCode：埋点码
// buryId：埋点ID
function chooseBuryPoint(urlVal, buryCode, buryId, versionNnum) {
    console.log("走到了assets里面的chooseBuryPoint，versionNnum的值为" + versionNnum);
    if (urlVal) {
        console.log("urlVal不为null，2值为" + urlVal);
        IFlyCollector.setAppVersion(versionNnum);
        IFlyCollector.onEvent(buryCode, { 'openSource': urlVal }, buryId);
    }
    else {
        console.log("urlVal的值为" + urlVal);
        console.log("没有匹配到适合的进入方式，未埋点");
    }
}

// 退出游戏。区分 退回到AI客厅 或 退出H5
function exitGame(param, steps) {
    H5_call_native('native_open_iat', {
        openIatResult: false
    }, function (responseData) { })
    if (param && param == 'voiceArea') {
        setTimeout(function () {
            console.log("window.history.length-1：" + steps);
            window.history.go(steps);
            console.log("window.history.length-1 after：" + steps);
        }, 500)
    } else {
        H5_call_native('native_finish', {}, function (res) { })

        //   setTimeout(function()  {
        //     console.log("window.history.length-1：" +steps);
        //     window.history.go(steps);
        //     console.log("window.history.length-2 after：" +steps);
        //     },500)

    }
}

function exitGameWithoutAI() {
    H5_call_native('native_open_iat', {
        openIatResult: false
    }, function (responseData) { })
    H5_call_native('native_finish', {}, function (res) { })
}

// 页面跳转
function changePage(urlVal, isAI) {
    H5_call_native('native_open_iat', {
        openIatResult: false
    }, function (responseData) { });
    setTimeout(function () {
        $(".loading").hide();
        if (isAI) {
            window.location = urlVal + "?openSource=" + isAI;
        }
        else {
            window.location = urlVal;
        }
    }, 1000);
}

function getToken() {
    if (token == undefined || token.length == 0) {
        token = window.localStorage.getItem("token");
    }
    return token;
}

// TTS
function sendTTS() {
    native_call_H5('h5_send_tts_status', function (data, responseCallback) {
        var ttsStatus = data.ttsStatus;
        var progress = data.progress;
        console.log("data.ttsStatus 和 data.progress：" + ttsStatus + " " + progress);
    });
}
function callTTS(ttsText) {
    // 执行语音合成
    H5_call_native('native_start_tts', {
        "appid": appid,
        "token": getToken(),
        "text": ttsText   //ttsText 需要合成的文本
    }, function (response) {
        console.log("native_start_tts --> " + ttsText + response);
    });
}
function cancelTTS() {
    H5_call_native('native_cancel_tts', {
        "appid": appid,
        "token": getToken()
    }, function (res) {
        console.log("native_cancel_tts --> " + res);
    });
}
