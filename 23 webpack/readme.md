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
- 在使用webpack 打包时，并不会在打包的目录下生成 html 文件，需要手动创建 html 文件并将打包后的 js 添加到html中。如果想要把 src 目录下的 html 文件作为模板打包到生成的目录中，并自动将 打包的js 文件添加到该 html 中，这时候就要使用 html-webpack-plugin 插件
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