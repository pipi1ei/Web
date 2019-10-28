### touch事件
touchstart：手指刚刚触摸到屏幕时触发的事件

touchmove：手指在屏幕上滑动时会不停的触发

touchend：手指离开屏幕时触发

touchncancel：被迫终止滑动触发的事件。如正在滑动时收到来电


如何绑定touch事件：
on 绑定，但是第二次会覆盖
使用addEventListener();

滑动效果分析：
依靠touch事件，根据触摸位置的改变，改变对应元素的位移translate
1.如何监听位置的改变：
2.如何获取当前的坐标：
3.计算位移再设置滑动：

触摸点集合：记录触摸点
changedTouches：当前最新改变的触摸点集合，整个事件都会有changedTouches记录
targetTouches：记录当前元素上面的所有触摸点集合，touchend事件没有记录
touches：记录页面上所有的触摸点集合，touchend事件没有记录

获取坐标：
clientX:
clientY:
基于当前视口触摸点的坐标
pageX:
pageY:
基于当前页面触摸点的坐标
screenX:
screenY:
基于当前屏幕触摸点的坐标

### js过渡和动画结束事件：
过渡结束事件：transitionend
动画结束事件：animationend

### tap事件
和移动端的click事件有关系，
click事件在移动端的特点：300ms左右延迟，问题：造成相应较慢，影响用户体验

解决方案：
方案一：tap事件（可以认为比click响应更快的事件，tap事件是通过touch事件衍生的）：
tap事件条件：
    1.比click响应要快，150ms以内
    2.不能滑动

方案二：插件;fastclick。 zepto移动端的js库


### 不熟悉的知识点：
1.css过渡transition
2.css位移transform
3.js的querySelector()querySelectorAll()和方法
4.定时器方法写法
5.css动画
6.dom.classList属性
7.清除定时器后再开启：
    var fun1 = function(){...}
    var t = setInterval(fun1,1000);
    clearInterval(t); 
    t = setInterval(fun_scroll,1000);
8.js Math相关方法
9.document.body 和 document.documentElement区别
10.console.time() 和 console.timeEnd() 方法：
    console.time(param)：给定一个参数开始记录时间
    console.timeEnd(param)：取出某个参数和现在的时间差，打印只会在console.timeEnd() 方法打印
11.获取当前时间方法：Date.now()方法

### github 用法：
1.https://www.cnblogs.com/zhixi/p/9584624.html