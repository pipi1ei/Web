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

// 此处的 ./ 相对路径，相对的是执行 node 命令的路径，而不是相对于正在执行的 js 文件来查找hello.text
fs.readFile('../hello.txt', 'utf8', function (err, data) {
    if (err === null) {
        console.log(typeof data)
        console.log(data)
    } else {
        console.log('读取文件出错：' + err)
    }
});

// 解决方式，使用绝对路径
// __dirname: 表示当前正在执行的 js 文件所在的目录
// __filename: 表示当前正在执行的js 文件的完整目录

console.log(__dirname);
console.log(__filename);

var filename = __dirname + '/../' + 'hello.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err === null) {
        console.log(typeof data)
        console.log(data)
    } else {
        console.log('读取文件出错：' + err)
    }
});