// 创建 HTTP 服务能够响应图片和css文件
// 1.导入 http 模块
var http = require('http');
var fs = require('fs');
var path = require('path');

// 2. 创建http服务对象，监听请求事件，开启服务
http.createServer(function (req, res) {
    // 处理不同请求，根据请求 url 做出不同响应
    var url = req.url;
    console.log(url);
    if (url === '/' || url === '/index') {
        var filename = path.join(__dirname, '../', 'htmls', 'index.html');
        fs.readFile(filename, function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        })
    } else if (url === '/login') {
        var filename = path.join(__dirname, '../', 'htmls', 'login.html');
        fs.readFile(filename, function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        })
    }else if(url === '/images/image1.jpg'){
        var filename = path.join(__dirname, '../', 'images', 'image1.jpg');
        fs.readFile(filename, function (err, data) {
            if (err) {
                throw err;
            }
            res.setHeader('content-type','image/jpeg; charset=utf-8');
            res.end(data);
        })
    }else if(url === '/css/index.css'){
        var filename = path.join(__dirname, '../', 'css', 'index.css');
        fs.readFile(filename, function (err, data) {
            if (err) {
                throw err;
            }
            res.setHeader('content-type', 'text/css; charset=utf-8');
            res.end(data);
        })
    }
     else {
        res.end('404,page not found!')
    }

}).listen(8080, function () {
    console.log('HTTP 服务以启动，请访问 http://localhost:8080');
})