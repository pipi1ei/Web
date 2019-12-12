const path = require('path')
// 启用热更新的第二步
const webpack = require('webpack')

// 导入在内存中生成 html 页面的插件
const htmlWebpackPlugin = require('html-webpack-plugin')

// 这个配置文件，其实就是一个 js 文件，通过 node 中的模块操作，向外暴露了一个配置对象
module.exports = {
  // 配置入口文件, 表示要使用 webpack 打包那个文件
  entry: path.join(__dirname, './src/main.js'),

  // 配置出口, 输出文件相关配置
  output: {
    path: path.join(__dirname, './dist'), // 指定打包好的文件输出到那个目录中去
    filename: 'bundle.js' // 指定输出的文件名称
  },

  // 配置 webpack-dev-server 命令参数
  devServer: {
    open: true, //自动打开浏览器
    port: 3000, // 设置启动的时候的运行端口
    contentBase: 'src', // 指定托管的根目录
    hot: true //启用热更新的第一步
  },

  // 配置插件
  plugins: [  
    // new 一个热更新的模块对象， 启用热更新的第三步
    new webpack.HotModuleReplacementPlugin(),

    // 创建一个在内存中生成 html 页面的插件
    new htmlWebpackPlugin({
      // 指定模板页面，将来会在内存中根据指定的路径生成 html 页面
      template: path.join(__dirname, './src/index.html'),
      // 指定生成的页面的名称
      filename: 'index.html'
    })
  ],

  /* module 节点用于配置所有第三方模块 loader */
  module: {
    // rules节点：所有第三方模块的匹配规则
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.\less$/,
        use: ['style-loader', 'css-loader','less-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'}, //将 JS 字符串生成为 style 节点
          { loader: 'css-loader'},  //将 css 转成 CommonJS 模块
          { loader: 'sass-loader'} //将 sass 编译成 css
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader']
      }
    ]
  }
}