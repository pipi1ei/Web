### 原生js的缺点
1. 不能添加多个入口函数(window.onload)，如果添加多个，后面的会覆盖前面的
2. 原生js的api名字毕竟长，不好记忆
3. 原生js有时候代码冗余
4. 原生js中有些属性或方法，有浏览器兼容性问题
5. 原生js容错率毕竟低， 前面的代码出了问题后面的代码执行不了

### jQuery的优势
1. 可以设置多个入口函数
2. jQuery的api容易记忆
3. jQuery代码简洁（隐式迭代）
4. jQuery帮我们解决了浏览器兼容性问题
5. 容错率较高，前面的代码出了问题，后面的代码不受影响

### 基本语法
+ 入口函数：两种写法
  ```javascript
  //1.第一种写法
  $(document).ready(function(){

  })

  // 2.第二种写法
  $(function(){
    
  })
  ```
  - jQuery 入口函数和 window.onload 的区别
    1. jQuery 入口函数可以写多个，window.onload 只能写一个
    2. 执行时机不同：jQuery入口函数（等待页面上dom树加载完成后执行）先于 window.onload（等待页面上所有的资源加载完毕，包括dom树，外部css/js文件，图片） 执行

+ jQuery 文件结构：是一个立即执行函数
  - jQuery 是一个函数，参数传递不同，效果也不一样
    1. 如果参数是一个匿名函数，那么jQuery是一个入口函数
    2. 如果传递的参数是一个字符串，jQuery是一个选择器函数，会选中对应的元素
    3. 如果传递的参数是一个dom对象，那么会将这个dom对象转成 jQuery 对象
  ```javascript
  (function(){
    var jQuery = function(selector, context){
      return new jQuery.fn.init( selector, context );
    }
    // ...
    window.jQuery = window.$ = jQuery;
  }())
  ```

+ DOM 对象和 jQuery对象
  - dom对象就是原生js获取到的对象，只能调用dom方法或属性，不能调用 jQuery的属性或方法
  - jQuery对象是使用 jQuery选择器获取到的对象，只能调用 jQuery 的属性或方法，不能调用 dom 对象的属性或者方法。jQuery对象最好使用 $ 开头。jQuery对象是一个类数组，就是dom对象的一个包装集

+ DOM 对象和 jQuery对象的相互转换
  - dom 对象转 jquery 对象：直接使用 $() 将 dom 对象包起来
  - jquery 对象转 dom 对象：
    1. 使用下标取出来，因为jQuery对象是一个类数组
    2. 使用 jquery 的 get() 方法，参数传入对应的下标

+ 获取和设置文本内容
  - 获取文本内容：text()方法，包含了多个dom元素的jquery对象，通过text()方法会把所有dom元素的文本获取到
  - 设置文本：text("我是设置的文本")，会覆盖原先的文本，如果文本中包含标签，不会解析这个标签。包含了多个DOM元素的jQuery对象，使用text()方法设置文本会把所有的dom元素文本都设置上（隐式迭代）

+ 设置和获取样式
  - 获取样式：css(prop)，获取属性为 prop 的值
  - 设置样式：css(prop,value)，给prop属性设置 value 值，设置多样式时可以传一个对象进去
  - *注意*：在 ie 浏览器中获取边框这样的样式值，需要指定一个准确的边框（top、right、bottom、left）
    eg: css('border-top-width'),css('border-bottom-style')

### jQuery 选择器
+ 基本选择器：类选择器，id选择器，标签选择器，交集选择器，并集选择器。用法和css选择器一样

+ 层级选择器：直接子代选择器，后代选择器，相邻兄弟选择器(+)，所有兄弟选择器(~)，用法和css选择器相同

+ 基本过滤选择器：
  - :first 选取第一个元素, $('div:first')
  - :last 选取最后一个元素,$('div:last')
  - :not(selector) 去除所有与给定选择器匹配的元素,$('div:not(.one)')
  - :odd 选择索引奇数的元素,$('div:odd')
  - :even 选择索引为偶数的元素,$('div:even')
  - :eq(index) 选择索引为 index 的元素,$('div:eq(3)')
  - :gt(index) 选取索引大于index的元素,$('div:gt(3)')
  - :lt(index) 选取索引小于index的元素,$('div:lt(e)')
  - :header 选取所有的标题元素(h元素),$(':header')
  - :animated 选取当前正在执行动画的元素,$(':animated')
  - :focus 选取当前获取焦点的元素,$(':focus')

