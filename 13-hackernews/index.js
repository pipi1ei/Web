// 当前项目的入口文件

// 1.加载 http 模块
var http = require('http');
var fs = require('fs');
var path = require('path');
var _url = require('url');
var mime = require('mime');
var querystring = require('querystring');
var _ = require('underscore');

// 2.创建服务
http.createServer(function (req, res) {


    // 将 render 函数挂载到 res 对象上，可以通过 res.render() 来调用
    // 因为要渲染 index.html 中需要用到模板数据，所以给 render 函数增加了第二个参数，第二个参数的作用就是用来传递 html 页面中要使用到的模板数据
    res.render = function (filename, tplData) {
        fs.readFile(filename, function (err, data) {
            if (err) {
                throw err;
            }
            // 如果用户传递的模板数据，就使用 underscore 的 template 方法进行替换
            // 如果用户没有传模板数据，就不进行替换
            if (tplData) {
                var fn = _.template(data.toString('utf-8'));
                data = fn(tplData);
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
    var urlObj = _url.parse(url, true);

    if (url === '/' || url === '/index' && method === 'get') {
        // 1. 读取 data.json 文件中的数据，并将读取到的数据转换为 list 数组
        readNewsData(function (list) {
            res.render(path.join(__dirname, 'views', 'index.html'), { list: list });
        })
    }
    else if (urlObj.pathname === '/item' && method === 'get') {

        //1. 获取当前用户请求的新闻id
        var id = urlObj.query.id;
        //2. 读取data.json 文件中的数据，根据 id 找到对应新闻
        readNewsData(function (list_news) {
            var model = null;
            for (var i = 0; i < list_news.length; i++) {
                if (id.toString === list_news[i].id) {
                    model = list_news[i];
                    break;
                }
            }

            //3.读取 item.html 并返回
            if (model) {
                res.render(path.join(__dirname, 'views', 'item.html'), { item: model });
            } else {
                res.end('No Such Item')
            }
        })
    }
    else if (url === '/submit' && method === 'get') {
        // 读取 submit.html 并返回
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
        // 读取 data.json 文件总的数据，并转换为一个数组
        readNewsData(function (list) {
            urlObj.query.id = list.length;
            list.push(urlObj.query);
            // 这样写入会覆盖上次的数据
            writeNewData(JSON.stringify(list), function () {
                // 设置相应报文头，通过响应报文头告诉浏览器执行一次页面跳转操作
                // 重定向
                res.statusCode = 302;
                res.statusMessage = 'Found';
                res.setHeader('location', '/');

                res.end();
            })
        })
    }
    else if (url === '/add' && method === 'post') {
        // 表示 post 方法提交一条新闻

        //1. 读取 data.json 文件中的数据
        //2. 将读取到的数据转换为 list 数组
        //3. 向 list 中push一条新闻
        //4. 把list 数组转换为字符串写入 data.json 文件中
        //5. 重定向

        readNewsData(function (list) {
            postData(req, function (postBody) {
                postBody.id = list.length;
                // 将用户提交的新闻 push 到list中
                list.push(postBody);
                writeNewData(JSON.stringify(list), function () {
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
    else if (url.startsWith('/resources') && method === 'get') {
        render(path.join(path.join(__dirname, url)), res);
    }
    else {
        res.writeHead(404, 'Not Found', {
            'content-type': 'text/html; charset=utf-8'
        });
        res.end('404, Page Not Found');
    }

}).listen(8080, function () {
    console.log('http://localhost:8080');
})


// 封装 render 函数
function render(filename, res) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            throw err;
        }
        res.setHeader('content-type', mime.getType(filename));
        res.end(data);
    })
}

// 封装读取 data.json 文件函数
function readNewsData(callback) {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
        if (err && err != 'ENOENT') {
            throw err;
        }
        var list = JSON.parse(data || '[]');
        callback(list);
    })
}

// 封装写入 data.json 文件函数
function writeNewData(data, callback) {
    fs.writeFile(path.join(__dirname, 'data', 'data.json'), data, function (err) {
        if (err) {
            throw err;
        }
        callback();
    })
}

// 封装 post 提交数据方法
function postData(req, callback) {
    var array = []; //保存用户每次提交过来的数据
    // 监听 request 对象的 data 事件和 end 事件
    req.on('data', function (chunk) {
        // 此处的 chunk 参数就是浏览器本次提交过来的一部分数据
        // chunk 的数据类型是 Buffer
        array.push(chunk);
    });
    // 表示所有的数据都已经提交完毕
    req.on('end', function () {
        // 把 array 中的每个 buffer 对象集合起来转换为一个 buffer 对象
        var postBody = Buffer.concat(array);
        // 把获取到的 buffer 对象转换成字符串
        postBody = postBody.toString('utf-8');
        // 把 post 请求的查询字符串转换为一个 json 对象， 使用node.js 内置模块 queryString 
        postBody = querystring.parse(postBody);
        // 把用户 post 提交过来的数据传递出去
        callback(postBody);
    })
}