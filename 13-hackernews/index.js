// 当前项目的入口文件

// 1.加载 http 模块
var http = require('http');
var fs = require('fs');
var path = require('path');
var _url = require('url');
var mime = require('mime');
var querystring = require('querystring');

// 2.创建服务
http.createServer(function (req, res) {  


    // 将 render 函数挂载到 res 对象上，可以通过 res.render() 来调用
    // 因为要渲染 index.html 中需要用到模板数据，所有给 render 函数增加了第二个参宿
    res.render = function (filename) {  
        fs.readFile(filename, function (err, data) {
            if (err) {
                throw err;
            }
            res.setHeader('content-type', mime.getType(filename));
            res.end(data);
        })
    }

    // 设计路由
    // 当用户请求 / 或 /index 时显示新闻列表页 - get 请求
    // 当用户请求 /item 时显示新闻详情 - get 请求
    // 当用户请求 /submit 时显示新闻添加页 - get 请求
    // 当用户请求 /add 时将用户提交的新闻保存到 data.json 中 - get 请求
    // 当用户请求 /add 时将用户提交的新闻保存到 data.json 中 - post 请求

    //先根据用户请求路径（路由），将对应的 HTML 页面显示出来
    var url = req.url.toLowerCase();
    var method = req.method.toLowerCase();

    // 通过 url 模块，调用 url.parse() 方法解析用户请求的 url（req.url）
    var urlObj = _url.parse(url,true);

    if(url === '/' || url === '/index' && method === 'get'){
        // 1. 读取 data.json 文件中的数据，并将读取到的数据转换为 list 数组
        fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
            // 第一次访问放在，data.json 文件本身就不存在，会报错，但这种错误我们并不认为是网站出错了，所以不需要抛出异常
            if (err && err.code !== 'ENOENT') {
                throw err;
            }

            // 如果读取到数据，怎转换为数组，没读取到数据转换为空数组
            var list_news = JSON.parse(data || '[]');

             // 2. 在服务器端使用模板引擎，将list 中的数据和 index.html 文件中的内容结合，渲染给客户端
             // 读取 index.html 并返回
            res.render(path.join(__dirname, 'views', 'index.html'));
        })
        
    } 
    else if (url === '/item' && method === 'get'){
        // 读取 item.html 并返回
        // render(path.join(__dirname, 'views', 'item.html'), res);
        res.render(path.join(__dirname, 'views', 'item.html'));
    } 
    else if (url === '/submit' && method === 'get') {
        // 读取 submit.html 并返回
        // render(path.join(__dirname, 'views', 'submit.html'), res);
        res.render(path.join(__dirname, 'views', 'submit.html'));
    } 
    else if (url.startsWith('/add') && method === 'get') {
        // 表示 get 方法提交一条新闻
        // 要获取用户 get 请求的数据，需要使用到 url 模块，url 是 node.js 内置的模块
        // 1. 获取用户 get 请求提交的新闻数据
        // 2. 把用户提交的新闻数据保存到 data.json 文件中
        // 3. 跳转到 index.html页面

        // urlObj.query.title;
        // urlObj.query.url;        
        // urlObj.query.text;        

        // 1.将数据写入到 data.json 文件中
        var list = [];

        // 读取 data.json 文件总的数据，并转换为一个数组
        fs.readFile(path.join(__dirname,'data','data.json'),'utf8', function (err, data) {  
            // 第一次访问放在，data.json 文件本身就不存在，会报错，但这种错误我们并不认为是网站出错了，所以不需要抛出异常
            if(err && err.code !== 'ENOENT'){
                throw err;
            }

            // 如果读取到数据，怎转换为数组，没读取到数据转换为空数组
            list = JSON.parse(data || '[]');

            list.push(urlObj.query);
            // 这样写入会覆盖上次的数据
            fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(list), function (err) {
                if (err) {
                    throw err;
                }
                console.log('OK');
                // 设置相应报文头，通过响应报文头告诉浏览器执行一次页面跳转操作
                // 重定向
                res.statusCode = 302;
                res.statusMessage = 'Found';
                res.setHeader('location', '/');

                res.end();
            });
        })

        
    } 
    else if (url === '/add' && method === 'post') {
        // 表示 post 方法提交一条新闻

        //1. 读取 data.json 文件中的数据
        //2. 将读取到的数据转换为 list 数组
        //3. 向 list 中push一条新闻
        //4. 把list 数组转换为字符串写入 data.json 文件中
        //5. 重定向

        fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
            // 第一次访问放在，data.json 文件本身就不存在，会报错，但这种错误我们并不认为是网站出错了，所以不需要抛出异常
            if (err && err.code !== 'ENOENT') {
                throw err;
            }

            // 如果读取到数据，怎转换为数组，没读取到数据转换为空数组
            list = JSON.parse(data || '[]');

           // 监听 request 对象的 data 事件和 end 事件
            var array = []; //保存用户每次提交过来的数据
            req.on('data',function(chunk){
                // 此处的 chunk 参数就是浏览器本次提交过来的一部分数据
                // chunk 的数据类型是 Buffer
                array.push(chunk);
            });
            // 表示所有的数据都已经提交完毕
            req.on('end',function(){
                // 把 array 中的每个 buffer 对象集合起来转换为一个 buffer 对象
                var postBody = Buffer.concat(array);
                // 把获取到的 buffer 对象转换成字符串
                postBody = postBody.toString('utf-8');
                // 把 post 请求的查询字符串转换为一个 json 对象， 使用node.js 内置模块 queryString 
                postBody = querystring.parse(postBody);

                // 将用户提交的新闻 push 到list中
                list.push(postBody);

                fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(list), function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log('OK');
                    // 设置相应报文头，通过响应报文头告诉浏览器执行一次页面跳转操作
                    // 重定向
                    res.statusCode = 302;
                    res.statusMessage = 'Found';
                    res.setHeader('location', '/');

                    res.end();
                });
            })
        })
    } 
    else if(url.startsWith('/resources') && method === 'get'){
        render(path.join(path.join(__dirname, url)), res);
    } 
    else{
        res.writeHead(404, 'Not Found',{
            'content-type':'text/html; charset=utf-8'
        });
        res.end('404, Page Not Found');
    }

}).listen(8080,function () {  
    console.log('http://localhost:8080');
})


// 封装 render 函数
function render (filename, res) {  
    fs.readFile(filename, function (err, data) {
        if (err) {
            throw err;
        }
        res.setHeader('content-type', mime.getType(filename));
        res.end(data);
    })
}

