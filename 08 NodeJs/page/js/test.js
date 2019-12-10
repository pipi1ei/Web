const path = require('path')
const fs = require('fs')
const http = require('http')
const mime = require('mime')

/* fs 模块基本使用 */
const fileName = path.join(__dirname,'../','hello.txt')
fs.readFile(fileName, 'utf8', (err, data) => {
  if(err){
    throw err
  }
  console.log(data)
})


/* http 模块基本使用 */
http.createServer((req, res) => {

  res.setHeader('content-type', 'text/plain;charset=utf-8')
  const reqPath = req.url;
  if(reqPath === '/' || reqPath === '/index'){
    res.write('hello,index')
  }else if(reqPath === '/login'){
    res.write('hello,login')
  }else{
    res.write('404')
  }
  res.end()
}).listen(8089,() => {
  console.log('http://localhost:8080')
})


/* 模拟 Apache 服务器 */
http.createServer((req, res) => {
  const reqPath = req.url
  console.log('reqPath: ' + reqPath)
  const fileName = path.join(__dirname, 'public', reqPath)

  const mimeType = mime.getType(fileName)
  console.log('mimeType: ' + mimeType)
  fs.readFile(fileName,(err, data) => {
    if(err){
      res.statusCode = 404
      res.setHeader('content-type', 'text/plain;charset=utf-8')
      res.end('文件不存在')
    }else{
      seres.setHeader('content-type', mimeType)
      res.end(data)
    }
    
  })
}).listen(9090, () => {
  console.log('http://localhost:9090')
})

/* 测试 writeHead 和 setHeader */
http.createServer((req, res) => {
  res.statusCode = 404
  res.statusMessage = 'Not Find'
  res.setHeader('content-type', 'text/plain;charset=utf-8')

  // 该方法不能再上面三个方法之前调用
  res.writeHead(200, 'OK', { 'content-type': 'text/html;charset=utf-8' })
  
  res.end('over')
}).listen(9090, () => {
  console.log('http://localhost:9090')
})