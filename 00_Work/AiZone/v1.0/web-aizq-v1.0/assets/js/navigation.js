var currentSelectedIndex = '',
    currentSelectedIDList = [
        '',
        'nav-1-1',
        'nav-2-1',
        'nav-3-1',
        'nav-4-1'
    ],
    supportTransform = false,
    stbid = localStorage.getItem('stbid'),
    isVoiceUser = localStorage.getItem('isvoiceuser');

template.defaults.imports.filterImg = function (url) {
    return url.indexOf("http") === 0 ? url : (BASE_IMG_URL + url);
};

if (
    "MozTransform" in document.documentElement.style ||
    "WebkitTransform" in document.documentElement.style ||
    "OTransform" in document.documentElement.style ||
    "msTransform" in document.documentElement.style
) {
    supportTransform = true;
}

function windowScrollTo(top) {
    if (top > 0) top = 0;
    var id = 'nav-' + currentSelectedIndex + '-content';
    if (supportTransform) {
        document.getElementById(id).style.webkitTransform =
            "translateY(" + top + "px)";
        document.getElementById(id).style.transform =
            "translateY(" + top + "px)";
    } else {
        document.getElementById(id).style.top = top + "px";
    }
}

function getElementTop(element) {
    var actualTop = element.offsetTop
    var current = element.offsetParent
    while (current !== null) {
        actualTop += current.offsetTop
        current = current.offsetParent
    }
    return actualTop
}

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
        window.location.href = './index.html?openSource=AI_NAV&source=back'
    }
}

document.onkeydown = function (evt) {
    evt.preventDefault();
    var name = getKeyName(evt.keyCode),
        current = keyboard.getCurrent();
    if (name === KEY.BACK) {
        back();
        return;
    }
    if (current.classList.contains('nav-btn')) {
        if (name === KEY.RIGHT) {
            keyboard.setCurrent(
                document.getElementById(currentSelectedIDList[+currentSelectedIndex])
            );
            return;
        }
    } else if (
        current.classList.contains('item-app') ||
        current.classList.contains('item-head')
    ) {
        var index = +current.getAttribute('data-index');
        if (name === KEY.LEFT) {
            if (index % 2 === 0 || index === -1) {
                keyboard.setCurrent(
                    document.getElementById('nav-' + currentSelectedIndex)
                )
            } else {
                keyboard.setCurrent(
                    document.getElementById('nav-' + currentSelectedIndex + '-' + index)
                )
            }
            return;
        } else if (name === KEY.RIGHT) {
            var ele = document.getElementById('nav-' + currentSelectedIndex + '-' + (index + 2));
            ele && keyboard.setCurrent(ele)
            return;
        } else if (name === KEY.UP) {
            if (index === 0 || index === 1) {
                keyboard.setCurrent(document.getElementById('nav-' + currentSelectedIndex + '-0'))
            } else {
                var ele = document.getElementById('nav-' + currentSelectedIndex + '-' + (index - 1));
                ele && keyboard.setCurrent(ele)
            }
            return;
        } else if (name === KEY.DOWN) {
            var ele = document.getElementById(
                'nav-' + currentSelectedIndex + '-' + (index === -1 ? 1 : (index + 3))
            );
            ele && keyboard.setCurrent(ele)
            return;
        }
    }
    keyboard.keyEventHandle(name);
};

document.addEventListener("focusOut", function (e) {
    focusElementTitleScroll(e.elem, false);
});

document.addEventListener("focusIn", function (e) {
    var ele = e.elem;
    IFlyCollector.setAppVersion("1.0.0");
    IFlyCollector.onEvent(
        "FT4000",
        {
            page: pageName,
            position: e.elem.getAttribute("data-posid"),
            actName: e.elem.getAttribute("data-actname"),
            isVoiceUser: isVoiceUser,
            openSource: 'index',
            stbid: stbid
        },
        10
    );
    if (ele.classList.contains("search-item")) {
        searchRefresh(e.elem, e.keyName);
        focusElementTitleScroll(e.elem, true, 15);
    } else if (ele.classList.contains('nav-btn')) {
        if (ele.id === 'nav-' + currentSelectedIndex) return
        if (document.getElementsByClassName('show').length > 0) {
            document.getElementsByClassName('show')[0].classList.remove('show');
        }
        if (document.getElementsByClassName('selected').length > 0) {
            document.getElementsByClassName('selected')[0].classList.remove('selected');
        }
        ele.classList.add('selected');
        document.getElementById(ele.id + "-content").classList.add('show');
        currentSelectedIndex = ele.getAttribute('index');
    } else {
        currentSelectedIDList[+currentSelectedIndex] = ele.id;
        windowScrollTo(-getElementTop(ele) + 250);
    }
}, false);

