window.onload = function () {
    // 初始化搜索
    initSearch();

    // 初始化轮播图
    initBanner();

    // 初始化倒计时
    countDown();
};

//初始化顶部搜索，搜索框透明度随着滚动距离改变
var initSearch = function () {
    /*
    *  1.搜索部分据顶部距离为0时透明度为0；
    *  2.搜索部分据顶部距离为轮播图高度时透明度为1；
    *  3，搜索部分在0和轮播图高度直接透明度动态变化
    * */

    // 获取dom对象
    var e_search = document.querySelector('.jd_search_box');
    var e_banner = document.querySelector('.jd_banner');

    // 获取轮播图高度
    var banner_height = e_banner.offsetHeight;
    console.log(banner_height);
    var opacity = 0;
    // 监听滚动事件
    window.onscroll = function () {
        var offset_height = document.documentElement.scrollTop; // chrome
        // var ie_offset_height = document.body.scrollTop; //IE
        if (offset_height >= banner_height){
            opacity = 0.85;
        } else {
            opacity = 0.85 * (offset_height/banner_height);
        }

        e_search.style.background = 'rgba(228,49,48,'+ opacity +')';
    }
};

/* 初始化轮播图 */
var initBanner = function () {
    /* 
        1.无缝滚动和无缝滑动（定时器+过渡+位移）
        2.点盒子对应改变（改变当前样式）
        3.可以左右滑动（touch事件，监听触摸点坐标改变距离，做位移）
        4.当滑动距离不够的时候，吸附回去（过渡+位移）
        5.当滑动距离够了的时候跳转上一张/下一张（判断方向，过渡+位移）
    */

    //获取需要操作的dom元素
    var e_banner = document.querySelector('.jd_banner'); //大容器
    var banner_width = e_banner.offsetWidth;
    console.log("banner_width = " + banner_width);
    var imageBox = e_banner.querySelector('ul:first-child'); //图片盒子
    var pointBox = e_banner.querySelector('ul:last-child'); //点盒子
    var points = pointBox.querySelectorAll('li'); //所有的点

    /* 抽取公共方法 */
    // 给dom添加过渡
    var addTransition = function (dom) {
        dom.style.transition = 'all 0.3s';
        dom.style.webkitTransition = 'all 0.3s';
    }

    // 移除dom元素过渡
    var removeTransition = function (dom) {
        dom.style.transition = 'none';
        dom.style.webkitTransition = 'none';
    }

    // 给dom元素设置X方向位移
    var setTranslateX = function (dom, translateX) {
        dom.style.transform = 'translateX(' + translateX + 'px)';
        dom.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }

    //1.无缝滚动实现

    var index = 1;//轮播图当前索引
    var fun_scroll = function () {
        index++;
        /* 过渡 */
        addTransition(imageBox);
        /* 位移 */
        setTranslateX(imageBox, (-index * banner_width));
    }
    var timer = setInterval(fun_scroll, 2500);

    /* 监听过渡结束事件 */
    imageBox.addEventListener('transitionend', function () {
        //无缝滚动
        if (index >= 9) {
            index = 1;
            //清除过渡
            removeTransition(imageBox);
            //定位到第一张
            setTranslateX(imageBox, -banner_width);
        }
        //无缝滑动
        else if (index <= 0) {
            index = 8;
            removeTransition(imageBox);
            setTranslateX(imageBox, -index * banner_width);
        }

        setPoint();
    });

    //2点盒子对应改变
    var setPoint = function () {
        // 去除所有的now样式
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove('now');
        }
        // 给对应点添加now样式
        points[index - 1].classList.add('now');
    }

    //3.滑动效果
    var startX = 0; //记录开始滑动时X坐标
    var distanceX = 0; //记录X轴位移距离
    var isMove = false; //是否滑动过
    e_banner.addEventListener('touchstart', function (e) {
        clearInterval(timer); //清除定时器
        startX = e.touches[0].clientX;
    });

    //imageBox.addEventListener('touchmove)无效 ? 
    e_banner.addEventListener("touchmove", function (e) {
        isMove = true;
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        /* distanceX > 0,向右滑动
           distanceX < 0,向左滑动 */
        removeTransition(imageBox); // 去除过渡
        var translateX = -index * banner_width + distanceX;//需要定位的位置
        setTranslateX(imageBox, translateX);
    });
    e_banner.addEventListener('touchend', function (e) {
        // 开启定时器
        if (isMove) {
            //滑动过，判断滑动距离是否大于轮播图宽度1/4，如果是，切换下一张轮播图，不是则吸附回去
            if (Math.abs(distanceX) < banner_width / 4) {
                addTransition(imageBox);
                setTranslateX(imageBox, -index * banner_width);
            } else {
                if (distanceX > 0) {
                    index--;
                } else {
                    index++;
                }
                addTransition(imageBox);
                setTranslateX(imageBox, -index * banner_width);
            }
        }
        clearInterval(timer)// 严谨做法，保证定时器只加一次
        timer = setInterval(fun_scroll, 1000);
        //重置参数
        startX = 0;
        distanceX = 0;
        isMove = false;
    });
}

/* 倒计时 */
var countDown = function () { 
    /* 
        1.模拟倒计时时间
        2.利用定时器，每隔一秒重新展示一次时间
     */

     var time = 60*60*11;
    var e_countDown = document.querySelector('.countdown_box'); //秒杀时间盒子
    var spans = e_countDown.querySelectorAll('span'); //盒子下的span元素集合

    var timer = setInterval(function () { 
        time--;
        // 格式化时间
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        // 设置小时
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        // 设置分钟
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        // 设置秒
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        
        if(time <= 0){
            clearInterval(timer);
        }
    },1000)
}