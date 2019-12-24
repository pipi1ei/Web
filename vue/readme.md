# vue 知识学习

### 创建 Vue

<div id='app'>{{ msg }}</div>

let app = new Vue({
el: '#app', // 该属性决定了这个 Vue 对象挂载到哪一个元素上
data: {
msg: 'hello world!'  
 }
})

### vue 声明周期

### 插值操作
1. v-once: 使用了v-once 属性的标签，其内容不会再响应式变化
  <h1 v-once>{{ msg }}
2. v-html: 使用 v-html 属性可以解析字符串中的HTML标签
  <p v-html="msg2"></p>
3. v-text: 使用v-text 属性可以展示字符串，效果和 {{}} 相同，一般不用该方式
  <h1 v-text='msg'></h1>
4. v-pre: 使用了 v-pre 属性的标签会原封不动的展示其中的内容，不会解析 {{}} 语法
  <h1 v-pre>{{ msg }}</h1> //h1 中展示的内容就是 {{ msg }}，并不会解析 {{}} 语法
5. v-cloak: 使用了 v-cloak 属性的元素，当vue实例创建好之后会删除该属性，可以防止闪动效果
  <style>
    [v-cloak]{
      display: none;
    }
  </style>
  <div id="app" v-cloak>
    <h1>{{ msg }}</h1>
  </div>

### v-bind 介绍

1. 插值操作注意是将值插入到模板的内容中，有些属性也需要动态改变，就要用到 v-bind 指令，比如动态绑定 a 元素的 href 属性， img 元素的 src 属性等。

- 作用：动态绑定属性
- 缩写：`:`
- 预期：any(with argument)|Object(without argument)
- 参数：attrOrProp(optional)

2. 动态绑定 class 属性

- 对象语法：直接通过 v-bind:class="{}" 绑定一个类: `<h2 :class="{类名1：boolean, 类名2：boolean}">{{ msg }}</h2>`

  <h2 class="title" v-bind:class="{active: isActive}">{{ msg }}</h2>

- 和普通的类同时存在，并不冲突：

  <h2 class="title" v-bind:class="{active: isActive}">{{ msg }}</h2>

- 如果过于复杂，可以放在一个 methods 或 computed 中
  <h2 class="title" :class="classes">{{ msg }}</h2>  *注：*classes 是一个计算属性

3. 动态绑定 style

- 对象语法：<h1 :style="{key(属性名): value(属性值)}">{{ msg }}</h1>
- 数组语法：<h1 :style="[baseStyles, overridingStyles]">{{ msg }}</h1>
  baseStyles:{color:'red'}; overridingStyles:{fontSize: '100px'}

### 计算属性

1.  基本用法: 在 vue 实例中定义 computed 属性: computed:{ fullName: function(){ return this.firstName + ' ' + this.lastName } }
2.  计算属性的 getter 和 setter:
    computed: {
    // 完整写法,计算属性一般没有 set 方法, 只读属性
    fullName: {
    //getter
    get: function () {
    return this.firstName + ' ' + this.lastName
    },

        //setter
        set: function (newValue) {
          var names = newValue.split(' ');
          console.log(names)
          this.firstName = names[0];
          this.lastName = names[names.length - 1];
        }

    }
    }

3.  计算属性和 methods 对比: 计算属性效率更高
    我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

### 事件监听 v-on

1. 基本用法: v-on:click='add'; methods: { add(){ this.counter++; } }

2. v-on 参数:

- 如果该方法不需要参数,那么方法后面的 () 可以不用添加, 注意:如果方法本身中有一个参数,那么默认会将原生事件的 event 参数传递进去
- 如果需要传入某个参数,同时需要 event 时,可以通过 \$event 传入事件

3. v-on 修饰符:

- .stop: 调用 event.stopPropagation(),停止冒泡
  <!-- 停止冒泡 -->
  <button @click.stop='doThis'></button>
- .prevent: 调用 event.preventDefault(),阻止默认行为
  <!-- 阻止默认行为 -->
  <button @click.prevent='doThis'></button>
  <!-- 阻止默认行为, 没有表达式 -->
  <button @submit.prevent></button>
  <!-- 串联修饰符 -->
  <button @click.stop.prevent='doThis'></button>
