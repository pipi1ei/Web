const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname,'../','hello.txt')
let writeData = {
  pathname: '/add',
  title: 'haha',
  msg: 'hello world'
}

// fs.readFile(filePath,'utf8',(err, data) => {
//   if(err && err.code !== 'ENOENT'){
//     throw err
//   }
//   let list = JSON.parse(data || '[]')
//   console.log(list)

//   list.push(writeData)

//   fs.writeFile(filePath, JSON.stringify(list), err => {
//     if(err) {
//       throw err
//     }
//     console.log('写入文件成功')
//   })
// })

new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if(err && err.code !== 'ENOENT'){
      reject(err)
    }
    let list = JSON.parse(data || '[]')
    console.log('list: ', list)
    list.push(writeData)
    resolve(list)
  })
}).then(res => {
  console.log("res: ", res)
  fs.writeFile(filePath,JSON.stringify(res), err => {
    if(err){
      console.log('写入文件出错')
      throw err
    }
    console.log('写入文件成功')
  })
}).catch(err => {
  console.log(err)
})