# vue 知识学习

### 创建Vue
<div id='app'>{{ msg }}</div>

let app = new Vue({
    el: '#app', // 该属性决定了这个Vue对象挂载到哪一个元素上
    data: {
        msg: 'hello world!'   
    }
})


### vue 声明周期



### v-bind 介绍
1. 插值操作注意是将值插入到模板的内容中，有些属性也需要动态改变，就要用到 v-bind 指令，比如动态绑定 a 元素的 href 属性， img 元素的 src 属性等。
+ 作用：动态绑定属性
+ 缩写：`:`
+ 预期：any(with argument)|Object(without argument)
+ 参数：attrOrProp(optional)

2. 动态绑定 class 属性
- 对象语法：直接通过 v-bind:class="{}" 绑定一个类: `<h2 :class="{类名1：boolean, 类名2：boolean}">{{ msg }}</h2>`
  <h2 class="title" v-bind:class="{active: isActive}">{{ msg }}</h2>

- 和普通的类同时存在，并不冲突：
<h2 class="title" v-bind:class="{active: isActive}">{{ msg }}</h2>

- 如果过于复杂，可以放在一个 methods 或 computed 中
<h2 class="title" :class="classes">{{ msg }}</h2>  *注：*classes 是一个计算属性