- .{keyCode | keyAlias}: 只当事件从特定键触发式才触发回调
  <!-- 键修饰符,键别名 -->
  <input @keyup.enter='onEnter'></input>
  <!-- 键修饰符,键代码 -->
  <input @keyup.13='onEnter'></input>
- .native: 监听组件根元素的原生事件
- .once: 只触发一次回调
  <button @click.once='doThis'></button>

### 数组中响应式的方法:

1. push 方法
2. pop 方法
3. shift 方法
4. unshift 方法
5. splice 方法
6. sort 方法
7. reverse 方法

### v-model 原理

v-model 用于表单元素双向绑定数据

- v-model 其实是个语法糖,它背后本质上包含两个操作

  1. v-bind 绑定一个 value 属性,
  2. v-on 指令给当前元素绑定 input 事件

- v-model 修饰符:
  1. lazy: 默认情况下. v-model 是在 input 事件中同步输入框中的数据的,使用 lazy 修饰符时可以让数据在失去焦点或回车时才会刷新
  2. number: 默认情况下,在输入框中无论输入字母还是数字都会被当成字符串类型进行处理,使用 number 属性可以让数据编程 number 类型
  3. trim: 如果输入的内容收尾有多个空格,使用 trim 可以将其去除

## Vue 组件化

### vue 组件化思想:

- 组件化是 Vue.js 中的重要思想
  - 它提供了一种抽象,让我们可以开发出一个个独立可服用的小组件来构造我们的应用.
  - 任何的应用都会被抽象成一颗组件树
- 组件化思想的应用:
  - 有了组件化的思想,我们在之后的开发中就要充分的利用它
  - 尽可能的将页面拆分成一个个小的,可复用的组件
  - 这样让我们的代码方便阻止和管理,并且扩展性也更强

### 注册组件的基本步骤:

1. 创建组件构造器: Vue.extend(),必须在 new Vue 实例之前创建
2. 注册组件: Vue.component()
3. 使用组件: 在 Vue 实例的作用范围内使用组件

### 父组件和子组件:

- 组件之间存在层级关系,其中一种非常重要的关系就是父子组件的关系.
- 父子组件的错误用法: 以子标签的形式在 Vue 的实例中使用
  1. 因为当子组件注册到父组件的 components 时,Vue 会编译好父组件的模块,该模块的内容已经决定了父组件将要渲染的 Html(相当于父组件中已经有了子组件的内容了)
  2. 子组件的标签名只能在父组件中被识别出来
  3. 如果未在 Vue 实例中注册子组件, 浏览器会忽略子组件的标签名

### 注册组件的语法糖

1. 之前注册组件的方式有些繁琐，Vue 使用语法糖的形式省去了 Vue.extend() 的步骤，之间在注册组件的时候使用一个对象来代替
2. 语法糖注册全局组件：
   Vue.component('cpn1',{
   template: `<div> <h1>我是标题1</h1> <p>我是哈哈哈</p> </div>`
   })
3. 语法糖注册局部组件：
   components: {
   cpn2: {
   template: `<div> <h1>我是标题2</h1> <p>我是呵呵呵</p> </div>`
   }
   }

### 组件模板抽离的写法

1. 使用 script 标签，类型必须是 text/x-template， 并给一个 id，用于在注册的时候绑定该模板
   <script type="text/x-template" id="cpn1">
     <div>
       <h1>我是标题1</h1>
       <p>我是哈哈哈</p>
     </div>
   </script>

Vue.component('cpn1', {
template: '#cpn1'
})

2. 使用 template 标签，提供一个 id，用于注册的时候绑定模板
   <template id="cpn2">
     <div>
       <h1>我是标题2</h1>
       <p>我是呵呵呵</p>
     </div>
   </template>

components: {
cpn2: {
template: '#cpn2'
}
}

### 组件数据的存放

