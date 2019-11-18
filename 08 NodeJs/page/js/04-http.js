// 创建一个简单的 http 服务器程序

//1. 加载http 模块
var http = require('http');

var fs = require('fs');
var _path = require('path')

//2. 创建一个http服务对象
// var server = http.createServer();

// //3. 监听用户的请求事件（request 事件）
// // request 对象包含了用户请求报文中的所有内容， 通过 request 对象可以获取用户提交过来的所有数据
// // response 对象用来向用户响应一些数据，当服务器要向客户端响应数据的时候必须使用 response 对象
// // 有了 request 对象和 response 对象，既可以获取用户提交过来的数据，也可以向用户响应数据
// server.on('request', function (request, response) {  
//     // 解决乱码问题：服务器设置http响应报文头
//     response.setHeader('Content-Type','text/html; charset=utf-8');
//     response.write('<h1>hello http，你好世界</h1>');
//     // 对于每一个请求，服务器必须结束响应，否则客户端会一直等待服务器的响应
//     response.end();
// })

// // 4. 启动服务
// server.listen(8080, function () {  
//     console.log('服务已经启动，清访问http://localhost:8080');
// })



// 根据用户不同请求做出不同响应
// 1.加载http模块 var http = require('http');
// 2. 创建一个http服务对象,同时监听'request'事件，并启动服务
// http.createServer(function (req, res) {  
//     //获取用户请求路径: req.url
//     var path = req.url;
//     console.log('request path: ', path);
//     if(path === '/' || path === '/index'){
//         // res.write('hello index')
//         // res.end();
//         res.end('hello index'); // 效果等于上述写法合并
//     }else if(path === '/login'){
//         res.end('hello login');
//     }else{
//         res.end('hello')
//     }
// }).listen(8080, function () {
//     console.log('服务已经启动，清访问http://localhost:8080');
// })


// 根据用户不同请求做出不同响应(响应现有 html 文件)
http.createServer(function (req, res) {
    var path = req.url;
    if (path === '/' || path === '/index') {
        var filename = _path.join(__dirname,'htmls', 'index.html')
        console.log('filename: ' + filename);
        fs.readFile(filename, function (err, data) {
            if (err) {
                throw err
            }
            res.end(data);
        })
    } else if (path === '/login') {
        var filename = _path.join(__dirname, './htmls/login.html')
        console.log('filename: ' + filename);
        fs.readFile(filename, function (err, data) {
            if (err) {
                throw err
            }
            res.end(data);
        })
    } else {
        res.setHeader('Content-Type','text/html; charset=utf-8');
        res.end('<h1 style="color: red; text-align: center; vertical-align: middle;">404,页面不存在!</h1>');
    }
    // res.end();
}).listen(9090, function () {
    console.log('服务已经启动，清访问http://localhost:9090');
})
