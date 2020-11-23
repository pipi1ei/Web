## 可复用性&组合
### 混入
- 混入（mixin）提供了一种非常灵活的方式，来分发vue组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入时，所有混入对象的选项将会被“混合”到该组件本身的选项
- 例子
```js
  // 定义一个混入对象
  var myMixin = {
    created() {
      this.hello()
    },
    methods: {
      hello() {
        console.log('hello from mixin')
      }
    }
  }

  // 定义一个使用混入的组件对象
  var Component = Vue.extend({
    mixins: [myMixin]
  })

  var myMixinComponent = new Component();  // hello from mixin
```

- 选项合并
  + 当组件和混入对象含有同名选项时，这些选项会以恰当的方式合并：
    1. 数据对象（data）在内部会进行递归合并，并在发生冲突时以组件数据优先
      ```js
        var mixin = {
          data() {
            return {
              message: 'hello',
              foo: 'abc'
            }
          }
        };

        new Vue({
          mixins: [mixin],
          data: {
            message: 'goodbye',
            bar: 'def'
          },
          created() {
            console.log(this.$data)  // {message: 'goodbye', bar: 'def', foo: 'abc'}
          }
        })
      ```
    2. 同名的钩子函数将合并为一个数组，因此都将被调用，并且混入对象的钩子将在组件自身的钩子之前调用
      ```js
        var mixin = {
          created() {
            console.log('混入对象的钩子被调用')
          }
        }

        new Vue({
          mixins: [mixin],
          created() {
            console.log('组件钩子被调用')
          }
        })

        // 混入对象的钩子被调用
        // 组件钩子被调用
      ```
    3. 值为对象的选项，如 methods，components 和 directives，将被合并为同一个对象，两个对象的键名冲突时，取组件对象的键值对
      ```js
        var mixin = {
          methods: {
            foo() {
              console.log('foo')
            },
            conflicting() {
              console.log('from mixin')
            }
          }
        }

        var vm = new Vue({
          mixins: [mixin],
          methods: {
            bar: function () {
              console.log('bar')
            },
            conflicting: function () {
              console.log('from self')
            }
          }
        })
      ```

      vm.foo()          // foo
      vm.bar()          // bar
      vm.conflicting()  // from self

  + vue.extend() 也以同样的方式合并

- 全局混入
  + 混入也可以进行全局注册。使用时需要注意，一旦使用全局混入，它将影响每一个之后创建的Vue实例。使用恰当时，这可以用来为自定义选项注入处理逻辑
  ```js
    // 为自定义选项的 myOption 注入一个处理器
    Vue.mixin({
      created() {
        var myOption = this.$options.myOption
        if(myOption) {
          console.log(myOption)
        }
      }
    })

    new Vue({
      myOption: 'hello'
    })

    // hello
  ```
  + 注意：**请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。推荐将其作为插件发布，以避免重复应用混入**


- 自定义选项合并策略
  + 自定义选项将使用默认策略，即简单的覆盖已有值。如果想要自定义选项已自定义逻辑合并，可以向 Vue.config.optionMergeStrategies 添加一个函数
    ```js
      Vue.config.optionMergeStrategies.myOption = function(toVal, fromVal) {
        // 返回合并后的值
      }
    ```
  + 对于多数值为对象的选项，可以使用与 methods 相同的合并策略
    ```js
      var strategies = Vue.config.optionMergeStrategies;
      strategies.myOption = strategies.methods;
    ```
  + 可以在 vuex1.x 的混入策略里找到一个更高级的例子
    ```js
      const merge = Vue.config.optionMergeStrategies.computed
      Vue.config.optionMergeStrategies.vuex = function(toVal, fromVal) {
        if (!toVal) return fromVal
        if (!fromVal) return toVal
        return {
          getters: merge(toVal.getters, fromVal.getters),
          state: merge(toVal.state, fromVal.state),
          actions: merge(toVal.actions, fromVal.actions)
        }
      }
    ```

