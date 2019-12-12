// 加载 express 模块
const express = require('express');

// 创建 app 对象（类似于创建一个 server 对象）
const app = express();

// 通过中间件监听指定的路由请求
// 下面代码处理 get请求且路径为 '/'， function () {} 就是中间件
app.get('/index',(req, res) => res.send('Hello World!'));

// // 在进行路由匹配是不限定方法，用什么请求都可以
// // 请求路径中第一部分为 '/index' ，并不要求请求路径完全匹配
app.use('/index',function (req, res) {  
    
    req.params

    res.send('hello index');
})

// 在进行路由匹配是不限定方法，用什么请求都可以
// 请求路径必须完全匹配
app.all('/',(req, res) => {
    res.redirect(301,'http://www.baidu.com')
})

// 请求路径还可以是正则表达式
app.get(/^\/index(\/.+)*$/, (req, res) => res.send('hello /index/'));


app.get('/news/:year/:month/:day',function (req, res) {  
    res.send(req.params);
})

// 启动服务
app.listen(3000, () => console.log('Example app listening on port 3000!'))