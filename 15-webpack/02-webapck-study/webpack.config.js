const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname,'./src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },

  devServer: {
    open: true,
    port: 3000,
    contentBase: 'src',
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader','less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader','sass-loader']
      },
      {
        test: /\.(png|jgp|gif|jpeg)$/,
        use: 'url-loader?limit=7632' // limit 给定的值是图片的大小，单位是 byte，如果我们引用的图片大于或等于给定的limit值，则不会被转为 base64 格式的字符串，如果图片小于给定的limit 值，则会被转成 base64的字符串
      },
      /* 处理字体文件 */
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: 'url-loader'
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test:/\.vue$/,
        use: 'vue-loader'
      }
    ]
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 修改 vue 被导入包的路径
    }
  }
}