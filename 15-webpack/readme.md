# Webpack 相关知识

## 什么是 webpack
webpack 是前端的一个项目构建工具，它是基于 Node.js 开发出来的一个前端工具

## 在网页中会引用哪些常见的静态资源？
+ JS
  - .js .jsx .coffee .ts
+ CSS
  - .css .less .sass .scss
+ Images
  - .png .jpg .gif .svg
+ 字体文件
  - .svg .ttf .eot .woff .woff2
+ 模板文件
  - .ejs .jade .vue【这是在webpack中定义组件的方式】

## 网页中引入的静态资源多了以后会出现什么问题？
1. 网页加载速度慢，因为要发起很多的二次请求（网页加载时遇到css，js，img 文件时都会再次发起请求）
2. 要处理错综复杂的依赖关系（比如 bootstrap 框架依赖 jQuery库）

## 如何解决上述两个问题
1. 合并、压缩、精灵图、图标的base64编码 解决加载速度的问题
2. 可以使用 requireJS， 也可以使用 webpack 解决包之间的依赖关系

## 如何完美实现上述的两种解决方案
1. 使用Gulp，是基于 task 任务的
2. 使用Webpack，是基于真个项目构建的
  + 借助于 webpack 这个前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能
  + 根据官网的托介绍webpack打包的过程
  + [webpack官网](http://webpack.github.io/)

## webpack 安装的两种方式
1. 运行 npm i webpack -g 全局安装 webpack，这样就能在全局中使用 webpack 的命令
2. 在项目跟目录中运行 npm i webpack --save-dev 安装到项目依赖中

## 初步使用 webpack 打包构建列表隔行变色案例
1. 运行 npm init 初始化项目，使用 npm 管理项目中的依赖包
2. 创建项目的基本目录结构
3. 使用 cnpm i jquery --save 安装jQuery 类库
4. 创建 main.js 文件并书写隔行变色的代码逻辑

## webpack 能够做什么
1. webpack 能够处理 JS 文件的相互依赖关系
2. webpack 能够处理 JS 的兼容问题，把高级的、浏览器不识别的语法转为浏览器能正常识别的语法
3. webpack 命令格式： webpack 要打包的文件的路径 打包后的输出文件路径

## webpack.config.js 文件配置
1. entry：配置入口文件, 表示要使用 webpack 打包那个文件
  `entry: path.join(__dirname, './src/main.js'),`
2. output： 配置出口, 输出文件相关配置
  output: {
    path: path.join(__dirname, './dist'), // 指定打包好的文件输出到那个目录中去
    filename: 'bundle.js' // 指定输出的文件名称
  }
3. 当在控制台之间输入webpack命令执行的时候，webpack 做了以下几步
  1. 首先 webpack 发现我们并没有通过命令的形式指定入口和出口
  2. webpack 就会去项目的跟目录下去找 `webpack.config.js` 配置文件
  3. 当找到配置文件后，webpack 会去解析这个 配置文件，当解析完配置文件后得到一个 *配置对象*
  4. 当 webpack 拿到 配置对象 后，就拿到了配置对象中指定的入口和出口，然后打包构建

## webpack-dev-server 工具使用

### 使用 webpack-dev-server 工具实现自动打包编译的功能
1. 运行 `cnpm install webpack-dev-server -D` 命令把这个工具安装的项目的本地开发依赖
2. 安装完毕后，这个工具的用法和webpack 命令的用法完全一样
3. 由于是在项目中安装的 webpack-dev-server， 所以无法把它当作脚本命令直接在终端运行（只有全局安装的才能直接在终端中运行）
4. webpack-dev-server 这个工具如果想要正常运行，要求这个项目本地必须安装 webpack
5. 在 `package.json` 文件中的 "scripts" 下作如下配置：
  "scripts": {
    "dev": "webpack-dev-server"
  },
6. webpack-dev-server 帮我们打包生成的 bundle.js 文件并没有存放到实际的物理磁盘上（不是dist目录下的bundle.js 文件），而是直接托管到了电脑的内存中，所以在项目的跟目录下根本找不到打包好bundle.js 文件
7. 可以认为 webpack-dev-server 把打包好的文件以一种虚拟的形式，托管到了项目的跟目录中。虽然我们看不到它，但是，可以认为和 dist,src,node_modules 目录平级，有一个看不见的 bundle.js 文件

### webpack-dev-server 常用的命令参数
1. --open： 自动打开浏览器
2. --port 3000：修改端口号为3000
3. --contentBase src: 修改访问的默认路径
4. --hot： 浏览器热加载

方式一：在 `package.json` 文件中配置(推荐)
  "scripts": {
    "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
  },

方式二：在 `webpack.config.js` 文件中配置(配置较为麻烦)
  const webpack = require('webpack') // 启用热更新的第二步
  devServer: {
    open: true, //自动打开浏览器
    port: 3000, // 设置启动的时候的运行端口
    contentBase: 'src', // 指定托管的根目录
    hot: true //启用热更新的第一步
  },
  plugins: [  
    new webpack.HotModuleReplacementPlugin() // new 一个热更新的模块对象， 启用热更新的第三步
  ]


## html-webpack-plugin（在内存中生成 html 页面） 插件使用
1. 本地安装 html-webpack-plugin： `npm install html-webpack-plugin -D`
2. 在 webpack.config.js 文件中导入安装的html-webpack-plugin： `const htmlWebpackPlugin = require('html-webpack-plugin')`
3. 在 webpack.config.js 文件中的 plugins 下创建一个生成HTML页面的插件，并配置
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'), // 指定模板页面，将来会在内存中根据指定的路径生成 html 页面
      filename: 'index.html'  // 指定生成的页面的名称
    })
  ]

