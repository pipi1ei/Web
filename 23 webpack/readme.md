## webpack

### 简介
- webpack 可以做的事：代码转换，文件优化，代码分割，模块合并，自动刷新，代码校验，自动发布等

- webpack 安装
  - 安装本地的 webpack： npm install webpack webpack-cli -D

### webpack 可以进行 0 配置
  - 打包工具 -> 输出后的结果（js模块）
  - 打包（支持 js 模块化）

### 手动配置 webpack
- 默认配置文件的名字：webpack.config.js 。在项目跟目录下新建这个文件
- webpack.config.js 文件配置
  1. 这个文件应该采用 node 的写法
    ```javascript
      module.exports = {
        entry: './src/index.js',
        output: {
          filename: 'bundle.js',
          path: 'XXX'
        }
      }
    ```
  2. 设置要打包的文件入口：配置 entry：'./src/index.js'。打包的入口就是 src 目录下的 index.js 文件
  3. 设置打包后的文件名以及路径: 配置 output。其中 filename 是打包生成的文件名，path 是文件的路径，这里需要使用绝对路径的方式，所以需要引入 node 的 path 模块
    ```javascript
      let path = require('path')
      console.log(path.resolve('dist'))
      module.exports = {
        entry: './src/index.js',  // 打包的入口，可使用相对路径
        output: {
          filename: 'bundle.js',  //打包后的文件名
          path: path.resolve(__dirname, 'dist'), // 打包后的路径必须是绝对路径
        }
      }
    ```

  4. 设置打包的模式：配置 mode 为 production（生产环境） 或者 development（开发环境）,生产环境打包后的文件是压缩过的，开发环境打包后的文件是未压缩的
    ```javascript 
      module.exports = {
        mode: 'development'
      }
    ```
  5. 手动指定webpack 配置文件，比如想设置webpack.config.my.js 为 webpack 的配置文件
    - 执行 webpack 打包命令时在后面添加参数 --config webpack.config.my.js
    - 或者在 package.json 文件中配置 script 脚本
      "scripts": {
        "build": "webpack --config webpack.config.my.js"
      }

### webpack-dev-server 配置
  - 可以手动执行 webpack-dev-server 命令，也可以在package.json 文件中配置对应的 script
      "scripts": {
        "dev": "webpack-dev-server"
      }
 ```javascript 
  module.exports = {
    devServer: {  //开发服务器配置
      port: 3000,               // 设置端口号
      progress: true,           // 在内存中打包时可以看到进度条
      contentBase: './build',   //设置服务器的静态服务是 build 目录
      open: true,               //自动打开浏览器
      compress: true,           // 启用 gzip 压缩
    }
  }
```

### html-webpack-plugin 配置
- 在使用webpack 打包时，并不会在打包的目录下生成 html 文件，需要手动创建 html 文件并将打包后的 js 添加到 html 中。如果想要把 src 目录下的 html 文件作为模板打包到生成的目录中，并自动将 打包的js 文件添加到该 html 中，这时候就要使用 html-webpack-plugin 插件
- 安装：npm install html-webpack-plugin -D
- 在 package.json 文件中设置script：
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
- 配置 html-webpack-plugin：
  ```javascript
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',   // 指定 html 文件模板
        filename: 'index.html',         // 生成的文件名
        minify: { 
          removeAttributeQuotes: true,  // 移除 html 文件中的双引号
          collapseWhitespace: true,     // 将 html 文档内容设置在一行显示
        },
        hash: true                      // 引入打包的js文件时会加上 hash
      })
    ]
  ```

### 样式配置
- webpack 默认是不能打包 css 文件的，需要安装对应的 loader 来处理
- 两个 loader：
  - css-loader：用来解析 @import 这种语法
  - style-loader：把 css 插入到 head 标签中
- loader 的顺序默认是从右向左执行，从下向上执行
- 为什么需要两个 loader ：因为loader的特点是希望功能单一
- loader 还可以写成对象的形式，方便增加其他配置

+ less 文件解析配置
  - 先安装 less 和 less-loader：cnpm install less less-loader -D
  - less-loader 是将 less 文件转化成 css 文件
  - 在 module 中添加一个配置
  ```javascript
    module.exports = {
      module: {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    }
  ```

