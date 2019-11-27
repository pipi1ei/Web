const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',

  output: {
    // 动态获取路径
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    // publicPath:'dist'
  },

  module: {
    rules: [
      // css 配置
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // babel 配置 （ES6 转 ES5）
      {
        test: /\.js$/,
        // 不转化下面这些文件下下的 js 文件
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      // .vue 文件配置
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]

  },

  resolve: {
    // 导入文件时可以不用写后缀名
    extensions: ['.js', '.css', '.vue'],
    alias: {
      // 解决 vue runtime only问题
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  /* 插件相关配置 */
  plugins: [
    // 版权插件
    new webpack.BannerPlugin('最终版权归pipilei所有'),
    new htmlWebpackPlugin({
      template: 'index.html'
    }),

    // 开发阶段不建议使用 代码压缩 配置，发布时配置，分离到生产配置文件中
    // new UglifyJsPlugin()
  ],

  // 开发时配置，代码发布时取消该配置, 分离到开发配置文件中
  // devServer: {
  //   contentBase: './dist',
  //   inline: true
  // }

}