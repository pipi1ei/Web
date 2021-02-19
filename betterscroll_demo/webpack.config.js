const path = require('path');

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    // 必须是一个绝对路径
    path: path.resolve(__dirname, "./build")
  }
}
