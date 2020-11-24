# vue 知识学习

### 创建 Vue

<div id='app'>{{ msg }}</div>

```javascript
let app = new Vue({
  el: '#app', // 该属性决定了这个 Vue 对象挂载到哪一个元素上
  data: {
    msg: 'hello world!'  
  }
})
```

### vue 生命周期

### 插值操作

1. v-once: 使用了 v-once 属性的标签，其内容不会再响应式变化
   <h1 v-once>{{ msg }}
2. v-html: 使用 v-html 属性可以解析字符串中的 HTML 标签
   <p v-html="msg2"></p>
3. v-text: 使用 v-text 属性可以展示字符串，效果和 {{}} 相同，一般不用该方式
   <h1 v-text='msg'></h1>
4. v-pre: 使用了 v-pre 属性的标签会原封不动的展示其中的内容，不会解析 {{}} 语法
   <h1 v-pre>{{ msg }}</h1> //h1 中展示的内容就是 {{ msg }}，并不会解析 {{}} 语法
5. v-cloak: 使用了 v-cloak 属性的元素，当 vue 实例创建好之后会删除该属性，可以防止闪动效果
   <style>
     [v-cloak]{
       display: none;
     }
   </style>
   <div id="app" v-cloak>
     <h1>{{ msg }}</h1>
   </div>

### v-bind 介绍

1. 插值操作主要是将值插入到模板的内容中，有些属性也需要动态改变，就要用到 v-bind 指令，比如动态绑定 a 元素的 href 属性， img 元素的 src 属性等。

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

### 条件渲染
- v-if：用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。
  `<h1 v-if="awesome">Vue is awesome</h1>`
  + 在 `<template>` 元素上使用 v-if 条件渲染分组
    - 因为 v-if 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 <template> 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 <template> 元素。
    `<template v-if="ok">
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </template>`
  + 用 key 管理可复用的元素
    - vue 会尽可能高效的渲染元素，通常会复用已有的元素，而不是从头开始渲染。如果用户不想要复用元素，可以给相同的元素添加 key 来区分
    ```html
      <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username" key="username-input">
      </template>
      <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address" key="email-input">
      </template>
    ```

- v-if 与 v-show 的区别：v-if 在条件为假的时候不会渲染元素。而 v-show 无论条件真假都会渲染元素，只是通过 display 这个 css 属性来控制元素的显示和隐藏。另外，v-show 不支持在 `<template>` 元素上面使用
- v-if 与 v-for 一起使用: 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。

### 列表渲染
- v-for
  + 语法：`<li v-for="(item, index) in items" :key="item.message"></li>`
  + 可以用 of 替代 in 作为分隔符
    - `<div v-for="item of items"></div>`
  + 在 v-for 中使用对象：
    ``` HTML
      <ul id="v-for-object" class="demo">
        <li v-for="(value, name) in object">
          {{ name }} - {{ value }}
        </li>
      </ul>
    ```
    ```JS
      new Vue({
        el: '#v-for-object',
        data: {
          object: {
            title: 'How to do lists in Vue',
            author: 'Jane Doe',
            publishedAt: '2016-04-10'
          }
        }
      })

      // 结果
      'title - How to do lists in Vue'
      'author - Jane Doe'
      'publishedAt - 2016-04-10'
    ```

  + key 的使用
    - 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute：
    - 注意：**不要使用对象或数组之类的非基本类型值作为 v-for 的 key。请用字符串或数值类型的值。**



### 计算属性

1.  基本用法: 在 vue 实例中定义 computed 属性: computed:{ fullName: function(){ return this.firstName + ' ' + this.lastName } }
2.  计算属性的 getter 和 setter:
```javascript
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
  ```

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
- .{keyCode | keyAlias}: 只当事件从特定键触发时才触发回调
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
其他数组方法不是响应式的，如果想要使用响应式，可以使用 Vue.set() 方法

### v-model 原理
- v-model 用于表单元素双向绑定数据
  + 注意：v-model 会忽略所有表单元素的 value、checked、selected attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。

- v-model 其实是个语法糖,它背后本质上包含两个操作

  1. v-bind 绑定一个 value 属性,
  2. v-on 指令给当前元素绑定 input 事件

- v-model 修饰符:
  1. lazy: 默认情况下. v-model 是在 input 事件中同步输入框中的数据的,使用 lazy 修饰符时可以让数据在失去焦点或回车时才会刷新
  2. number: 默认情况下,在输入框中无论输入字母还是数字都会被当成字符串类型进行处理,使用 number 属性可以让数据变成 number 类型
  3. trim: 如果输入的内容收尾有多个空格,使用 trim 可以将其去除

## Vue 组件化

### vue 组件化思想:

- 组件化是 Vue.js 中的重要思想
  - 它提供了一种抽象,让我们可以开发出一个个独立可复用的小组件来构造我们的应用.
  - 任何的应用都会被抽象成一颗组件树
- 组件化思想的应用:
  - 有了组件化的思想,我们在之后的开发中就要充分的利用它
  - 尽可能的将页面拆分成一个个小的,可复用的组件
  - 这样让我们的代码方便阻止和管理,并且扩展性也更强

### 注册组件的基本步骤:

1. 创建组件构造器: Vue.extend(),必须在 new Vue 实例之前创建
2. 注册组件: Vue.component()
3. 使用组件: 在 Vue 实例的作用范围内使用组件

### 父组件和子组件:

- 组件之间存在层级关系,其中一种非常重要的关系就是父子组件的关系.
- 父子组件的错误用法: 以子标签的形式在 Vue 的实例中使用
  1. 因为当子组件注册到父组件的 components 时,Vue 会编译好父组件的模块,该模块的内容已经决定了父组件将要渲染的 Html(相当于父组件中已经有了子组件的内容了)
  2. 子组件的标签名只能在父组件中被识别出来
  3. 如果未在 Vue 实例中注册子组件, 浏览器会忽略子组件的标签名

### 注册组件的语法糖

1. 之前注册组件的方式有些繁琐，Vue 使用语法糖的形式省去了 Vue.extend() 的步骤，直接在注册组件的时候使用一个对象来代替
2. 语法糖注册全局组件：
   Vue.component('cpn1',{
    template: `<div> <h1>我是标题1</h1> <p>我是哈哈哈</p> </div>`
   })
3. 语法糖注册局部组件：
   components: {
    cpn2: {
      template: `<div> <h1>我是标题2</h1> <p>我是呵呵呵</p> </div>`
    }
   }

### 组件模板抽离的写法

1. 使用 script 标签，类型必须是 text/x-template， 并给一个 id，用于在注册的时候绑定该模板
   <script type="text/x-template" id="cpn1">
     <div>
       <h1>我是标题1</h1>
       <p>我是哈哈哈</p>
     </div>
   </script>

```javascript
  Vue.component('cpn1', {
    template: '#cpn1'
  })
```

2. 使用 template 标签，提供一个 id，用于注册的时候绑定模板
   <template id="cpn2">
     <div>
       <h1>我是标题2</h1>
       <p>我是呵呵呵</p>
     </div>
   </template>

```javascript
  components: {
    cpn2: {
      template: '#cpn2'
    }
  }
```

### 组件数据的存放

1. 组件对象有一个 data 属性，但这个 data 属性必须是一个函数，返回一个对象，对象内部保存着属性
2. 组件中的 data 属性为什么是函数？
  当复用该组件时，会创建多个该组件的实例，每次都会调用 data 函数去返回一个对象，如果 data 属性是一个对象，那么每次都会返回这一个对象，多个 组件 实例去改变 data 中的值会相互影响，从而造成连锁反应，而 data 是函数的话每次都会返回不同的对象，各个组件之间互不影响