+ 这个插件的作用
1. 在内存中根据指定的页面生成一个内存的页面
2. 自动把打包好的 bundle.js 文件追加到页面中去


## loader
+ webpack 默认只能打包 js 类型的文件，无法打包其他非 js 类型的文件，如果想要打包其他类型的文件，需要使用合适的第三方 loader
+ webpack 处理第三方文件的过程：
 1. 发现这个要处理的文件不是 js 文件，就会去配置文件中查看有没有对应的第三方 loader 规则
 2. 如果能找到对应的规则，就会调用对应的 loader 处理这种类型的文件
 3. 在调用loader 的时候是从后往前调用的
 4. 当最后的loader 调用完毕会把处理的结果直接交给 webpack 打包合并，最终输出到 bundle.js 文件中

### 配置处理 css 样式表的第三方 loader
1. 安装 style-loader 和 css-loader： `npm install style-loader css-loader --save-dev`
2. 在 webpack.config.js 文件中module属性中配置：
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }

### 使用 webpack 打包 less 文件
1. 安装less和对应的loader： `npm install less-loader less --save-dev`
2. 在 webpack.config.js 文件中module属性中配置：
  module: {
    rules: [
      {
        test: /.\less$/,
        use: ['style-loader', 'css-loader','less-loader']
      }
    ]
  }

### 使用 webpack 打包 sass 文件
1. 安装less和对应的loader： `npm install sass-loader node-sass webpack --save-dev`
2. 在 webpack.config.js 文件中module属性中配置：
  module: {
    rules: [
      {
        test: /.\scss$/,
        use: ['style-loader', 'css-loader','sass-loader']
      }
    ]
  }

### 使用 webpack 处理 css 中的路径
webpack 无法处理css 文件中的 url 地址，不管是图片还是字体库，只要是 url 地址，都处理不了
1. 安装 file-loader : `npm install url-loader file-loader --save-dev`
2. 在 webpack.config.js 文件中module属性中配置：limit 给定的值是图片的大小，单位是 byte，如果我们引用的图片大于或等于给定的limit值，则不会被转为 base64 格式的字符串，如果图片小于给定的limit 值，则会被转成 base64的字符串.
name=[name].[ext]: 设置该参数不会去重命名图片
name=[hash:8]-[name].[ext]: 会在图片前加上8位的hash 值
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: ['url-loader?limit=***&name=[hash:8]-[name].[ext]']
      }
    ]
  }

3. 处理css路径中的字体文件
  {
    test: /\.(ttf|eot|woff|woff2|svg)$/,
    use: 'url-loader'
  }


## webpack 中 babel 的配置
- 在 webpack 中，默认只能处理一部分 ES6 的新语法，一些更高级的 ES6 语法或 ES7 语法， webpack 是处理不了的，这时候就需要借助第三方的 loader 来帮助 webpack 处理这些高级的语法，当第三方 loader 把高级语法转换为低级语法之后，会把结果交给 webpack 去打包到 bundle.js 中、
- 通过 babel 可以将高级语法转换为低级语法，在webpack 中可以通过两套命令安装两套包，去安装 babel 相关的 loader 功能
  + 第一套包： `cnpm i babel-core babel-loader babel-plugin-transform-runtime -D`
  + 第二套包： `cnpm i babel-preset-env babel-preset-stage-0 -D`
- 在 webpack.config.js 文件中的module 节点下的 rules 数组中添加一个新的匹配规则, 在配置babel 规则的时候必须把 node_modules 目录通过 exclude 选项排除
  + {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }
- 在项目的根目录中新建一个叫做 .babelrc 的babel 配置文件，这个配置文件属于 JSON 格式，所以在写 .babelrc 配置的时候，必须符合 JSON 语法规范，不能写注释，字符串必须用双引号
  {
    "presets": ["env","stage-0"], // 可以把 presets 翻译成语法的意思
    "plugins": ["transform-runtime"]
  }
- 了解：目前我们安装的 babel-preset-env 是比较新的 ES 语法，之前安装的是 babel-preset-es2015，现在出了一个更新的语法插件babel-preset-env，它包含了所有和 es*** 相关的语法


## 在 webpack 构建的vue 项目中，使用模板对象
使用 import vue from 'vue' 导入vue 时，会去node_modules 目录下的 vue 文件夹中去找 package.json 文件，找到 main 入口对应的js文件并导入，这时候导入的是 vue.common.js 文件，时 runtime-only 形式的 js 文件
1. 在 webpack.config.js 文件中添加 resolve 属性
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }

## webpack 打包 .vue 文件
默认webpack 无法打包 .vue 文件,需要安装对应的loader
1. cnpm i vue-loader vue-template-compiler -D
2. 在配置文件中，新增loader 配置
  {
    test:/\.vue$/,
    use: 'vue-loader'
  }

## export default 和 export 的区别
1. export default 向外暴露的成员，可以使用任意的变量来接受，但在一个模块中，export default 只能向外暴露一次
2. export 向外暴露的成员只能通过 {导出的变量名} 来接收，这种形式叫做按需导出，在一个模块中，export 可以向外暴露多个成员，同时如果某些成员在 import 的时候不需要，可以不在 {} 中定义
3. 使用 export 导出的成员如果向换个名称来接收可以使用 as 起别名
  export title = '标题'
  import {title as title123} from './test.js'