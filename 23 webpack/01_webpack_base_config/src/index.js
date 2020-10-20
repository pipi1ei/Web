console.log("hello world")

var obj = require('./moduleA')

// 引入css 文件
require('./style/a.css')

var divELe = document.createElement('div')
divELe.innerHTML = '我是div'
document.body.appendChild(divELe)
console.log(obj.name)


// 引入 less 文件
require('./style/c.less')

// es6 语法
let fn = () => {
  console.log('es6 语法')
}

fn()


// 图片配置
import imgSrc from './img/img1.png'
console.log(imgSrc)
var image = new Image()
image.src = imgSrc
document.body.appendChild(image)