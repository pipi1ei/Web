## 网页
### 网站和网页的关系
  - 一个网站由 N 个网页组成

### 浏览器访问网页时发送了几次请求
  - 至少一次

### 浏览器内核
  - 浏览器最核心的部分是渲染引擎，一般也称为 浏览器内核
  - 负责解析网页语法，并渲染（显示）网页
  - 常见的浏览器内核
    - Trident（三叉戟）：IE
    - Gecko（壁虎）：Mozilla Firefox
    - Presto -> Blink：Opera
    - Webkit：Safari，移动端浏览器
    - Webkit -> Blink：Google Chrome


### 什么是URL
  - URL 的全称是 Uniform Resource Locator（统一资源定位符）
  - URL 就是资源的地址、位置，互联网上每个资源都有一个唯一的URL
  - 通过一个URL，就能找到互联网上唯一的一个资源
  - URL的基本格式：protocol://hostname[:port]/path/[;parameters][?query]#fragment = 协议://主机地址:端口/路径
    - 协议：不同的协议，代表不同的资源查找方式、资源传输方式
    - 主机地址：存放资源的主机的IP地址（域名）
    - 路径：资源在主机中的具体位置
  - URL 常见的协议
    - http：超文本传输协议，访问的是远程的网络资源,格式是 http://，https协议相当于http协议的安全版
    - file：访问的是本地计算机上的资源，格式是 file://
    - mailto：访问的是电子邮件：格式是 mailto:
    - ftp：访问的是共享主机的文件资源，格式是 ftp://

### 表单提交的两种方式：
  1. 传统的表单提交：
    1. 将所有的input用form包裹
    2. form元素设置action（服务器地址）
    3. 必须有一个input或button的type为submit，点击submit自动将所有的数据提交给服务器
    弊端：
      - 会进行页面的跳转（意味着服务器必须提交将一个页面写好返回给前端，前端直接展示这个页面（服务端渲染）），后端渲染的好处：利于seo优化，提高首屏的渲染速度
      - 不方便表单数据的验证

  2. 前后端分离：
    1. 通过js获取到所有的表单数据
    2. 通过正则表达式进行表单数据的验证
    3. 发送ajax请求，服务器会返回数据，前端解析数据并且渲染（前端渲染和前端路由）
