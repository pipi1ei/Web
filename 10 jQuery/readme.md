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
    2. 执行时机不同：jQuery入口函数（等待页面上dom树加载完成后执行）先于 window.onload（等待页面上所有的资源加载完毕，包括dom树，外包css/js文件，图片） 执行

+ jQuery 文件结构：是一个立即执行函数
  - jQuery 是一个函数，参数传递不同，效果也不一样
    1. 如果参数是一个匿名函数，那么jQuery是一个入口函数
    2. 如果传递的参数是一个字符串，jQuery是一个选择器函数，会选中对于的元素
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
  - 获取文本内容：text()方法，包含了多个dom元素的jquery对象，通过test()方法会把所有dom元素的文本获取到
  - 设置文本：text("我是设置的文本")，会覆盖原先的文本，如果文本中包含标签，不会解析这个标签。包含了多个DOM元素的jQuery对象，使用text()方法设置文本会把所有的dom元素文本都设置上（隐式迭代）

+ 设置和获取样式
  - 获取样式：css(prop)，获取属性为 prop 的值
  - 设置样式：css(prop,value)，给prop属性设置 value 值，设置多样式时可以传一个对象进去
  - *注意*：在 ie 浏览器中获取边框这样的样式值，需要指定一个准确的边框（top、right、bottom、left）
    eg: css('border-top-width'),css('border-bottom-style')

### jQuery 选择器
+ 基本选择器：类选择器，id选择器，标签选择器，交集选择器，并集选择器。用法和css选择器一样
+ 层级选择器：直接子代选择器，后代选择器，用法和css选择器相同
+ 过滤选择器：
  - :odd 选择索引奇数的元素
  - :even 选择索引为偶数的元素
  - :eq(index) 选择索引为 index 的元素
+ 筛选选择器
  - children(selector)：直接子代选择器
  - find(selector)：后代选择器
  - siblings(selector)：查找兄弟节点，不包括自己本身
  - parent()：查找父节点
  - eq(index)：选择索引为index 的节点
  - next()：查找下一个兄弟
  - prev()：查找上一个兄弟


### 事件
+ mouseover事件和 mouseenter事件
  - mouseover 事件在鼠标移动到选取元素及其子元素上都会触发
  - mouseenter 事件只在鼠标移动到选取的元素上触发
  - 如果有鼠标移入事件，请使用 mouseenter，不要使用 mouseover
  - 鼠标离开事件使用 mouseleave，不要使用 mouseout