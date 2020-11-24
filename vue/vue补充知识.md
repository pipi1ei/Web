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
  + vue 推荐在绝大多数情况下使用模板来创建HTML。然而在一些场景中，需要 javascript 的完全编程的能力。这时候可以使用渲染函数，它比模板更接近编译器。
  + 举个例子：这个例子里的 render 函数很实用。假设我们要生成一些带锚点的标题：
    ```html
      <h1>
        <a name="hello-world" href="#hello-world">
          Hello World
        </a>
      </h1>
    ```
  + 对于上面的 HTML，你决定这样定义组件接口：
    ```html
      <anchored-heading :level="1">Hello World</anchored-heading>
    ```
  + 当开始写一个只能通过 level prop 动态生成标题组件时，你可能很快想到这样实现：
    ```html
      <script type="text/x-template" id="anchored-heading-template">
        <h1 v-if="level == 1">
          <slot></slot>
        </h1>
        <h2 v-else-if="level == 2">
          <slot></slot>
        </h2>
        <h3 v-else-if="level == 3">
          <slot></slot>
        </h3>
        <h4 v-else-if="level == 4">
          <slot></slot>
        </h4>
        <h5 v-else-if="level == 5">
          <slot></slot>
        </h5>
        <h6 v-else-if="level == 6">
          <slot></slot>
        </h6>
      </script>
    ```
    ```js
      Vue.component('anchored-heading', {
        template: '#anchored-heading-template',
        props: {
          level: {
            type: Number,
            required: true
          }
        }
      })
    ```
  + 在这里使用模板并不是最好的选择，不但代码冗长，而且在每一个级别的标题中重复书写了<slot></slot>，要在插入锚点元素时还要再次复用。
  + 虽然模板在大多数组件中都非常好用，但是显然在这里它不合适了。那么我们使用 **render 函数**来重写上面的例子：
    ```js
      Vue.component('anchored-heading', {
        render(createElement) {
          return createElement(
            'h' + this.level,     // 标签名称
            this.$slots.default   // 子节点数组
          )
        },
        props: {
          level: {
            type: Number,
            required: true
          }
        }
      })
    ```
  + 这样代码精简很多，但是需要非常熟悉 Vue 的实例 property。在这个例子中，你需要知道，向组件中传递不带 v-slot 指令的子节点时，比如 anchored-heading 中的 Hello world!，这些子节点被存储在组件实例中的 $slots.default 中。

- 节点、树以及虚拟DOM
  + 虚拟DOM
    - Vue 通过建立一个虚拟 DOM 来追踪自己要如何改变真实 DOM。
      ```js
        return createElement('h1', this.blogTitle)
      ```
    - createElement 返回的不是一个真实的 DOM，它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为 *虚拟节点（VNode）*，虚拟DOM 是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

