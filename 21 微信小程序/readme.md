### 小程序开发预备知识

- 页面布局：WXML，类似 HTML
- 页面样式：WXSS，几乎就是 CSS（某些不支持，某些进行了增强）
- 页面脚本：Javascript + WXS，（js，以及 WeixinScript）

### 小程序应用程序结构

- 小程序结构划分：最上层 APP --> 多个 Page --> 多个组件
- 最上层 APP：

  - app.js：创建 APP 实例的代码以及一些全局相关的内容
  - app.json：全局的一些配置，比如 window/tabbar 等
  - app.wxss：全局的一些样式

- page：

  - page.js：创建 Page 实例的代码，以页面的相关内容
  - page.json：业务单独的配置，比如页面对应的 window 配置，usingComponents
  - page.wxml：页面的 wxml 布局代码
  - page.wxss：页面的样式配置

- Component：
  - component.js：创建 Component 实例的代码，以及组件内部的内容
  - component.json：组件内部的配置，比如当前组件使用的别的组件
  - component.wxml：组件的 wxml 布局代码
  - component.wxss：组件的样式配置

### 配置小程序

- 小程序很多的开发需求被规定在了 _配置文件_ 中，为什么这么做呢？
  - 这样做可以更有利于我们的开发效率
  - 可以保证开发出来的小程序风格是比较一致的
  - 比如导航栏、顶部 tabbar、以及页面路由等等
- 常见的配置文件：
  - project.config.json：项目配置文件，比如项目名称、appid 等。详见[https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html]
  - sitemap.json：小程序搜索相关的。详见[https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html]
  - app.json：全局配置：详见[https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html]
    1. pages: 类型：String[], 必填，配置页面路径列表
    2. window: 类型：Object，非必填，配置全局的默认窗口表现
    3. tabbar：类型：Object，非必填，配置底部 tab 栏的表现
  * page.json：页面配置：详见[https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html]

### 小程序初体验

1. 数据绑定：使用 {{}} 语法绑定数据
2. 列表渲染：使用 wx:for = "{{ ... }}" 循环渲染数据
3. 事件监听：使用 bindxxx 绑定事件，修改 data 中的数据后需要使用 this.setData({oldData: newData}) 来渲染页面

### 小程序双线程模型：详见[https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/framework.html]

- 小程序的宿主环境是 _微信客户端_
  - 宿主环境为了执行小程序的各种文件：wxml 文件、wxss 文件、js 文件，提供了小程序的双线程模型
- 双线程模型
  - WXML 模块和 WXSS 样式运行于渲染层，渲染层使用 WebView 线程渲染（一个程序有多个页面，会使用多个 WebView 线程）
  - js 脚本运行于 逻辑层，逻辑层使用 JsCore 运行 js 脚本
  - 这两个线程都会经由微信客户端进行中转交互
- 界面渲染过程
  - wxml 和 DOM 树： wxml 等价于一棵 DOM 树，也可用使用一个 JS 对象来模拟（虚拟 DOM）
  - 初始化渲染：wxml 可以先转成 js 对象，再渲染成真正的 DOM 树
  - 数据发生变化：通过 setData 改变数据时，产生的 js 对象对应的节点就会发生变化，此时可以对比前后两个 JS 对象得到变化的部分，然后把这个差异应用到原来的 DOM 树上，从而达到更新 UI 的目的。这就是 _数据驱动_ 的原理
  - 界面渲染的整体流程
    1. 在渲染层，宿主环境会把 WXML 转化成对应的 js 对象
    2. 将 JS 对象再次转成真实的 DOM 树，交由渲染层线程渲染
    3. 数据变化时，逻辑层提供最新的变化数据，JS 对象发生变化比较进行 diff 算法对比
    4. 将最新的变化的内容反映到真实的 DOM 树中，更新 UI

### 小程序的启动流程

1. 下载小程序包
2. 启动小程序
3. 加载解析 app.json
4. 注册 App()
   4.1 执行 App 生命周期
   4.2 加载自定义组件
   4.2.1 加载解析 page.json
   4.2.2 渲染层加载渲染 page.wxml
   4.2.3 逻辑层注册 Page() --> 执行 Page() 生命周期

- 注册 APP 时一般执行的操作
  - 判断小程序的进入场景
  - 监听小程序生命周期函数，在生命周期中执行对应的业务逻辑，比如在某个生命周期函数中获取微信用户的信息
  - 因为 App() 实例只有一个，并且是全局共享的（单例对象 ），所以可以将一些公共数据放在这里