### 父子组件的通信

1.  父组件向子组件传递数据：通过 props 向子组件传递数据

- props 的值有两种方式：
  - 方式一：字符串数组，数组中的字符串就是传递时的名称
  - 方式二：对象，对象可以设置传递时的类型。也可以设置默认值等。使用对象写法可以对 props 进行类型验证，支持以下数据类型：
    - String
    - Number
    - Boolean
    - Array
    - Object
    - Date
    - Function
    - Symbol
  - prop 验证：
    ```JS
      // 自定义验证函数
      propA: {
        validator: function(value) {
          // 这个值必须匹配下列字符串中的一个
          return ['success', 'warning', 'danger'].indexOf(value) !== -1
        }
      }
    ```
    + 注意：**那些 prop 会在一个组件实例创建之前进行验证，所以实例的 property (如 data、computed 等) 在 default 或 validator 函数中是不可用的。**

2.  子组件向父组件传递数据：通过自定义事件向父组件发送消息

- 什么时候需要自定义事件呢？
  - 当子组件需要向父组件传递数据时，就要用到自定义事件
  - v-on 不仅可以监听 DOM 事件，还可以用于监听组件之间的自定义事件
- 自定义事件流程：
  - 在子组件中，通过 $emit() 来触发事件
  - 在父组件中，通过 v-on 来监听子组件事件

- 将原生事件绑定到组件
  + 你可能有很多次想要在一个组件的*根元素*上直接监听一个原生事件。这时，你可以使用 v-on 的 .native 修饰符：`<base-input v-on:focus.native="onFocus"></base-input>`
  + 有时候上述方式是有用的，但 base-input 组件的根元素是 label 元素，这时候父级的 .native 监听器将会失效，它不会报错，但 onFocus 处理函数也不会调用
  ```JS
    Vue.component('base-input', {
      inheritAttrs: false,
      props: ['label', 'value']
      template: `
        <label>
          {{ label }}
          <input
            v-bind="$attrs",
            :value="value"
            @input="$emit('input', $event.target.value)"
          >
        </label>
      `
    })
  ```
  + 为了解决这个问题，Vue 提供了一个 $listeners 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。例如： 
  ```JS
    {
      focus: function(event) { /* ... */ },
      input: function(event) { /* ... */ }
    }
  ```
  + 有了这个 $listeners property，你就可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。对于类似 <input> 的你希望它也可以配合 v-model 工作的组件来说，为这些监听器创建一个类似下述 inputListeners 的计算属性通常是非常有用的：
  ```JS
    Vue.component('base-input', {
      inheritAttrs: false,
      props: ['label', 'value'],
      computed: {
        inputListeners() {
          let vm = this;
          return Object.assign({},
            // 我们从父级添加所有的监听器
            vm.$listeners,
            // 然后我们添加自定义监听器，
            {
              // 这里确保组件配合 `v-model` 的工作
              input: function(event) {
                vm.$emit('input', event.target.value)
              }
            }
          )
        }
      }
      template: `
        <label>
          {{ label }}
          <input
            v-bind="$attrs",
            :value="value"
            v-on="inputListeners"
          >
        </label>
      `
    })
  ```

- .sync 修饰符
  + 我们通过 prop 传递数据给子组件时，如果子组件直接修改这个值，控制台会报错。这时候可以使用 update:propName 的模式触发事件。举个例子：，在一个包含 title 属性的组件中，我们可以用以下方法表达对其赋新值的意图：
    ```JS
      this.$emit('update:title', newTitle)
    ```
  + 然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：
    ```HTML
      <text-document
        :title="doc.title"
        @update:title="doc.title = $event"
      ></text-document>
    ```
  + 为了方便起见，我们为这种模式提供一个缩写，即 .sync 修饰符：
    ```HTML
      <text-document v-bind:title.sync="doc.title"></text-document>
    ```
  + 注意：.sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)
  + 当我们用一个对象同时设置多个 prop 的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用：
    ```HTML
      <text-document v-bind.sync="doc"></text-document>
    ```


  + 2.3.0 新增：


3. 传入一个对象的所有 property
  - 如果想要将一个对象的所有 property 都作为 prop 传入到子组件，可以使用不带参数的 v-bind
  ```JS
    post: {
      id: 1,
      title: 'title'
    }
  ```
  ```HTML
    <my-component v-bind="post"></my-component>
    // 等价于
    <my-component v-bind:id="post.id" v-bind:title="post.title"></my-component>
  ```

4. 单向数据流：
  - prop 属性传递的数据都是从父组件流向子组件，父组件 prop 的更新会向下流动到子组件，反过来则不行。每次父组件发生变更时，子组件中所有的 prop 都将刷新为最新的值。这意味着不能在子组件中修改 prop 的值，否则会在控制台发出警告
  - 注意：在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。

5. 非 Prop 的 Attribute
  - 一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。
  - 因为显式定义的 prop 适用于向一个子组件传入信息，然而组件库的作者并不总能预见组件会被用于怎样的场景。这也是为什么组件可以接受任意的 attribute，而这些 attribute 会被添加到这个组件的根元素上。

6. 禁用 Attribute 继承
  - 如果你不希望组件的根元素继承 attribute，你可以在组件的选项中设置 inheritAttrs: false。例如：
  ```JS
    Vue.component('my-component', {
      inheritAttrs: false
      // ...
    })
  ```
  - 如果 inheritAttrs 为 true，那么子组件的根元素就会继承父组件传过来的属性，**但排除 子组件 props 中声明的属性**
  - 这尤其适合配合实例的 $attrs 属性使用，该属性包含了传递给一个组件的 attribute 名和 attribute 值，例如：
  ```JS
    {
      required: true,
      placeholder: 'Enter your username'
    }
  ```
  - 有了 inheritAttrs: false 和 $attrs，你就可以手动决定这些 attribute 会被赋予哪个元素。在撰写基础组件的时候是常会用到的：
  ```JS
    Vue.component('base-input', {
      inheritAttrs: false,
      props: ['label', 'value'],
      template: `
        <label>
          {{ label }}
          <input 
            v-bind="$attrs"
            :value="value"
            @input="$emit('input', $event.target.value)"
          />
        </label>
      `
    })
  ```
  - 这个模式允许你在使用基础组件的时候更像是使用原始的 HTML 元素，而不会担心哪个元素是真正的根元素：
    ```HTML
      <base-input
        v-model="username"
        required
        placeHolder="Enter your username"
      ></base-input>
    ```


### 组件中 props 属性驼峰名的问题：

在组件中 props 属性中使用 驼峰名来命名属性，在使用组件时绑定的属性名使用驼峰形式会报错，应使用 - 符号转换，因为 html 元素属性不区分大小写

### 父子组件的访问方式

有时候我们需要父组件直接访问子组件，子组件直接访问父组件，或者是子组件访问根组件

- 父组件访问子组件：使用 $children 或 $refs
  - $children 方式：this.$children 是一个数组类型 ，它包含所有子组件对象
  - $refs 方式：使用 this.$refs 返回一个对象，默认返回空对象，必须在组件上添加 ref 属性
- 子组件访问父组件: 使用 $parent 访问该子组件的父组件， 使用 $root 访问根组件

