// 执行文件操作

// 1. 加载文件模块
var fs = require('fs');
var msg = 'hello world';
// fs.writeFile('./hello.txt', msg, 'utf8', function (err) {
//     if (err) {
//         console.log('写入文件出错：' + err);
//     } else {
//         console.log('OK');
//     }
// })

fs.readFile('./hello.txt', 'utf8', function (err, data) {
    if (err === null) {
        console.log(data)
    } else {
        console.log('读取文件出错：' + err)
    }
});