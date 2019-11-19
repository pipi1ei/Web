// 该模块负责对具体的业务处理

var fs = require('fs');
var path = require('path');
var querystring = require('querystring');

var config = require('./config.js');

// 处理 index 路由
module.exports.handlerIndex = function (req, res) {
    readNewsData(function (list) {
        res.render(path.join(__dirname, 'views', 'index.html'), { list: list })
    })
}

// 处理 submit 路由
module.exports.handlerSubmit = function (req, res) {  
    res.render(path.join(__dirname, 'views', 'submit.html'));
}

// 处理 item 路由
module.exports.handlerItem = function (req, res) {  
    var id = req.query.id;
    readNewsData(function (list) {
        var item = null;
        for (var i = 0; i < list.length; i++) {
            if (id === list[i].id.toString()) {
                item = list[i];
                break;
            }
        }
        if (item) {
            res.render(path.join(__dirname, 'views', 'item.html'), { item: item })
        } else {
            res.end('No Such Page');
        }
    })
}

// 处理 get 方式 add 路由
module.exports.handlerAddByGet = function (req, res) {  
    readNewsData(function (list) {
        req.query.id = list.length;
        list.push(req.query);
        writeNewsData(JSON.stringify(list), function () {
            res.statusCode = 302;
            res.statusMessage = 'Found';
            res.setHeader('location', '/');
            res.end();
        })
    })
}

// 处理 post 方式 add 路由
module.exports.handlerAddByPost = function (req, res) {
    readNewsData(function (list) {
        postData(req, function (postBody) {
            postBody.id = list.length;
            list.push(postBody);
            writeNewsData(JSON.stringify(list), function () {
                res.statusCode = 302;
                res.statusMessage = 'Found';
                res.setHeader('location', '/');
                res.end();
            })
        })
    })
}

// 处理 resources 路由
module.exports.handlerResources = function (req, res) {  
    res.render(path.join(path.join(__dirname, url)));
}

// 处理 404 错误请求
module.exports.handler404 = function (req, res) {  
    res.writeHead(404, 'Not Found', {
        'content-type': 'text/html; charset=utf-8'
    });
    res.end('404, Page Not Found');
}



function readNewsData(callback) {
    fs.readFile(config.dataPath, 'utf8', function (err, data) {
        if (err && err != 'ENOENT') {
            throw err;
        }
        var list = JSON.parse(data || '[]');
        callback(data);
    })
}

function writeNewsData(data, callback) {
    fs.writeFile(config.dataPath, data, function (err) {
        if (err) {
            throw err;
        }
        callback();
    })
}

function postData(req, callback) {
    var array = [];
    req.on('data', function (chunk) {
        array.push(chunk);
    });
    req.on('end', function () {
        var postBody = Buffer.concat(array).toString('utf-8');
        postBody = querystring.parse(postBody);
        callback(postBody);
    })
}