// 模块2（扩展模块），负责扩展 req 和 res 对象，为 req 和 res 增加一些更为方便好用的 API

// 1. 给 req 增加一个 query 属性，该属性中保存的就是用户 get 请求提交过来的数据
// 2. 给 req 增肌一个 pathname 属性
// 3. 给 res 增加一个 render 函数

var url = require('url');
var fs = require('fs');
var mime = require('mime');
var _ = require('underscore');

// 让当前模块对外暴露一个函数，通过这个函数将 index.js 中的 req 和 res 传递到当前 context.js 模块中
module.exports = function (req, res) {
    var urlObj = url.parse(req.url.toLowerCase(), true);

    req.query = urlObj.query;
    req.method = req.method.toLowerCase();
    req.pathname = urlObj.pathname;

    res.render = function (filename, tplData) {
        fs.readFile(filename, function (err, data) {
            if (err) {
                res.writeHead(404,'Not Found',{'content-type': 'text/html; charset=utf-8'})
                res.end('Page Not Found');
                throw err;
            }
            if (tplData) {
                var fn = _.template(data.toString('utf-8'));
                data = fn(tplData);
            }
            res.setHeader('content-type', mime.getType(filename));
            res.end(data);
        })
    }
}

//步骤
// 1.该模块中要封装什么代码
// 2. 这些代码有用到外部的数据吗？如果用到了，是否需要通过参数将这些数据传递到当前模块中
// 3. 当前模块需要对外暴露的东西（module.exports的值）