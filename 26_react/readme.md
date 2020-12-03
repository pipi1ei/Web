### React 是什么

- 官方解释：a JavaScript library for building user interfaces

### react 特点

- 声明式编程
  - 声明式编程是目前整个大前端的开发模式：Vue、React、Flutter、SwiftUI
  - 它允许我们只要维护自己的状态，当状态改变时，React 可以根据最新的状态去渲染我们的 UI 界面
- 组件化开发
- 多平台适配
  - 2013 年，React 发布之初主要开发 web 界面
  - 2015 年，FaceBook 推出了 ReactNative，用于开发移动端跨平台；（虽然目前 flutter 很火爆，但仍有很多公司使用 ReactNative）
  - 2017 年，Facebook 推出了 ReactVR，用于开发虚拟现实 Web 应用程序；（随着 5G 的火爆，VR 也会是一个火爆的应用场景）

### React 开发依赖

- 开发 react 项目必须依赖三个库：

  - react：包含 react 所必须的核心代码
  - react-dom：react 渲染在不同平台所需的核心代码
  - babel：将 jsx 转成 React 代码的工具

- 在 react 0.14 版本之前是没有 react-dom 这个概念的，所有的功能都包含在 react 里
- 为什么要进行拆分呢？原因就是 react-native
- react 包中包含了 react 和 react-native 所共同拥有的核心代码
- react-dom 针对 web 和 native 所完成的事情不同

  - web 端：react-dom 会将 jsx 最终渲染成真实的 dom，显示在浏览器中
  - native 端：react-dom 会将 jsx 最终渲染成原生的控件（比如 Android 中的 Button，ios 中的 UIButton）

- babel：

  - babel 是目前前端使用最广泛的编辑器、转换器
  - 比如当下很多浏览器并不支持 ES6 的语法，使用 Babel 工具可以将 ES6 语法转化成浏览器可以识别的 ES5 语法

- react 和 babel 的关系

  - 默认情况下开发 react 其实可以不用 babel
  - 但是前提是我们使用 React.createElement 来编写代码，它编写的代码非常繁琐且可读性差
  - 我们可以使用 jsx（JavaScript XML）的语法，并且 babel 帮助我们转换成 React.createElement

- 如何引入这三个依赖：
  - CDN 引入
  - 下载后本地依赖
  - npm（后续在脚手架中使用）

### 基本使用-hello react

- 导入三个包：

```html
<!-- crossorigin 的作用是源码内部发生的错误能在控制台上显示出来 -->
<script
  src="https://unpkg.com/react@17/umd/react.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
  crossorigin
></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

- hello react

```html
<div id="app"></div>
<script type="text/babel">
  let message = "hello world";

  function btnClick() {
    console.log("按钮点击了");

    message = "hello React"; // 这种方式界面不会发生改变
    render();
  }

  function render() {
    ReactDOM.render(
      <div>
        <h2>{message}</h2>
        <button onClick={btnClick}>改变文字</button>
      </div>,
      document.getElementById("app")
    );
  }

  render();
</script>
```

- 组件形式实现

```html
<div id="app"></div>

<script type="text/babel">
  class App extends React.Component {
    constructor() {
      super()
      this.state = {
        message = 'hello world'
      }
    }

    render() {
      return (
        <div>
          <h2>{this.state.message}</h2>
          <button onClick={this.btnClick.bind(this)}>改变文本</button>
        </div>
      )
    }

    btnClick() {
      // setState 方法来源于父类
      this.setState({
        message: 'hello react'
      })
    }
  }

  ReactDOM.render(<App/>, document.getElementById('app'))