- createElement 参数
  ```js
    // return {VNode}
    createElement(
      // {String | Object | Function}
      // 一个HTML标签名、组件选项对象，或者 resolve 了上述任何一种的 async 函数。必填项
      'div',

      // {Object}
      // 一个与模板中 attribute 对应的 数据对象。可选
      {
        // 详见下一节
      },

      // {String | Array}
      // 子集虚拟节点（VNodes），由 createElement() 构建而成
      // 也可以用字符串来生成“文本虚拟节点”，可选
      [
        '先写一些文字',
        createElement('h1', '一则头条'),
        createElement(MyComponent, {
          props: {
            someProp: 'foobar'
          }
        }),
      ]
    )
  ```
  + 深入数据对象
    - 有一点需要注意：正如 v-bind:class 和 v-bind:style 在模板语法中会被特别对待一样，它们在 VNode 数据对象中也有对应的顶层字段。该对象也允许你绑定普通的HTML attribute，也允许绑定如 innerHTML 这样的 DOM property（这会覆盖 v-html指令）
    ```js
      {
        // 与 v-bind:class 的 API 相同，
        // 接受一个字符串、对象或字符串和对象组成的数组
        class: {
          foo: true,
          bar: false
        },

        // 与 v-bind:style 的 API 相同，
        // 接受一个字符串、对象或对象组成的数组
        style: {
          color: 'red',
          fontSize: '14px'
        },

        // 普通的 HTML attribute
        attrs: {
          id: 'foo'
        },

        // 组件 props
        props: {  
          myProp: 'bar'
        },

        // DOM property
        domProps: {
          innerHTML: 'baz'
        },

        // 事件监听器在 `on` 内，
        // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
        // 需要在处理函数中手动检查 keyCode。
        on: {
          click: this.clickHandler
        },

        // 仅用于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
        nativeOn: {
          click: this.nativeClickHandler
        },

        // 自定义指令。注意：无法对 binding 中的 oldValue 赋值，因为 Vue 已经自动为你进行了同步
        directives: [
          {
            name: 'custom-directive',
            value: '2',
            expression: '1 + 1',
            arg: 'foo',
            modifiers: {
              bar: true
            }
          }
        ],

        // 作用域插槽的格式为： {name: props => VNode | Array<VNode>}
        copedSlots: {
          default: props => createElement('span', props.text)
        },

        // 如果组件是其他组件的子组件，需要为插槽指定名称
        slot: 'name-of-slot',

        // 其他特殊顶层 property
        key: 'myKey',
        ref: 'myRef', 
        // 如果你在渲染函数中给多个元素都使用了相同的 ref名，那么 $refs.myRef 会变成一个数组
        refInFor: true
      }
    ```

  + 完整示例
  + 约束
    - VNode 必须唯一：组件树中的 VNode 必须是唯一的。这意味着下面的渲染函数是不合法的
      ```js
        render: function(createElement) {
          var myParagraphVNode = createElement('p', 'hi);
          return createElement('div', [
            // 错误，重复的 VNode
            myParagraphVNode, myParagraphVNode
          ])
        }
      ```
    - 如果真的需要重复很多次的元素/组件，可以使用工厂函数来实现。下面这渲染函数用合法的方式渲染了20个相同的段落：
      ```js
        render: function(createElement) {
          Array.apply(null, {length: 20}).map(function() {
            return createElement('p', 'hi')
          })
        }
      ```

- 使用 javascript 代替模板功能
  + v-if 和 v-for
    - 只要在原生的 Javascript 中可以轻松完成的操作，Vue 的渲染函数就不会提供专有的替代方法。比如：在模板中使用的 v-if 和 v-for
    ```html
      <ul v-if="items.length">
        <li v-for="item in items">{{ item.name }}</li>
      </ul>
      <p v-else>Not items found</p>
    ```
    - 这些都可以在渲染函数中用 javascript 的 if/else 和 map 来重写
    ```js
      props: ['items'],
      render: function(createElement) {
        if(this.items.length) {
          return createElement('ul', this.items.map(function(item) {
            return createElement('li', item.name)
          }))
        } else {
          return createElement('p', 'Not items found')
        }
      }
    ``` 

  + v-model
    - 渲染函数中没有与 v-model 的直接对应，必须自己实现相应逻辑：
    ```js
      props: ['value'],
      render(createElement) {
        var self = this;
        return createElement('input', {
          domProps: {
            value: self.value
          },
          on: {
            input(event) {
              self.$emit('input', event.target.value)
            }
          }
        })
      }
    ```

  + 事件 & 按键修饰符
    - 对于 .passive，.capture, .once 这些事件修饰符，Vue 提供了相应的前缀可以用于 on：
    修饰符                  前缀
    .passive                &
    .capture                !
    .once                   ~
    .capture.once 或        ~!
    .once.capture
    - 例如：
    ```js
      on: {
        '!click': this.doThisInCapturingMode,
        '~keyup': this.doThisOnce,
        '~!mouseover': this.doThisOnceInCapturingMode
      }
    ```
    - 对于其他的修饰符，私有前缀都不是必须的，因为你可以在事件处理函数中使用事件方法：
      1. .stop：event.stopPropagation()
      2. .prevent：event.preventDefault()
      3. .self：if(event.target !== event.currentTarget) return
      4. .enter, .13：if(event.keyCode !== 13) return
      5. .ctrl, .alt, .shift, .meta：if(!event.ctrlKey) return; （(将 ctrlKey 分别修改为 altKey、shiftKey 或者 metaKey)）
    - 这里是一个使用所有修饰符的例子：
    ```js 
      on: {
        keyup(e) {
          // 如果触发事件的元素不是绑定元素，则返回
          if(e.target !== e.currentTarget) return;
          // 如果按下去的不是 enter 键或者没有同时按下 shift 键，则返回
          if(e.keyCode !== 13 || !e.shiftKey) return;
          // 阻止事件冒泡
          e.stopPropagation()
          // 阻止该元素默认的事件
          e.preventDefault()
        }
      }
    ```

  + 插槽
    - 你可以通过 this.$slots 访问静态插槽的内容，每个插槽都是一个 VNode 数组：
    ```js
      render(createElement) {
        // <div><slot></slot></div>
        return createElement('div', this.$slots.default)
      }
    ```
    - 也可以通过 this.$scopedSlots 访问作用域插槽，每个作用域插槽都是一个返回若干 VNode 的函数：
    ```js
      props: ['message'],
      render(h) {
        // <div><slot :text="message"></slot></div>
        return h('div', [
          this.$scopedSlots.default({
            text: this.message
          })
        ])
      }
    ```
    - 如果要用渲染函数向子组件中传递作用域插槽，可以利用 VNode 数据对象中的 scopedSlots 字段
      ```js
        render(h) {
          // <div><child v-slot="props"><span>{{ props.text }}</span></child></div>
          return h('div', [
            createElement('child', {
              // 在数据对象中传递 scopedSlots，格式为 {name: props => VNode | Array<VNode>}
              default: functions(props) {
                return h('span', props.text)
              }
            })
          ])
        }
      ```

