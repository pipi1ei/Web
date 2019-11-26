const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    // 动态获取路径
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // css-loader 只负责将css文件加载，不会添加到
        // 使用多个 loader 时是从右向左读
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当加载的图片大小 小于limit 时，会将图片编译成 base64 字符串的形式
              // 当加载的图片大小 大于limit 时，需要使用 file-loader 模块进行加载
              limit: 8192,
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      // babel 配置
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]

  }
}