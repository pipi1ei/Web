window.onload = function () {
    console.log('onload');
    setTimeout(initBanner,2000);
    // initBanner();
}

var initBanner = function () {
    console.log('initBanner');
    var e_banner = document.querySelector('.sn_banner'); //轮播图容器
    var imageBox = e_banner.querySelector('.imageBox'); //图片盒子
    var pointBox = e_banner.querySelector('.pointBox'); //点盒子
    var points = pointBox.querySelectorAll('li'); //所有的点
    var banner_width = e_banner.offsetWidth;
    console.log(banner_width);

    var addTransition = function(dom){
        dom.style.transition = "all 0.2s";
        dom.style.webkitTransition = "all 0.2s";
    }

    var removeTransition = function(dom){
        dom.style.transition = "none";
        dom.style.webkitTransition = "none";
    }

    var setTranslateX = function(dom,translateX){
        dom.style.transform = 'translateX(' + translateX + 'px) '; dom.style.webkitTransform = 'translateX(' + translateX + 'px) '; 
    }

    //无缝滚动
    var index = 1;
    var timer = setInterval(function () {
        index++;
        addTransition(imageBox);
        setTranslateX(imageBox,-index*banner_width);
    },2000);

    imageBox.addEventListener('transitionend',function(){
        if(index >= 9){
            index = 1;
            removeTransition(imageBox);
            setTranslateX(imageBox, -index*banner_width);
        }else if(index <= 0){
            index = 8;
            removeTransition(imageBox);
            setTranslateX(imageBox, -index*banner_width);
        }
        setPoint();
    });

    //点盒子对应改变
    var setPoint = function(){
        for(var i=0; i<points.length; i++){
            points[i].classList.remove('now');
        }
        points[index-1].classList.add('now')
    }

    //移动端滑动效果
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener('touchstart',function(e){
        //关闭定时器
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        isMove = true;
        var endX = e.touches[0].clientX;
        distanceX = endX - startX;
        removeTransition(imageBox);
        setTranslateX(imageBox, -index*banner_width + distanceX);
    });
    imageBox.addEventListener('touchend',function(){
        if(isMove && Math.abs(distanceX) > banner_width/5){
            if(distanceX > 0){
                index--;
            }else{
                index++;
            }
        }
        addTransition(imageBox);
        setTranslateX(imageBox, -index * banner_width);

        //重置参数，开启定时器
        startX = 0;
        distanceX = 0;
        isMove = false;
        clearInterval(timer);
        timer = setInterval(function(){
            index++;
            addTransition(imageBox);
            setTranslateX(imageBox, -index * banner_width);
        },2000)
    });
}