1. 组件对象有一个 data 属性，但这个 data 属性必须是一个函数，返回一个对象，对象内部保存着属性
2. 组件中的 data 属性为什么是函数？
   当服用该组件时，会创建多个该组件的实例，每次都会调用 data 函数去返回一个对象，如果 data 属性是一个对象，那么每次都会返回这一个对象，多个 组件 实例去改变 data 中的值会相互影响，从而造成连锁反应，而 data 是函数的话每次都会返回不同的对象，各个组件之间互不影响

### 父子组件的通信

1.  父组件向子组件传递数据：通过 props 向子组件传递数据

- props 的值有两种方式：
  - 方式一：字符串数组，数组中的字符串就是传递时的名称
  - 方式二：对象，对象可以设置传递时的类型。也可以设置默认值等。使用对象写法可以对 props 进行类型验证，支持以下数据类型：
    - String
    - Number
    - Boolean
    - Array
    - Object
    - Date
    - Function
    - Symbol

2.  子组件向父组件传递数据：通过自定义事件向父组件发送消息

- 什么时候需要自定义事件呢？
  - 当子组件需要向父组件传递数据时，就要用到自定义事件
  - v-on 不仅可以监听 DOM 事件，还可以用于监听组件之间的自定义事件
- 自定义事件流程：
  - 在子组件中，通过 \$emit() 来触发事件
  - 在父组件中，通过 v-on 来监听子组件事件

### 组件中 props 属性驼峰名的问题：

在组件中 props 属性中使用 驼峰名来命名属性，在使用组件时绑定的属性名使用驼峰形式会报错，应使用 - 符号转换，因为 html 元素属性不区分大小写

### 父子组件的访问方式

有时候我们需要父组件直接访问子组件，子组件直接访问父组件，或者是子组件访问根组件

- 父组件访问子组件：使用 $children 或 $refs
  - $children 方式：this.$children 是一个数组类型 ，它包含所有子组件对象
  - $refs 方式：使用 this.$refs 返回一个对象，默认返回空对象，必须在组件上添加 ref 属性
- 子组件访问父组件: 使用 $parent 访问该子组件的父组件， 使用 $root 访问根组件

## 组件化高级

### 插槽的使用

1. 基本用法：在组件模板中添加 <slot></slot> 标签
2. 插槽的默认值： <slot><button>按钮</button></slot>
3. 如果有多个值，同时放入到组件进行替换是，一起作为替换元素

## Webpack

### 起步

正式项目中新建 src 文件夹作为开发环境，新建 dist 文件夹作为发布环境，在 src 文件夹中编写代码，通过 webpack 打包到 dist 目录下。src 下采用模块化开发方式，可以使用 commonJS，ES6,AMD,CMD 等模块化规范导入导出模块，然后通过 webpack 打包入口文件（main.js）生成 bundle.js 到 dist 目录下

### webpack 配置

新建 webpack.config.js 文件作为 webpack 的配置文件：

```javascript
const path = require("path");
module.exports = {
  entry: "./src/main.js",
  output: {
    // 动态获取路径
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  }
};
```

通过 npm init 命令创建 package.json 文件，在 script 字段中添加 'build':'webpack' ，就可以使用 npm run build 命令来执行 webpack 命令

### webpack 的 loader

- loader 是 webpack 中非常核心的概念
- webpack 主要用来做什么呢？
  - 在之前的例子中，主要用 webpack 来处理 js 代码，并且 webpack 会自动处理 js 代码中的依赖关系
  - 但是，开发中不仅仅有基本的 js 代码处理，还有 css，图片，也包括一些高级的将 ES6 转成 ES5 代码，将 scss、less 转成 css 等等，对于这些转换，webpack 本身是不支持的
  - 使用 loader 可以解决这些问题
- loader 使用过程

  - 1. 通过 npm 安装需要使用的 loader
  - 2. 在 webpack.config.js 中的 module 关键字下进行配置

  ### ES6 语法处理

  - 在 webpack 打包后的 js 文件中，并没有将 ES6 语法转换成 ES5，那么一些不支持 ES6 语法的浏览器就没办法很好的运行 js 代码
  - 如果想把 ES6 语法转换成 ES5 语法，就需要使用 babel
    - 在 webpack 中，直接使用 babel 对于的 loader 就可以了
      npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
  - 配置 webpack.config.js 文件
    ```javascript
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }
    ```
  - 重新打包，产看打包后的 js 文件，其中的内容就变成了 ES5 的语法

