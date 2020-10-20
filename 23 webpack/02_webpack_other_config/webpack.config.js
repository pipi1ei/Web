const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const Webpack = require('webpack')

module.exports = {
  mode: 'development',

  // 多入口
  entry: {
    home: './src/home.js'
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    open: true,
    // 1. 配置代理
    proxy: {
      '/api': 'http://localhost:3000'  // 配置了一个代理
    },

    // 2. 前端只想模拟数据
    before(app){
      app.get('/user', (req, res) => {
        res.json({name: 'pipilei-before'})
      })
    }
  },

  plugins: [
    // home 页面
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),

    new Webpack.DefinePlugin({
      DEV: JSON.stringify('dev'),
      FLAG: 'true'
    })
  ]
}