$(function () { 
    initTopBar();
    initBanner();
    initTooltip();
})

/* 初始化顶部导航条 */
var initTopBar = function () { 
    console.log('initTopBar')
    var e_window = $(window);
    var nav = $('.bs_topBar .nav.navbar-nav.margin'); //导航条对象
    var navItems = nav.find('li.dropdown');

    e_window.on('click',function () { 
        $.each(navItems, function (k, v) {
            $(v).find('ul').css({
                'display': 'none'
            })
        });
    })

    $.each(navItems,function (i,item) {
        var e_ul = $(item).find('ul')
        console.log(e_ul)
        $(item).on('click',function (e) {
            e.stopPropagation(); //阻止事件冒泡
            $.each(navItems,function (k,v) { 
                if(k !== i){
                    $(v).find('ul').css({
                        'display': 'none'
                    })
                }
            });
            e_ul.css({
                'display': 'block'
            })
        })
    })
}

/* 
    初始化轮播图
    模拟后台数据，动态渲染轮播图
    鼠标移动轮播图上左右控制图标滑动出来，
    鼠标离开轮播图控制图标滑动小时
*/
var initBanner = function () {
    console.log('initBanner');
    /* 获取dom元素 */
    var e_window = $(window);
    var e_banner = $('.bs_banner .carousel');
    var imageBox = e_banner.find('.carousel-inner')
    var leftControl = e_banner.find('.left');
    var rightControl = e_banner.find('.right');

    /* 模拟后台数据 */
    var imageUrls = [
        '../images/banner1.jpg',
        '../images/banner2.jpg',
        '../images/banner3.jpg',
        '../images/banner4.jpg',
        '../images/banner5.jpg',
        '../images/banner6.jpg',
    ]

    /* 动态渲染，根据后台数据加载图片，非移动端左右控制动态渲染 */
    var render = function(){
        var imageHtml = '';
        $.each(imageUrls, function (i, item) {
            imageHtml += '<div class="item ' + (i == 0 ? "active" : "") + '">';
            imageHtml += '<img src="' + item + '">';
            imageHtml += '</div>';
        })
        imageBox.html(imageHtml);

        var isMobile = e_window.width() < 768 ? true : false;
        if (!isMobile) {
            e_banner.on('mouseover', function () {
                leftControl.css({
                    'transition': 'all 150ms',
                    '-webkit-transition': 'all 150ms',
                    'left': '50px'
                });
                rightControl.css({
                    'transition': 'all 150ms',
                    '-webkit-transition': 'all 150ms',
                    'right': '50px'
                });
            }).on('mouseout', function () {
                leftControl.css({
                    'transition': 'all 150ms',
                    '-webkit-transition': 'all 150ms',
                    'left': '-60px'
                });
                rightControl.css({
                    'transition': 'all 150ms',
                    '-webkit-transition': 'all 150ms',
                    'right': '-60px'
                });
            })
        }
    }
    e_window.on('resize',function(){
        render();
    }).trigger('resize');
}

var initTooltip = function () {
    var fix = $('.fix');
    fix.tooltip();
    /* fix.on('click',function () {
        scrollTo(0,0)
    }) */

}