### webpack 配置 vue

1. 在当前项目下本地安装 vue: npm install --save vue
2. 在入口 js 文件导入 vue 并创建 vue 实例，如果此时直接运行会报错，提示 runtime only
3. 在 webpack.config.js 文件中添加 resolve 配置：

```javascript
resolve: {
  alias: {
    'vue$': 'vue/dist/vue.esm.js'
  }
}
```

### 创建 vue 时 el 和 template 的区别

- webpack 配置 vue 正常运行之后，我们来考虑一个问题：
  - 如果希望将 data 中的数据显示在界面中，就必须修改 index.html
  - 如果定义了组件，也必须修改 index.html 来使用组件
  - 但是 html 模板在之后的开发中，我并不希望手动的频繁修改，该怎么做？
- 定义 template 属性
  - 在之前的 vue 实例中，我们定义的 el 属性，用于和 index.html 中的 #app 进行绑定。让 Vue 实例之后可以管理它其中的内容
  - 这里，我们可以将 div 元素中的 {{message}} 内容删掉，只保留一个基本的 id 为 app div 的元素
  - 但是如果依然希望在其中显示 {{message}} 的内容，应该怎么处理?
  - 可以再定义一个 template 属性，代码如下：
    ```javascript
    new Vue({
      el: "#app",
      template: '<div id="app">{{message}}</div>',
      data: {
        message: "hello vue"
      }
    });
    ```

### .vue 文件封装处理

- 一个组件以一个 js 对象的形式进行组织和使用的时候时非常不方便的
  - 一方面编写 template 代码非常麻烦
  - 另一方面如果有样式的化，在哪写比较合适呢？
- 通过一种全新的方式（.vue 文件）来组织一个 vue 的组件，但这个时候会报错
- 需要使用 vue-loader 和 vue-template-compiler
- 安装 vue-loader 和 vue-template-compiler : `npm install vue-loader vue-template-compiler --save-dev` vue-loader 版本要小于 14.0.0，否则需要插件

### webpack plugin 使用

- plugin 和 loader 的区别：
  - loader 主要用于转换某些类型的模块，它是一个转换器
  - plugin 是插件，它是对 webpack 本身的扩展，是一个扩展器
- plugin 使用步骤：
  1. 通过 npm 安装需要使用的 plugins（某些 webpack 已经内置的插件不需要安装）
  2. 在 webpack.config.js 中的 plugins 中配置插件
- 常用的 webpack 插件：

  1. 打包 html 文件的插件：

  - 目前 index.html 文件时放在项目的跟目录下的，在真实发布项目时，发布的是 dist 文件夹下的内容，但 dist 文件夹中没有 index.html 文件，那么打包的 js 文件也就没有意义了，所以需要使用 HtmlWebpackPlugin 插件将 index.html 文件打包到 dist 文件夹下
  - HtmlWebpackPlugin 插件可以做这些事：
    1. 自动生成一个 index.html 文件（可以指定模板来生成）
    2. 将打包的 js 文件，自动通过 script 标签插入到 body 中
  - 使用步骤：
    1. 安装：npm install html-webpack-plugin --save-dev
    2. 使用：在 webpack.config.js 文件导入 :`const htmlWebpackPlugin = require('html-webpack-plugin')`
       修改 webpack.config.js 文件中的 plugins 部分内容：
       ```javascript
       plugins: [
         new htmlWebpackPlugin({
           template: "index.html"
         })
       ];
       ```
       这里的 template 表示根据什么模板来生成 index.html，另外，我们需要删除之前在 output 中添加的 publicPath 属性，否则插入的 script 标签中的 scr 可能会有问题

  2. js 压缩的插件

  - 在项目发布之前，需要对 js 文件进行压缩处理，这里使用第三方插件 uglifyjs-webpack-plugin，并且指定版本号 1.1.1，和 CLI2 保持一直
  - 安装： npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
  - 使用：
    - 在 webpack.config.js 文件导入该插件：`const uglifyJsPlugin = require('uglifyjs-webpack-plugin')`
    - 修改 webpack.config.js 文件中的 plugins 部分内容：
      ```javascript
      plugins: [new uglifyJsPlugin()];
      ```