## 组件化高级
### 自定义组件的 v-model 属性
- vue2.2.0+ 新增：一个组件上的 v-model 属性默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 属性用于不同目的。*model 选项可以用来避免这样的冲突*
```JS
  Vue.component('base-checkbox', {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean
    },
    template: `
      <input
        type="checkbox"
        :checked="checked"
        @change="$emit('change', $event.target.checked)"
      >
    `
  })
```
- 在上面的自定义组件使用 v-model 绑定的就是 checked 属性和 change 事件了
```HTML
  <base-checkbox v-model="lovingVue"></base-checkbox>
```
  + 这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当 `<base-checkbox>` 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的值将会被更新。
- 注意：*仍然需要在组件的 props 选项里声明 checked 这个 prop。*

### 动态组件
- 有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里。这时可以通过 Vue 的 `<component>` 元素加一个特殊的 is 属性来实现。
  + 组件会在 `currentTabComponent` 改变时改变，currentTabComponent 可以是一个已注册的组件的名称或是一个组件的选项对象
  `<component v-bind:is="currentTabComponent"></component>`
  + is 属性可以用于常规 html 元素，但这些元素将被视为组件，这意味着所有的 attribute 都会作为 DOM attribute 被绑定。

- 解析 DOM 模板时的注意事项
  + 有些 HTML 元素，诸如 <ul>、<ol>、<table> 和 <select>，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 <li>、<tr> 和 <option>，只能出现在其它某些特定的元素内部。如果想在这些特定的元素中使用组件的话就可以使用 is 属性
  ```HTML
    <table>
      <tr is="blog-post-row"></tr>
    </table>
  ```
  + 如果我们从以下来源使用模板的话，这条限制是不存在的：
    - 字符串: (例如：template: '...')
    - 单文件组件（.vue）
    - <script type="text/x-template">

### 异步组件
- 在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue 允许以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。例如：
  ```JS
    Vue.component('async-example', function(resolve, reject) {
      setTimeout(function() {
        // 向 `resolve` 回调传递组件定义
        resolve({
          template: '<div>我是异步组件</div>'
        })
      }, 1000)
    })
  ```
- 这个工厂函数会收到一个 resolve 回调，这个回调函数会在你从服务器得到组件定义的时候被调用。你也可以调用 reject(reason) 来表示加载失败。这里的 setTimeout 是为了演示用的
- 也可以将异步组件和 webpack 的 code-splitting 功能一起使用
  ```JS
    Vue.component('async-webpack-example', function(resolve) {
      // 这个特殊的 `require` 语法将会告诉 webpack自动将你的构建代码切割成多个包，这些包会通过 Ajax 请求加载
      require(['./my-async-component'], resolve);
    })
  ```
- 也可以在工厂函数中返回一个 Promise，所以把 webpack 2 和 ES2015 语法加在一起，我们可以这样使用动态导入：
  ```JS
    Vue.component('async-webpack-example', () => import('./my-async-component'))
  ```
- 当使用局部注册的时候，你也可以直接提供一个返回 Promise 的函数：
  ```JS
    new Vue({
      // ...
      components: {
        'my-component': () => import('./my-async-component')
      }
    })
  ```

- 处理加载状态：
  + 这里的异步组件工厂函数也可以返回一个如下格式的对象：
  ```JS
    const AsyncComponent = () => ({
      // 需要加载的组件 (应该是一个 `Promise` 对象)
      component: import('./MyComponent.vue'),
      // 异步组件加载时使用的组件
      loading: LoadingComponent,
      // 加载失败时使用的组件
      error: ErrorComponent,
      // 展示加载时组件的延时时间。默认值是 200 (毫秒)
      delay: 200,
      // 如果提供了超时时间且组件加载也超时了，
      // 则使用加载失败时使用的组件。默认值是：`Infinity`
      timeout: 3000
    })
  ```


### 插槽的使用
- 在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 *(即 v-slot 指令)。它取代了 slot 和 slot-scope* 这两个目前已被废弃但未被移除且仍在文档中的 attribute。
  + 用法：
  ```HTML
    <!-- 组件模板 -->
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>

    <!-- 使用 -->
    <base-layout>
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>

      <p>A paragraph for the main content.</p>
      <p>And another one.</p>

      <template v-slot:footer>
        <p>Here's some contact info</p>
      </template>
    </base-layout>
  ```

- 具名插槽的缩写：
  + 2.6.0新增：跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如 v-slot:header 可以被重写为 #header：
  + 然而，和其它指令一样，该缩写只在其有参数的时候才可用。这意味着以下语法是无效的：
  ```HTML
    <!-- 这样会触发一个警告 -->
    <current-user #="{ user }">
      {{ user.firstName }}
    </current-user>

    <!-- 如果你希望使用缩写的话，你必须始终以明确插槽名取而代之： -->
    <current-user #default="{ user }">
      {{ user.firstName }}
    </current-user>
  ```

1. 基本用法：在组件模板中添加 <slot></slot> 标签
  - 注意：如果组件中没有包含 <slot> 元素，那么在使用这个组件时，该组件起始标签和结束标签之间的所有内容会被抛弃
2. 插槽的默认值： <slot><button>按钮</button></slot>
3. 如果有多个值，同时放入到组件进行替换是，一起作为替换元素
4. 作用域插槽：父组件替换插槽的标签，但是内容由子组件来提供
  - 在作用域插槽中，子组件可以将数据通过作用域插槽传递到父组件作用域内
  - 例子：在父组件中想要使用子组件的 user 属性，那么在子组件的 <slot> 标签上动态绑定一个 user 属性，这个属性称为 插槽 prop，在父级作用域中，可以使用带值的 v-slot 来定义子组件提供的 插槽prop 的名字
  ```HTML
    <!-- 子组件 -->
    <div>
      <slot :user="user">
        {{ user.name }}
      </slot>
    </div>

    <!-- 父组件 -->
    <current-user>
      <template v-slot:default="slotProps">
        {{ slotProps.user.name }}
      </template>
    </current-user>
  ```

  - 独占默认插槽的缩写语法：
    + 对应子组件中的默认插槽，父组件在使用默认插槽的属性时，可以不需要插槽的 default 名字，上面的例子可以使用如下写法：
    ```HTML
      <current-user>
        <template v-slot="slotProps">
          {{ slotProps.user.name }}
        </template>
      </current-user>
    ```
    + 注意：**默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确。只要出现多个插槽，请使用完整的写法：v-slot:slotName="propName"**

  - 解构插槽 prop
    + 作用域插槽的内部工作原理是将你的插槽内容包裹在一个拥有单个参数的函数里
    ```JS
      function(slotProps){
        // 插槽内容
      }
    ```
    + 这意味着 v-slot 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。所以在支持的环境下 (单文件组件或现代浏览器)，你也可以使用 ES2015 解构来传入具体的插槽 prop，如下：
    ```HTML
      <current-user v-slot="{ user }">
        {{ user.firstName }}
      </current-user>

      <!-- 也可以将 user 重命名 -->
      <current-user v-slot="{ user: person }">
        {{ person.firstName }}
      </current-user>

      <!-- 也可以给定默认值 -->
      <current-user v-slot="{ user = {firstName: 'pipilei'} }">
        {{ user.firstName }}
      </current-user>
    ```