## HTTP 协议
  - 详见[https://github.com/qianguyihao/Web/blob/master/13-%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/01-%E9%9D%A2%E8%AF%95%E5%BF%85%E7%9C%8B/04-HTTP%E5%8D%8F%E8%AE%AE.md]
### get 请求和 post 请求的区别
  - get 请求会在 url 后面拼接上参数，用户可见，安全性不高，并且get 提交的数据有限，一般不超过2kb（http协议对URL并没有限制，时浏览器或服务器的对get请求的限制）。GET 会被缓存，可以保留浏览器历史记录
  - post 请求会将请求参数放在 body 中，安全行较高，post 请求不限制提交的数据大小

  - 详见：[https://blog.csdn.net/zlczsw/article/details/91046081]
          [https://blog.csdn.net/kebi007/article/details/103059900?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param]
  - 详细区别：  
    1. GET和POST本质上没有区别
    2. GET和POST是什么？HTTP协议中的两种发送请求的方法。HTTP是基于TCP/IP的关于数据如何在万维网中如何通信的协议。HTTP的底层是TCP/IP。所以GET和POST的底层也是TCP/IP，也就是说，GET/POST都是TCP链接。GET和POST能做的事情是一样一样的。你要给GET加上request body，给POST带上url参数，技术上是完全行的通的。 
    3. 在我大万维网世界中，TCP就像汽车，我们用TCP来运输数据，它很可靠，从来不会发生丢件少件的现象。但是如果路上跑的全是看起来一模一样的汽车，那这个世界看起来是一团混乱，送急件的汽车可能被前面满载货物的汽车拦堵在路上，整个交通系统一定会瘫痪。为了避免这种情况发生，交通规则HTTP诞生了。HTTP给汽车运输设定了好几个服务类别，有GET, POST, PUT, DELETE等等，HTTP规定，当执行GET请求的时候，要给汽车贴上GET的标签（设置method为GET），而且要求把传送的数据放在车顶上（url中）以方便记录。如果是POST请求，就要在车上贴上POST的标签，并把货物放在车厢里。当然，你也可以在GET的时候往车厢内偷偷藏点货物，但是这是很不光彩；也可以在POST的时候在车顶上也放一些数据，让人觉得傻乎乎的。HTTP只是个行为准则，而TCP才是GET和POST怎么实现的基本。
    4. 好了，现在你知道，GET和POST本质上就是TCP链接，并无差别。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。 
    5. GET和POST还有一个重大区别，
      - 简单的说：GET产生一个TCP数据包；POST产生两个TCP数据包。
      - 长的说：对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。
      - 也就是说，GET只需要汽车跑一趟就把货送到了，而POST得跑两趟，第一趟，先去和服务器打个招呼“嗨，我等下要送一批货来，你们打开门迎接我”，然后再回头把货送过去。
      - 因为POST需要两步，时间上消耗的要多一点，看起来GET比POST更有效。因此Yahoo团队有推荐用GET替换POST来优化网站性能。但这是一个坑！跳入需谨慎。为什么？
        1. GET与POST都有自己的语义，不能随便混用。
        2. 据研究，在网络环境好的情况下，发一次包的时间和发两次包的时间差别基本可以无视。而在网络环境差的情况下，两次包的TCP在验证数据包完整性上，有非常大的优点。
        3. 并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次。
  

### 什么是组件化
  - 人面对复杂问题的处理方式：
    - 任何一个人处理信息的逻辑能力都是有限的，所以，当面对一个非常复杂的问题时，我们不太可能一次性搞定一大堆的内容。但是，我们可以将问题进行拆解，将一个复杂的问题拆分成很多个可以处理的小问题，再将其放在整体当中，会发现大的问题也会迎刃而解。
  - 组件化的思想
    - 如果我们将一个页面中所有的处理逻辑全部放在一起，处理起来就会变得非常复杂，而且不利于后续的管理以及扩展
    - 如果我们将一个页面拆分成一个个小的功能模块，每个功能快完成属于自己这部分独立的功能，那么之后整个页面的管理和维护就变得非常容易了。
  - 应用
    - 有了组件化的思想，在之后的开发中就可以将一个页面尽可能的拆分成一个个小的、可复用的组件，这样让我们的代码更加方便组织和管理，并且扩展性也更强

### 什么是插槽
  - slot 翻译为插槽，在生活中很多地方都有插槽，比如电脑的 USB 插槽、插板当中的电源插槽。
  - 插槽的目的是让我们原来的设备具有更多的扩展性，比如电脑的 USB 插槽可以插入 U盘、鼠标、键盘等等
  - 组件中的插槽
    - 组件的插槽是为了让组件更有扩展性，可以让使用者决定组件内部的一些内容到底展示什么

  
### Vue 响应式原理 
  - 思考几个问题
    1. 修改Vue实例中的 data 中的数据，Vue 内部时如果监听到这些数据改变的？
      - Object.defineProperty
    2. 当数据发生改变，Vue 时如何知道要通知界面哪部分发生对应变化？
      - 发布订阅者模式


### 前端路由和后端路由，前端渲染和后端渲染
- 后端路由阶段：

  - 后端路由：后端处理 URL 和页面之间的映射关系
  - 后端渲染：
    早期的网站开发整个 HTML 页面都是由服务器进行渲染的，浏览器将 URL 发送到服务器，服务器解析 URL 并直接渲染好对应的 HTML 页面，返回给浏览器进行展示，后端渲染 JSP 技术：HTML + CSS + JAVA
    一个网站，这么多页面服务器是如何处理的呢？

    1. 一个页面有对应的网址，也就是 URL
    2. URL 会被发送到服务器，服务器通过正则对该 URL 进行匹配，并交给一个 Controller 进行处理
    3. Controller 进行各种处理，最终生成一个 HTML 返回给前端
    4. 这就完成了一个 IO 操作
       这种情况下渲染好的页面不需要单独加载任何的 js 和 css，可以直接交给浏览器展示，这样也有利于 SEO 的优化

  - 后端路由的缺点：
    1. 整个页面的模块是由后端人员来编写和维护的
    2. 如果前端人员要开发页面，需要通过 PHP 或 JAVA 等语言来编写页面代码
    3. 这种情况下 HTML 代码和数据以及对应的逻辑会混在一起，编写和维护都是很麻烦的事情

- 前后端分离阶段：

  1. 随着 Ajax 的出现，有了前后端分离的开发模式
  2. 后端只提供 API 来返回数据，前端通过 Ajax 获取数据，并且可以通过 JS 将数据渲染到页面中

  - 前后的分离的优点：
    1. 前后端的责任更清晰，后端专注于数据，前端专注于交互和可视化上
    2. 并且当移动端出现后，后端不需要进行任何处理，依然使用之前的一套 API 即可

  过程：

  1. 用户在浏览器输入 URL 后。浏览器将 URL 发送到静态资源服务器，静态资源服务器返回 HTML + css + js，浏览器直接渲染 html 和 css ，并执行 js 文件，当 js 文件中有 ajax 请求时，在将 请求的 URL 发送到 API 服务器，api 服务器返回接口数据，浏览器再将数据渲染到 html 中
  2. 这个过程就是前端渲染：浏览器中显示的网页中的大部分内容都是由前端写的 js 代码在浏览器中执行，最终渲染出来的网页

- 前端路由阶段（单页面富应用阶段）：
  SPA（single page web application）: 单页面 Web 应用，整个网页只要有一个 html 页面，SPA 最主要的特点就是在前后端分离的基础上加了一层前端路由，也就是前端来维护一套路由规则
  过程：静态资源服务器上只会有一个 HTML 文件，一个或多个 css、js 文件，用户输入 URL 地址时，浏览器会去静态资源服务器请求全部的 HTML，css，js 文件，当 URL 后面的路径不同时，通过 js 代码判断显示不同的数据，这就是前端路由

2. 前端路由：浏览器处理 URL 和页面之间的映射关系，前端路由的核心是改变 URL，但是页面不进行整体的刷新

- 如何实现？通过 url 的 hash 和 HTML5 的 history

1. 修改 url 的 hash：location.hash = 'aaa'
2. 使用 HTML5 的 history ： history.pushState({},'','aaa')： 类似于入栈，可以点击浏览器的返回，
   或 history.replaceState({},'','aaa')：类似于直接替换栈顶内容



## 布局
### 三栏布局：布局高度已知为100px，两侧宽度300px，中间自适应
  - 实现方案
    1. 浮动
    2. 定位
    3. flex
    4. table 布局
    5. grid 布局：CSS3 中引入的布局
  
  - 五种方案的对比
    1. 浮动：
      - 优点：兼容性好
      - 缺点：浮动元素会脱离文档流，因此需要清除浮动
    2. 定位
      - 优点：快捷
      - 缺点：子元素脱离标准流，实用性差
    3. flex 布局
      - 优点：解决上面两个方法的不足，flex 布局比较完美。移动端基本用 flex 布局，IE8 不支持 flex
    4. 表格布局
      - 优点：兼容性好，IE8 中不支持 flex 情况下可使用表格布局
      - 缺点：因为三个部分都当成了单元格来对待，此时如果中间的部分变高了，其他部分也会被迫调整高度。但是在很多场景下，我们并不需要两侧的高度增高
    5. 网格布局
      - CSS3 中引入的布局，很好用，代码量简化了很多。面试提到网格布局说明是对新技术有追求的
  
  - 延伸：如果去掉高度100px，哪些布局就不能使用了？
    - flex 布局和表格布局仍然可用，其他布局方案不可用。


## CSS 盒模型
### 面试：谈谈你对 CSS 盒模型的认识
  - 从一下几个方面回答
    1. 基本概念：content、padding、border、margin
    2. 标准盒模型、IE盒模型的区别。不要漏说了IE盒模型
    3. CSS 如何设置这两种盒模型（使用 box-sizing）
    4. JS 如何设置、获取盒模型对应的宽和高
      - element.style.width/height：缺点：只能获取行内样式，不能获取内嵌和外链的样式
      - window.getComputedStyle(element).width/height：通用方式
      - element.currentStyle.width/height：IE独有方式
      - element.getBoundingClientRect().width/height：获取一个元素的绝对位置：距离 viewport 左上角的位置
    5. 根据盒模型解释边距重叠

## BFC（块级格式化上下文）
### BFC的原理/BFC的布局规则
  1. BFC 内部的子元素，在垂直方向，边距会发生重叠
  2. BFC 在页面中是独立的容器，外面的元素不会影响里面的元素，反之亦然
  3. BFC 区域不与旁边的 float box 区域重叠（可用用来清除浮动带来的影响）（两栏自适应布局）
  4. 计算BFC的高度时，浮动的子元素也参与计算。可以用来清除浮动

### 如何生成 BFC
  1. overflow 不为 visible。改方式最常用
  2. float 不为 侬额
  3. position 不为 static 或 relative
  4. display 为：inline-block、table-cell、table-caption、flex、inline-flex


## DOM事件
### DOM 事件级别
  - DOM0 的写法：
    element.onclick = function(){

    }
  - DOM2 的写法
    element.addEventListener('click', function(){

    }, false)
    - 上面的第三个参数中，true 表示在事件捕获阶段触发，false 表示在事件冒泡阶段触发
  - DOM3 的写法：和 DOM2 相同，DOM3 中增加了很多事件类型：如鼠标事件、键盘事件等
  - 为什么没有 DOM1 的写法呢？因为，在 DOM1 标准制定的时候，没有涉及与事件相关的内容

### DOM 事件模型、DOM 事件流
  - DOM 事件模型讲的就是事件捕获和冒泡
    + 捕获：从父元素到子元素
    + 冒泡：从子元素到父元素

  - DOM 事件流讲的就是：浏览器在与当前页面做交互式，这个事件是怎么传递到页面上的，完整的事件流分三个阶段
    1. 捕获：从 window 对象传到目标对象
    2. 目标阶段：事件通过捕获到达目标元素，这个阶段就是目标阶段
    3. 冒泡：从目标元素传递到 window 对象

    - 说明：捕获阶段，事件传递的顺序依次是：window -> document -> body -> 父元素、子元素、目标元素。冒泡的流程与捕获相反

### Event 对象的常见 api 方法：
  - event.preventDefault()：阻止默认事件，如 a 元素点击后会默认跳转，如果设置了这个方法，就阻止了链接的默认跳转
  - 阻止冒泡：
    + w3c 的方法：event.stopPropagation()
    + IE10 以下：event.cancelBubble = true
    + 兼容代码：
      ``` javascript
        element.onclick = function(event){
          event = event || window.event
          if(event && event.stopPropagation){
            event.stopPropagation()
          }else{
            event.cancelBubble = true
          }
        }
      ```
  - 设置事件优先级
    - event.stopImmediatePropagation()
    - 解释：我用 addEventListener 给某个按钮同时注册了事件 A、事件 B。此时，如果我单击按钮，就会依次执行 事件A 和事件B。现在要求：单击按钮，只执行事件A，不执行事件B。这时候在事件A的响应函数中使用该方法就可以了
  - 事件委托：
    - event.currentTarget：当前所绑定的事件对象，在事件委托中，指的是父元素
    - event.target：当前被点击的元素。在事件委托中，指的是子元素

### 自定义事件
  - 代码如下：
  ``` javascript
    var myEvent = new Event('clickTest');
    element.addEventListener('clickTest', function(){
      console.log('自定义事件触发')
    })
    element.dispatchEvent(myEvent)
  ```


## 对象和原型链
### 创建对象的几种方法
  1. 对象字面量形式
  2. 构造函数
  3. Object.create(xxx), xxx 是创建出来的对象的原型
  - var a = {} 其实是 var a = new Object() 的语法糖
  - var a = [] 其实是 var a = new Array() 的语法糖
  - function foo{} 其实是 var foo = new Function() 的语法糖

### instanceof 的原理
  - 判断对象实例的 __proto__ 属性和构造函数的 prototype 属性是否为同一个引用（是否指向同一个地址）
  - 注意：
    1. 虽然说，实例是由构造函数 new 出来的，但实例的 __proto__ 属性引用的是构造函数的 prototype。也就是说，实例的 __proto__ 属性与构造函数本身无关。
    2. 在原型链上，原型的上面可能还会有原型，以此类推网上找 __proto__ 属性。如果这条链上能找到， instanceof 的返回结果也是 true

### new 运算符
  - 当 new 一个构造函数时发生了什么？
    1. 隐式创建一个对象，对象的 __proto__ 属性指向构造函数的 prototype
    2. 将构造函数的作用域赋给新对象（因此this 就指向了这个对象）
    3. 执行构造函数中的代码
    4. 如果构造函数中有显示返回一个引用值的话，就返回该引用值对象，否则就返回新对象
 