function goJump(accessopen) {
    hideSearch();
    localStorage.setItem("nav:id", keyboard.getCurrent().getAttribute("id"));
    nativeAccessOpen(accessopen);
}

document.addEventListener("eval", function () {
    var ele = keyboard.getCurrent();
    IFlyCollector.setAppVersion("1.0.0");
    IFlyCollector.onEvent(
        "FT4001",
        {
            page: pageName,
            position: ele.getAttribute("data-posid"),
            actName: ele.getAttribute("data-actname"),
            isVoiceUser: isVoiceUser + "",
            openSource: 'index',
            stbid: stbid
        },
        10
    );
    goJump(ele.getAttribute("data-accessopen"));
}, false);

function render(eles, list, type) {
    for (
        var i = 0;
        i < (eles.length < list.length ? eles.length : list.length);
        i++
    ) {
        eles[i].index = i;
        eles[i].getElementsByTagName("img")[0].src =
            list[i].showUrl.indexOf("http") === 0 ? (BASE_IMG_URL + list[i].showUrl) : (list[i].showUrl);
        eles[i].setAttribute("name", eles[i].id);
        eles[i].setAttribute("data-pkgname", list[i].pkgName);
        eles[i].setAttribute("data-actName", list[i].actName);
        eles[i].setAttribute("data-httpurl", list[i].httpUrl);
        eles[i].setAttribute("data-triggertext", list[i].triggerText);
        eles[i].setAttribute("data-bubbletip", list[i].bubbleTip);
        eles[i].setAttribute("data-accessopen", list[i].accessOpen);
        eles[i].setAttribute("data-posid", eles[i].id);
        if (type === 'app') {
            eles[i].getElementsByClassName('item-app-title')[0].innerText = list[i].actName;
            eles[i].getElementsByClassName('item-app-tips')[0].innerText = list[i].subTitle;
        } else if (list[i].show_bgUrl) {
            eles[i].classList.add("should_auto_height");
            eles[i].style.backgroundSize = "100%";
        }
    }
}

function fillContent() {
    var skillList = JSON.parse(localStorage.getItem('skilllist')),
        lifeList = JSON.parse(localStorage.getItem('lifelist')),
        recommendList = JSON.parse(localStorage.getItem('recommendlist'));
    document.getElementById('nav-1-content').innerHTML += template("appModel", {
        data: recommendList.slice(1),
        baseImgUrl: BASE_IMG_URL,
        head: recommendList[0],
        index: '1'
    });
    document.getElementById('nav-2-content').innerHTML += template("appModel", {
        data: [].concat(skillList).concat(lifeList),
        baseImgUrl: BASE_IMG_URL,
        index: '2'
    });
    document.getElementById('nav-3-content').innerHTML += template("appModel", {
        data: lifeList,
        baseImgUrl: BASE_IMG_URL,
        index: '3'
    });
    document.getElementById('nav-4-content').innerHTML += template("appModel", {
        data: skillList,
        baseImgUrl: BASE_IMG_URL,
        index: '4'
    });
}

window.onload = function () {
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
    }, 400);
    fillContent();
    var qs = utils.queryString();
    if (qs['source'] === 'back' && localStorage.getItem('nav:id')) {
        if (localStorage.getItem('nav:id').split('-').length === 2) {
            keyboard.setCurrent(
                document.getElementById(localStorage.getItem('nav:id'))
            );
        } else {
            keyboard.setCurrent(
                document.getElementById(localStorage.getItem('nav:id').slice(0, 5))
            );
            keyboard.setCurrent(
                document.getElementById(localStorage.getItem('nav:id'))
            );
        }
    } else if (qs['to'] && document.getElementsByClassName('nav-' + qs['to']).length > 0) {
        keyboard.setCurrent(document.getElementsByClassName('nav-' + qs['to'])[0]);
        keyboard.setCurrent(
            document.getElementById(
                document.getElementsByClassName('nav-' + qs['to'])[0].getAttribute('id') + '-1'
            )
        );
    } else {
        keyboard.setCurrent(document.getElementById('nav-1'));
        keyboard.setCurrent(document.getElementById('nav-1-1'));
    }
    xiriHandler();
};


function xiriHandler() {
    var sences =
        {
            "nav-1": {
                words: ['精彩推荐']
            },
            "nav-2": {
                words: ['全部']
            },
            "nav-3": {
                words: ['生活服务']
            },
            "nav-4": {
                words: ['实用技能']
            },
        };
    loadXiri(sences, function (command) {
        if (sences[command]) {
            if (typeof sences[command].action === "function") {
                sences[command].action();
            } else if (document.getElementById(command)) {
                keyboard.setCurrent(document.getElementById(command));
            }
        }
    });
}