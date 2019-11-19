// 模块3（路由模块），负责路由判断

var handler = require('./handler.js')

module.exports = function (req, res) {
    if (req.pathname === '/' || req.pathname === '/index' && req.method === 'get') {
        handler.handlerIndex(req, res);
    } else if (req.pathname === 'item' && req.method === 'get') {
        handler.handlerItem(req, res);
    } else if (req.pathname === 'submit' && req.method === 'get') {
        handler.handlerSubmit(req, res);
    } else if (req.pathname === 'add' && req.method === 'get') {
        handler.handlerAddByGet(req, res);
    } else if (req.pathname === 'add' && req.method === 'post') {
        handler.handlerAddByPost(req, res);
    } else if (req.url.startsWith('/resources') && req.method === 'get') {
        handler.handlerResources(req, res);
    } else {
        handler.handler404(req, res);
    }
}

/* express 封装 */

// 1.创建一个 router 对象（router 既是一个对象，又是一个函数）
// 2.通过 router 对象设置（挂载）路由
// 3.返回 router

var express = require('express');

var router = express.Router();


router.get('/', (req, res) => {

});
router.get('/item', (req, res) => {

});
router.get('/submit', (req, res) => {

});
router.get('/add', (req, res) => {

});
router.post('/add', (req, res) => {

});

module.exports = router;