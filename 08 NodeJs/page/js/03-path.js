// 使用path 模块进行文件路径拼接
var path = require('path');
var fs = require('fs');

var filename = path.join(__dirname, 'hello.txt');
console.log("filename: ", filename);

fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
        throw err
    }
    console.log(data);
})