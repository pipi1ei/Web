# vue 知识学习

### 创建Vue
<div id='app'>{{ msg }}</div>

let app = new Vue({
    el: '#app', // 该属性决定了这个Vue对象挂载到哪一个元素上
    data: {
        msg: 'hello world!'   
    }
})