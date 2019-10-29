$(function () { 
    initBanner();
})

/* 初始化轮播图，根据屏幕宽度动态加载图片 */
var initBanner = function () { 
    /* 
        1.获取dom元素
        2.模拟后台数据
        3.判断当前设备
        4.根据当前设备把数据转化成html：拼接字符串
            4.1：点盒子动态渲染
            4.2：图片盒子动态渲染
        5.渲染到页面中
        6.测试能否响应移动端和非移动端：监听页面尺寸改变重新渲染
        7.移动端手势切换功能，左滑、右滑
    */

    //1.获取dom元素
    var e_banner = $('.wjs_banner'); //轮播图容器
    var e_imageBox = e_banner.find('.carousel-inner')//图片盒子
    var e_pointBox = e_banner.find('.carousel-indicators') //点盒子
    var e_window = $(window); //窗口对象

    //2.模拟后台数据
    var imagesUrl = [
        {
            pc_imageUrl: "../images/banner1.jpg",
            m_imageUrl: "../images/banner1.jpg"
        },
        {
            pc_imageUrl: "../images/banner2.jpg",
            m_imageUrl: "../images/banner2.jpg"
        },
        {
            pc_imageUrl: "../images/banner3.jpg",
            m_imageUrl: "../images/banner3.jpg"
        },
        {
            pc_imageUrl: "../images/banner4.jpg",
            m_imageUrl: "../images/banner4.jpg"
        }
    ]


    //渲染
    var render = function () { 
        //3.判断当前设备
        var isMobile = e_window.width() < 768 ? true : false;
        
        var pointHtml = '';
        var imageHtml = '';
        $.each(imagesUrl, function (i, item) { 
            //4.1 点盒子渲染
            pointHtml += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'" '+(i==0?'class="active"':'')+'></li>';
            //4.2 图片盒子渲染
            imageHtml += '<div class="item '+(i==0?"active":"")+'">';
            if(isMobile){
                imageHtml += '<a class="m_imageBox" href="#"><img src="'+item.m_imageUrl+'"></a>'
            }else{
                imageHtml += '<a class="pc_imageBox" href="#" style="background-image:url('+item.pc_imageUrl+')"></a>' 
            }
            imageHtml += '</div>'
        });
        e_pointBox.html(pointHtml);
        e_imageBox.html(imageHtml);
    }
    // render();

    //6.测试能否响应移动端和非移动端：监听页面尺寸改变重新渲染
    e_window.on('resize',function () { 
        render();
    }).trigger('resize'); // trigger('resize'): 主动触发resize事件
    
    //7.移动端手势切换功能，左滑、右滑
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    e_banner.on('touchstart',function (e) { 
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        isMove = true;
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
    }).on('touchend', function (e) {
        if(isMove && Math.abs(distanceX) > 50){
            if(distanceX > 0){
                //右滑，上一张图片
                e_banner.carousel('prev');
            }else{
                //左滑，下一张图片
                e_banner.carousel('next');
            }
        }

        startX = 0;
        distanceX = 0;
        isMove = false;
    })
}