### 搭建本地服务器

- webpack 提供了一个可选的本地开发服务器，这个本地服务器基于 node.js 搭建，内部使用 Express 框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果
- 不过它是一个单独的模块，在 webpack 中使用之前需要先安装：
  `npm install --save-dev webpack-dev-server@2.9.1`
- deserver 也是作为一个 webpack 中的选项，选项本身可以设置如下属性：
  - contentBase: 为哪一个文件夹提供本地服务，默认是根文件夹，我们这里填写 ./dist
  - port: 端口号
  - inline: 页面实时刷新
  - historyApiFallback: 在 SPA 页面中，依赖 HTML5 的 history 模式
- webpack.config.js 文件配置修改如下：
  ```javascript
    devServer: {
      contentBase: './dist',
      inline: true
    }
  ```
- 我们可以在 package.json 文件配置另外一个 scripts:
  - `"dev": "webpack-dev-server --open"` ; --open 参数表示直接打开浏览器

## Vue CLI

### Vue CLI 简介

- 使用 Vue.js 开发大型应用时，我们需要考虑代码目录结构、项目结构和部署、热加载、代码单元测试等事情。
- 如果每个项目都要手动完成这些工作，那效率会比较低，所以通常使用一些脚手架工具来帮助完成这些事情。

- CLI 是什么意思？
  - CLI 是 Command-Line Interface, 翻译为命令行界面，但俗称脚手架
  - Vue CLI 是官方发布的一个 vue.js 项目脚手架
  - 使用 vue-cli 可以快速搭建 Vue 开发环境以及对于的 webpack 配置

new Vue({
el: '#app',
// components: { App },
// template: '<App/>'
render: function (creatElement) {
//1.普通用法： creatElement('标签'，{标签的属性}， [''])
return creatElement('h2',
{ class: 'box' },
['hello pipilei', creatElement('button', ['按钮'])]
)
}
})

- runtime-compiler 和 runtime-only 的区别：
  - 如果在开发中，依然使用 template，就需要选择 runtime-compiler
  - 如果在开发中，使用的是 .vue 文件来开发，那么可以选择 runtime-only

### vue-cli 3 和 vue-cli 2 的区别

1. vue-cli 3 是基于 webpack 4 打造， vue-cli 2 是 webpack3
2. vue-cli 3 的设计原则是 “0 配置”，移除的配置文件根目录下的 build 和 config 等目录
3. vue-cli 3 提供了 vue ui 命令，提供了可视化配置，更加人性化
4. 移除了 static 文件夹，新增了 public 文件夹，并且 index.html 移动到 public 中

## Vue Router

### 什么是路由

- 路由就是通过互联的网络把信息从源地址传输到目的地址的活动
- 路由器提供了两种机制：路由和转送
  - 路由是决定数据包从来源到目的地的路径
  - 转送将传输端的数据转移到合适的输出端
- 路由中有一个重要的概念叫路由表，路由表本质上就是一个映射表，决定了数据包的指向

### 认识 vue-router

- vue-router 是基于路由和组件的
  - 路由用于设定访问路径，将路径和组件映射起来
  - 在 vue-router 的单页面应用中，页面的路径的改变就是组件的切换

### 安装和使用 vue-router

- 因为已经学习过 webpack，后续开发中我们主要是通过工程化的方式进行开发的，在后续步骤中，直接使用 npm 来安装路由即可

  - 步骤一：安装 vue-router： npm install vue-router --save
  - 步骤二：在模块化工程中使用它（因为它是一个插件，所以可以通过 Vue.use() 来安装路由功能）
    1. 第一步：导入路由对象，并且调用 Vue.use(Router)
    2. 第二步：创建路由实例，并且传入路由映射配置
    3. 第三步：在 Vue 实例中挂载创建的路由实例