+ sass、scss 文件解析配置
  - 安装 node-sass，sass-loader
  - 在 module 中添加一个配置
  ```javascript
    module.exports = {
      module: {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    }
  ```


### 抽离css 插件
+ 安装：cnpm install mini-css-extract-plugin -D
+ 之前打包的 css 文件都会以 style 标签的形式插入到 head 标签中，当样式过多时会导致 html 文件中 css 代码过多，现在通过 mini-css-extract-plugin 插件可以让 css 以 link 标签的形式引入进来
+ 配置：
  1. 增加 MiniCssExtractPlugin 插件配置
  ```javascript
    module.exports = {
      plugins: [
        // MiniCssExtractPlugin 配置
        new MiniCssExtractPlugin({
          filename: 'css/main.css'   // 抽离出来的 css 文件名
        })
      ]
    }
  ```
  2. 在 css 或 less loader 的设置出使用 MiniCssExtractPlugin.loader
  ```javascript
    module.exports = {
      plugins: [
        // MiniCssExtractPlugin 配置
        new MiniCssExtractPlugin({
          filename: 'css/main.css'   // css 文件名
        })
      ],
      module: {
        {
          test: /\.css$/,
          use: [
            // 使用 MiniCssExtractPlugin 的 loader 将 css 抽离出去
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        }
      }
    }
  ```
+ 
  

### css 样式自动加浏览器前缀
+ 安装： cnpm install postcss-loader autoprefixer@7.0.0 -D
  - 注意：autoprefixer 的版本需要 7.0.0 
+ 配置：
  1. 在 css 的 loader 配置中的 css-loader 之前添加 postcss-loader
  ```javascript
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader'
            ]
          }
        ]
      }
    }
  ```
  2. 在项目根目录下创建 postcss.config.js 文件,添加如下配置
  ```javascript
    module.exports = {
      plugins: [require('autoprefixer')]
    }
  ```

### 压缩打包出来的 css 文件，生产环境生效，开发环境不生效
+ 安装：cnpm install optimize-css-assets-webpack-plugin -D
+ 在 webpack.config.js 文件添加如下配置
  ```javascript
    module.exports = {
      optimization: {
        minimizer: [
          // 压缩 css 文件
          new OptimizeCssAssetsPlugin({}) 
        ]
      },
    }
  ```

### es6 转 es5 配置 (配置不全)
+ 安装：cnpm install babel-loader @babel/core @babel/preset-env -D
+ 配置
  1. 在 webpack.config.js 文件中的 module 中的 rules 中再添加一条规则
  ```javascript
    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env'
                  ]
                }
              }
            ]
          }
        ]
      }
    }
  ```
  2. 上面方式不能解析 es7 的语法，需要在添加一条配置
    - cnpm install @babel/plugin-proposal-class-properties -D
    ```javascript
      module.exports = {
        module: {
          rules: [
            {
              test: /\.js$/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: [ '@babel/preset-env' ],
                    plugins: [
                      '@babel/plugin-proposal-class-properties'
                    ]
                  }
                }
              ]
            }
          ]
        }
      }
    ```

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


### 图片配置
+ 安装：cnpm install file-loader -D
  - file-loader 作用：默认会在内部生成一张图片到 build 目录下，同时把生成的图片名字返回回来
  ```javascript
    import imgSrc from './img/img1.png'
    console.log(imgSrc) // 2e098cb61bc6d8b6697accbf226386a2.png
    var image = new Image()
    image.src = imgSrc
    document.body.appendChild(image)
  ```

  - webpack.config.json 配置
  ```javascript
    module.exports = {
      module: {
        rules: [
          {
            test: /\.(png|jpg|jpeg|gig)$/,
            use: ['file-loader']
          }
        ]
      }
    }
  ```

+ 有时我们不想让一下比较小的图片也打包出来，而是转成 base64 的形式，这时可以使用 url-loader
  - cnpm install url-loader -D
  - webpack.config.json 配置
    ```javascript
      module.exports = {
        module: {
          rules: [
            {
              test: /\.(png|jpg|jpeg|gig)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192,
                    name: 'img/[name].[hash:8].[ext]'
                  }
                }
              ]
            }
          ]
        }
      }
    ```



