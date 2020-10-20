console.log('index.js')

let button = document.createElement('button')
button.innerHTML = '懒加载'
button.addEventListener('click', function(){
  // es6 草案中的语法，使用 jsonp 实现懒加载，返回 Promise
  import('./source.js').then(data => {
    console.log(data)
  })
})

document.body.appendChild(button)

import str from './source'
console.log(str)

if(module.hot){}