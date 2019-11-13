### jQuery 选择器
*属性选择器：*
1. $('[href]'): $("[href]") 选取所有带有 href 属性的元素。
2. $("[href='#']") 选取所有带有 href 值等于 "#" 的元素。
3. $("[href!='#']") 选取所有带有 href 值不等于 "#" 的元素。
4. $("[href$='.jpg']") 选取所有 href 值以 ".jpg" 结尾的元素。

$("p:first"): 第一个 <p> 元素
$("p:last"):	最后一个 <p> 元素
$("tr:even")	所有偶数 <tr> 元素
$("tr:odd")	所有奇数 <tr> 元素

$("ul li:eq(3)")	列表中的第四个元素（index 从 0 开始）
$("ul li:gt(3)")	列出 index 大于 3 的元素
$("ul li:lt(3)")	列出 index 小于 3 的元素
$("input:not(:empty)")	所有不为空的 input 元素

$(":header")	所有标题元素 <h1> - <h6>
$(":animated")	 所有动画元素
$(":contains('W3School')")	包含指定字符串的所有元素
$(":empty")	无子（元素）节点的所有元素
$("p:hidden")	所有隐藏的 <p> 元素
$("table:visible")	所有可见的表格
$("th,td,.intro")	所有带有匹配选择的元素


### noConflict()
jQuery 使用 $ 符号作为 jQuery 的简写。如果一些其他的JS框架也使用 $ 符号作为简写，就可能导致脚本停止运行
通过noConflict() 方法会释放 $ 符号的控制，这样其他脚本就可以使用它了
示例：
  $.noConflict();
  jQuery(document).ready(function(){
    jQuery("button").click(function(){
      jQuery("p").text("jQuery 仍在运行！");
    });
  });
也可以创建自己的简写符号：
  var jq = $.noConflict();
    jq(document).ready(function(){
      jq("button").click(function(){
        jq("p").text("jQuery 仍在运行！");
      });
  });


### 显示和隐藏：
语法：  
    `$(selector).hide(speed,callback);`
    `$(selector).show(speed,callback);`
    可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。可选的 callback 参数是隐藏或显示完成后所执行的函数名称。
可以使用 toggle() 方法来切换 hide() 和 show() 方法。语法：`$(selector).toggle(speed,callback);`


### 淡入淡出
1. fadeIn(): 淡入已隐藏的元素。语法：`$(selector).fadeIn(speed,callback);`
2. fadeOut(): 淡出可见元素。语法：`$(selector).fadeOut(speed,callback);`
3. fadeToggle(): 可以在 fadeIn() 与 fadeOut() 方法之间进行切换。语法：`$(selector).fadeToggle(speed,callback);`
4. fadeTo(): 允许渐变为给定的不透明度（值介于 0 与 1 之间）。语法：`$(selector).fadeTo(speed,opacity,callback);`。*必需*的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。*必需*的 opacity 参数将淡入淡出效果设置为给定的不透明度（值介于 0 与 1 之间）。callback参数可选


### 滑动
1. slideDown(): 用于向下滑动元素。语法：`$(selector).slideDown(speed,callback)`;
2. slideUp(): 用于向上滑动元素。语法：`$(selector).slideUp(speed,callback);`
3. slideToggle(): 在 slideDown() 与 slideUp() 方法之间进行切换。语法：`$(selector).slideToggle(speed,callback);`


### 动画：
animate() 方法用于创建自定义动画。
语法：`$(selector).animate({params},speed,callback);`
参数说明：1.必需的 params 参数定义形成动画的 CSS 属性。2. 可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。3.可选的 callback 参数是动画完成后所执行的函数名称。
*注意*：当使用 animate() 时，必须使用 Camel 标记法书写所有的属性名，比如，必须使用 paddingLeft 而不是 padding-left，使用 marginRight 而不是 margin-right

annimate() 使用队列功能：
$("button").click(function(){
  var div=$("div");
  div.animate({height:'300px',opacity:'0.4'},"slow");
  div.animate({width:'300px',opacity:'0.8'},"slow");
  div.animate({height:'100px',opacity:'0.4'},"slow");
  div.animate({width:'100px',opacity:'0.8'},"slow");
});
上述动画方法会从上到下依次执行

### 停止动画：
stop()：该方法方法用于在动画完成之前停止动画或效果。
语法：`$(selector).stop(stopAll,goToEnd);`
参数说明：可选的 stopAll 参数规定是否应该清除动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。可选的 goToEnd 参数规定是否立即完成当前动画。默认是 false。

### 链式调用
通过链式调用的方式，允许我们在相同的元素上运行多条 jQuery 命令，如：`$("#p1").css("color","red").slideUp(2000).slideDown(2000)`;
上述几个jQuery方法会从左往右依次执行