- JSX
  + 如果你写了很多 render 函数，可能会觉得下面这样的代码写起来很痛苦：
    ```js
      createElement('anchored-heading', {
        props: {
          level: 1
        }
      }, [
        createElement('span', 'hello'),
        'world'
      ])
    ```
    - 特别是对应的模板如此简单的情况下：
    ```html
      <anchored-heading :level="1">
        <span>Hello</span> world!
      </anchored-heading>
    ```
  + 这就是为什么会有一个 Babel 插件，用于在 Vue 中使用 JSX 语法，它可以让我们回到更接近于模板的语法上。
    ```js
      import AnchoredHeading from './AnchoredHeading.vue'

      new Vue({
        el: '#demo',
        render: function(h) {
          return (
            <AnchoredHeading level={1}>
              <span>Hello</span> world!
            </AnchoredHeading>
          )
        }
      })
    ```
    - 将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的。从 Vue 的 Babel 插件的 3.4.0 版本开始，我们会在以 ES2015 语法声明的含有 JSX 的任何方法和 getter 中 (不是函数或箭头函数中) 自动注入 const h = this.$createElement，这样你就可以去掉 (h) 参数了。对于更早版本的插件，如果 h 在当前作用域中不可用，应用会抛错。  

  + 函数式组件
    - 之前创建的锚点标题组件比较简单，没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法。事实上，它只是一个接受一些 prop 的函数。在这样的场景下，我们可以将组件标记为 functional，*这意味着它无状态（没有响应式数据），也没有实例（没有this上下文）*。一个函数式组件就像这样：
    ```js
      Vue.component('my-component', {
        functional: true,
        // props 是可选的
        props: {
          //...
        },
        // 为了弥补缺少的实例，提供第二个参数作为上下文
        render(h, context) {
          // ...
        }
      })
    ```
    - 注意：在 2.3.0 之前的版本中，如果一个函数式组件想要接收 prop，则 props 选项是必须的。在 2.3.0 或以上的版本中，你可以省略 props 选项，所有组件上的 attribute 都会被自动隐式解析为 prop。当使用函数式组件时，该引用将会是 HTMLElement，因为他们是无状态的也是无实例的。
    - 在 2.5.0 及以上版本中，如果你使用了单文件组件，那么基于模板的函数式组件可以这样声明：
      ```html
        <template functional></template>
      ```
    - 组件需要的一切都是通过 context 传递，它是一个包括如下字段的对象：
      + props：提供所有 prop 的对象
      + children：VNode 子节点的数组
      + slots：一个函数，返回了包含所有插槽的对象
      + scopedSlots：(2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
      + data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
      + parent：对父组件的引用
      + listeners：(2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
      + injections：(2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的 property。
    - 在添加 functional: true 之后，需要更新我们的锚点标题组件的渲染函数，为其增加 context 参数，并将 this.$slots.default 更新为 context.children，然后将 this.level 更新为 context.props.level。
    - 因为函数式组件只是函数，所以渲染开销也低很多。

    - 向子元素或子组件传递 attribute 和事件
    - slots 和 children 对比

  + 模板编译