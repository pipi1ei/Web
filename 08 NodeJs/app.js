var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

// http.createServer(function (req, res) {
//     var url = req.url;
//     console.log(url);
//     var filename = path.join(__dirname, '/public', url);
//     console.log(filename);
//     if(filename.indexOf('ico') > -1) {
//         console.log('ico: ', filename)
//         res.end();
//     }else{
//         fs.readFile(filename, function (err, data) {
//             if (err) {
//                 throw err;
//             } else {
//                 res.setHeader('content-type', mime.getType(filename));
//                 res.end(data);
//             }
//         })
//     }

// }).listen(9090, function () {
//     console.log('http://localhost:9090')
// })

var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function () {
        console.log('hello ' + this.name);
    }
};
Base.prototype.showName = function () {
    console.log(this.name);
}

function Sub() {
    this.name = 'sub';
}

util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
console.log(util.inspect(objBase));

var objSub = new Sub();
objSub.showName();
// objSub.sayHello();
console.log(objSub);
console.log(util.inspect(objSub));