### webpack 打包多页应用
```javascript
  const path = require('path')

  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    mode: 'development',

    // 多入口
    entry: {
      home: './src/home.js',
      other: './src/other.js',
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },

    plugins: [
      // home 页面
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'home.html',
        chunks: ['home']
      }),

      // other 页面
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'other.html',
        chunks: ['other']
      }),
    ]
  }
```


### 配置 source-map
+ 在 webpack.config.js 文件添加 devtool 配置
  ```javascript
    module.exports = {
      devtool: 'source-map'
    }
  ```
+ devtool 配置有几个值可选：
  - source-map：源码映射，打包后会生成一个单独的 sourcemap 文件，出错了会标识当前报错的列和行的信息
  - eval-source-map：不会产生 sourcemap 文件，但报错时可以显示行和列
  - cheap-module-source-map：报错时不会显示列，但会生成一个单独的映射文件
  - cheap-module-eval-source-map：不会生成单独的映射文件，集成在打包后的文件中，报错时不会产生列


### 配置实时打包功能：修改了代码后能自动执行 npm run build 功能
+ 在 webpack.config.js 文件添加 watch: true 配置
+ 还可以进行一些其他的配置
  watchOptions: {
    poll: 1000,               // 每秒问我 1000 次
    aggregateTimeout: 500,    // 防抖功能
    ignored: /node_modules/   // 不需要监控哪个文件
  }

### webpack 小插件
+ cleanWebpackPlugin：
  - 安装： cnpm install clean-webpack-plugin -D
  - 配置：
    ``` javascript
      const CleanWebpackPlugin = require('clean-webpack-plugin')
      module.export = {
        plugins: [
          new CleanWebpackPlugin('dist')  // 每次打包时都会删除原来的 dist 文件夹，然后重新生成新的 dist 目录
        ]
      }
    ```
+ copyWebpackPlugin：打包时拷贝其他目录中的内容到打包的目录中
  - 安装：cnpm install copy-webpack-plugin -D
  - 配置：
  ``` javascript
      const CopyWebpackPlugin = require('clean-webpack-plugin')
      module.export = {
        plugins: [
          new CopyWebpackPlugin({
            patterns: [
              { from: './doc', to: './' }
            ],
          })
        ]
      }
    ```

### webpack 跨域问题
+ 使用node 本地写个服务：server.js ，该服务监听3000端口
  ```javascript
    const express = require('express')

    let app = express()

    app.get('/api/user', (req, res) => {
      res.json({name: 'pipilei'})
    })

    app.listen(3000)
  ```
+ 使用webpack-dev-server 作为本地服务时默认访问的时 8080 端口，如果在 home.js 中访问 /pai/user 的接口会请求不到数据, 如果直接访问 3000 端口会出现跨域问题
  ```javascript
    let xhr = new XMLHttpRequest()

    // http://localhost:8080 是 webpack-dev-server 的服务  --> 转发到 3000 端口
    xhr.open('GET', '/api/user', true)
    xhr.onload = function(){
      console.log(xhr.response)
    }
    xhr.send()
  ```

+ 此时可以使用 webpack-dev-server 配置一个代理,转发到其他的端口
  ```javascript
    module.exports = {
      devServer: {
        open: true,
        proxy: {
          '/api': 'http://localhost:3000'  // 配置了一个代理, 访问 /api 路径时都会被转发到 http://localhost:3000 上面
        }
      }
    }
  ```
  - 前端只想模拟数据:
  ```javascript
    module.exports = {
       devServer: {
        // 2. 前端只想模拟数据
        before(app){
          app.get('/user', (req, res) => {
            res.json({name: 'pipilei-before'})
          })
        }
      }
    }
  ```
   

### resolve 属性的配置
```javascript
module.exports = {
  resolve: {  
    modules: [path.resolve('node_modules')],  // 解析第三方包
    extensions: ['.js', '.css', '.vue', '.json'], // 扩展名设置, 在使用 import 导入时可以不用写对应的后缀名,会根据该配置查找对应的后缀名
    alias: {  // 别名
      bootstrap: 'bootstrap/dist/css/bootstrap.css'
    }

  }
}
```

