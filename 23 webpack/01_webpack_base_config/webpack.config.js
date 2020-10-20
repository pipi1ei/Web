const path = require('path')

// 引入 HtmlWebpackPlugin 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 引入 MiniCssExtractPlugin 插件, 用来抽离 css 文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 引入 optimize-css-assets-webpack-plugin 插件, 用来压缩打包出来的 css 文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 引入 UglifyJsPlugin 插件, 用来压缩 js 文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const Webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // 模式
  mode: 'development',

  //开发服务器配置
  devServer: {  
    port: 3000,               // 设置端口号
    progress: true,           // 在内存中打包时可以看到进度条
    contentBase: './build',   //设置服务器的静态服务是 build 目录
    open: true,               //自动打开浏览器
    compress: true,           // 启用 gzip 压缩
  },

  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',   // 指定 html 文件模板
      filename: 'index.html',         // 生成的文件名
      // minify: { 
      //   removeAttributeQuotes: true,  // 移除 html 文件中的双引号
      //   collapseWhitespace: true,     // 将 html 文档内容设置在一行显示
      // },
      hash: true                      // 引入打包的js文件时会加上 hash
    }),

    // MiniCssExtractPlugin 配置
    new MiniCssExtractPlugin({
      filename: 'main.css'   // css 文件名
    }),

    new Webpack.ProvidePlugin({  // 在每个模块中都注入 jquery
      $: 'jquery'
    })
  ],

  // 模块配置
  module: {
    rules: [
      // 配置解析 css 的loader
      {
        test: /\.css$/,
        //css-loader：用来解析 @import 这种语法,把 css 插入到 head 标签中。loader 的顺序默认是从右向左执行
        use: [
          // 使用 MiniCssExtractPlugin 的 loader 将 css 抽离出去
          MiniCssExtractPlugin.loader,
          'css-loader',
          // postcss-loader 会在 css 中添加对应的浏览器前缀，但需要配置 postcss.config.js 文件
          'postcss-loader'
        ]
      },

      // 配置解析 less 文件的 loader
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },

      // 配置 es6 转 es5
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              // 解析 es7 语法
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },

      // 配置图片 loader
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: ['file-loader']
      }
    ]
  },

  
  // 优化项
  optimization: {
    minimizer: [
      // 压缩打包出来的 css 文件
      new OptimizeCssAssetsPlugin({}),
      // 压缩打包出来的 js 文件
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
}