- 如何获取小程序进入场景？

  - 在 onLaunch 和 onShow 生命周期回调函数中，会有 options 参数，其中由 scene 值

- 注册页面
  - 小程序中的每个页面都有一个对应的 js 文件，其中调用 Page 方法 注册页面实例
  - 在注册时，可以绑定初始化数据、生命周期回调、事件处理函数等

## 小程序内置组件

### Text 组件

- Text 组件用于显示文本，类似于 span 标签，是行内元素
- Text 组件常用属性
  1. selectable：boolean 类型，表示文本是否可选中
  2. space：String 类型，决定文本空格的大小。取值：nbps：一个空格的大小，emsp：一个中文字符的大小，ensp：半个中文字符的大小
  3. decode：boolean 类型，表示是否解码文本

### Button 组件

- Button 用于创建按钮，默认块级元素
- 常见属性：
  - size：String 类型，按钮的大小
  - type：String 类型，按钮的样式类型
  - plain：Boolean 类型，按钮是否镂空，背景色透明
  - disabled：Boolean 类型，按钮是否禁用
  - loading：Boolean 类型，名称前是否带 loading 图标
  - form-type：String 类型，用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件
  - open-type：String 类型，微信开放能力
  - hover-class：String 类型，指定按钮按下去的样式类，当 hover-class="none" 时，没有点击效果

### View 组件

- 视图组件（块级元素，独占一行，通常用作容器组件）
- 常见属性
  - hover-class：String 类型，指定按下去的样式类
  - hover-stop-propagation：Boolean 类型，指定是否阻止本节点的祖先节点出现点击态
  - hover-start-time：Number 类型，按住后多久出现点击态，单位毫秒
  - hover-stay-time：Number 类型，手指松开后点击态保留时间，单位毫秒

### Image 组件

- 用于显示图片，行内块级元素，image 组件即使没有设置 src 也 有默认的大小：320 \* 240
- 常见属性
  - src：String 类型，图片资源地址（本地地址，远程地址）
  - mode：String 类型，设置图片裁剪、缩放的模式。详见[https://developers.weixin.qq.com/miniprogram/dev/component/image.html]
  - lazy-load：Boolean 类型，图片懒加载，在即将进入一定范围（上下三屏）时才加载
  - binderror：eventhandle 函数，当错误发生时触发，event.detail = {errMsg}
  - bindload：eventhandle 函数，当图片载入完毕时触发，event.detail = {width, height}

### Input 组件

- Input 组件用于接受用户的输入信息
- 常见属性
  - value：String，输入框的初始内容
  - type：String，输入框的类型
  - password：Boolean，是否是密码类型
  - placeholder：string，输入框为空时占位符
  - confirm-type：String，设置键盘右下角按钮的文字，仅在 type='text' 时生效
  - bindinput：eventhandle，键盘输入时触发，event.detail = {value, cursor, keyCode}，keyCode 为键值
  - bindfocus：eventhandle，输入框聚焦时触发，event.detail = {value, height}，height 为键盘高度
  - bindblur：eventhandle，输入框失去焦点时触发，event.detail = {value: value}
  - bindconfirm：eventhandle，点击完成按钮时触发，event.detail = {value: value}

### scroll-view 组件

- scroll-view 可以实现局部滚动
- 常见属性
  - scroll-x：Boolean，允许横向滚动
  - scroll-y：Boolean，允许纵向滚动
  - bindscroll：eventhandle，滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}

### 所有 wxml 标签（组件）都支持的属性

- id：String，组件唯一表示符，整个页面唯一
- class：String，组件的样式类，在对应的 wxss 中定义的样式类
- style：String，组件的内联样式
- hidden：Boolean，组件是否显示
- data-\* ：Any，自定义属性
- bind*/catch*：EventHandler，组件的事件

## WXSS

### 页面样式的三种写法

- 行内样式：style="key1: value1; key2: value2;"
- 页面样式：class="xxx"
- 全局样式：使用 app.wxss 中的样式
- 优先级：行内样式 > 页面样式 > 全局样式

### 小程序支持的选择器

- .class
- #id
- element
- element, element
- ::after
- ::before

### wxss 的扩展