### 处理边界情况
- 依赖注入
  + 在父子组件之间，甚至包含更多层级的组件之间，如果子组件想访问父组件或子组件想访问父组件的方法，需要使用 $refs 和 $parent。使用 $parent property 无法很好的扩展到更深层级的嵌套组件上。这也是依赖注入的用武之地，它用到了两个新的实例选项：provide 和 inject。
  + provide 选项允许我们指定我们想要提供给后代组件的数据/方法。
    ```JS
      provide: function () {
        return {
          getMap: this.getMap
        }
      }
    ```
  + 然后在任何后代组件里，我们都可以使用 inject 选项来接收指定的我们想要添加在这个实例上的 property：
    ```JS
      inject: ['getMap']
    ```

- 程序化的事件侦听器
  + 现在，你已经知道了 $emit 的用法，它可以被 v-on 侦听，但是 Vue 实例同时在其事件接口中提供了其它的方法。我们可以：
    - 通过 $on(eventName, eventHandler) 侦听一个事件
    - 通过 $once(eventName, eventHandler) 一次性侦听一个事件
    - 通过 $off(eventName, eventHandler) 停止侦听一个事件
  + 你通常不会用到这些，但是当你需要在一个组件实例上手动侦听事件时，它们是派得上用场的。它们也可以用于代码组织工具。例如，你可能经常看到这种集成一个第三方库的模式：
    ```JS
      // 一次性将这个日期选择器附加到一个输入框上
      // 它会被挂载到 DOM 上。
      mounted: function () {
        // Pikaday 是一个第三方日期选择器的库
        this.picker = new Pikaday({
          field: this.$refs.input,
          format: 'YYYY-MM-DD'
        })
      },
      // 在组件被销毁之前，
      // 也销毁这个日期选择器。
      beforeDestroy: function () {
        this.picker.destroy()
      }
    ```
  + 这里有两个潜在的问题：
    1. 它需要在这个组件实例中保存这个 picker，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。
    2. 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化地清理我们建立的所有东西。
  + 你应该通过一个程序化的侦听器解决这两个问题：
    ```JS
      mounted: function () {
        var picker = new Pikaday({
          field: this.$refs.input,
          format: 'YYYY-MM-DD'
        })

        this.$once('hook:beforeDestroy', function () {
          picker.destroy()
        })
      }
    ```


## 过渡 & 动画
### 进入/离开 & 列表过渡
#### 单元素、组件的过渡
- Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡
  + 条件渲染（使用了v-if）
  + 条件展示（使用了v-show）
  + 动态组件
  + 组件根节点
- 例子：
  ```HTML
    <div id="demo">
      <button @click="show = !show">Toggle</button>
      <transition name="fade">
        <p v-if="show">hello</p>
      </transition>
    </div>
  ```
  ```JS
    new Vue({
      el: "#demo",
      data: {
        show: true
      }
    })
  ``` 
  ```css
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
  ```
- 当插入或删除包含在 transition 组件中的元素时，Vue 将会做如下处理：
  + 自动嗅探目标元素是否使用了 css 过渡或动画，如果是，在适当的时机添加/删除 css 类名。
  + 如果过渡组件提提供了 javascript 钩子函数，这些钩子函数将在恰当的时机被调用
  + 如果没有找到 javascript 钩子并且没有监测到 css 过渡/动画，DOM 操作（插入/删除）在下一帧中立即执行。（注意：此指浏览器逐帧动画机制，和 Vue 的 nextTick 不同）

- 过渡的类名
  + v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之前生效，在元素被插入之后的下一帧失效
  + v-enter-active：定义过渡生效时的状态。在整个进入过渡阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移出。这个类可以被用来定义进入过渡的过程期间，延迟和曲线函数
  + v-enter-to：2.1.8版本及以上定义的过渡状态。在元素被插入之后下一帧生效（于此同时，v-enter 被移出），在过渡/动画完成之后移出。
  + v-leave：定义离开过渡的开始状态。在离开过渡被触发的时刻生效，下一帧被移出。
  + v-leave-active：定义离开过渡生效时的状态。在整个离开过渡阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移出。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
  + v-leave-to：2.1.8及以上版本定义的离开过渡的结束状态。在离开过渡被触发之后下一帧生效（于此同时，v-leave被删除），在过渡/动画完成之后移出。

- css过渡
  ```HTML
    <div id="example-1">
      <button @click="show = !show">
        Toggle render
      </button>
      <transition name="slide-fade">
        <p v-if="show">hello</p>
      </transition>
    </div>
  ```
  ```JS
    new Vue({
      el: '#example-1',
      data: {
        show: true
      }
    })
  ```
  ```CSS
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
    }
  ```

- css 动画
  + CSS 动画用法同 CSS 过渡，区别是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除。

- 自定义过渡类名
  + 可以通过以下属性来自定义过渡类名
    - enter-class
    - enter-active-class
    - enter-to-class (2.1.8+)
    - leave-class
    - leave-active-class
    - leave-to-class (2.1.8+)
  + 他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 Animate.css 结合使用十分有用。
    ```HTML
      <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

      <div id="example-3">
        <button @click="show = !show">
          Toggle render
        </button>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated tada"
          leave-active-class="animated bounceOutRight"
        >
          <p v-if="show">hello</p>
        </transition>
      </div>
    ```
    ```JS
      new Vue({
        el: '#example-3',
        data: {
          show: true
        }
      })
    ```
  
- JavaScript 钩子
  ```HTML
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled"

      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"
    >
      <!-- ... -->
    </transition>
  ```
  ```JS
    // ...
    methods: {
      // --------
      // 进入中
      // --------

      beforeEnter: function (el) {
        // ...
      },
      // 当与 CSS 结合使用时
      // 回调函数 done 是可选的
      enter: function (el, done) {
        // ...
        done()
      },
      afterEnter: function (el) {
        // ...
      },
      enterCancelled: function (el) {
        // ...
      },

      // --------
      // 离开时
      // --------

      beforeLeave: function (el) {
        // ...
      },
      // 当与 CSS 结合使用时
      // 回调函数 done 是可选的
      leave: function (el, done) {
        // ...
        done()
      },
      afterLeave: function (el) {
        // ...
      },
      // leaveCancelled 只用于 v-show 中
      leaveCancelled: function (el) {
        // ...
      }
    }
  ```
  + 当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
  + 推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

- 过渡模式
  + in-out：新元素先进行过渡，完成之后当前元素过渡离开。
  + out-in：当前元素先进行过渡，完成之后新元素过渡进入。

- 列表过渡
  + 使用 <transition-group> 组件。不同于 <transition>，它会以一个真实元素呈现：默认为一个 <span>。你也可以通过 tag attribute 更换为其他元素。过渡模式不可用，因为我们不再相互切换特有的元素。内部元素总是需要提供唯一的 key attribute 值。CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。
  ```html
    <div id="list-demo" class="demo">
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
      <transition-group name="list" tag="p">
        <span v-for="item in items" v-bind:key="item" class="list-item">
          {{ item }}
        </span>
      </transition-group>
    </div>
  ```
  ```css
    .list-item {
      display: inline-block;
      margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(30px);
    }
  ```
  ```js
    new Vue({
      el: '#list-demo',
      data: {
        items: [1,2,3,4,5,6,7,8,9],
        nextNum: 10
      },
      methods: {
        randomIndex: function () {
          return Math.floor(Math.random() * this.items.length)
        },
        add: function () {
          this.items.splice(this.randomIndex(), 0, this.nextNum++)
        },
        remove: function () {
          this.items.splice(this.randomIndex(), 1)
        },
      }
    })
  ```