- 使用 vue-router 步骤
  - 第一步： 创建路由组件
  - 第二步： 配置路由映射：组件和路由映射关系
  - 第三步： 使用路由：通过<router-link> 和 <router-view>
    - <router-link> 标签是 vue-router 中已经内置的一个组件，它会被渲染成一个 a 标签
    - <router-view> 标签会根据当前的路径，动态渲染出不同的组件
    - 网页的其他内容，比如顶部的标题、导航，或者底部的一些版权信息等会和<router-view> 处于同一个等级
    - 在路由切换时，切换的时 <router-view> 挂载的组件，其他内容不会发生改变

### 路由的默认路径

- 默认情况下，进入网站的首页，我们希望 <router-view> 渲染首页的内容，但上面的情况没有显示首页组件，必须让用户点击 首页 才能显示
- 如何让路径默认跳到首页，并且 <router-view> 渲染首页组件？
  - 只需要多配置一个映射就可以了
  ```javascript
  const routes = [
    {
      path: "/",
      redirect: "./home"
    }
  ];
  ```
  - 配置解析： 在 routers 中又配置了一个映射，path 配置是根路径：/ ，redirect 是重定向，也就是我们将根路径重定向到 /home 的路径下，这样就可以得到我们想要的结果了

### 动态路由

- 在默写情况下，一个页面的 path 路径可能是不确定的，比如进入用户界面是，希望如下路径“
  - /user/aaa 或 /user/bbb ；除了前面的 user 之外。后面还跟上了用户的 ID，这种 path 和 Component 的匹配关系，称之为动态路由

```javascript
const routes = [
  {
    path: "/user/:id",
    component: User
  }
];
```

### 路由的懒加载

- 官方解释：
  - 当打包构建应用时，JavaScript 包会变得非常打，影响页面加载
  - 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了
- 路由懒加载做了什么？
  - 路由懒加载的主要作用就是将路由对应的组件打包成一个个的 js 代码块
  - 只有在这个路由被访问到的时候，才加载对应的组件
- 懒加载的方式：
  1. 结合 vue 的异步组件和 webpack 的代码分析：
  ```javascript
    const Home = resolve => {
      require.ensure(
        ['../components.Home.vue],
        () => {
          resolve(require('../components/Home.vue'))
        }
      )
    }
  ```
  2. AMD 写法
  ```javascript
    const About = resolve = > require(['../components/About.vue'], resolve);
  ```
  3. 在 ES6 种，可以使用更加简单的写法来组织 Vue 异步组件和 Webpack 的代码分割
  ```javascript
    const Home = () = > import('../components/About.vue');
  ```

### 嵌套路由

- 嵌套路由是一个很常见的功能，比如在 home 页面种，我们希望通过 /home/news 和 /home/message 访问一些内容；一个路径映射一个组件，访问这两个路径也会分别渲染两个组件
- 实现路由嵌套：
  1. 创建对应的子组件，并且在路由映射中配置对应的子路由
     {
     path: '/home',
     component: Home,
     children: [
     {
     path: '',
     redirect: 'news'
     },
     {
     path: 'news',
     component: HomeNews
     },
     {
     path: 'message',
     component: HomeMessage
     }
     ]
     },
  2. 在组件内部使用 <router-view> 标签

### 路由参数的传递

- 传递参数主要有两种方式：params 和 query
- params 方式：
  1. 配置路由格式： /router/:id
  2. 传递的方式：在 path 后面跟上对应的值
  3. 传递后形成的路径： /router/123 , /router/abc
- query 方式：
  1. 配置路由格式：/router，也就是普通路由
  2. 传递的方式：对象中使用 query 的 key 作为传递方式
  3. 传递后形成的路径： /router?id=123 或 /router?id=abc

### keep-alive

- keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染
  - 它有两个非常重要的属性：
    1. include: 字符串或正则表达式，只有匹配的组件会被缓存
    2. exclude：字符串或表达式，任何匹配的组件都不会被缓存