+ 内容过滤选择器
  - :contains(text) 选取含有文本内容为 "text" 的元素
  - :empty 选取不包含子元素或者文本的空元素
  - :has(selector) 选取含有选择器所匹配的元素的元素
  - :parent 选取含有子元素或者文本的元素

+ 可见性过滤选择器
  - :hidden 选取所有不可见的元素
  - :visible 选取所有可见的元素

+ 属性过滤选择器
  - [attribute] 选取用于此属性的元素
  - [attribute=value] 选取属性值为 value 的元素
  - [attribute!=value] 选取属性值不等于 value 的元素
  - [attribute^=value] 选取属性值以 value 开头的元素
  - [attribute$=value] 选取属性值以 value 结尾的元素
  - [attribute*=value] 选取属性值含有 value 的元素
  - [attribute|=value] 选取属性值等于 value 或者以 value 为前缀（value后紧跟着连字符 - ）的元素
  - [attribute~=value] 选取属性用空格分隔的值中包含 value 的元素

+ 子元素过滤选择器
  - :nth-child(index/even/odd/equation) 选取每个父元素下的第index 个子元素或奇偶元素
  - :first-child 选取每个父元素下的第一个子元素
  - :last-child 选取父元素的最后一个子元素
  - :only-child 如果某个元素是它父元素的唯一子元素，那么将会被匹配

+ 表单对象过滤选择器
  - :enabled 选取所有可用的元素
  - :disabled 选取所有不可用的元素
  - :checked 选取所有被选中的单选框，复选框
  - :selected 选取所有被选中的选项元素（下拉列表）

+ 表单选择器
  - :input 选取所有的 input、textarea、select、button 元素
  - :text 选取所有的文本框
  - :password 选取所有的密码框
  - :radio 选取所有的单选框
  - :checkbox 选取所有的多选框
  - :submit 选取所有的提交按钮
  - :image 选取所有的图像按钮
  - :reset 选取所有的重置按钮
  - :button 选取所有的按钮
  - :file 选取所有的上传域
  - :hidden 选取所有不可见元素

+ 筛选选择器
  - children(selector)：直接子代选择器
  - find(selector)：后代选择器
  - siblings(selector)：查找所有的兄弟节点，不包括自己本身
  - parent()：查找父节点
  - eq(index)：选择索引为index 的节点
  - next()：查找下一个兄弟
  - nextAll()：查找后面所有的兄弟
  - prev()：查找上一个兄弟
  - prevAll()：查找前面所有的兄弟


### 类操作
+ 添加类：addClass(类名1 类名2)：给jQuery对象添加类名，可用添加多个类，多个类名之间用空格分割
+ 删除类：removeClass(类名1 类名2)： 给jQuery 对象删除类，也可以移除多个类，多个类名之间用空格分割。如果不传参数，会移除所有的类
+ 判断类：hasClass(类名) 判断jQuery对象是否含有某个类，如果有返回true，没有返回 false
+ 切换类：toggleClass(类名)：如果该jQuery对象没有这个类名，会给这个对象添加类名；如果有这个类名，会给这个对象删除这个类

### jQuery 动画
+ 三组基本动画
  - 显示与隐藏与切换：
    1. 显示：show([speed],[callback]) speed参数可选，表示动画的执行时间，不传就没有动画效果；callback是动画执行完之后的回调函数
    2. 隐藏：hide([speed],[callback])
    3. 切换：toggle([speed],[callback])
  - 滑入与滑出与切换
    1. 滑入：slideDown([speed],[callback])
    2. 滑出：slideUp([speed],[callback])
    3. 切换：slideToggle([speed],[callback])
  - 淡入与淡出与切换
    1. 淡入：fadeIn([speed],[callback])
    2. 淡出：fadeOut([speed],[callback])
    3. 切换：fadeToggle([speed],[callback])
    4. 淡入到哪里：fadeTo(speed,opacity)

+ 自定义动画
  - animate({params},[speed],[easing],[callback])：
    1. 参数 {params} 是要执行动画的css属性+数值，必选
    2. 参数 speed 是动画的执行时长，可选
    3. 参数 easing 是动画的执行效果，默认为 swing（缓动），可以是 linear（匀速）
    4. 参数 callback 是动画执行完之后执行的回调函数
  - 动画队列与停止动画
    + 在同一个元素上面执行多个动画，那么对于这个动画来说，后面的动画会被放到动画队列中，等前面的动画执行完成了才会执行
    + 通过 stop 方法停止当前动画: stop(clearQueue, jumpToEnd)
      - 第一个参数：是否清除队列
      - 第二个参数：是否跳转到最终效果
      - 不传参数的话默认两个参数都是 false
  - 自定义动画不能改变背景颜色，如果想要改变背景颜色，需要安装插件

