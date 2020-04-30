document.onkeydown = function (evt) {
    evt.preventDefault();
    var name = getKeyName(evt.keyCode);
    if (name === KEY.BACK) {
        back();
    } else {
        keyboard.keyEventHandle(name);
    }
};
var index = 0;

function back() {
    var qs = utils.queryString();
    if (qs['backUrl']) {
        window.location.href = qs['backUrl'];
    } else {
        window.location.href = './index.html?openSource=AI_HELP&source=back'
    }
}

document.addEventListener("eval", function (e) {
    var ele = keyboard.getCurrent();
    if (ele.id.indexOf('next') > -1) {
        if (ele.id === 'next-1') {
            ele.classList.remove('show');
            document.getElementById('page2').classList.add('show');
            keyboard.setCurrent(document.getElementById('next-2'));
            index = 1;
        } else if (ele.id === 'next-2') {
            ele.classList.remove('show');
            document.getElementById('page3').classList.add('show');
            keyboard.setCurrent(document.getElementById('btn-3'));
            index = 2;
        }
    } else {
        back();
    }
}, false);
window.onload = function () {
    keyboard.setCurrent(document.getElementById('next-1'));
    onLoadPage(function () {
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
        xiriHandler();
    });


};

function xiriHandler() {
    var tips = [].concat(HELP_NEXT_KEYWORDS[0]).concat(HELP_NEXT_KEYWORDS[1]).concat(HELP_NEXT_KEYWORDS[2]);
    var scenes = {
        "tg": {words: ["跳过"]},
        "xyb": {words: ["下一步"]},
        "wc": {words: ["完成"]}
    };
    for (var i = 0; i < tips.length; i++) {
        scenes['w' + i] = {
            words: [tips[i]]
        }
    }
    loadXiri(scenes, function (command) {
        if (HELP_NEXT_KEYWORDS[index].indexOf(scenes[command].words[0]) > -1 || command === 'xyb') {
            keyboard.setCurrent(document.getElementById('next-' + (index + 1)));
            keyboard.keyEventHandle(KEY.OK);
        } else if (command === 'tg' || command === 'wc') {
            back();
        }
    })

}