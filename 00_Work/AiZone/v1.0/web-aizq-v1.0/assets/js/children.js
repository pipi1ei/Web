var stbid = localStorage.getItem('stbid'),
    isVoiceUser = localStorage.getItem('isvoiceuser');
document.onkeydown = function (evt) {
    evt.preventDefault();
    var name = getKeyName(evt.keyCode);
    if (name === KEY.BACK) {
        back();
    } else {
        keyboard.keyEventHandle(name);
    }
};

function back() {
    if (document.getElementById("search-result").style.display === 'block') {
        hideSearch();
        pushHistory();
        return;
    }
    var qs = utils.queryString();
    if (qs['backUrl']) {
        window.location.href = qs['backUrl'];
    } else {
        window.location.href = './index.html?openSource=AI_CHILDREN&source=back'
    }
}

document.addEventListener("focusOut", function (e) {
    focusElementTitleScroll(e.elem, false);
});

document.addEventListener('focusIn', function (e) {
    var ele = e.elem;
    IFlyCollector.setAppVersion("1.0.0");
    IFlyCollector.onEvent(
        "FT4000",
        {
            page: pageName,
            position: e.elem.getAttribute("data-posid") || ele.getAttribute('id'),
            actName: e.elem.getAttribute("data-actname") || ele.getAttribute('id'),
            isVoiceUser: isVoiceUser,
            openSource: 'index',
            stbid: stbid
        },
        10
    );
    if (ele.classList.contains("search-item")) {
        searchRefresh(e.elem, e.keyName);
        focusElementTitleScroll(e.elem, true, 15);
    }
}, false);

function goJump(accessopen) {
    hideSearch();
    localStorage.setItem("children:id", keyboard.getCurrent().getAttribute("id"));
    nativeAccessOpen(accessopen);
}

document.addEventListener('eval', function () {
    var ele = keyboard.getCurrent();
    IFlyCollector.setAppVersion("1.0.0");
    IFlyCollector.onEvent(
        "FT4001",
        {
            page: pageName,
            position: ele.getAttribute("data-posid") || ele.getAttribute('id'),
            actName: ele.getAttribute("data-actname") || ele.getAttribute('id'),
            isVoiceUser: isVoiceUser + "",
            openSource: 'index',
            stbid: stbid
        },
        10
    );
    goJump(ele.getAttribute("data-accessopen"));
}, false);

function render(dataList) {
    var eles = document.getElementsByClassName('focusElement');
    for (var i = 0; i < dataList.length; i++) {
        eles[i].setAttribute("data-accessopen", dataList[i].accessOpen);
        eles[i].setAttribute("data-actName", dataList[i].actName);
    }
}

window.onload = function () {
    // getAuthToken();
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
    });
    setTimeout(function () {
        historyEvent(function () {
            back();
        });
    }, 100);
    var dataList = JSON.parse(localStorage.getItem('childrenlist'));
    render(dataList);
    loadXiri({
        "btn-1": {
            words: ["交互绘本"]
        }, "btn-2": {
            words: ["交互动画"]
        }, "btn-3": {
            words: ["糖果识字"]
        }, "btn-4": {
            words: ["英语课堂"]
        },
    }, function (command) {
        if (document.getElementById(command)) {
            goJump(document.getElementById(command).getAttribute("data-accessopen"))
        }
    });
    if (utils.queryString()['source'] === 'back') {
        keyboard.setCurrent(document.getElementById(localStorage.getItem('children:id')));
    } else {
        keyboard.setCurrent(document.getElementById('btn-1'));
    }
}