### 自定义指令
- 简介
  + 除了核心功能默认内置的指令（v-model 和 v-show 等），Vue 也允许注册自定义指令。注意：在Vue2.0中，代码复用和抽象的主要形式是组件。然而，有的情况下，任然需要对普通 DOM 元素进行底层操作，这时候就需要用到自定义指令。举个例子：当页面加载时，input 元素获得焦点（autofocus 在移动版 Safari 上不工作）
  ```js
    // 注册一个自定义全局指令：v-focus
    Vue.directive('focus', {
      // // 当被绑定的元素插入到 DOM 中时
      inserted(el) {
        // 聚焦元素
        el.focus()
      }
    })

    // 如果想要注册局部指令，组件中也接受一个 directives 选项
    directives: {
      focus: {
        inserted(el) {
          el.focus();
        }
      }
    }
  ```
  + 然后就可以在模板中任何元素上使用 v-focus 指令
    ```html
      <input v-focus>
    ```

- 钩子函数
  + 一个指令定义对象可以定义一下几个钩子函数（均为可选）：
    - bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    - inserted：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）。
    - update：所在组件的 VNode 更新时调用，*但是可能发生在其子 VNode 更新之前*。指令的值可能发生了改变，也可能没有。但是你可用通过比较更新前后的值来忽略不必要的模板更新
    - componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用
    - unbind：只调用一次，指令与元素解绑时调用

- 钩子函数参数
指令钩子函数会被传入以下参数：
  + el：指令所绑定的元素，可以用来直接操作DOM
  + binding：一个对象，包含以下属性
    - name：指令名，不包括 v- 前缀
    - value：指令的绑定值，如：v-my-directive="1 + 1"中，value 为 2
    - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用
    - expression：字符串形式的指令表达式，如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
    - arg：传给指令的参数，如 v-my-directive:foo 中，参数为 'foo'
    - modifiers：一个包含修饰符的对象，如 v-my-directive.foo.bar 中，修饰符对象为 {foo: true, bar: true}
  + vnode：Vue 编译生成的虚拟节点
  + oldNode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

  + 注意：**除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。**

  + 例子：
    ```html
      <div id="app" v-demo:foo.a.b="message"></div>
    ```
    ```js
      Vue.directive('demo', {
        bind(el, binding, vnode) {
          var s = JSON.stringify;
          el.innerHTML = 
            'name: '       + s(binding.name) + '<br>' +
            'value: '      + s(binding.value) + '<br>' +
            'expression: ' + s(binding.expression) + '<br>' +
            'argument: '   + s(binding.arg) + '<br>' +
            'modifiers: '  + s(binding.modifiers) + '<br>' +
            'vnode keys: ' + Object.keys(vnode).join(', ')
        }
      })

      new Vue({
        el: '#app',
        data: {
          message: 'hello!'
        }
      })

      // 结果：
      name: "demo"
      value: "hello!"
      expression: "message"
      argument: "foo"
      modifiers: {"a":true,"b":true}
      vnode keys: tag, data, children, text, elm, ns, context, fnContext, fnOptions, fnScopeId, key, componentOptions, componentInstance, parent, raw, isStatic, isRootInsert, isComment, isCloned, isOnce, asyncFactory, asyncMeta, isAsyncPlaceholder
    ```

  + 动态指令参数
    - 指令的参数可以是动态的，如：在 v-mydirective:[argument]="value" 中，argument 参数可以根据组件实例数据进行更新。这使得自定义指令可以在应用中被灵活使用
    ```html
      <div id="#app">
        <p>Scroll down the page</p>
        <p v-pin="200">Stick me 200px from the top of the page</p>
      </div>
    ```
    ```js
      Vue.directive('bin', {
        bind(el, binding, vnode) {
          el.style.position = 'fixed',
          el.style.top = binding.value + 'px'
        }
      })

      new Vue({
        el: '#app'
      })
    ```
    - 这会把该元素固定在距离页面顶部 200 像素的位置。但如果场景是我们需要把元素固定在左侧而不是顶部又该怎么办呢？这时使用动态参数就可以非常方便地根据每个组件实例来进行更新。
    ```html
      <div id="dynamicexample">
        <h3>Scroll down inside this section ↓</h3>
        <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
      </div>
    ```
    ```js
      Vue.directive('pin', {
        bind: function (el, binding, vnode) {
          el.style.position = 'fixed'
          var s = (binding.arg == 'left' ? 'left' : 'top')
          el.style[s] = binding.value + 'px'
        }
      })

      new Vue({
        el: '#dynamicexample',
        data: function () {
          return {
            direction: 'left'
          }
        }
      })
    ```

