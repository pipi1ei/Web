window.onload = function () {
    initLeftSwipe();
    // iScrollLeft();
    initRightSwipe();
};

/* 初始化左侧滑动 */
var initLeftSwipe = function () {
    /* 
        1.上下的滑动
    */
    var parentBox = document.querySelector('.cate_left');
    var childBox = parentBox.querySelector('ul');

    var startY = 0; //记录开始滑动Y方向位置
    var distanceY = 0; //记录Y方向滑动的距离
    var currentY = 0; //记录当前Y方向位置
    childBox.addEventListener('touchstart', function (e) {
        console.log('touchstart');
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove', function (e) {
        console.log('touchmove');
        var moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        console.log(distanceY);
        console.log('currentY = ' + currentY);
        var translateY = currentY + distanceY;

        childBox.style.transform = 'translateY(' + translateY + 'px)';
        childBox.style.webkitTransform = 'translateY(' + translateY + 'px)';
    });
    childBox.addEventListener('touchend', function (e) {
        console.log('touchend');
        currentY += distanceY;
        if (currentY >= 250) {
            currentY = 0;
            childBox.style.transition = 'all 0.2s';

            childBox.style.transform = 'translateY(0px)';
        } else if (currentY <= -250) {
            currentY = -(childBox.offsetHeight - parentBox.offsetHeight);
            console.log('1:' + currentY)
            childBox.style.transition = 'all 0.2s';

            childBox.style.transform = 'translateY(' + currentY + 'px)';
        }
    });
}


var iScrollLeft = function () {
    //使用iScroll滑动
    new IScroll(document.querySelector('.cate_left'));
}

/* 初始化右侧滑动 */
var initRightSwipe = function () {
    new IScroll(document.querySelector('.cate_right'));
}