### jQuery 事件
1. bind(): 为被选元素添加一个或多个事件处理程
2. blur(): 当元素失去焦点时发生 blur 事件。
3. change(): 元素的值发生改变时，会发生 change 事件。
4. click(): 鼠标单击事件
5. dbclick(): 鼠标双击事件
6. delegate(): 为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。
7. die(): 移除所有通过 live() 方法向指定元素添加的一个或多个事件处理程序。
8. error(): 当元素遇到错误（没有正确载入）时，发生 error 事件。
9. event.isDefaultPrevented()：返回指定的 event 对象上是否调用了 preventDefault() 方法。
10. event.pageX: 相对于文档左边缘的鼠标位置。
11. event.pageY：相对于文档上边缘的鼠标位置。
12. event.preventDefault(): 阻止事件的默认动作。
13. event.result: 包含由被指定事件触发的事件处理器返回的最后一个值。
14. event.target: 触发该事件的 DOM 元素。
15. event.timeStamp: 该属性返回从 1970 年 1 月 1 日到事件发生时的毫秒数。
16. event.type: 描述事件的类型。
17. event.which: 指示按了哪个键或按钮。
18. focus(): 当元素获得焦点时，发生 focus 事件。
19. keydown(): 当键盘按键被按下时，发生 keydown 事件。
20. keypress(): keypress 事件与 keydown 事件类似。当按钮被按下时，会发生该事件。它发生在当前获得焦点的元素上。不过，与 keydown 事件不同，每插入一个字符，就会发生 keypress 事件。
21. keyup(): 当按钮被松开时，发生 keyup 事件。
22. live(): live() 方法为被选元素附加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。通过 live() 方法附加的事件处理程序适用于匹配选择器的当前及未来的元素（比如由脚本创建的新元素）。
23. load(): 当指定的元素（及子元素）已加载时，会发生 load() 事件。
24. mousedown(): 当鼠标指针移动到元素上方，并按下鼠标按键时，会发生 mousedown 事件。
25. mouseenter(): 当鼠标指针穿过元素时，会发生 mouseenter 事件。该事件大多数时候会与 mouseleave 事件一起使用。
26. mouseleave(): 当鼠标指针离开元素时，会发生 mouseleave 事件。该事件大多数时候会与 mouseenter 事件一起使用。
27. mousemove(): 当鼠标指针在指定的元素中移动时，就会发生 mousemove 事件。*用户把鼠标移动一个像素，就会发生一次 mousemove 事件。处理所有 mousemove 事件会耗费系统资源。请谨慎使用该事件。*
28. mouseout(): 当鼠标指针从元素上移开时，发生 mouseout 事件。
29. mouseover(): 当鼠标指针位于元素上方时，会发生 mouseover 事件。
30. mouseup(): 当在元素上放松鼠标按钮时，会发生 mouseup 事件。
31. one(): one() 方法为被选元素附加一个或多个事件处理程序，并规定当事件发生时运行的函数。*当使用 one() 方法时，每个元素只能运行一次事件处理器函数。*
32. ready(): 当 DOM（文档对象模型） 已经加载，并且页面（包括图像）已经完全呈现时，会发生 ready 事件。
33. resize(): 当调整浏览器窗口的大小时，发生 resize 事件。
34. scroll(): 当用户滚动指定的元素时，会发生 scroll 事件。
35. select(): 当 textarea 或文本类型的 input 元素中的文本被选择时，会发生 select 事件。
36. submit(): 当提交表单时，会发生 submit 事件。
37. toggle()： 用于绑定两个或多个事件处理器函数，以响应被选元素的轮流的 click 事件。该方法也可用于切换被选元素的 hide() 与 show() 方法。
38. trigger()： 触发被选元素的指定事件类型。
39. triggerHandler()： 触发被选元素的指定事件类型。但不会执行浏览器默认动作，也不会产生事件冒泡。
40. unbind()：移除被选元素的事件处理程序。
41. undelegate()：删除由 delegate() 方法添加的一个或多个事件处理程序。
42. unload()：当用户离开页面时，会发生 unload 事件。