### 状态过渡
- 状态动画与侦听器
  + 例子：
  ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js"></script>

    <div id="animated-number-demo">
      <input v-model.number="number" type="number" step="20">
      <p>{{ animatedNumber }}</p>
    </div>
  ```
  ```js
    new Vue({
      el: '#animated-number-demo',
      data: {
        number: 0,
        tweenedNumber: 0
      },
      computed: {
        animatedNumber: function() {
          return this.tweenedNumber.toFixed(0);
        }
      },
      watch: {
        number: function(newValue) {
          gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
        }
      }
    })
  ```

## 前端模块化

### 多个 JS 文件带来的问题：

1. 小明写了 a.js ,并在其中定义了 变量 flag, 然后又写了 b.js ,想要使用 flag 这个变量，但这时小红也创建了一个 x.js 文件，并在其中定义了 flag 变量，这时候小明使用的 flag 可能会变成小红定义的 flag
2. 解决方式：在每个 js 文件中使用闭包 function(){ ... }(), 这个后不存在共享变量的问题，但又存在代码无法复用的问题
3. 最基本模块化解决方案：var moduleA = function(){ var obj = {} ... return obj }(), 在其他 js 文件中使用 moduleA.flag 就可以放文到 moduleA 模块中的变量了

### ES6 模块化

前提： 在 script 标签中添加 type="module"

  <script src="./aaa.js" type="module"></script>

1. 导出： 在 js 文件中使用 export 关键字导出 变量、函数、类
   var name = 'pipilei'
   var sum = function(num1, num2){ return num1 + num2 }
   export {name,sum}

   或者：

   export var name = 'pipilei'
   export var sum = function(num1, num2){ return num1 + num2 }

2. 导入：
   import {name,sum} from 'a.js'

3. export default:
   某些情况下，一个模块中包含某些功能，我们并不希望给这个功能命名，而是让导入者可以自己命名，这个时候就可以使用 export default，在一个模块中，export default 只能向外暴露一次

## Webpack

### 起步

正式项目中新建 src 文件夹作为开发环境，新建 dist 文件夹作为发布环境，在 src 文件夹中编写代码，通过 webpack 打包到 dist 目录下。src 下采用模块化开发方式，可以使用 commonJS，ES6,AMD,CMD 等模块化规范导入导出模块，然后通过 webpack 打包入口文件（main.js）生成 bundle.js 到 dist 目录下

### webpack 配置

新建 webpack.config.js 文件作为 webpack 的配置文件：

```javascript
const path = require("path");
module.exports = {
  entry: "./src/main.js",
  output: {
    // 动态获取路径
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  }
};
```

通过 npm init 命令创建 package.json 文件，在 script 字段中添加 'build':'webpack' ，就可以使用 npm run build 命令来执行 webpack 命令, 而且这里执行的命令是优先找本地的 webpack，如果直接在终端输入 webpack 是使用的全局的 webpack

### webpack 的 loader

- loader 是 webpack 中非常核心的概念
- webpack 主要用来做什么呢？
  - 在之前的例子中，主要用 webpack 来处理 js 代码，并且 webpack 会自动处理 js 代码中的依赖关系
  - 但是，开发中不仅仅有基本的 js 代码处理，还有 css，图片，也包括一些高级的将 ES6 转成 ES5 代码，将 scss、less 转成 css 等等，对于这些转换，webpack 本身是不支持的
  - 使用 loader 可以解决这些问题
- loader 使用过程

  - 1. 通过 npm 安装需要使用的 loader
  - 2. 在 webpack.config.js 中的 module 关键字下进行配置

  ### ES6 语法处理

  - 在 webpack 打包后的 js 文件中，并没有将 ES6 语法转换成 ES5，那么一些不支持 ES6 语法的浏览器就没办法很好的运行 js 代码
  - 如果想把 ES6 语法转换成 ES5 语法，就需要使用 babel
    - 在 webpack 中，直接使用 babel 对于的 loader 就可以了
      npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
  - 配置 webpack.config.js 文件
    ```javascript
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }
    ```
  - 重新打包，产看打包后的 js 文件，其中的内容就变成了 ES5 的语法

### webpack 配置 vue

1. 在当前项目下本地安装 vue: npm install --save vue
2. 在入口 js 文件导入 vue 并创建 vue 实例，如果此时直接运行会报错，提示 runtime only
3. 在 webpack.config.js 文件中添加 resolve 配置：

```javascript
resolve: {
  alias: {
    'vue$': 'vue/dist/vue.esm.js'
  }
}
```

### 创建 vue 时 el 和 template 的区别

- webpack 配置 vue 正常运行之后，我们来考虑一个问题：
  - 如果希望将 data 中的数据显示在界面中，就必须修改 index.html
  - 如果定义了组件，也必须修改 index.html 来使用组件
  - 但是 html 模板在之后的开发中，我并不希望手动的频繁修改，该怎么做？
- 定义 template 属性
  - 在之前的 vue 实例中，我们定义的 el 属性，用于和 index.html 中的 #app 进行绑定。让 Vue 实例之后可以管理它其中的内容
  - 这里，我们可以将 div 元素中的 {{message}} 内容删掉，只保留一个基本的 id 为 app div 的元素
  - 但是如果依然希望在其中显示 {{message}} 的内容，应该怎么处理?
  - 可以再定义一个 template 属性，代码如下：
    ```javascript
    new Vue({
      el: "#app",
      template: '<div id="app">{{message}}</div>',
      data: {
        message: "hello vue"
      }
    });
    ```

### .vue 文件封装处理

- 一个组件以一个 js 对象的形式进行组织和使用的时候时非常不方便的
  - 一方面编写 template 代码非常麻烦
  - 另一方面如果有样式的化，在哪写比较合适呢？
- 通过一种全新的方式（.vue 文件）来组织一个 vue 的组件，但这个时候会报错
- 需要使用 vue-loader 和 vue-template-compiler
- 安装 vue-loader 和 vue-template-compiler : `npm install vue-loader vue-template-compiler --save-dev` vue-loader 版本要小于 14.0.0，否则需要插件

### webpack plugin 使用

- plugin 和 loader 的区别：
  - loader 主要用于转换某些类型的模块，它是一个转换器
  - plugin 是插件，它是对 webpack 本身的扩展，是一个扩展器
- plugin 使用步骤：
  1. 通过 npm 安装需要使用的 plugins（某些 webpack 已经内置的插件不需要安装）
  2. 在 webpack.config.js 中的 plugins 中配置插件
- 常用的 webpack 插件：

  1. 打包 html 文件的插件：

  - 目前 index.html 文件是放在项目的跟目录下的，在真实发布项目时，发布的是 dist 文件夹下的内容，但 dist 文件夹中没有 index.html 文件，那么打包的 js 文件也就没有意义了，所以需要使用 HtmlWebpackPlugin 插件将 index.html 文件打包到 dist 文件夹下
  - HtmlWebpackPlugin 插件可以做这些事：
    1. 自动生成一个 index.html 文件（可以指定模板来生成）
    2. 将打包的 js 文件，自动通过 script 标签插入到 body 中
  - 使用步骤：
    1. 安装：npm install html-webpack-plugin --save-dev
    2. 使用：在 webpack.config.js 文件导入 :`const htmlWebpackPlugin = require('html-webpack-plugin')`
       修改 webpack.config.js 文件中的 plugins 部分内容：
       ```javascript
       plugins: [
         new htmlWebpackPlugin({
           template: "index.html"
         })
       ];
       ```
       这里的 template 表示根据什么模板来生成 index.html，另外，我们需要删除之前在 output 中添加的 publicPath 属性，否则插入的 script 标签中的 scr 可能会有问题

  2. js 压缩的插件

  - 在项目发布之前，需要对 js 文件进行压缩处理，这里使用第三方插件 uglifyjs-webpack-plugin，并且指定版本号 1.1.1，和 CLI2 保持一直
  - 安装： npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
  - 使用：
    - 在 webpack.config.js 文件导入该插件：`const uglifyJsPlugin = require('uglifyjs-webpack-plugin')`
    - 修改 webpack.config.js 文件中的 plugins 部分内容：
      ```javascript
      plugins: [new uglifyJsPlugin()];
      ```

### 搭建本地服务器

- webpack 提供了一个可选的本地开发服务器，这个本地服务器基于 node.js 搭建，内部使用 Express 框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果
- 不过它是一个单独的模块，在 webpack 中使用之前需要先安装：
  `npm install --save-dev webpack-dev-server@2.9.1`
- deserver 也是作为一个 webpack 中的选项，选项本身可以设置如下属性：
  - contentBase: 为哪一个文件夹提供本地服务，默认是根文件夹，我们这里填写 ./dist
  - port: 端口号
  - inline: 页面实时刷新
  - historyApiFallback: 在 SPA 页面中，依赖 HTML5 的 history 模式
- webpack.config.js 文件配置修改如下：
  ```javascript
    devServer: {
      contentBase: './dist',
      inline: true
    }
  ```
- 我们可以在 package.json 文件配置另外一个 scripts:
  - `"dev": "webpack-dev-server --open"` ; --open 参数表示直接打开浏览器

## Vue CLI

### Vue CLI 简介

- 使用 Vue.js 开发大型应用时，我们需要考虑代码目录结构、项目结构和部署、热加载、代码单元测试等事情。
- 如果每个项目都要手动完成这些工作，那效率会比较低，所以通常使用一些脚手架工具来帮助完成这些事情。

- CLI 是什么意思？
  - CLI 是 Command-Line Interface, 翻译为命令行界面，但俗称脚手架
  - Vue CLI 是官方发布的一个 vue.js 项目脚手架
  - 使用 vue-cli 可以快速搭建 Vue 开发环境以及对应的 webpack 配置

### vue-cli2 目录结构解析

为什么谷歌浏览器速度比较快？
一般浏览器会将 js 文件解析成字节码文件，然后将字节码解析成二进制文件，而谷歌使用 v8 引擎直接将 js 文件解析成二进制文件，省去了解析成字节码的步骤，所以速度快

1. package.json： 入口文件，执行 npm run build 命令时会去执行 build 目录下的 build.js 文件
   执行 rm 方法，先删除原先打包好的 dist 文件夹，然后执行 webpack 相关配置
2. build 目录：配置相关文件
3. config 目录：配置相关文件，定义一些变量
4. src 目录：我们代码存放的目录
5. static 目录：静态资源文件，执行 npm run build 命令时不会打包 static 文件夹下的文件，会原封不动的将 static 文件夹复制到打包生成的 dist 文件夹中
6. .babelrc 文件：配置 ES6 转 ES5
7. .editorconfig 文件：设置代码编写规范，设置 charset，代码缩进等
8. .gitignore 文件：git 提交时忽略的文件
9. .postcssrc.js 文件：css 转化时的配置文件，一般不用改
10. index.html 文件: html 模板文件，打包时会根据这个模板在 dist 文件夹下创建 index.html 文件
11. package-lock.json 文件：映射 package.json 文件中引入的依赖我，同时加快下载速度
12. package.json 文件：是一个包说明文件（项目描述文件），用来管理组织一个包（一个项目）

```javascript
  new Vue({
    el: '#app',
    // components: { App },
    // template: '<App/>'
    render: function (createElement) {
      //1.普通用法： createElement('标签'，{标签的属性}， [''])
      return createElement('h2',
        { class: 'box' },
        ['hello pipilei', createElement('button', ['按钮'])]
      )
      // 2.传入组件对象
      return createElement(App)
    }
  })
