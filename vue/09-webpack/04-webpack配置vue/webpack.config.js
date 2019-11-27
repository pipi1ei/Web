const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: './src/main.js',
  output: {
    // 动态获取路径
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
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
    extensions: ['.js','.css','.vue'],
    alias: {
      // 解决 vue runtime only问题
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  /* 插件相关配置 */
  plugins: [
    // 版权插件
    new webpack.BannerPlugin('最终版权归pipilei所有')
  ]
  
}