### 定义环境变量
+ 使用 webpack 内置插件: Webpack.DefinePlugin
  ```javascript
    const Webpack = require('webpack')
    module.exports = {
      plugins: [
        new Webpack.DefinePlugin({
          DEV: JSON.stringify('dev'),
          FLAG: 'true'
        })
      ]
    }
  ```
+ 在 js 文件中使用
  ```javascript
    console.log(DEV)  // 'dev'
    console.log(FLAG, typeof FLAG) // true, boolean
  ```

### 区分不同环境
+ 安装: cnpm install webpack-merge -D
+ 创建基础,开发环境和生成环境的配置文件
  - webpack.base.js : 基本配置
  - webpack.dev.js : 开发环境配置
  - webpack.prod.js : 生成环境配置



## webpack 优化
### noParse
+ 配置：
``` javascript
  module.exports = {
    module: {
      noParse: /jquery/  //不去解析 jquery 中的依赖
    }
  }
```

### Webpack.IgnorePlugin
+ 配置
```javascript
  module.exports = {
    plugins: [
      // 忽略 moment 下面的 ./local 文件夹下的内容
      new Webpack.IgnorePlugin(/\.\/local/,/moment/) 
    ]
  }
```

### dllPlugin


### happypack：多线程打包
+ 安装：cnpm install happypack
+ 配置：想要多线程打包 js 或 css , 修改对应的 rule 下的 use 部分
  ```javascript
    const Happypack = require('happypack')
    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/
            use: 'Happypack/loader?id=js'
          }
        ]
      },
      plugins: [
        new Happypack({
          id: 'js',
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ]
            }
          }]
        })
      ]
    }
  ```

### webpack 自带优化
+ 使用 import 导入时，在生产环境中，会自动去除掉没用的代码（tree-shaking）。require 方式导入不会自动去除没用的代码
+ scope hosting：作用域提升：
  - 在生成环境中，下面的代码会自动打包成：console.log(6)
  ```javascript
    let a = 1;
    let b = 2;
    let c = 3;
    let d = a + b + c;
    console.log(d)
  ```

### 抽取公共代码
+ 在打包多页应用时，多个页面可能都引用了相同的模块，这时可以将这些模块单独抽离出去
+ 配置:
```javascript
  module.exports = {
    optimization: {
      splitChunks: {    // 分割代码块
        cacheGroups: {  // 缓存组
          common: {     // 公共的模块
            chunks: 'initial'
            minSize: 0,
            minChunks: 2,          
          },
          vendor: {
            priority: 1, // 权重，先抽离该部分
            test: /node_modules/, // 抽离引用 node_modules 下的公共模块。比如在多个文件中引用 jquery
            chunks: 'initial'
            minSize: 0,
            minChunks: 2,
          }
        }
      }
    }
  }
```

### 懒加载
+ 安装：cnpm install @babel/plugin-syntax-dynamic-import -D
  - 实际测试可以不用安装该插件
+ 懒加载: 假如页面中有个按钮，点击该按钮时加载资源文件：source.js 。 代码如下
  ```javascript
    export default 'pipilei'
  ```
+ index.js 中的代码如下
  ```javascript
    let button = document.createElement('button')
    button.innerHTML = "懒加载"
    button.addEventListener('click', function(){
      // es6 草案中的语法，使用 jsonp 实现动态加载文件，返回 Promise 对象
      import('./source.js').then(data => {
        console.log(data)
      })
    })
  ```
+ 在 webpack.config.js 中配置 @babel/plugin-syntax-dynamic-import
  ```javascript
    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                ],
                plugins: [
                  '@babel/plugin-syntax-dynamic-import'
                ]
              }
            }
          }
        ]
      }
    }
  ```

### 热更新
+ 在 devServer 中配置 hot: true
+ 新增两个 webpack 内置插件
  - new Webpack.NamedModulesPlugin(),  // 打印更新的模块路径
    new Webpack.HotModuleReplacementPlugin() // 热更新插件