```
- .vue 文件中的 template 是由 vue-template-compiler 解析成了 render 函数

- runtime-compiler 和 runtime-only 的区别：
  - 如果在开发中，依然使用 template，就需要选择 runtime-compiler
  - 如果在开发中，使用的是 .vue 文件来开发，那么可以选择 runtime-only

### vue-cli 3 和 vue-cli 2 的区别

1. vue-cli 3 是基于 webpack 4 打造， vue-cli 2 是 webpack3
2. vue-cli 3 的设计原则是 “0 配置”，移除的配置文件根目录下的 build 和 config 等目录
3. vue-cli 3 提供了 vue ui 命令，提供了可视化配置，更加人性化
4. 移除了 static 文件夹，新增了 public 文件夹，并且 index.html 移动到 public 中

## 箭头函数中的 this 是如何查找的？

向外层作用域中，一层层查找 this，直到有 this 的定义

```javascript
setTimeout(function() {
  console.log(this); // window
}, 1000);

setTimeout(() => {
  console.log(this); // window
}, 1000);

var obj = {
  a() {
    setTimeout(function() {
      console.log(this); // window
    }, 1000);
  },

  b() {
    setTimeout(() => {
      console.log(this); // obj
    }, 1000);
  }
};
```

## Vue Router

### 什么是路由

- 路由就是通过互联的网络把信息从源地址传输到目的地址的活动
- 路由器提供了两种机制：路由和转送
  - 路由是决定数据包从来源到目的地的路径
  - 转送将传输端的数据转移到合适的输出端
- 路由中有一个重要的概念叫路由表，路由表本质上就是一个映射表，决定了数据包的指向

- 内网 IP 地址：
  A 类网：10.0.0.0 ~ 10.255.255.255
  B 类网：172.16.0.0 ~ 172.31.255.255
  C 类网：192.168.0.0 ~ 192.168.255.255

### 前端路由和后端路由，前端渲染和后端渲染

- 后端路由阶段：

  - 后端路由：后端处理 URL 和页面之间的映射关系
  - 后端渲染：
    早期的网站开发整个 HTML 页面都是由服务器进行渲染的，浏览器将 URL 发送到服务器，服务器解析 URL 并直接渲染好对应的 HTML 页面，返回给浏览器进行展示，后端渲染 JSP 技术：HTML + CSS + JAVA
    一个网站，这么多页面服务器是如何处理的呢？

    1. 一个页面有对应的网址，也就是 URL
    2. URL 会被发送到服务器，服务器通过正则对该 URL 进行匹配，并交给一个 Controller 进行处理
    3. Controller 进行各种处理，最终生成一个 HTML 返回给前端
    4. 这就完成了一个 IO 操作
       这种情况下渲染好的页面不需要单独加载任何的 js 和 css，可以直接交给浏览器展示，这样也有利于 SEO 的优化

  - 后端路由的缺点：
    1. 整个页面的模块是由后端人员来编写和维护的
    2. 如果前端人员要开发页面，需要通过 PHP 或 JAVA 等语言来编写页面代码
    3. 这种情况下 HTML 代码和数据以及对应的逻辑会混在一起，编写和维护都是很麻烦的事情

- 前后端分离阶段：

  1. 随着 Ajax 的出现，有了前后端分离的开发模式
  2. 后端只提供 API 来返回数据，前端通过 Ajax 获取数据，并且可以通过 JS 将数据渲染到页面中

  - 前后的分离的优点：
    1. 前后端的责任更清晰，后端专注于数据，前端专注于交互和可视化上
    2. 并且当移动端出现后，后端不需要进行任何处理，依然使用之前的一套 API 即可

  过程：

  1. 用户在浏览器输入 URL 后。浏览器将 URL 发送到静态资源服务器，静态资源服务器返回 HTML + css + js，浏览器直接渲染 html 和 css ，并执行 js 文件，当 js 文件中有 ajax 请求时，在将 请求的 URL 发送到 API 服务器，api 服务器返回接口数据，浏览器再将数据渲染到 html 中
  2. 这个过程就是前端渲染：浏览器中显示的网页中的大部分内容都是由前端写的 js 代码在浏览器中执行，最终渲染出来的网页

- 前端路由阶段（单页面富应用阶段）：
  SPA（single page web application）: 单页面 Web 应用，整个网页只要有一个 html 页面，SPA 最主要的特点就是在前后端分离的基础上加了一层前端路由，也就是前端来维护一套路由规则
  过程：静态资源服务器上只会有一个 HTML 文件，一个或多个 css、js 文件，用户输入 URL 地址时，浏览器会去静态资源服务器请求全部的 HTML，css，js 文件，当 URL 后面的路径不同时，通过 js 代码判断显示不同的数据，这就是前端路由

2. 前端路由：浏览器处理 URL 和页面之间的映射关系，前端路由的核心是改变 URL，但是页面不进行整体的刷新

- 如何实现？通过 url 的 hash 和 HTML5 的 history

1. 修改 url 的 hash：location.hash = 'aaa'
2. 使用 HTML5 的 history ： history.pushState({},'','aaa')： 类似于入栈，可以点击浏览器的返回，
   或 history.replaceState({},'','aaa')：类似于直接替换栈顶内容

### 认识 vue-router

- vue-router 是基于路由和组件的
  - 路由用于设定访问路径，将路径和组件映射起来
  - 在 vue-router 的单页面应用中，页面的路径的改变就是组件的切换

### 安装和使用 vue-router

- 因为已经学习过 webpack，后续开发中我们主要是通过工程化的方式进行开发的，在后续步骤中，直接使用 npm 来安装路由即可

  - 步骤一：安装 vue-router： npm install vue-router --save
  - 步骤二：在模块化工程中使用它（因为它是一个插件，所以可以通过 Vue.use() 来安装路由功能）
    1. 第一步：导入路由对象，并且调用 Vue.use(Router)
    2. 第二步：创建路由实例，并且传入路由映射配置
    3. 第三步：在 Vue 实例中挂载创建的路由实例

- 使用 vue-router 步骤
  - 第一步： 创建路由组件
  - 第二步： 配置路由映射：组件和路由映射关系
  - 第三步： 使用路由：通过<router-link> 和 <router-view>
    - <router-link> 标签是 vue-router 中已经内置的一个组件，它默认会被渲染成一个 a 标签
      <router-link> 标签属性：
      1. to：设置对应的路由路径, to='/home'
      2. tag: 将<router-link> 渲染成指定标签，tag='button',这时将被渲染成按钮
      3. replace：replace 不会留下 history 记录，所有指定 replace 的情况下，后退键返回不能返回到上一个页面中
      4. active-class: 当<router-link> 对应的路由匹配成功时，会自动给当前元素设置一个 router-link-active 的 class，设置 active-class 可以修改默认的名称
    - <router-view> 标签会根据当前的路径，动态渲染出不同的组件
    - 网页的其他内容，比如顶部的标题、导航，或者底部的一些版权信息等会和<router-view> 处于同一个等级
    - 在路由切换时，切换的时 <router-view> 挂载的组件，其他内容不会发生改变

### 路由的默认路径

- 默认情况下，进入网站的首页，我们希望 <router-view> 渲染首页的内容，但上面的情况没有显示首页组件，必须让用户点击 首页 才能显示
- 如何让路径默认跳到首页，并且 <router-view> 渲染首页组件？
  - 只需要多配置一个映射就可以了
  ```javascript
  const routes = [
    {
      path: "/",
      redirect: "./home"
    }
  ];
  ```
  - 配置解析： 在 routers 中又配置了一个映射，path 配置是根路径：/ ，redirect 是重定向，也就是我们将根路径重定向到 /home 的路径下，这样就可以得到我们想要的结果了

### 动态路由

- 在有些情况下，一个页面的 path 路径可能是不确定的，比如进入用户界面是，希望如下路径“
  - /user/aaa 或 /user/bbb ；除了前面的 user 之外。后面还跟上了用户的 ID，这种 path 和 Component 的匹配关系，称之为动态路由

```javascript
const routes = [
  {
    path: "/user/:id",
    component: User
  }
];
```

```html
<router-link to="/user/zs" />
```

### $router 和 $route 的区别

1. \$router 是 VueRouter 对象
2. \$route 是当前活跃的路由

### 为什么使用 \$router 时能拿到 VueRouter 对象？

1. 所有的组件都继承自 vue 的原型
2. 在 vue-router 的源码中会使用 Vue.prototype.$router = VueRouter, 所以使用 $router 能拿到 VueRouter。
3. 在 VueRouter 的源码中会使用 Vue.component('RouterLink',link),Vue.component('RouterView',link),注册这两个全局组件，所以能使用 <router-link> 和 <router-view> 这两个组件

### 路由的懒加载

- 官方解释：
  - 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载
  - 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了
- 路由懒加载做了什么？
  - 路由懒加载的主要作用就是将路由对应的组件打包成一个个的 js 代码块
  - 只有在这个路由被访问到的时候，才加载对应的组件
- 懒加载的方式：
  1. 结合 vue 的异步组件和 webpack 的代码分析：
  ```javascript
    const Home = resolve => {
      require.ensure(
        ['../components.Home.vue],
        () => {
          resolve(require('../components/Home.vue'))
        }
      )
    }
  ```
  2. AMD 写法
  ```javascript
    const About = resolve = > require(['../components/About.vue'], resolve);
  ```
  3. 在 ES6 中，可以使用更加简单的写法来组织 Vue 异步组件和 Webpack 的代码分割
  ```javascript
    const Home = () = > import('../components/About.vue');
  ```

### 嵌套路由

- 嵌套路由是一个很常见的功能，比如在 home 页面中，我们希望通过 /home/news 和 /home/message 访问一些内容；一个路径映射一个组件，访问这两个路径也会分别渲染两个组件
- 实现路由嵌套：
  1. 创建对应的子组件，并且在路由映射中配置对应的子路由
  ```javascript
     {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          redirect: 'news'
        },
        {
          path: 'news',
          component: HomeNews
        },
        {
          path: 'message',
          component: HomeMessage
        }
      ]
     },
  ```
  2. 在组件内部使用 <router-view> 标签

### 路由参数的传递

- 传递参数主要有两种方式：params 和 query
- params 方式：
  1. 配置路由格式： /router/:id
  2. 传递的方式：在 path 后面跟上对应的值
  3. 传递后形成的路径： /router/123 , /router/abc
- query 方式：
  1. 配置路由格式：/router，也就是普通路由
  2. 传递的方式：对象中使用 query 的 key 作为传递方式
  3. 传递后形成的路径： /router?id=123&name=pipilei 或 /router?id=abc

### 路由的导航守卫

1. 为什么使用导航守卫？

- 现在有个需求：在一个 SPA 应用中，如何改变网页的标题呢？
  - 网页标题是通过<title> 来显示的，但 SPA 只有一个固定的 html 页面，切换不同的路由时，标题并不会改变
  - 但我们可以通过 js 来修改 <title> 中的内容，通过 window.document.title = "新的标题"
  - 那么在 vue 项目中，在哪里修改？什么时候修改比较合适呢？这时候就可以使用路由的导航守卫

2. 使用方法：在 router 文件夹下的 index.js 文件中添加下面方法
   router.beforeEach((to, from, next))
   to: 下一个路由
   from: 源路由，当前导航即将要离开的路由
   next: 方法，必须调用，调用该方法后才能进入下一个钩子

### keep-alive

- keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染
  - 它有两个非常重要的属性：
    1. include: 字符串或正则表达式，只有匹配的组件会被缓存
    2. exclude：字符串或表达式，任何匹配的组件都不会被缓存
- router-view 也是一个组件，如果直接被包在 keep-alive 里，所有路径匹配到的视图组件都会被缓存

### 完成 tabBar 案例

### promise

- promise 介绍和基本使用

  - ES6 中一个非常重要和好用的特性就是 Promise，Promise 是异步编程的一种解决方案
  - 一种常见的异步场景就是网络请求了，我们封装一个网络请求函数，因为不能立即得到结果，所有往往会传入另外一个函数，在数据请求成功时，将数据通过传入的函数回调出去，但当网络请求非常复杂时，就会出现回调地狱

- new Promise() 时做了哪些操作：
  new -> 执行 Promise 构造函数（1. 保存一些状态信息。 2. 执行传入的函数）
  在执行传入的回调函数时，会传入两个参数：resolve，reject，而 resolve 和 reject 本身又是函数，在回调函数中可以执行异步操作

  ```javascript
  new Promise((resolve, reject) => {
    // 执行异步操作
  })
    .then(res => {
      // 调用了 resolve(res) 会到这里执行
    })
    .catch(err => {
      // 调用了 reject(err) 会到这里执行
    });
  ```

- promise 三种状态
  1. pending: 等待状态，比如正在进行网络请求，或者定时器没有到时间
  2. fullfill：满足状态，当我们主动回调了 resolve 时，就处于该状态，并且会回调 .then()
  3. reject: 拒绝状态，当我们主动回调了 reject 时，就处于该状态，并且会回调 .catch()

## Vuex

### vuex 简介

- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
  - 它采用*集中式存储管理*应用的所有组件的状态，并以相应的规则保证状态以一种可以预测的方式发生变化.
  - Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试，状态快速导入导出等高级调试功能
- 状态管理 是什么？
  - 状态管理模式、集中式存储管理 这些名词看不懂
  - 可以简单的将其看成把需要多个组件共享的变量全部存储在一个对象里面
  - 然后，将这个对象放在顶层的 vue 实例中，让其他组件可以使用
  - 那么，多个组件就可以共享这个对象中的所有变量属性
- 哪些状态需要在多个组件间共享呢？
  - 用户登录状态、用户名称、头像、地理位置等信息
  - 商品的收藏、购物车中的物品等
  - 这些状态信息，都可以放在一个同意的地方，对它进行保存和管理，而且它们还是响应式的

### Vuex 核心概念

1. state: 单一状态树，保存状态相关信息
2. getters: 类似于组件中的计算属性
3. mutations: 定义一些方法，可以改变 state 中的属性

- Vuex.store 状态更新唯一方式：提交 mutation
- mutation 主要包括两个部分：
  - 字符串的事件类型（type）
  - 一个回调函数（handler），该回调函数的第一个参数是 state
    mutation 提交风格：
    ```javascript
    1. this.$store.commit('add',param)
       add(state,param){}

    2. this.$store.commit({
       type: 'add',
       count: 100
       })
       add(state,payload)
    ```

4. actions: 做异步操作

- 通常情况下，Vuex 要求 mutations 中的方法必须是同步方法，主要原因是当我们使用 devtools 时，devtools 可以捕获到 mutation 的快照，但如果 mutations 中式异步操作，就不能被 devtools 追踪，所以官方建议将 异步操作 放在 actions 中执行
- action 类似于 mutation，但是是用来代替 mutation 中进行异步操作的

5. modules: 划分模块

## 网络请求的封装

### axios 的功能特点

1. 在浏览器中发送 XMLHttpRequest 请求
2. 在 node.js 中发送 http 请求
3. 支持 Promise API
4. 拦截请求和响应
5. 转换请求和响应数据
6. 支持多种请求方式

- axios(config)
- axios.request(config)
- axios.get(url[,config])
- axios.delete(url[,config])
- axios.head(url[,config])
- axios.post(url[,data[,config]])
- axios.put(url[,data[,config]])
- axios.patch(url[,data[,config]])

### axios 常见的配置选项

- 请求地址：url: '/user'
- 请求类型：method: 'get'
- 请求根路径：baseURL: 'http://www.mt.com/api'
- 请求前的数据处理：transformRequest: [function(data){}]
- 请求后的数据处理：transformResponse: [function(data){}]
- 自定义请求头：headers: {'x-Requested-With':'XMLHttpRequest'}
- URL 查询对象：params:{id:12}
- 查询对象序列化函数：paramsSerializer: function(params){}
- request body：data:{key:'aaa'}
- 超时设置 s：timeout:1000
- 跨域是否带 Token：withCredentials:false
- 自定义请求处理：adapter:function(resolve,reject,config){}
- 身份验证信息：auth:{uname:'pipilei',pwd:'123'}
- 响应的数据格式 json/blob/document/arraybuffer/text/stream：responseType:'json'

### axios 拦截器

axios 提供了拦截器，用于我们在发送每次请求或者得到响应后，进行对应的处理
如何使用拦截器？

```javascript
axios.interceptors.request.use(
  config => {
    console.log("来到了 request 拦截 success中");
    // 比如config中的信息不符合服务器要求，可以添加额外参数
    // 发送请求是在界面显示请求图标
    return config;
  },
  err => {
    console.log("来到了 request 拦截 failure中");
    return err;
  }
);

