//开放平台相关
var appid = "7372e805",
    appsecret = "80e92ed68d819ddb",
    token = "",
    stbid = "",
    channelId = "",
    xiriVersion = "",
    OPEN_SOURCE = utils.queryString()["openSource"],
    pageName = location.pathname.split('.')[0].slice(1);
localStorage.setItem('jump_out_url', '');

var isVoiceUser = localStorage.getItem('isvoiceuser') === "true",
    hasCheckVoiceUser = false;
var videoToken = "",
    ipUrl = "",
    hasCheckUserParams = false;

// 获取鉴权的token
function getAuthToken(callback) {
    var curtime = new Date().getTime();
    var checksum = hex_md5(appsecret + curtime).toUpperCase();
    var params = {
        appid: appid,
        curtime: curtime,
        checksum: checksum
    };
    console.log("getAuthToken params-->" + JSON.stringify(params));
    $.ajax({
        url: getTokenUrl,
        type: "POST",
        dataType: "json",
        timeout: 15000,
        contentType: "application/json",
        data: JSON.stringify(params),
        success: function (res) {
            //请求成功
            console.log("getAuthToken success --> \n" + JSON.stringify(res));
            if (res.code === "0000") {
                //成功
                token = res.data.token;
                window.localStorage.setItem("token", token);
                onGetAuthToken();
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            console.log("getAuthToken complete --> " + textStatus);
            if (textStatus == "timeout") {
                console.log("getAuthToken 请求超时，请稍后重试");
            }
            typeof callback === 'function' && callback();
        },
        error: function (err) {
            console.log(
                "getAuthToken 网络请求出错，请稍后重试:" + JSON.stringify(err)
            );
        }
    });
}

function onGetAuthToken() {
    console.log("onGetAuthToken --> token = " + token);

    //调用鉴权
    H5_call_native(
        "native_check_auth",
        {
            appid: appid,
            token: token
        },
        function (res) {
            console.log("native_check_auth --> \n" + JSON.stringify(res));
        }
    );

    //获取鉴权结果
    native_call_H5("h5_check_auth_result", function (data, responseCallback) {
        console.log("h5_check_auth_result --> \n" + JSON.stringify(data));
        nativeOpenNlp("stock`weather", function () {
            sendRecognizeText("今天的天气");
        });
    });


    native_call_H5("h5_send_nlp_result", function (data, responseCallback) {
        console.log("h5_send_nlp_result:" + JSON.stringify(data))
        var service = data.service;
        if (service === "stock") {
            //返回股票语义
            onGetStockNlpResult(data);
            nativeCloseNlp();
        }
        if (service === "weather") {
            //返回天气语义
            sendRecognizeText("上证指数");
            onGetWeatherNlpResult(data);
            nativeOpenNlp("stock");
        }
    });
}

function sendRecognizeText(text) {
    H5_call_native(
        "native_recognize_text",
        {
            appid: appid,
            token: token,
            actionType: 1,
            text: text
        },
        function (res) {
            console.log("native_recognize_text --> " + JSON.stringify(res));
        }
    );
}

function nativeCloseNlp() {
    // 关闭当前开放识别文本能力（在页面关闭的时候， 或者不使用的时候关闭
    H5_call_native(
        "native_close_nlp",
        {
            appid: appid,
            token: token
        },
        function (res) {
            console.log("native_close_nlp --> " + JSON.stringify(res));
        }
    );
}

function nativeOpenNlp(services, callback) {
    //开放nlp语义
    H5_call_native(
        "native_open_nlp",
        {
            appid: appid,
            token: token,
            services: services
        },
        function (res) {
            console.log("native_open_nlp --> \n" + JSON.stringify(res));
            typeof callback === "function" && callback();
        }
    );
}

function initConfig(pageName) {
    H5_call_native(
        "native_init_config",
        {
            pageName: pageName,
            projectName: pageName,
            webBackgroundLiveMillis: getWebBackgroundLiveMillis
        },
        function (res) {
            console.log("native_init_config --> \n" + JSON.stringify(res));
        }
    );
}

function setWebPageInfo(pageName) {
    H5_call_native(
        "native_set_web_page_info",
        {
            pageName: pageName
        },
        function (res) {
            console.log("native_set_web_page_info --> \n" + JSON.stringify(res));
        }
    );
}

function nativeAccessOpen(accessOpenStr) {
    console.log("accessOpenStr --> \n" + accessOpenStr);
    if (!isEmpty(accessOpenStr)) {
        var accessOpenJSON = JSON.parse(accessOpenStr);
        var operateType = accessOpenJSON.operateType || accessOpenJSON.opType;
        if ((operateType === 'h5' || operateType === 'app' || operateType === 'video') && location.pathname.indexOf('index.html') === -1) {
            localStorage.setItem("jump_out_url", location.origin + location.pathname + "?source=back");
        }
        if (operateType === "href") {
            window.location.href = accessOpenJSON.linkUrl;
        } else {
            H5_call_native(
                "native_access_open",
                {
                    accessOpenMsg: accessOpenJSON,
                    isCallback: true
                },
                function (res) {
                    if (operateType === 'app') {
                        H5_call_native('native_finish', {}, function (res) {
                        })
                    }
                    console.log("native_access_open --> \n" + JSON.stringify(res));
                }
            );
        }
    } else {
        console.log("accessOpenStr 参数为空！");
    }
}

//判断字符是否为空的方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}

function getUserActiveState(callback) {
    H5_call_native(
        "native_voice_user",
        {
            C: 1
        },
        function (res) {
            console.log("native_voice_user --> " + JSON.stringify(res));
            var resJSON = JSON.parse(res);
            if (resJSON.code === 200) {
                if (
                    resJSON.hasOwnProperty("data") &&
                    resJSON.data.hasOwnProperty("isVoiceUser")
                ) {
                    isVoiceUser = resJSON.data.isVoiceUser;
                    localStorage.setItem('isvoiceuser', isVoiceUser)
                    console.log("isVoiceUser --> " + isVoiceUser);
                }
            }
            hasCheckVoiceUser = true;
            typeof callback === 'function' && callback();
            //pv，uv，埋点
            IFlyCollector.setAppVersion("1.0.0");
            IFlyCollector.onEvent(
                "FT4002",
                {
                    stbid: stbid,
                    isVoiceUser: isVoiceUser + "",
                    page: pageName,
                    openSource: OPEN_SOURCE
                },
                10
            );

            // 埋点
            switch (OPEN_SOURCE) {
                case "voice":
                    IFlyCollector.setAppVersion("1.0.0");
                    IFlyCollector.onEvent(
                        "FT4003",
                        {openSource: "voice", isVoiceUser: isVoiceUser + "", stbid: stbid},
                        10
                    ); //语音
                    break;
                case "operationPush":
                    IFlyCollector.setAppVersion("1.0.0");
                    IFlyCollector.onEvent(
                        "FT4003",
                        {
                            openSource: "operationPush",
                            isVoiceUser: isVoiceUser + "",
                            stbid: stbid
                        },
                        10
                    ); // 消息推送
                    break;
                case "epgFeatured":
                    IFlyCollector.setAppVersion("1.0.0");
                    IFlyCollector.onEvent(
                        "FT4003",
                        {
                            openSource: "epgFeatured",
                            isVoiceUser: isVoiceUser + "",
                            stbid: stbid
                        },
                        10
                    ); // epg推荐位
                    break;
                case "voiceArea":
                    IFlyCollector.setAppVersion("1.0.0");
                    IFlyCollector.onEvent(
                        "FT4003",
                        {openSource: "voiceArea", isVoiceUser: isVoiceUser + "", stbid: stbid},
                        10
                    ); // 语音专区
                    break;
                default:
                    console.log("没有匹配到适合的进入方式，未埋点");
            }
        }
    );
}

function getTokenAndIpUrl() {
    H5_call_native("native_get_voice_param", {}, function (res) {
        console.log("native_get_voice_param --> " + JSON.stringify(res));
        var resJSON = JSON.parse(res);
        if (resJSON.code === 200) {
            if (resJSON.hasOwnProperty("data")) {
                var dataJSON = resJSON.data;
                if (
                    dataJSON.hasOwnProperty("token") &&
                    dataJSON.hasOwnProperty("ipurl")
                ) {
                    videoToken = dataJSON.token;
                    ipUrl = dataJSON.ipurl;
                    console.log("videoToken ---> " + videoToken);
                    console.log("ipUrl ---> " + ipUrl);
                }
            }
        }
        hasCheckUserParams = true;
    });
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return fmt;
};

function formatDate(dateObj, formatStr) {
    var formatedStr = dateObj.format(formatStr);
    console.log("formatStr --> " + formatedStr);
    return formatedStr;
}

function onLoadPage(callback) {
    H5_call_native("native_get_env", {}, function (responseData) {
        responseData = JSON.parse(responseData);
        if (responseData.data) {
            // 已经激活的用户
            if (responseData.data.hasOwnProperty("xiriVersion")) {
                xiriVersion = responseData.data.xiriVersion.substring(6, 9);
            }
            if (responseData.data.activeState) {
                if (responseData.data.cid) {
                    console.log("responseData.data.cid 存在");
                    sessionStorage.channelId = channelId = responseData.data.cid;
                    stbid = responseData.data.stbid || responseData.data.stbId;
                    localStorage.setItem('stbid', stbid);
                    sessionStorage.stbId =
                        responseData.data.stbid || responseData.data.stbId;
                    if (iData.environment === "dev") {
                        sessionStorage.channelId = channelId = "C350201";
                    }
                    console.log("channelId " + sessionStorage.channelId);
                    console.log("stbId " + sessionStorage.stbId);
                    initBuryPoint(
                        iData.environment,
                        iData.buryChannel,
                        sessionStorage.stbId
                    );
                } else if (getUrlParam("CID") && getUrlParam("stbId")) {
                    console.log("getUrlParam('CID') 存在");
                    stbid = responseData.data.stbid;
                    localStorage.setItem('stbid', stbid);
                    sessionStorage.channelId = getUrlParam("CID");
                    sessionStorage.stbId = getUrlParam("stbId");
                    console.log("channelId " + sessionStorage.channelId);
                    console.log("stbId " + sessionStorage.stbId);
                    initBuryPoint(
                        iData.environment,
                        iData.buryChannel,
                        sessionStorage.stbId
                    );
                } else {
                    console.log("native_get_env没有channelId，并且url中没有channelId");
                    alert("web从机顶盒获取不到cid，native_get_env没有channelId");
                }
            } else {
                // 没有获取到用户的activeState
                console.log("activeState 不存在");
            }
        }
        typeof callback === 'function' && callback();
    });
}

var map = new Map();

function buildWeatherMap() {
    map.put("霾", "haze");
    map.put("浓雾", "smokeFog");
    map.put("暴雪", "heavySnowFall");
    map.put("暴雨", "rainStorm");
    map.put("暴雨到大暴雨", "heavyRain2BigHeavyRain");
    map.put("大暴雨", "downpour");
    map.put("大到暴雪", "big2Blizzard");
    map.put("大暴雨到特大暴雨", "bigHeavyRain2SuperHeavyRain");
    map.put("大雾", "heavyFog");
    map.put("冻雨", "freezingRain");
    map.put("多云", "cloudy");
    map.put("中度霾", "moderateHaze");
    map.put("阴", "overcastSky");
    map.put("严重霾", "severeHaze");
    map.put("雪", "snow");
    map.put("雾", "fog");
    map.put("浮尘", "floatingDust");
    map.put("晴", "fine");
    map.put("无", "nothing");
    map.put("中雪", "moderateSnow");
    map.put("沙尘暴", "sandStorm");
    map.put("扬沙", "blowingSand");
    map.put("小雨", "lightRain");
    map.put("小雪", "lightSnow");
    map.put("阵雪", "snowShower");
    map.put("中雨", "moderateRain");
    map.put("大雪", "heavySnow");
    map.put("大雨", "heavyRain");
    map.put("重度霾", "heavyHaze");
    map.put("强沙尘暴", "heavySandstorm");
    map.put("阵雨", "rainShower");
    map.put("雷阵雨", "thundershower");
    map.put("特大暴雨", "extraordinaryRainstorm");
    map.put("雷阵雨伴有冰雹", "thunderstormAndHail");
    map.put("雨夹雪", "rainAndSnow");
    map.put("强浓雾", "strongFog");
    map.put("大到暴雨", "heavy2Rainstorm");
    map.put("特强浓雾", "superStrongFog");
    map.put("小到中雪", "small2ModerateSnow");
    map.put("小到中雨", "small2ModerateRain");
    map.put("中到大雪", "moderate2HeavySnow");
    map.put("中到大雨", "moderate2HeavyRain");
}

function getWeatherName(key) {
    return map.get(key);
}

function Map() {
    this.elements = new Array();
    //获取MAP元素个数
    this.size = function () {
        return this.elements.length;
    };
    //判断MAP是否为空
    this.isEmpty = function () {
        return this.elements.length < 1;
    };
    //删除MAP所有元素
    this.clear = function () {
        this.elements = new Array();
    };
    //向MAP中增加元素（key, value)
    this.put = function (_key, _value) {
        this.elements.push({
            key: _key,
            value: _value
        });
    };
    //删除指定KEY的元素，成功返回True，失败返回False
    this.remove = function (_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function (_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch (e) {
            return null;
        }
    };
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function (_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    };
    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function (_key) {
        varbln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function (_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    };
    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    };
}


function aliasScenes(list) {
    var result = [];
    for (var g = 0; g < list.length; g++) {
        if (typeof list[g] === 'string') {
            result.push(list[g]);
        } else {
            list[g].main && result.push(list[g].main);
            list[g].alias && (result = result.concat(list[g].alias));
        }
    }
    return result;
}

function loadXiri(scenes, callback, preventKeyHandler, preventSearchHandler) {
    var gameList = aliasScenes(GAME_LIST);
    var videoList = aliasScenes(VIDEO_LIST);
    var keyHandlerList = {}, scenesList = {
        "_scene": "com.iflytek.xiri.MyScene",
        "_commands": {},
        "_feedbacks": {},
        "_fuzzy_words": {}
    };
    if (pageName !== 'help') {
        scenesList._commands = {
            "_search_video": ["$W(video)"],
            "_search_game": ["$W(game)"],
            "_search_rzk": ["$W(rzk)"],
            "_search_list": ["交互绘本", "交互动画", "英语课堂", "糖果识字"]
        };
        scenesList._fuzzy_words = {
            "video": videoList,
            "game": gameList,
            "rzk": ["认知卡"]
        }
    }
    console.log("videoList:" + JSON.stringify(videoList));
    console.log("gameList:" + JSON.stringify(gameList));
    keyHandlerList[KEY.UP] = ["向上", "上"];
    keyHandlerList[KEY.LEFT] = ["向左", "左"];
    keyHandlerList[KEY.RIGHT] = ["向右", "右"];
    keyHandlerList[KEY.DOWN] = ["向下", "下"];
    keyHandlerList[KEY.OK] = ["确定", "OK"];
    keyHandlerList[KEY.BACK] = ["返回"];
    for (var key in keyHandlerList) {
        scenesList._commands[key] = keyHandlerList[key];
        scenesList._feedbacks[key] = keyHandlerList[key][0]
    }
    if (scenes) {
        for (var id in scenes) {
            scenesList._commands[id] = scenes[id].words instanceof Array ? scenes[id].words : [scenes[id].words];
            scenesList._feedbacks[id] = scenes[id].words instanceof Array ? scenes[id].words[0] : scenes[id].words;
        }
    }
    var listener = new Xiri.Listener(function (result) {
        console.log("XiriResult:" + JSON.stringify(result));
        try {
            if (result._command !== '_XIRI_PUSH') {
                if (!preventKeyHandler && !!keyHandlerList[result._command]) {
                    keyboard.keyEventHandle(result._command);
                    return;
                }
                if (!preventSearchHandler && result._command.indexOf("_search") === 0) {
                    var type = result._command.split("_search_")[1];
                    typeof xiriSearch === 'function' && xiriSearch(type, result[type] || result._rawtext);
                    return;
                }
                typeof callback === 'function' && callback(result._command);
            }
        } catch (e) {
            console.log("err:" + e);
        }
    });
    listener.regist(scenesList);
}