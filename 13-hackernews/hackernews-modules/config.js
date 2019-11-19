// 模块6（配置模块），负责保存项目中的配置信息
var path = require('path')

module.exports = {
    port: 9091,
    dataPath: path.join(__dirname,'data','data.json')
}