### jQuery 节点操作
+ 创建节点
  - html()：可以获取或设置节点的内容。如果设置的内容中有标签会被解析，同时覆盖原来的内容
  - $()：创建元素，但只存在内存中，如果要显示在页面上需要追加
+ 添加节点
  - 父元素.append(子元素)：在父元素的结尾插入子元素，如果子元素存在，该子元素会被剪切
  - 子元素.appendTo(父元素)：把子元素插入到父元素的结尾
  - prepend()、prependTo()：在被选元素的开头插入内容，用法与 append() 类似，如果子元素存在，该子元素会被剪切
  - before()：在被选元素之前插入内容（兄弟关系）
  - after()：在被选元素之后插入内容（兄弟关系）

+ 清空节点与删除节点
  - html("")：这种方式不安全，无法清除内容中绑定的事件等，有可能造成内存泄漏
  - empty()：清空指定节点的所有元素（包括子元素上绑定的内容，事件，源码），自身保留（清理门户）
  - remove()：相比于 empty ，自身也会删除（自杀）

+ 克隆节点
  - clone(includeEvents)：会克隆元素及其下面的所有元素，只存在内存中，如果要在页面中显示需要追加.
    + 参数如果是 true，会把事件也克隆
    + 参数如果是 false，不会克隆事件，默认值是 false

+ 替换节点
  - replaceWith()：将匹配到的元素替换成指定的html或dom元素
    $("p").replaceWith("<strong>我是strong元素</strong>")：将 p 元素替换成 strong 元素
  - replaceAll()：与 replaceWith() 作用相同，只是颠倒了replaceWith() 的操作
    $("<strong>我是strong元素</strong>").replaceAll("p")
  - 如果在替换之前已经为元素绑定了事件，替换后原先绑定的事件将会和被替换一起消失

+ 包裹节点
  - wrap()：$('strong').wrap('<b></b>')：每一个strong都会被一个b元素把包裹起来
  - wrapAll()：$('strong').wrapAll('<b></b>')：用一个b元素把所有的strong包起来
  - wrapInner()：$('strong').wrapInner('<b></b>')：用 strong 元素把 b 元素包裹起来


### jQuery 属性操作
+ 设置属性：attr(propName,propValue)：设置属性值为 propValue，如果元素没有这个属性，会添加这个属性；也可以传入一个对象，设置多个属性

+ 获取属性：attr(propName)：获取属性为propName 的属性值，如果没有这个属性，返回 undefined

+ 删除属性：removeAttr(propName1 propName2 ...)：移除propName属性；也可以传入多个属性，属性之间用空格分开

+ 布尔类型的属性：jQuery1.6版本之后，不能够通过 attr() 获取布尔属性的值，会返回 undefined ，只能通过 prop() 方法获取


### jQuery 尺寸和位置操作
+ width 方法 和 height 方法
  1. width(): 获取或设置元素的宽度（不包括内边距、边框或外边距）。
  2. height(): 获取或设置元素的高度（不包括内边距、边框或外边距）。
  3. innerWidth(): 返回元素的宽度（包括内边距）。
  4. innerHeight(): 返回元素的高度（包括内边距）。
  5. outerWidth(): 返回元素的宽度（包括内边距和边框）。
  6. outerHeight(): 返回元素的高度（包括内边距和边框）。
  7. outerWidth(true): 返回元素的宽度（包括内边距和边框和外边距）。
  8. outerHeight(true): 返回元素的高度（包括内边距和边框和外边距）。

+ 获取页面可视区域宽高
  - $(window).width()：获取视口宽度
  - $(window).height()：获取视口高度

+ offset方法与 position 方法
  - offset() 方法获取元素距离 document 的位置，返回一个对象，对象中包含了 top 和 left 的值
  - position() 方法获取元素距离有定位的父元素(offsetParent)的位置，返回一个对象，对象中包含了 top 和 left 的值
  
+ 滚动条相关
  - $(window).scrollTop()：设置获取页面被卷曲的高度
  - $(window).scrollLeft()：设置获取页面被卷曲的宽度


