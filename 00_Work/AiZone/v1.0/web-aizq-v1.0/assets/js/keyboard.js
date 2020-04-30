var keyboard = (function () {
    var _groupSelect = {}

    /**
     * 按键处理
     * @param keyName
     */
    var keyEventHandle = function (keyName) {
        // console.log('进入按键处理的函数~~~' + keyName);
        var nodes = document.getElementsByClassName("modelDialog");
        var isModelDialog = nodes.length > 0;
        var current = getCurrent();
        if (keyName === KEY.OK) {
            //TODO 对于元素的显示判断
            current && current.style.display !== 'none' && clickItem(current)
        } else if (keyName === KEY.UP || keyName === KEY.DOWN || keyName === KEY.LEFT || keyName === KEY.RIGHT) {
            // 获取可上焦点的元素
            var elements = getElements();
            if (elements.length === 0) {
                // console.log('页面没有可选中元素');
            } else if (!current) {
                // console.log('选中第一个元素');
                // var first = findFirst(elements);
                // first && setCurrent(first, isModelDialog);
                return;
            } else {
                // console.log('选中下一个元素');
                var next = findNext(elements, keyName);
                next && setCurrent(next, isModelDialog, keyName);
            }
        }
    }

    /**
     * [设置当前选中元素]
     * @param {HTMLElement} value       [需要设置选中的元素]
     * @param {boolean} [sameNeedSet] [和之前相同的元素是否需要重新设置]
     * @param {string} [keyName] 键值
     */
    var setCurrent = function (value, sameNeedSet, keyName) {
        // 新旧元素一致，则返回
        var last = getCurrent()
        if (value === last && sameNeedSet === undefined) {
            return
        }
        // 自动点击逻辑
        !value.classList.contains('selectElement') && isAutoClick(value) && clickItem(value);

        // 自动播放语音功能
        !value.classList.contains('selectElement') && isAutoPlay(value) && playItem(value);

        //组内元素记录最后一次选中元素
        var groupName = getGroupName(value)
        var groupInUseLastFocus = getGroupInUseLastFocus(value)
        if (groupName && groupInUseLastFocus) {
            // 设置组内新元素选中、老元素移除选中
            _groupSelect[groupName] && _groupSelect[groupName].classList.remove("selectElement")
            value.classList.add('selectElement');
            _groupSelect[groupName] = value;
        }

        // 老元素移除选中 当last为undefined时 就不会移除选中样式
        // console.log('--------老元素last-------' + typeof(last));
        last && last.classList.remove('currentFocusElement');
        //抛出焦点离开事件
        var evtout = document.createEvent('HTMLEvents');
        evtout.initEvent("focusOut", false, false);
        evtout.elem = last;
        document.dispatchEvent(evtout);

        // 设置新元素选中
        value.classList.add('currentFocusElement');
        //抛出获取焦点事件  
        var evtin = document.createEvent('HTMLEvents');
        evtin.initEvent("focusIn", false, false);
        evtin.elem = value;
        evtin.prev = last;
        evtin.keyName = keyName;
        document.dispatchEvent(evtin);

    }

    //查找第一个元素
    var findFirst = function (elements) {
        var element
        var min = 0
        for (var i = 0; i < elements.length; i++) {
            var p = localToGlobal(elements[i])
            var value = p.x + p.y
            if (!element || value < min) {
                element = elements[i]
                min = value
            }
        }
        return element
    }

    //查找下一个元素
    var findNext = function (elements, direction) {
        var focus;
        var current = getCurrent();

        // 优先一：指定的元素为null，则不进行移动
        var stop = findByNull(direction, current)
        if (stop) {
            return undefined
        }

        // 优先二：查找明确指定的元素
        var r = findByName(elements, direction, current)
        if (r && r[0]) {
            return r[1]
        }
        return;

        // 优先三：从组中查询
        focus = findByGroup(elements, direction, current)
        if (focus) {
            return focus
        }
        console.log("enter findByPosition")
        // 优先四：查找坐标最近的元素
        focus = findByPosition(elements, direction, current)
        if (!focus) {
            return undefined
        }
        // 优先级五：回退到某个组，这个组需要选中最后选中的元素,则选中最后选中的元素
        var groupName = getGroupName(focus)
        var groupInUseLastFocus = getGroupInUseLastFocus(focus)
        if (groupName && groupInUseLastFocus && getGroupName(current) !== groupName && _groupSelect[groupName]) {
            return _groupSelect[groupName]
        }
        return focus
    }

    //优先一：指定的元素为null，则不进行移动
    var findByNull = function (d, c) {
        if (d === KEY.UP && c.attributes['up'] && c.attributes['up'].value === 'null') {
            return true
        } else if (d === KEY.RIGHT && c.attributes['right'] && c.attributes['right'].value === 'null') {
            return true
        } else if (d === KEY.DOWN && c.attributes['down'] && c.attributes['down'].value === 'null') {
            return true
        } else if (d === KEY.LEFT && c.attributes['left'] && c.attributes['left'].value === 'null') {
            return true
        }
        return false
    }

    // 优先二：查找明确指定的元素
    var findByName = function (elements, d, c) {
        var name = "";
        switch (d) {
            case KEY.UP:
                name = c.attributes['up'] && c.attributes['up'].value
                break
            case KEY.LEFT:
                name = c.attributes['left'] && c.attributes['left'].value
                break
            case KEY.RIGHT:
                name = c.attributes['right'] && c.attributes['right'].value
                break
            case KEY.DOWN:
                name = c.attributes['down'] && c.attributes['down'].value
                break
        }
        if (!name) return [false, undefined]
        var ele = document.getElementById(name);
        if (ele) return [true, ele]
        name = name.indexOf(",") > -1 ? name.split(",") : [name];
        for (var i = 0; i < name.length; i++) {
            if (!name[i]) continue
            var ele = document.getElementById(name[i])
            if (ele && ele.className.indexOf("focusElement") > -1) {
                return [true, ele]
            }
        }
        return [false, undefined]
    }

    // 优先三：从group中查询
    var findByGroup = function (elements, d, c) {
        var cGroupName = getGroupName(c)
        if (!cGroupName) {
            return undefined
        }
        var groupElements = []
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i]
            if (getGroupName(element) === cGroupName) {
                groupElements.push(element)
            }
        }
        if (groupElements.length === 0) {
            return undefined
        }
        return findByPosition(groupElements, d, c)
    }

    var getElementByDes = function (elements, name) {
        for (var i = 0; i < elements.length; i++) {
            if (getName(elements[i]) === name) {
                return elements[i];
            }
        }
    }

    // 优先四：基于坐标查找最近的元素
    var findByPosition = function (elements, d, c) {
        var cp = localToGlobal(c);
        if (d === KEY.RIGHT) cp.x += c.offsetWidth
        var allX = []
        var allY = []
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i]
            if (element === c) {
                allX.push(0)
                allY.push(0)
                continue
            }
            var p = localToGlobal(element)
            d === KEY.LEFT && allX.push(cp.x - p.x - element.offsetWidth)
            d === KEY.RIGHT && allX.push(p.x - cp.x)
            d === KEY.UP && allY.push(cp.y - p.y)
            d === KEY.DOWN && allY.push(p.y - cp.y)
            if (d === KEY.UP || d === KEY.DOWN) {
                allX.push(p.x - cp.x + element.offsetWidth / 2 - c.offsetWidth / 2)
            }
            if (d === KEY.LEFT || d === KEY.RIGHT) {
                allY.push(p.y - cp.y)
            }
        }
        var targetIndex = findMinDes(allX, allY, d)
        return (targetIndex === undefined) ? undefined : elements[targetIndex]
    }

    // 查找距离最近的点
    var findMinDes = function (subXs, subYs, d) {
        var index // 元素位置
        var score // 距离值
        for (var i = 0; i < subXs.length; i++) {
            var subx = subXs[i]
            var suby = subYs[i]
            var mainSub = (d === KEY.LEFT || d === KEY.RIGHT) ? subx : suby
            if (mainSub > 0) {
                var tmp = Math.sqrt(subx * subx + suby * suby)
                if (score === undefined || tmp < score) {
                    score = tmp
                    index = i
                }
            }
        }
        return index
    }

    //获取当前选中元素
    var getCurrent = function () {
        //如果有弹出框，焦点在弹出框上找
        var nodes = document.getElementsByClassName("modelDialog");
        // 是否有弹出框
        var dom = nodes.length > 0 ? nodes[0] : document;
        var currentFocusElements = dom.getElementsByClassName('currentFocusElement');
        // 当前选中焦点的个数
        var currentFocusLength = currentFocusElements.length;
        // console.log('选中的个数' + currentFocusLength);
        var element = currentFocusLength > 0 ? currentFocusElements[0] : undefined;

        // // 当选中的焦点数大于1的情况下 需要删除其他焦点的选中状态
        // if(currentFocusLength > 1) {
        //     for(var i = 1; i < currentFocusElements.length; i++) {
        //         currentFocusElements[i] && currentFocusElements[i].classList.remove('currentFocusElement');
        //     }
        // }

        return element;
    }

    // 获取可上焦点的元素
    var getElements = function () {
        var nodes = document.getElementsByClassName("modelDialog");
        var dom = nodes.length > 0 ? nodes[0] : document;
        var visibleElements = []
        var elements = dom.getElementsByClassName('focusElement')
        for (var i = 0; i < elements.length; i++) {
            //TODO 对于元素的显示判断
            if (elements[i].style.display !== 'none') {
                visibleElements.push(elements[i])
            }
        }
        return visibleElements
    }

    //点击元素行为
    var clickItem = function (item) {
        var evtin = document.createEvent('HTMLEvents');
        evtin.initEvent("eval", false, false);
        document.dispatchEvent(evtin);
    }

    // 播放音频行为
    var playItem = function (item) {
        var onPlay = getElementString(item, "onPlay");
        onPlay && eval(onPlay);
    }

    //是否是自动点击对象
    var isAutoClick = function (element) {
        return getElementBoolean(element, 'autoClick')
    }

    // 是否是自动播放音频
    var isAutoPlay = function (element) {
        return getElementBoolean(element, 'autoPlay')
    }

    //获取名称
    var getName = function (element) {
        return getElementString(element, 'name')
    }

    //获取名称
    var getGroupName = function (element) {
        return getElementString(element, 'groupName')
    }

    //获取名称
    var getGroupInUseLastFocus = function (element) {
        return getElementBoolean(element, 'groupInUseLastFocus')
    }

    //获取节点的属性值
    var getElementBoolean = function (element, key) {
        var node = element.attributes[key]
        return node ? true : false
    }

    //获取节点的属性值
    var getElementString = function (element, key) {
        var node = element.attributes[key]
        return node ? node.value : undefined;
    }

    //获取绝对坐标
    var localToGlobal = function (element, d) {
        function getElementLeft(element) {
            var actualLeft = element.offsetLeft
            var current = element.offsetParent
            while (current !== null) {
                actualLeft += current.offsetLeft
                current = current.offsetParent
            }
            return actualLeft
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

        return {
            x: getElementLeft(element),
            y: getElementTop(element)
        }
    }

    return {
        keyEventHandle: keyEventHandle,
        setCurrent: setCurrent,
        getCurrent: getCurrent
    }
})();
