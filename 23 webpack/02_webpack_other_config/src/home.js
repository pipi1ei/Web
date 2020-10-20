console.log('home')

let xhr = new XMLHttpRequest()

// http://localhost:8080 是 webpack-dev-server 的服务  --> 转发到 3000 端口
xhr.open('GET', '/user', true)

xhr.onload = function(){
  console.log(xhr.response)
}

xhr.send()


console.log(DEV)
console.log(FLAG, typeof FLAG)