### 事件
+ 事件发展历程
  - JS原生注册事件方式：element.onXXX = function(){}，这种方式注册的事件只能注册一次，如果注册多次相同的事件，会覆盖前面的事件
  - jQuery 的 事件方法，后面的不会覆盖前面的，不支持动态注册
  ```javascript
    $('div').click(function(){
      console.log("div被点击了")
    })
    $('div').click(function(){
      console.log("div又被点击了")
    })
  ```
  - jQuery 的 bind() 方法，传入一个对象，指定绑定的事件，可以同时绑定多个事件，但不支持动态注册
  ```javascript
    $('div').bind({
      click: function(){
        console.log("div被点击了")
      },
      mousemove: function(){
        console.log("鼠标移入事件")
      }
    })
  ```
  - jQuery 的 delegate(selector,eventType,function) 方法，该方法接受三个参数，这种方式通过父元素注册事件，原理通过事件的冒泡，该方式可以动态注册事件
    + 第一个参数是要绑定事件的元素
    + 第二个参数是事件类型
    + 第三个参数是事件的处理函数
    ```javascript
      $('div').delegate('p','click',function(){
        // 给div 下面的p元素注册的事件
      })
    ```
  - jQuery 的 on 注册事件：jQuery 1.7之后，用 on 统一了所有的事件处理方法
    + on 注册简单事件，不支持动态注册：$(selector).on('click',function(){
      // 给 selector 元素注册点击事件
    })

    + on 注册委托事件,支持动态注册 $(selector).on('click','span',function(){
      // 给 selector 下面的 span 元素注册点击事件
    })

  - 事件委托原理
    ```javascript
    var ul = document.querySelector('#ul')
    ul.onclick = function(e){
      if(e.target.tagName.toLowerCase() === 'li'){
        console.log(e.target)
      }
    }
    ```

+ 事件解绑
  - $(selector).unbind(eventType): 解绑指定的事件，不传参数解绑所有的事件（不推荐）
  - $(selector).undelegate(eventType): 解绑指定的事件，不传参数解绑所有的事件（不推荐）
  - $(selector).off(eventType)：解绑指定事件，不传参数解绑所有的事件（推荐）

+ 事件触发：trigger
  - $(selector).click()：触发click事件
  - $(selector).trigger('click')：触发click事件

+ jQuery 事件对象：就是 js 事件对象的封装，处理了兼容性问题
  - screenX 和 screenY：触发事件的点距离屏幕最左上角的值
  - clientX 和 clientY：触发事件的点距离视口左上角的位置（忽略滚动条）
  - pageX 和 pageY：触发事件的点距离页面最顶部的左上角的位置（会计算滚动条的距离）

  - event.stopPropagation()：阻止事件冒泡
  - event.preventDefault()：阻止浏览器默认行为
  - return false ：既能阻止事件冒泡，又能阻止浏览器默认行为

  - event.keyCode：按下的键盘代码

+ mouseover事件和 mouseenter事件
  - mouseover 事件在鼠标移动到选取元素及其子元素上都会触发
  - mouseenter 事件只在鼠标移动到选取的元素上触发
  - 如果有鼠标移入事件，请使用 mouseenter，不要使用 mouseover
  - 鼠标离开事件使用 mouseleave，不要使用 mouseout


### jQuery 补充知识点
+ 链式编程
  - 通常情况下，只有设置操作才能把链式编程延续下去。因为获取操作返回值是获取到的相应的值，无法返回jQuery对象
  - end()：筛选选择器会改变 jQuery 对象的 DOM 对象，想要回到上一次的状态，并且返回匹配元素之前的状态就使用 end()方法。注意：end() 方法也是 jQuery 对象的方法，只能在 jQuery 对象上调用

+ each() 方法：
  - jQuery 的隐式迭代会对所有的 DOM 对象设置相同的值，但是如果我们需要给每一个对象设置不同的值，这时候就需要自己迭代了，使用 each() 方法可以迭代 jQuery 对象
  - $(selector).each(function(index,element){})
    + 参数1表示当前元素在所有匹配元素中的索引号
    + 参数2表示当前元素（DOM对象）

+ 如何查看jQuery版本
  - jQuery.fn.jquery
  - jQuery.prototype.jquery
  - $.fn.jquery
  - $.prototype.jquery

+ 自己封装 jQuery 插件
  -  如何自己封装插件：1.给 jQuery 原型添加方法。2.直接给 jQuery 添加方法