</script>
```

- ReactDOM.render 函数
  - 参数 1：传递要渲染的内容，这个内容可以是 HTML 元素，也可以是 React 组件
  - 参数 2：将渲染的内容，挂载到哪一个 HTML 元素上

## JSX

### 认识 JSX

```js
const element = <h2>hello world</h2>;
ReactDOM.render(element, document.getElementById("app"));
```

- 上面这段 element 变量的声明右侧赋值的标签语法是什么呢？

  - 它不是一段字符串（因为没有引号包裹），它看起来是一段 HTML 元素，但是在 js 中是不能给一个变量直接赋值 html 的，需要在 script 标签中添加 type="text/babel"，同时引入 babel 包。这其实就是一段 jsx 语法

- jsx 是什么？

  - JSX 是一种 JavaScript 的语法扩展，也在很多地方称之为 JavaScript XML，因为看起来就是一段 XML 语法
  - 它用于描述我们的 UI 界面，并且完全可以和 JavaScript 融合在一起使用
  - 它不同于 vue 中的模板语法，你不需要专门学习一种模板语法中的一些指令（如：v-if，b-bind 等）

- 为什么 React 选择了 JSX

  - React 认为渲染逻辑本质上与其他 UI 逻辑存在内在耦合
    - 比如 UI 需要绑定事件（button，a 元素等）
    - 比如 UI 中需要展示状态数据，在某些状态发生改变时，又需要改变 UI
  - 它们之间密不可分，所以 React 没有将标记分离到不同的文件中，而是将它们组合到了一起，这个地方就是组件（Component）

- JSX 其实是嵌入到 JavaScript 中的一种结构语法

### JSX 的书写规范

- JSX 的顶层只能有一个根元素，所以我们很多时候会在外层包裹一个 div 元素（或者使用后面学习的 Fragment）
- 为了方便阅读，通常在 jsx 的最外层包裹一个小括号()，这样可以方便阅读，并且 jsx 可以换行书写
- jsx 中的标签可以是单标签，也可以是双标签，单标签必须以 /> 结尾

- jsx 中如何写注释：`{/* 注释内容 */}`

  ```html
  <script type="text/babel">
    <div>
      {/* 我是一段注释 */}
      <h2>hello world</h2>
    </div>;
  </script>
  ```

- JSX 嵌入表达式

  - 如果 jsx 中的内容是动态的，可以通过表达式来获取
  - 书写规则：{表达式}
  - 大括号内可以是变量、字符串、函数调用等任意 js 表达式

- jsx 中嵌入变量

  - 情况一：当变量是 Number，String，Array 类型时，可以直接显示
  - 情况二：当变量时 null，undefined，Boolean 类型时，内容为空
    - 如果希望显示 null, undefined, Boolean ，则需要转换成字符串
    - 转换的方式有很多，比如 toString 方法，和空字符串拼接，String()方法等
  - 情况三：对象类型不能作为子元素（not valid as React child）

- jsx 绑定属性

  - 绑定元素都有的 title 属性
  - 绑定 img 元素的 src 属性
  - 绑定 a 元素的 href 属性
  - 绑定 class
    - 绑定 class 时，在 html 中需要写成 className，因为在 jsx 中，class 表示 es6 的关键字，所以需要使用 className 做替换，不然会报警告。如`<div className="box title">我是div元素</div>`
  - 绑定 style
    - style 后面跟的是对象类型，对象中是样式的属性名和属性值。下面例子中第一个{}是 jsx 的语法要求，第二个 {} 是对象类型的字面量
    - 注意：这里会将属性名转成驼峰标识，而不是连接符-
    ```jsx
    <div style={{ fontSize: "14px", color: "red", backgroundColor: "blue" }}>
      我是文本
    </div>
    ```

  ```js
  function getImgWithSize(imgUrl, size) {
    return `${imgUrl}?param=${size}y${size}`;
  }

  class App extends React.Component {
    constructor() {
      super();
      this.state = {
        message: "hello world",
        title: "标题",
        imgUrl:
          "http://p1.music.126.net/LSRuQ41KTobByAc-XHuQSA==/109951165470281204.jpg?param=200y200",
      };
    }

    render() {
      const { imgUrl, title } = this.state;

      return (
        <div>
          <h2>{this.state.message}</h2>
          <h2 title={title}>我是标题</h2>
          <img src={getImgWithSize(imgUrl, 230)} />
        </div>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById("app"));
  ```

- jsx 绑定事件

  - jsx 中绑定事件时需要绑定 this，一般使用以下方式
    1. 显式绑定this
    ```jsx
      <button onClick={this.btnClick.bind(this)}>按钮</button>
      // 或在constructor 中显示绑定
      constructor(props) {
        super(props)
        this.btnClick = this.btnClick.bind(this)
      }
      <button onClick={this.btnClick}>按钮</button>
    ```
    2. class fields 模式
    ``` jsx
      class App extends React.Component {
        constructor(props) {
          super(props)
        }

        render() {
          return (<button onClick={this.btnClick}>按钮</button>)
        }

        btnClick = () => {
          // doSomething
        }
      }
    ```
    3. 使用箭头函数调用组件内的方法(推荐), 这种方式还可以传递参数
    ``` jsx
      class App extends React.Component {
        constructor(props) {
          super(props)
        }

        render() {
          return (<button onClick={e => this.btnClick('arg1', 'arg2')}>按钮</button>)
        }

        btnClick = (arg1, arg2) => {
          // doSomething
        }
      }
    ```

- react 条件渲染
  - 在某些情况下，界面内容会根据不同的情况显示不同的内容，或者决定是否渲染某部分内容
  - 在 vue 中，可以通过 v-if, v-show 等指令实现
  - 在 react 中，所有的条件判断都和普通的 JavaScript 代码一致
  - 常见的条件渲染方式
    - 条件判断语句：适合逻辑较多的地方
  - v-show 效果
  * 针对一个 HTML 元素，渲染和不渲染之间如果切换的十分频繁，那么会相对比较损耗性能
  * 在开发中，可以通过 display 属性来控制元素的显示和隐藏
  * 在 vue 中可以使用 v-show 指令，react 没有指令，可以更加灵活的实现该方式（但需要自己实现）

    ```jsx
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          userName: 'pipilei',
          isLogin: false
        }
      }

      render() {
        const {userName, isLogin} = this.state
        const nameDisplay = isLogin ? 'block' : 'none'

        return (
          <div>
            <h2 style={{display: nameDisplay}}>{userName}</h2>
            <button onClick={() => {this.toggleLogin()}>{isLogin ? "退出" : "登陆"}</button>
          </div>
        )
      }

      toggleLogin() {
        this.setState({
          isLogin: !this.state.isLogin
        })
      }
    }

    ```

### JSX 原理

#### JSX 本质

实际上，jsx 仅仅是 React.createElement(component, props, ...children) 函数的语法糖

- 所有的 jsx 最终都会被转成 React.createElement 的函数调用
- React.createElement 的源码位置在 react/src/forks/ReactElement.js

createElement 需要传递三个参数：

- 参数一：type
  - 当前 ReactElement 的类型
  - 如果是标签元素，那么就使用字符串表示 “div”
  - 如果是组件元素，那么就直接使用组件的名称
- 参数二：config
  - 所有的 jsx 中的属性都在 config 中以对象的属性和值的形式存储
- 参数三：children
  - 存放在标签中的内容，以 children 数组的方式进行存储
  - 当然，如果有多个元素呢？React 内部有对它们进行处理，处理的源码在下方

对 children 进行处理

- 从第二个参数开始，将其他所有的参数，放到 props 对象的 children 中

  ```js
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (__DEV__) {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }
  ```

- 使用 React.createElement 方式实现

  ```js
  /**
       * jsx 模板：
       * <div className="app2">
          <div className="header">
            <h1 title="我是网站标题">我是网站标题</h1>
          </div>
          <div className="content">
            <h2>我是h2元素</h2>
            <button onClick={e => console.log('+1')}>+1</button>
            <button onClick={e => console.log('-1')}>-1</button>
          </div>
          <div className="footer">
            <p>我是网站的尾部</p>
          </div>
        </div>
       * */

  class App2 extends React.Component {
    render() {
      const result = React.createElement(
        "div",
        { className: "App2" },
        React.createElement(
          "div",
          { className: "header" },
          React.createElement(
            "h1",
            { title: "\u6807\u9898" },
            "\u6211\u662F\u7F51\u7AD9\u6807\u9898"
          )
        ),
        React.createElement(
          "div",
          { className: "content" },
          React.createElement("h2", null, "\u6211\u662Fh2\u5143\u7D20"),
          React.createElement(
            "button",
            { onClick: (e) => console.log("+1") },
            "+1"
          ),
          React.createElement(
            "button",
            { onClick: (e) => console.log("-1") },
            "-1"
          )
        ),
        React.createElement(
          "div",
          { className: "footer" },
          React.createElement(
            "p",
            null,
            "\u6211\u662F\u7F51\u7AD9\u7684\u5C3E\u90E8"
          )
        )
      );

      return result;
    }
  }

  ReactDOM.render(
    React.createElement(App2, null),
    document.getElementById("app2")
  );
  ```

  上面的代码就没有使用 jsx 来写，所以这种情况下不再需要 babel 相关的内容，可以把 script 中的 type="text/babel" 和 babel 包给去除了

#### 虚拟 DOM

- 虚拟 DOM 的创建过程

  我们通过 React.createElement 最终创建出来一个 ReactElement 对象：

  ```js
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  );
  ```

  这个 ReactElement 对象是什么作用呢？为什么要创建它呢？

  - 原因是 React 利用 ReactElement 对象组成了一个 javascript 对象树
  - javascript 的对象树就是虚拟 DOM（Virtual DOM）

  如何查看 ReactElement 的树结构呢

  - 可以将 jsx 的返回结果进行打印

    ```jsx
    render() {
      const jsx = (
        <div className="app">
          <div className="header">
            <h1 title="标题">我是网站标题</h1>
          </div>
          <div className="content">
            <h2>我是h2元素</h2>
            <button onClick={e => console.log("+1")}>+1</button>
            <button onClick={e => console.log("+1")}>-1</button>
          </div>
          <div className="footer">
            <p>我是网站的尾部</p>
          </div>
        </div>
      )
      console.log(jsx);
      return jsx;
    }
    ```

  - ReactElement 最终形成的树结构就是虚拟 DOM

  - 整个转换过程：jsx --> React.createElement函数 --> ReactElement 对象 --> ReactDOM.render --> 真实 DOM

- 为什么采用虚拟 DOM，而不是直接修改真实 DOM 呢

  - 修改真实 DOM 很难追踪状态发生的改变：原有的开发模式很难追踪到状态发生的改变，不方便对应用程序进行调试
  - 操作真实 DOM 性能较低：传统的开发模式会进行频繁的 DOM 操作，而这一做法性能非常低

- DOM 操作性能低：

  - 首先，document.createElement 本身创建出来的就是一个非常复杂的对象
  - 其次，DOM 操作会引起浏览器的回流和重绘，所以在开发中应该避免频繁的 DOM 操作

- 虚拟 DOM 帮助我们从命令式编程转到了声明式编程

  - React 官方的说法：Virtual DOM 是一种编程理念
  - 在这个理念中，UI 以一种理想化的或者虚拟化的方式保存在内存中，并且它是一个相对简单的 javascript 对象，我们可以通过 ReactDOM.render 让虚拟 DOM 和真实 DOM 同步起来，这个过程叫做协调
  - 这种编程方式赋予了 React 声明式的 API：你只需要告诉 React 希望让 UI 是什么状态，React 来确保 DOM 和这些状态是匹配的
  - 你不需要直接进行 DOM 操作，就可以从手动更改 DOM、属性操作、事件处理中解放出来

### 阶段案例 - 购物车案例
- 详见：./02_jsx核心语法1/11_购物车综合案例.html

### React 脚手架
#### 认识脚手架
- 前端工程的复杂化：
如果只是开发几个小的demo程序，那么不需要考虑以下复杂的问题：
  + 目录结构如何划分
  + 如何管理文件之间的相互依赖
  + 管理第三方模块的依赖
  + 项目发布前如何压缩、打包

现在的前端项目已经越来越复杂了：
  + 不再是在 HTML 中引入几个 css、js 文件或者第三方的 js 文件这么简单
  + 比如 css 可能是 less，sass 等预处理器编写，我们需要将它们转成 css 才能被浏览器解析
  + 比如 javascript 代码不再只是编写在几个文件中，而是通过模块化的方式，被组成在成百上千个文件中，我们需要通过模块化的技术来管理它们之间的相互依赖
  + 比如项目依赖很多第三方库，如何更好的管理它们（比如管理它们的依赖、版本升级等）

为了解决上面这些问题，我们需要再去学习一些工具
  + 比如 babel、webpack、gulp。配置它们转换规则，打包依赖，热更新等一系列内容，你会发现还没有开始做项目，就面临了一系列工程化的问题

- 脚手架是什么？
编程中提到的脚手架（Scaffold），其实是一种工具，帮我们可以快速生成项目的工程化结构：
  + 每个项目做出完成的效果不同，但它们的基本结构是相似的
  + 既然相似，就没有必要每次都从零开始搭建，完全可以使用一些工具，帮助我们生成基本的工程化模板
  + 不同的项目，在这个模板的基础上进行项目开发或者进行一些简单的配置即可
  + 这样也可以间接的保证项目的结构一致性，方便后期的维护

总结：**脚手架让项目从搭建到开发，再到部署，整个流程变得快速和便捷**

脚手架的作用是帮助我们生成一个通用的目录结构，并且已经将我们所需的工程环境配置好
这里我们主要是学习React，所以我们还是以React的脚手架工具：create-react-app 作为讲解；


#### create-react-app
- 安装react脚手架：`npm install -g create-react-app`
- 创建React项目
  + 创建命令： `create-react-app 项目名称`
  + 上面的创建方式，默认使用 yarn 来管理整个项目包相关的依赖的
  + 如果希望使用 npm，也可以在参数后面加上：--use-npm
- 创建完成后，进入对应的项目目录，就可以将项目跑起来
  + cd 项目目录
  + yarn start
- 目录结构分析：
  test-react
  ├─ README.md // readme说明文档
  ├─ package.json // 对整个应用程序的描述：包括应用名称、版本号、一些依赖包、以及项目的启动、打包等等（node管理项目必备文件）
  ├─ public
  │    ├─ favicon.ico // 应用程序顶部的icon图标
  │    ├─ index.html // 应用的index.html入口文件
  │    ├─ logo192.png // 被在manifest.json中使用
  │    ├─ logo512.png // 被在manifest.json中使用
  │    ├─ manifest.json // 和Web app配置相关
  │    └─ robots.txt // 指定搜索引擎可以或者无法爬取哪些文件
  ├─ src
  │    ├─ App.css // App组件相关的样式
  │    ├─ App.js // App组件的代码文件
  │    ├─ App.test.js // App组件的测试代码文件
  │    ├─ index.css // 全局的样式文件
  │    ├─ index.js // 整个应用程序的入口文件
  │    ├─ logo.svg // 刚才启动项目，所看到的React图标
  │    ├─ serviceWorker.js // 默认帮助我们写好的注册PWA相关的代码
  │    └─ setupTests.js // 测试初始化文件
  └─ yarn.lock

  整个目录结构都比较好理解，只有一个 PWA 相关的概念：
    + PWA 全称 Progressive Web App，即渐进式 WEB 应用
    + 一个PWA应用首先应该是一个网页，可以通过 web 技术编写出一个网页应用，随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能
    + 这种 web存在的形式，我们也称之为 Web App
  
  PWA 解决了哪些问题？
    + 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
    + 实现离线缓存功能，即使用户手机没网络，依然可以使用一些离线功能
    + 实现了消息推送等一系列类似于 Native App 相关的功能

- webpack配置
  我们说过React的脚手架是基于Webpack来配置的：
    + webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)；
    + 当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle；
  
  但是，很奇怪：我们并没有在目录结构中看到任何webpack相关的内容？
    + 原因是脚手架将webpack相关的配置隐藏起来了（Vue 从 Vue Cli3 开始也是进行了隐藏）
  
  如果我们希望看到webpack的配置信息，应该怎么做呢？
    + 我们可以执行一个package.json 文件中的脚本：`"eject": "react-scripts eject"`
    + 这个操作是不可逆的，所以在执行过程中会给我们提示
    + 执行完上述命令后悔产生config文件夹和scripts 文件夹，它们里面的内容就是 webpack 的相关配置
  