axios.interceptors.response.use(
  response => {
    console.log("来到了 response 拦截 success中");
    return response.data;
  },
  err => {
    console.log("来到了 response 拦截 failure中");
    return err;
  }
);
```


## Vue 项目目录结构划分
1. src 下的 assets 目录创建 css 和 img 用于存放 css 文件和图片文件
2. 在 src 下创建 views 目录用于存放视图组件，components 目录存放公共组件，components 目录下新建 common 和 content 目录，common 目录存放公共组件，可以在任何项目使用的组件，content 存放只能在当前项目可复用的组件
3. 在 src 下新建 network 文件夹用于存放网络请求相关代码
4. src 下的router 文件夹新建 index.js 写路由相关代码，store 目录下存放 vuex 代码
5. 在 src 下创建 common 文件夹，存放一些公共的 js 文件，可以存放一些常量、工具函数


### vue 组件之间如果想要复用代码可以通过 mixin 的方式复用
```javascript
  const mixin = {
    created(){
      console.log(1)
    }
  }
  new Vue({
    mixins: [mixin]
  })
```



## 监听图片加载完成：
1. 原生 js 监听图片加载完成: img.onload = function(){}
2. vue 中监听：在 img 标签中添加 @load 事件： @load = "方法名"


## js 防抖函数
```javascript
  debounce(func, delay){
    let timer = null
    return function(...args){
      if(timer){
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      },delay)
    }
  }
```