- 尺寸单位：rpx

  - rpx 可以根据屏幕宽度进行自适应。规定屏幕宽度为 750rpx。如在 iPhone6 上，屏幕宽度为 375px，共有 750 个物理像素，则 750rpx = 375px = 750 物理像素。

- 样式导入
  - 为什么使用样式导入：在某些情况下，我们可能会将样式分在多个 wxss 文件中，方便对样式进行管理。这个时候就可以使用样式导入，来让单独的 wxss 生效
  - 如何在一个 wxss 中导入另一个 wxss 文件：使用 @import 进行导入。@import 后跟需要导入的外联样式表的相对路径（或者绝对路径），用 ; 表示语句结束

### 官方样式库

- 为了减少开发者样式开发的工作量，小程序官方提供了 WeUI.wxss 基本样式库[https://github.com/Tencent/weui-wxss]

## wxml 语法

### 逻辑判断 wx:if, wx:elif, wx:else

- 某些时候，我们需要根据条件来决定一些内容是否渲染：
  <view wx:if="{{ true }}">渲染的内容</view>
- 多个条件
  <view wx:if="{{ score > 90 }}">优秀</view>
  <view wx:elif="{{ score > 80 }}">良好</view>
  <view wx:elif="{{ score > 60 }}">及格</view>
  <view wx:else>不及格</view>

- hidden 属性

  - hidden 属性是所有组件都默认拥有的属性
  - 当 hidden 为 true 时，组件被隐藏。当 hidden 为 false 时，组件显示出来

- hidden 和 wx:if 的区别
  - hidden 属性隐藏的组件任然是存在 wxml 中的，只是样式设置了 display: none
  - wx:if 隐藏起来的组件，该组件根本不存在（没有创建出来）
  - 如何选择：
    - 如果显示和隐藏的频率很高，使用 hidden 属性，如果显示和隐藏的频率低，选择 wx:if

### 列表渲染 wx:for

- 遍历数据
  - 遍历数组：<view wx:for="{{ ['abc', 'cba', 'nba'] }}"> {{index}}.{{item}} </view>
  - 遍历字符串：<view wx:for="abcd"> {{index}}.{{item}} </view>
  - 遍历数组：<view wx:for="{{5}}"> {{index}}.{{item}} </view>
- 替换 wx:for 循环出来的 item 和 index
  <view wx:for="{{movies}}" wx:for-item="movie" wx:for-index="i"> {{i}}.{{movie}} </view>

- key 的作用：高效的更新虚拟 DOM
  - 使用 wx:for 遍历时会报一个警告，这是提示告诉我们可以添加一个 key 来提高性能
  - 为什么需要这个 key 属性呢
    - 这个其实和小程序内部也使用虚拟 DOM 有关系（和 Vue，React 很相似）
  - 当 某一层有很多相同的节点时（A,B,C,D,E），也就是列表节点，我们希望插入一个新的节点
    - 我们希望可以在 B 和 C 之间加一个 F，Diff 算法默认执行起来时这样的
    - 即把 C 更新成 F，D 更新成 C，E 更新成 D，最后再插入 E，这种方式替换了很多节点内容，效率很低
  - 如果使用 key 给每个节点做一个唯一标识，Diff 算法就可以正确识别此节点，不会去替换该节点的内容，而是在合适的位置插入新的节点

### block 标签

- 什么是 block 标签

  - 某些情况下，我们需要使用 wx:if 或 wx:for 时，可能需要包裹*一组组件标签*，我们希望对一组组件标签*进行整体的操作*，这个时候应该怎么办呢？
  - 方式 1：使用 view 组件包裹，会创建 view 组件，消耗性能
  - 方式 2：使用 block 标签包裹，不会创建组件，推荐这种方式

- 注意：block 并不是一个组件，它仅仅是一个包裹元素，不会在页面中做任何渲染，只接受控制属性
- block 标签的好处
  1. 将需要遍历或者判断的内容进行包裹
  2. 将遍历和判断的属性放在 block 标签中，不影响普通属性的阅读，提高代码的可读性

### 模板用法

- WXML 提供模板（template），可以在模板中定义代码片段，在不同的地方调用。（是一种 wxml 代码的复用机制）

  - 使用 name 属性，作为模板的名字，然后在 template 内定义代码片段
  - 基本使用：
    <!-- 定义模板2 -->
    <template name="contentItem2">
      <button>{{btnText}}</button>
      <view>{{content}}</view>
    </template>

    <!-- 使用模板2 -->

    <template is="contentItem2" data="{{ btnText: '按钮1', content: '啦啦啦'}}"></template>
    <template is="contentItem2" data="{{ btnText: '按钮2', content: '哈哈哈'}}"></template>
    <template is="contentItem2" data="{{ btnText: '按钮3', content: '呵呵呵'}}"></template>

- wxml 引入
  - import 引入：主要是导入 template，不能进行递归导入
    - 如果想要在不同的页面都使用同一个模板，可以使用 wxml 引入，在一个单独的 wxml 中定义模板，在要使用的页面中使用 <import src="绝对路径/相对路径" /> 来引入要使用的模板，然后就可以在下面使用该模板了
  - include 引入：将公共的 wxml 中的组件抽取到一个文件中，不能导入 template/wxs，可以进行递归导入
    - include 可以将目标文件中除了 <template/> <wxs/> 外的整个代码引入，相当于是拷贝到 include 位置

## WXS

### WXS 模块

- wxs 是小程序的一套脚本语言，结合 wxml ，可以构建出页面结构。wxs 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致（不过基本一致）
- 为什么要设计 wxs 语言呢
  - 在 wxml 中是不能直接调用 Page/Component 中定义的函数的，但是在某些情况，我们希望可用使用函数来处理 wxml 中的数据。类似 Vue 中的过滤器，这个时候就要使用 wxs 了
- wxs 使用的限制和特点

  - wxs 的运行环境和其他 JavaScript 代码是隔离的，wxs 中不能调用其他 JavaScript 文件中定义的 函数，也不能调用小程序提供的 API
  - wxs 函数不能作为组件的事件回调
  - 由于运行环境的差异，在 ios 设备上小程序内的 wxs 会比 JavaScript 代码快 2 - 20 倍。在 Android 设备上二者运行效率无差异

- wxs 基本使用

  1. 直接在 wxml 中使用：

  - 在 wxml 文件中定义 <wxs> 标签，并设置 module 属性，在其中写 js 代码，然后使用 module.exports 导出。然后在 wxml 组件中使用
    <wxs module="info">
    var message = "hello world";
    var name = "pipilei"

    var sum = function(num1, num2){
    return num1 + num2;
    }

    module.exports = {
    message: message,
    name: name,
    sum: sum
    }
    </wxs>
    <view>{{ test.message }}</view>

  2. 在 外部定义 wxs 文件，然后在 wxml 中使用 <wxs src="相对路径" module="xxx" /> 导入,在 wxml 中使用

## 事件

### 常见事件类型

- 某些组件会有自己特性的事件类型，比如 input 有 bindinput/bindblur/bindfocus 等。scroll-view 有 bindscrolltowpper/bindscrolltolower 等
- 有些事件是多个组件都有的，属于比较常见的事件类型
  - touchstart：手指触摸开始
  - touchmove：手指触摸后移动
  - touchcancel：手指触摸动作被打断，如来电提醒、弹框
  - touchend：手指触摸动作结束
  - tap：手指触摸后马上离开
  - longpress：手指触摸后超过 350ms 再离开，如果指定了事件回调函数并触发了这个事件，那么 tap 事件将不会触发
  - longtap：手指触摸后超过 350ms 再离开(推荐使用 longpress 事件代替)

### 事件对象

- 事件对象常见属性

  - type：String：事件类型
  - timeStamp：Integer：页面打开到触发事件经过的毫秒数
  - target：Object：触发事件的组件的一些属性值集合
  - currentTarget：Object：当前组件的一些属性值集合
  - detail：Object，额外的信息
  - touches：Array，触摸事件，当前停留在屏幕中的触摸点信息的数组
  - changedTouches：Array，触摸事件，当前变化的触摸点信息的数组

- touches 和 changedTouches 的区别

  1. 在 touchend 事件中不同
  2. 多手指触摸时不同

- target 和 currentTarget 的区别：在事件冒泡中有区别

  1. currentTarget 记录的时产生事件的组件
  2. target 是触发事件的组件

- 事件参数的传递

  - 在组件中添加 data-\* 属性，触发事件时可以在 currentTarget 中的 dataset 中取到响应的参数

- 事件冒泡和事件捕获
  - 当界面产生一个事件时，事件分为捕获阶段和冒泡阶段

## 组件化

### 创建一个自定义组件

- 类似于页面，自定义组件由 json、wxml、wxss、js 4 个文件组成。
- 在跟目录下创建一个 component 文件夹，里面存放自定义的公共组件。创建一个目录作为自定义组件的目录，在这个目录中 新建 Component，就会创建该组件的 4 个文件。其中 json 文件中进行自定义组件的声明：将 component 字段设为 true
- 在 wxml 中使用自定义组件
  - 在 页面对应的 json 文件中的 usingComponents 对象中添加一个键值对：键是要在 wxml 中使用的标签名，值是该组件的路径
    "usingComponents": {
    "my-cpn": "/components/my-cpn/my-cpn"
    }
  - 在 wxml 中使用组件的标签名

### 使用自定义组件的细节和注意事项

- 因为 wxml 节点标签名只能是 _小写字母、中划线和下划线_ 的组合，所以自定义组件的标签明也只能包含这些字符
- 自定义组件中可以引入其他自定义组件，用法和使用自定义组件相同
- 自定义组件和页面所在的跟目录名不能以 wx 为前缀，否则会报错
- 如果在 app.json 的 usingComponents 声明某个组件，那么所有的页面和组件可以直接使用该组件

### 自定义组件的样式细节

- 组件内样式对外部样式的影响
  - 组件内的 class 样式，只对组件的 wxml 内的节点生效，不会对引用组件的页面生效
  - 组件内不能使用 id 选择器、属性选择器、标签选择器
- 外部样式对组件内的样式影响

  - 外部使用 class 样式，只对外部的 wxml 生效，不会对组件内 wxml 节点生效
  - 外部使用了 id 选择器、属性选择器不会对组件内产生影响
  - 外部使用了标签选择器，会对组件内产生影响

- 整体结论
  - 组件内的 class 样式和组件外的 class 样式，默认是有一个隔离的效果的
  - 为了防止样式的错乱，官方不推荐使用 id、属性、标签选择器

### 组件和页面通信

- 很多情况下，组件内展示的内容（数据、样式、标签），并不是在组件中写死的，而是可以由使用者来决定
- 页面向组件传递数据：properties

  - 在组件的 js 文件中的 properties 对象中写需要传入的数据，供外部写上对应的属性。支持的类型：String，Number，Boolean，Object，Array，null
    properties: {
    title: {
    type: String,
    value: "我是 my-prop 组件默认的标题",
    observer: function(newVal, oldVal){
    console.log(newVal, oldVal)
    }
    }
    },
    <my-prop title="标题一" titleclass="red" />
    <my-prop title="标题二" titleclass="blue" />
    <my-prop titleclass="green" />

- 页面向组件传递样式

  - 在组件的 js 文件中的 externalClasses 中写入外部需要传递的样式名称，供外部写上样式名
    <view class="title titleclass">{{title}}</view>
    externalClasses: ["titleclass"],
  - 外部在 wxss 文件中写好对应的样式
    .red{
    color: red;
    }

    .blue{
    color: blue;
    }

    .green{
    color: green;
    }
    <my-prop title="标题一" titleclass="red" />
    <my-prop title="标题二" titleclass="blue" />
    <my-prop titleclass="green" />

- 组件向外传递事件--自定义事件

  - 组件内的方法写在 js 文件中的 methods 中，使用 this.triggerEvent() 方法向外传递事件，该方法接收 3 个参数，第一个是向外传递的事件名，第二个参数是携带的参数，外部可以在 event 对象的 detail 中找到。第三个参数一般传 {}
    <button size="mini" type="primary" bindtap="handBtnClick">+1</button>
    methods: {
    handBtnClick(){
    this.triggerEvent("handAdd", {name: "pipilei"}, {})
    }
    }

  - 外部使用该组件，绑定对应事件的回调函数
    <!-- 组件向外传递事件 -->
    <view>{{ counter }}</view>
    <my-event bind:handAdd="handAdd" />
    data: {
    counter: 0
    },
    handAdd(event){
    console.log(event)
    this.setData({
    counter: this.data.counter + 1
    })
    }

### 页面直接调用组件修改数据/调用方法

- 在组件外使用 this.selectComponent(选择器) 来获取对应组件，再调用组件内的方法/修改组件内的数据

### 组件插槽的使用

- 组件的插槽是为了让组件更有扩展性，可以让使用者决定组件内部的一些内容到底展示什么
- 单个插槽的使用

  - 除了内容和样式可能由外界决定外，外界也可能想要决定显示的方式，比如有个组件定义了头部和尾部，但中间的内容可能是一段文字，也可能是一张图片，或者是一个进度条，在不确定外界想要在组件中插入什么内容的前提下，可以在组件内预留插槽
  - 在组件内部使用 <slot> 标签预留插槽
    <view>我是 slot 组件的头部</view>
    <slot></slot>
    <view>我是 slot 组件的尾部</view>
  - 在外部在组件标签内部添加内容替换插槽的部分
    <slot-cpn>
    <text>中间是一段文字</text>
    </slot-cpn>

- 多个插槽的使用
  - 多个插槽需要给每个插槽设置一个 name 属性
    <view>mul-slot 组件的开始</view>
    <view class="slot1"><slot name="slot1" /></view>
    <view class="slot2"><slot name="slot2" /></view>
    <view class="slot3"><slot name="slot3" /></view>
    <view>mul-slot 组件的结束</view>
  - 在外部插入内容时使用 slot=xxx 替换对应名字的插槽
    <mul-slot>
    <button slot="slot2">插入 slot2 的位置</button>
    <text slot="slot1">插入 slot1 的位置</text>
    <text slot="slot3">插入 slot3 的位置</text>
    </mul-slot>
  - 必须在 Component 对象中添加 options 对象，在 options 中添加 multipleSlots: true
    options: {
    multipleSlots: true
    },

### 组件 Component 构造器

- Component 构造器中可以传入哪些东西？
  1. properties：定义传入的属性
  2. data：定义内部属性
  3. methods：定义方法
  4. options：额外的配置选项
  5. externalClasses：引用外部样式
     externalClasses: ["titleclass"],
  6. observers：属性和数据监听（可以监听 properties 和 data 中的数据）
     observers: {
     title(newVal){
     console.log(newVal)
     }
     },
  7. pageLifetimes：页面生命周期
     pageLifetimes: {
     show(){
     console.log("页面显示出来")
     },
     hide(){
     console.log("页面隐藏")
     },
     resize(){
     console.log("尺寸发生改变")
     }
     },
  8. lifetimes：组件生命周期
     lifetimes: {
     created(){
     console.log("组件被创建")
     },
     attached(){
     console.log("组件被添加到页面中")
     },
     ready(){
     console.log("组件被渲染出来")
     },
     moved(){
     console.log("组件被移动到节点树另一个位置")
     },
     detached(){
     console.log("组件被移除")
     }
     },

## 小程序系统 API

### 网络请求

- 微信提供了专属的 API 接口，用于网络请求：wx.request(Object object)
- 请求参数

  - url：接口地址，必传
  - data：请求参数
  - method：请求方式
  - success：成功时的回调
  - fail：失败时的回调

- 网络请求的封装
  ```javascript
  export default function request(options) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: options.url,
        method: options.method || "get",
        data: options.data || {},
        success: resolve,
        fail: reject,
      });
    });
  }
  ```

### 小程序中展示弹窗

- 小程序中展示弹窗有四种方式：showToast、showModal、showLoading、showActionSheet
- 详见：[https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html]

### 页面分享

- 分享是小程序扩散的一种重要方式，小程序有两种分享方式：
  1. 点击右上角菜单按钮，之后点击转发
  2. 点击某一个按钮，直接转发
- 当我们转发给好友一个小程序时，通常小程序中会显示一些信息，入何决定这些信息的展示呢？通过 onShareAppMessage
- 详见[https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onshareappmessageobject-object]

### 小程序登录

- 登录流程
  1. 调用 wx.login 获取 code
  2. 调用 wx.request 发送 code 到我们自己的服务器，我们自己的服务器会返回一个登录态的标识，比如 token
  3. 将登录态的标识 token 进行存储，以便下次使用
  4. 请求需要登录态标识的接口时，携带 token
  5. 详见[https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html]

### 页面跳转

- 页面跳转有两种方式：通过 navigator 组件和通过 wx 的 API 跳转
- navigator 组件主要就是用于页面跳转的：对应属性如下
  - target：String，非必填，在那个目标上发生跳转，默认当前小程序
  - url：string，非必填，当前小程序内的跳转链接
  - open-type：String，非必填，跳转方式
  - delta：number，非必填，当 open-type 为 'navigateBack' 时有效，表示回退的层数
- 详见[https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html]
- API 形式跳转
  - wx.navigateTo(url[,])
  - wx.navigateBack([delta])