- 函数简写
  + 在很多时候，可能想在 bind 和 update 时触发相同的行为，而不关心其他钩子，可以这样写：
  ```js
    Vue.directive('demo', function(el, binding) {
      el.style.backgroundColor = binding.value;
    })
  ```

- 对象字面量
  + 如果指令需要多个值，就可以传入一个 javascript 对象字面两，指令函数能够接受所有合法的 javascript 表达式
  ```html
    <div v-demo="{ color: 'white', text: 'hello!' }"></div>
  ```
  ```js
    Vue.directive('demo', function (el, binding) {
      console.log(binding.value.color) // => "white"
      console.log(binding.value.text)  // => "hello!"
    })
  ```

### 插件
- 插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制，一般有下面几种：
  1. 添加全局方法或者 property
  2. 添加全局资源：指令/过滤器/过渡等
  3. 通过全局混入来添加一些组件选项
  4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现
  5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。

- 使用插件
  + 通过全局方法 Vue.use() 使用插件。需要在 new Vue() 之前调用
  ```js
    // 调用 `MyPlugin.install(Vue)`
    Vue.use(MyPlugin)

    new Vue({
      // ...组件选项
    })

    // 也可以传入一个可选的选项对象：
    Vue.use(MyPlugin, { someOption: true })
  ```
  + Vue.use 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件。
  + Vue.js 官方提供的一些插件 (例如 vue-router) 在检测到 Vue 是可访问的全局变量时会自动调用 Vue.use()。然而在像 CommonJS 这样的模块环境中，你应该始终显式地调用 Vue.use()
    ```js
      // 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
      var Vue = require('vue')
      var VueRouter = require('vue-router')

      // 不要忘了调用此方法
      Vue.use(VueRouter)
    ```

- 开发插件
  + Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
  ```js
    MyPlugin.install = function(vue, options) {
      // 1. 添加全局方法或 property
      Vue.myGlobalMethod = function () {
        // 逻辑...
      }

      // 2. 添加全局资源
      Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
          // 逻辑...
        }
        ...
      })

      // 3. 注入组件选项
      Vue.mixin({
        created: function () {
          // 逻辑...
        }
        ...
      })

      // 4. 添加实例方法
      Vue.prototype.$myMethod = function (methodOptions) {
        // 逻辑...
      }
    }
  ```

### 过滤器
- Vue 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式中。过滤器应该被添加在 javascript 表达式的尾部，由“管道”符号指示
  ```html
    <!-- 在双花括号中 -->
    {{ message | capitalize }}

    <!-- 在 `v-bind` 中 -->
    <div v-bind:id="rawId | formatId"></div>
  ```
- 你可以在一个组件的选项中定义本地的过滤器：
  ```js
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  ```
- 或者在创建 Vue 实例之前全局定义过滤器：
  ```js
    Vue.filter('capitalize', function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    })

    new Vue({
      // ...
    })
  ```

- 过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，capitalize 过滤器函数将会收到 message 的值作为第一个参数。
- 过滤器可以串联：
  ```html
    {{ message | filterA | filterB }}
  ```
- 在这个例子中，filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 filterB，将 filterA 的结果传递到 filterB 中。

- 过滤器是 JavaScript 函数，因此可以接收参数：
  ```html
    {{ message | filterA('arg1', arg2) }}
  ```
- 这里，filterA 被定义为接收三个参数的过滤器函数。其中 message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数。

### 渲染函数 & JSX
- 基础

- 节点、树以及虚拟DOM
  + 虚拟DOM

- createElement 参数
  + 深入数据对象
  + 完整示例
  + 约束

- 使用 javascript 代替模板功能
  + v-if 和 v-for
  + v-model
  + 事件 & 按键修饰符
  + 插槽

- JSX
  + 函数式组件
    - 向子元素或子组件传递 attribute 和事件
    - slots 和 children 对比

  + 模板编译