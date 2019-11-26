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
  1. 因为当子组件注册到父组件的 components 时,Vue 会编译好父组件的模块,该模块的内容已经决定了父组件将要渲染的Html(相当于父组件中已经有了子组件的内容了)
  2. 子组件的标签名只能在父组件中被识别出来
  3. 如果未在 Vue 实例中注册子组件, 浏览器会忽略子组件的标签名

### 注册组件的语法糖
1. 之前注册组件的方式有些繁琐，Vue 使用语法糖的形式省去了 Vue.extend() 的步骤，之间在注册组件的时候使用一个对象来代替
2. 语法糖注册全局组件：
  Vue.component('cpn1',{
    template: `
      <div>
        <h1>我是标题1</h1>  
        <p>我是哈哈哈</p>
      </div>
    `
  })
3. 语法糖注册局部组件：
    components: {
      cpn2: {
        template: `
          <div>
            <h1>我是标题2</h1>  
            <p>我是呵呵呵</p>
          </div>
        `
      }
    }

### 组件模板抽离的写法
1. 使用 script 标签，类型必须是 text/x-template， 并给一个id，用于在注册的时候绑定该模板
  <script type="text/x-template" id="cpn1">
    <div>
      <h1>我是标题1</h1>
      <p>我是哈哈哈</p>
    </div>
  </script>

  Vue.component('cpn1', {
    template: '#cpn1'
  })

2. 使用 template 标签，提供一个id，用于注册的时候绑定模板
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
1. 组件对象有一个data 属性，但这个 data 属性必须是一个函数，返回一个对象，对象内部保存着属性
2. 组件中的 data 属性为什么是函数？
  当服用该组件时，会创建多个该组件的实例，每次都会调用 data 函数去返回一个对象，如果data 属性是一个对象，那么每次都会返回这一个对象，多个 组件 实例去改变 data 中的值会相互影响，从而造成连锁反应，而data是函数的话每次都会返回不同的对象，各个组件之间互不影响

### 父子组件的通信
 1. 父组件向子组件传递数据：通过 props 向子组件传递数据
  - props 的值有两种方式：
    + 方式一：字符串数组，数组中的字符串就是传递时的名称
    + 方式二：对象，对象可以设置传递时的类型。也可以设置默认值等。使用对象写法可以对 props 进行类型验证，支持以下数据类型：
      - String
      - Number
      - Boolean
      - Array
      - Object
      - Date
      - Function
      - Symbol
 2. 子组件向父组件传递数据：通过自定义事件向父组件发送消息
  - 什么时候需要自定义事件呢？
    + 当子组件需要向父组件传递数据时，就要用到自定义事件
    + v-on 不仅可以监听 DOM 事件，还可以用于监听组件之间的自定义事件
  - 自定义事件流程：
    + 在子组件中，通过 $emit() 来触发事件
    + 在父组件中，通过 v-on 来监听子组件事件

### 组件中 props 属性驼峰名的问题：
在组件中 props 属性中使用 驼峰名来命名属性，在使用组件时绑定的属性名使用驼峰形式会报错，应使用 - 符号转换，因为 html 元素属性不区分大小写

### 父子组件的访问方式
有时候我们需要父组件直接访问子组件，子组件直接访问父组件，或者是子组件访问根组件
- 父组件访问子组件：使用 $children 或 $refs
  + $children 方式：this.$children 是一个数组类型 ，它包含所有子组件对象
  + $refs 方式：使用 this.$refs 返回一个对象，默认返回空对象，必须在组件上添加 ref 属性
- 子组件访问父组件: 使用 $parent 访问该子组件的父组件， 使用 $root 访问根组件


## 组件化高级

### 插槽的使用
1. 基本用法：在组件模板中添加 <slot></slot> 标签
2. 插槽的默认值： <slot><button>按钮</button></slot>
3. 如果有多个值，同时放入到组件进行替换是，一起作为替换元素



## Webpack

### 起步
正式项目中新建 src 文件夹作为开发环境，新建 dist 文件夹作为发布环境，在src 文件夹中编写代码，通过webpack 打包到 dist 目录下。src 下采用模块化开发方式，可以使用 commonJS，ES6,AMD,CMD 等模块化规范导入导出模块，然后通过 webpack 打包入口文件（main.js）生成 bundle.js 到dist 目录下

### webpack 配置
新建 webpack.config.js 文件作为webpack 的配置文件：
``` javascript
const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    // 动态获取路径
    path: path.join(__dirname,'dist'),
    filename: 'bundle.js'
  }
}
```
通过 npm init 命令创建 package.json 文件，在 script 字段中添加 'build':'webpack' ，就可以使用 npm run build 命令来执行 webpack 命令

### webpack 的loader
- loader 是 webpack 中非常核心的概念
- webpack 主要用来做什么呢？
  + 在之前的例子中，主要用 webpack 来处理js代码，并且 webpack 会自动处理js代码中的依赖关系
  + 但是，开发中不仅仅有基本的js代码处理，还有css，图片，也包括一些高级的将ES6转成ES5代码，将scss、less转成css等等，对于这些转换，webpack本身是不支持的
  + 使用 loader 可以解决这些问题
- loader 使用过程
  + 1. 通过 npm 安装需要使用的 loader
  + 2. 在 webpack.config.js 中的 module 关键字下进行配置

  ### ES6 语法处理
  - 在webpack 打包后的js文件中，并没有将 ES6 语法转换成 ES5，那么一些不支持 ES6 语法的浏览器就没办法很好的运行js代码
  - 如果想把 ES6 语法转换成 ES5 语法，就需要使用 babel
    + 在 webpack 中，直接使用 babel 对于的 loader 就可以了
      npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
  - 配置webpack.config.js 文件
    ``` javascript
    {
      test: '/\.m?js$/',
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }
    ```
  - 重新打包，产看打包后的js文件，其中的内容就变成了 ES5 的语法

