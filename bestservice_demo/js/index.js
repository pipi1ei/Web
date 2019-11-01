$(function () { 
    scrollTo(0,0); //刷新页面时定位到顶部
    initTopBar();
    initBanner();
    initNews();
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
            imageHtml += '<a href="#"><img src="' + item + '"></a>';
            imageHtml += '</div>';
        })
        imageBox.html(imageHtml);

        var isMobile = e_window.width() < 768 ? true : false;
        if (!isMobile) {
            e_banner.on('mouseover', function () {
                leftControl.css({
                    'transition': 'all 300ms',
                    '-webkit-transition': 'all 300ms',
                    'left': '50px'
                });
                rightControl.css({
                    'transition': 'all 300ms',
                    '-webkit-transition': 'all 300ms',
                    'right': '50px'
                });
            }).on('mouseout', function () {
                leftControl.css({
                    'transition': 'all 300ms',
                    '-webkit-transition': 'all 300ms',
                    'left': '-60px'
                });
                rightControl.css({
                    'transition': 'all 300ms',
                    '-webkit-transition': 'all 300ms',
                    'right': '-60px'
                });
            })
        }
    }
    e_window.on('resize',function(){
        render();
    }).trigger('resize');
}

/* 初始化新闻，根据后台数据动态渲染 */
var initNews = function () { 
    console.log('initNews')
    //获取dom元素
    var newsBox = $('.bs_news');

    // 模拟后台数据
    var news = [
        {
            title: '百得思维出席安徽省服务贸易和服务外包协会召开的新春座谈会',
            image: '../images/news1.png',
            time: '2019-02-16',
            text: '2月15日上午，安徽省服务贸易与服务外包协会会员新春座谈会在省商务厅6楼会议室召开，安徽百得思维信息科技有限公司受协会邀请出席该项会议，党建指导员项莉、秘书长夏俊及会员企业代表共十余人参加了此次座谈会。安徽省服务贸易和服务外包协会秘书长夏俊主持了此次座谈会，本次座谈会旨在反馈各会员单位在经营中遇到的问题，会上，参会代表就各自企业关于招聘、社保、税改、融资等经营方面遇到的困难提出问题及意见。...'
        },
        {
            title: '安徽百得思维信息科技有限公司荣获高新区“促进就业”称号',
            image: '../images/news2.jpg',
            time: '2019-02-13',
            text: '2019年1月25日，在合肥市高新区举办的“合肥市高新区企业表彰大会”上，安徽百得思维信息科技有限公司被授予“提质增效——促进就业奖”荣誉称号，这是继2018年获得该项荣誉称号后，连续三年取得此项殊荣。安徽百得思维信息科技有限公司是省内较成熟的IT人力资源服务企业。目前，服务于省内外多家企业，基于在人力资源服务领域的专业发展和客户资源的深厚积累，安徽百得思维信息科技有限公司在吸纳就业人才、...'
        },
        {
            title: '安徽百得思维信息科技有限公司荣获“2018年度安徽服务外包企业十强及成长型企业”称号',
            image: '../images/news3.jpg',
            time: '2019-01-14',
            text: '2019年1月11日下午，由安徽省商务厅、合肥高新区、合肥市商务局、合肥市人社局、长江经济带服务贸易产业联盟、上海外服（集团）有限公司共同指导；安徽省服务贸易和服务外包协会、上海外服安徽人力资源服务有限公司主办；合肥市高新区人力资源协会支持的“2019安徽服务贸易发展论坛”在合肥市召开，来自政府部门、省内服务贸易企业、资深专家学者、培训机构及行业协会代表等200余人参会。安徽百得思维信息科技有限公...'
        },
        {
            title: '百得思维与巢湖学院信息工程学院校企合作成果分享会',
            image: '../images/news4.jpg',
            time: '2018-12-06',
            text: '2018年12月5日，安徽百得思维信息科技有限公司与巢湖学院信息工程学院合作成果分享会在百得思维合肥总部隆重举行，科大讯飞技术中心总经理朱大治、技术中心运营总监桂诚、智慧城市事业部市场总监兰明博、雇主品牌部经理侯颖、湖北工业大学副校长张颖江、巢湖学院副院长徐柳凡、巢湖学院信息工程学院院长郑尚志、巢湖学院组织部副部长洪燕、巢湖学院教务处处长谢如龙...'
        },
        {
            title: '百得思维与安徽师范大学计算机与信息学院签约揭牌仪式',
            image: '../images/news5.jpg',
            time: '2018-11-30',
            text: '2018年11月30日，安徽百得思维信息科技有限公司与安徽师范大学计算机与信息学院合作签约仪式在百得思维合肥总部隆重举行，安徽百得思维信息科技有限公司运营总监陶斯炜、雇主品牌部经理侯颖、安徽师范大学计算机与信息学院院长罗永龙、副院长陈付龙、党委副书记张园园、辅导员王云鹏，共同见证并进行了签约仪式。此次合作签约仪式上，安徽百得思维信息科技有限公司与安徽师范大学计算机与信息学院建立了新型合作关系，...'
        },
    ];
    var newsHtml = '';
    $.each(news,function (i,item) { 
        newsHtml += '<div class="body"><div class="title"><a href = "#" >'+item.title+'</a></div >';
        newsHtml += '<div class="content"><img src="' + item.image + '"><p><strong><span class="glyphicon glyphicon-time"></span>' + item.time + ' &nbsp;</strong>' + item.text + '</p></div ></div>';
        
    })
    newsBox.append(newsHtml);
}

var initTooltip = function () {
    console.log('initTooltip');
    var fix = $('.fix');
    var e_window = $(window);
    fix.tooltip();
    fix.click(function (e) { 
        console.log('fixClick')
        e.preventDefault();
        $('html,body').animate({
            scrollTop: '0px'
        },500)
    });
   
    /* if(scrollTo > 0){
        fix.show();
    } */
    var scrollTop = 0;
    e_window.on('scroll',function () {
        scrollTop = e_window.scrollTop();
        if(scrollTop == 0){
            fix.fadeOut(1000);
        } else{
            fix.fadeIn(1000);
        }
    })
}