### jQuery 遍历函数
1. add(): 将元素添加到匹配元素的集合中。
2. andSelf(): 把堆栈中之前的元素集添加到当前集合中。
3. children(): 获得匹配元素集合中每个元素的所有子元素。
4. closest(): 从元素本身开始，逐级向上级元素匹配，并返回最先匹配的祖先元素。
5. contents(): 获得匹配元素集合中每个元素的子元素，包括文本和注释节点。
6. each(): 对 jQuery 对象进行迭代，为每个匹配元素执行函数。
7. end(): 结束当前链中最近的一次筛选操作，并将匹配元素集合返回到前一次的状态
8. eq(): 将匹配元素集合缩减为位于指定*索引*的新元素。 
9. filter(): 将匹配元素集合缩减为*匹配选择器或匹配函数*返回值的新元素。
10. find(): 获得当前匹配元素集合中每个元素的后代，由选择器进行筛选。
11. first(): 将匹配元素集合缩减为集合中的第一个元素。
12. has(): 	将匹配元素集合缩减为*包含特定后代元素*的集合。
13. is(): 根据选择器检查当前匹配元素集合，如果存在至少一个匹配元素，则返回 true。
14. last(): 将匹配元素集合缩减为集合中的最后一个元素。
15. map(): 	把当前匹配集合中的每个元素传递给函数，产生包含返回值的新 jQuery 对象。
16. next():	获得匹配元素集合中每个元素紧邻的同辈元素。
17. nextAll(): 获得匹配元素集合中每个元素之后的所有同辈元素，由选择器进行筛选（可选）
18. nextUntil(): 获得每个元素之后所有的同辈元素，直到遇到匹配选择器的元素为止。
19. not(): 从匹配元素集合中删除元素。
20. offsetParent(): 获得已经定位的第一个父元素。
21. parents(): 获得当前匹配元素集合中每个元素的父元素，由选择器筛选（可选）。
22. parentsUntil(): 获得当前匹配元素集合中每个元素的祖先元素，直到遇到匹配选择器的元素为止。
23. prev(): 获得匹配元素集合中每个元素紧邻的前一个同辈元素，由选择器筛选（可选）
24. prevAll(): 获得匹配元素集合中每个元素之前的所有同辈元素，由选择器进行筛选（可选）。
25. prevUntil(): 获得每个元素之前所有的同辈元素，直到遇到匹配选择器的元素为止。
26. siblings(): 获得匹配元素集合中所有元素的同辈元素，由选择器筛选（可选）。
27. slice(): 将匹配元素集合缩减为指定范围的子集。


### jQuery 文档操作
1. addClass(): 	向匹配的元素添加指定的类名。
  语法：`$(selector).addClass(class)` 或 `$(selector).addClass(function(index,oldclass))` index - 可选。选择器的 index 位置。
2. after(): 	在匹配的元素之后插入内容。
  语法：`$(selector).after(content)` 或 `$(selector).after(function(index))` index - 可选。选择器的 index 位置。
3. append(): 	向匹配元素集合中的每个元素结尾插入由参数指定的内容。
  语法：`$(selector).append(content)`
4. appendTo(): 向目标结尾插入匹配元素集合中的每个元素。与append()方法相反
  语法：`$(content).appendTo(selector)`
5. attr(): 设置或返回匹配元素的属性和值。
6. before(): 	在每个匹配的元素之前插入内容。
7. clone(): 创建匹配元素集合的副本。
  语法：`$(selector).clone(includeEvents)` includeEvents规定是否复制元素的所有事件处理,默认地，副本中不包含事件处理器。
8. detach(): 从 DOM 中移除匹配元素集合。detach() 会保留所有绑定的事件、附加的数据，这一点与 remove() 不同。
9. empty(): 删除匹配的元素集合中所有的子节点。
10. hasClass(): 检查匹配的元素是否拥有指定的类。
11. html(): 设置或返回匹配的元素集合中的 HTML 内容。
12. insertAfter(): 把匹配的元素插入到另一个指定的元素集合的后面。和after() 方法相反
  语法：`$(content).insertAfter(selector)`
13. insertBefore(): 把匹配的元素插入到另一个指定的元素集合的前面。
14. prepend(): 向匹配元素集合中的每个元素开头插入由参数指定的内容。
15. prependTo(): 向目标开头插入匹配元素集合中的每个元素。用法和prepend() 相反
  语法: `$(content).prependTo(selector)` 
16. remove(): 移除所有匹配的元素。
17. removeAttr(): 从所有匹配的元素中移除指定的属性。
18. removeClass(): 从所有匹配的元素中删除全部或者指定的类。
19. replaceAll(): 用匹配的元素替换所有匹配到的元素。
20. replaceWith(): 用新内容替换匹配的元素。和replace() 方法类似。
21. text(): 设置或返回匹配元素的内容。
22. toggleClass(): 从匹配的元素中添加或删除一个类。
23. unwrap(): 移除并替换指定元素的父元素。
24. val(): 设置或返回匹配元素的值。
25. wrap(): 把匹配的每个元素用指定的内容或元素包裹起来。
26. wrapAll(): 把所有匹配的元素用一个指定的内容或元素包裹起来。
27. wrapinner(): 将每一个匹配的元素的子内容用指定的内容或元素包裹起来。


### css操作函数
1. css(): 设置或返回匹配元素的样式属性。
2. height(): 设置或返回匹配元素的高度。
3. offset(): 设置或返回第一个匹配元素相对于文档的位置。该方法返回的对象包含两个整型属性：top 和 left，以像素计。此方法只对可见元素有效。
4. offsetParent(): 返回最近的*定位*祖先元素。
5. position(): 返回第一个匹配元素相对于父元素的位置。
6. scrollLeft(): 设置或返回匹配元素相对滚动条左侧的偏移。
7. scrollTop(): 设置或返回匹配元素相对滚动条顶部的偏移。
8. width(): 设置或返回匹配元素的宽度。