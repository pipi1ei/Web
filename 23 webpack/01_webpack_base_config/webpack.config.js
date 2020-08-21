const path = require('path')

// 引入 HtmlWebpackPlugin 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  mode: 'development',
  devServer: {  //开发服务器配置
    port: 3000,               // 设置端口号
    progress: true,           // 在内存中打包时可以看到进度条
    contentBase: './build',   //设置服务器的静态服务是 build 目录
    open: true,               //自动打开浏览器
    compress: true,           // 启用 gzip 压缩
  },

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
}