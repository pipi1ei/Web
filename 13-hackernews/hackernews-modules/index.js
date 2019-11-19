// 模块1（服务模块），程序入口，负责启动服务
// 模块2（扩展模块），负责扩展 req 和 res 对象，为 req 和 res 增加一些更为方便好用的 API
// 模块3（路由模块），负责路由判断
// 模块4（业务模块），负责处理具体路由的业务的代码
// 模块5（数据操作模块），负责进行数据库操作模块
// 模块6（配置模块），负责保存项目中的配置信息
var http = require('http');

var context = require('./context.js');
var router = require('./router.js');
var config = require('./config.js');


http.createServer(function (req, res) {
    // 调用 context.js 模块的返回值（函数），并将 req 和 res 对象传递给 context.js 模块
    context(req, res);

    // 调用 router.js 模块的返回值（函数），并将 req 和 res 对象传递给 context.js 模块
    router(req, res);

    
}).listen(config.port, function () {
    console.log('http://localhost:' + config.port)
})


/* *************** 使用 express 封装 ***************** */
var express = require('express');

var app = express();
// 注册路由
// 设置 app 与 router 关联
app.use('/',router);

app.listen(config.port, () => {
    console.log('http://localhost:' + config.port)
})
