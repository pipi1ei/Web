const path = require('path');

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    // 必须是一个绝对路径
    path: path.resolve(__dirname, "./build")
  },
  module: {
    rules: [
      {
        // 规则使用正则表达式
        test: /\.css$/, // 匹配资源
        use: [
          // { loader: "css-loader" },
          // 注意: 编写顺序(从下往上, 从右往做, 从后往前)
          "style-loader", 
          {
            loader: "css-loader",
            options: {
              // 在解析css文件时遇到 @import 语法导入其他css文件时，使用上一个loader再解析一次
              importLoaders: 1
            }
          },
          "postcss-loader"
        ],
        // loader: "css-loader"
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  }
}