- router-view 也是一个组件，如果之间被包在 keep-alive 里，所有路径匹配到的视图组件都会被缓存

### 完成 tabBar 案例

### promise

## Vuex

### vuex 简介

- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
  - 它采用*集中式存储管理*应用的所有组件的状态，并以相应的规则保证状态以一种可以预测的方式发生变化.
  - Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试，状态快速导入导出等高级调试功能
- 状态管理 是什么？
  - 状态管理模式、集中式存储管理 这些名词看不懂
  - 可以简单的将其看成把需要多个组件共享的变量全部存储在一个对象里面
  - 然后，将这个对象放在顶层的 vue 实例中，让其他组件可以使用
  - 那么，多个组件就可以共享这个对象中的所有变量属性
- 哪些状态需要在多个组件间共享呢？
  - 用户登录状态、用户名称、头像、地理位置等信息
  - 商品的收藏、购物车中的物品等
  - 这些状态信息，都可以放在一个同意的地方，对它进行保存和管理，而且它们还是响应式的

### Vuex 核心概念

1. state: 单一状态树，保存状态相关信息
2. getters: 类似于组件中的计算属性
3. mutations: 定义一些方法，可以改变 state 中的属性

- Vuex.store 状态更新唯一方式：提交 mutation
- mutation 主要包括两个部分：
  - 字符串的事件类型（type）
  - 一个回调函数（handler），该回调函数的第一个参数是 state
    mutation 提交风格：
    1. this.\$store.commit('add',param)
       add(state,param){}
    2. this.\$store.commit({
       type: 'add',
       count: 100
       })
       add(state,payload)

4. actions: 做异步操作

- 通常情况下，Vuex 要求 mutations 中的方法必须是同步方法，主要原因是当我们使用 devtools 时，devtools 可以捕获到 mutation 的快照，但如果 mutations 中式异步操作，就不能被 devtools 追踪，所以官方建议将 异步操作 放在 actions 中执行
- action 类似于 mutation，但是是用来代替 mutation 中进行异步操作的

5. modules: 划分模块

## 网络请求的封装

### axios 的功能特点

1. 在浏览器中发送 XMLHttpRequest 请求
2. 在 node.js 中发送 http 请求
3. 支持 Promise API
4. 拦截请求和响应
5. 转换请求和响应数据
6. 支持多种请求方式

- axios(config)
- axios.request(config)
- axios.get(url[,config])
- axios.delete(url[,config])
- axios.head(url[,config])
- axios.post(url[,data[,config]])
- axios.put(url[,data[,config]])
- axios.patch(url[,data[,config]])

### axios 常见的配置选项

- 请求地址：url: '/user'
- 请求类型：method: 'get'
- 请求根路径：baseURL: 'http://www.mt.com/api'
- 请求前的数据处理：transformRequest: [function(data){}]
- 请求后的数据处理：transformResponse: [function(data){}]
- 自定义请求头：headers: {'x-Requested-With':'XMLHttpRequest'}
- URL 查询对象：params:{id:12}
- 查询对象序列化函数：paramsSerializer: function(params){}
- request body：data:{key:'aaa'}
- 超时设置 s：timeout:1000
- 跨域是否带 Token：withCredentials:false
- 自定义请求处理：adapter:function(resolve,reject,config){}
- 身份验证信息：auth:{uname:'pipilei',pwd:'123'}
- 响应的数据格式 json/blob/document/arraybuffer/text/stream：responseType:'json'

### axios 拦截器

axios 提供了拦截器，用于我们在发送每次请求或者得到响应后，进行对应的处理
如何使用拦截器？

```javascript
axios.interceptors.request.use(
  config => {
    console.log("来到了 request 拦截 success中");
    // 比如config中的信息不符合服务器要求，可以添加额外参数
    // 发送请求是在界面显示请求图标
    return config;
  },
  err => {
    console.log("来到了 request 拦截 failure中");
    return err;
  }
);

axios.interceptors.response.use(
  response => {
    console.log("来到了 response 拦截 success中");
    return response.data;
  },
  err => {
    console.log("来到了 response 拦截 failure中");
    return err;
  }
);
```
