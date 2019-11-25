# vue 知识学习

### 创建 Vue

<div id='app'>{{ msg }}</div>

let app = new Vue({
el: '#app', // 该属性决定了这个 Vue 对象挂载到哪一个元素上
data: {
msg: 'hello world!'  
 }
})

### vue 声明周期

### v-bind 介绍

1. 插值操作注意是将值插入到模板的内容中，有些属性也需要动态改变，就要用到 v-bind 指令，比如动态绑定 a 元素的 href 属性， img 元素的 src 属性等。

- 作用：动态绑定属性
- 缩写：`:`
- 预期：any(with argument)|Object(without argument)
- 参数：attrOrProp(optional)

2. 动态绑定 class 属性

- 对象语法：直接通过 v-bind:class="{}" 绑定一个类: `<h2 :class="{类名1：boolean, 类名2：boolean}">{{ msg }}</h2>`

  <h2 class="title" v-bind:class="{active: isActive}">{{ msg }}</h2>

- 和普通的类同时存在，并不冲突：

  <h2 class="title" v-bind:class="{active: isActive}">{{ msg }}</h2>

- 如果过于复杂，可以放在一个 methods 或 computed 中
  <h2 class="title" :class="classes">{{ msg }}</h2>  *注：*classes 是一个计算属性

3. 动态绑定 style

- 对象语法：<h1 :style="{key(属性名): value(属性值)}">{{ msg }}</h1>
- 数组语法：<h1 :style="[baseStyles, overridingStyles]">{{ msg }}</h1>
  baseStyles:{color:'red'}; overridingStyles:{fontSize: '100px'}

### 计算属性

1.  基本用法: 在 vue 实例中定义 computed 属性: computed:{ fullName: function(){ return this.firstName + ' ' + this.lastName } }
2.  计算属性的 getter 和 setter:
    computed: {
    // 完整写法,计算属性一般没有 set 方法, 只读属性
    fullName: {
    //getter
    get: function () {
    return this.firstName + ' ' + this.lastName
    },

        //setter
        set: function (newValue) {
          var names = newValue.split(' ');
          console.log(names)
          this.firstName = names[0];
          this.lastName = names[names.length - 1];
        }

    }
    }

3.  计算属性和 methods 对比: 计算属性效率更高
    我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

### 事件监听 v-on

1. 基本用法: v-on:click='add'; methods: { add(){ this.counter++; } }

2. v-on 参数:

- 如果该方法不需要参数,那么方法后面的 () 可以不用添加, 注意:如果方法本身中有一个参数,那么默认会将原生事件的 event 参数传递进去
- 如果需要传入某个参数,同时需要 event 时,可以通过 \$event 传入事件

3. v-on 修饰符:

- .stop: 调用 event.stopPropagation(),停止冒泡
  <!-- 停止冒泡 -->
  <button @click.stop='doThis'></button>
- .prevent: 调用 event.preventDefault(),阻止默认行为
  <!-- 阻止默认行为 -->
  <button @click.prevent='doThis'></button>
  <!-- 阻止默认行为, 没有表达式 -->
  <button @submit.prevent></button>
  <!-- 串联修饰符 -->
  <button @click.stop.prevent='doThis'></button>
- .{keyCode | keyAlias}: 只当事件从特定键触发式才触发回调
  <!-- 键修饰符,键别名 -->
  <input @keyup.enter='onEnter'></input>
  <!-- 键修饰符,键代码 -->
  <input @keyup.13='onEnter'></input>
- .native: 监听组件根元素的原生事件
- .once: 只触发一次回调
  <button @click.once='doThis'></button>

### 数组中响应式的方法:

1. push 方法
2. pop 方法
3. shift 方法
4. unshift 方法
5. splice 方法
6. sort 方法
7. reverse 方法

### v-model 原理

v-model 用于表单元素双向绑定数据

- v-model 其实是个语法糖,它背后本质上包含两个操作

  1. v-bind 绑定一个 value 属性,
  2. v-on 指令给当前元素绑定 input 事件

- v-model 修饰符:
  1. lazy: 默认情况下. v-model 是在 input 事件中同步输入框中的数据的,使用 lazy 修饰符时可以让数据在失去焦点或回车时才会刷新
  2. number: 默认情况下,在输入框中无论输入字母还是数字都会被当成字符串类型进行处理,使用 number 属性可以让数据编程 number 类型
  3. trim: 如果输入的内容收尾有多个空格,使用 trim 可以将其去除
