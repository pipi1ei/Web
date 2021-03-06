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

## React 脚手架
### 认识脚手架
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


### create-react-app
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
    + 执行完上述命令后会产生config文件夹和scripts 文件夹，它们里面的内容就是 webpack 的相关配置
  

## Ant-Design
### AntDesign的介绍
AntDesign ，简称 antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。
AntDesign的特点：
  - 提炼自企业级中后台产品的交互语言和视觉风格。
  - 开箱即用的高质量 React 组件。
  - 使用 TypeScript 开发，提供完整的类型定义文件。
  - 全链路开发和设计工具体系。
  - 数十个国际化语言支持。
  - 深入每个细节的主题定制能力。

**全链路开发和设计指的是什么？**
  - 全链路这个词是16年左右阿里提出的；
  - 从**业务战略—用户场景—设计目标—交互体验—用户流程—预期效率**全方面进行分析和考虑；
  - 这个主要是产品经理会考虑的一个点；

AntDesign的兼容性：
  - 现代浏览器和 IE11（需要 polyfills）。
  - 支持服务端渲染。
  - Electron

antd@2.0 之后不再支持 IE8，antd@4.0 之后不再支持 IE9/10。

### AntDesign的安装
使用 npm 或 yarn 安装
npm安装：`npm install antd --save`
yarn安装：`yarn add antd`

我们需要在index.js中引入全局的Antd样式：`import "antd/dist/antd.css";`
在App.js中就可以使用一些组件了：

考虑一个问题：Antd是否会将一些没有用的代码（组件或者逻辑代码）引入，造成包很大呢？
  -  antd 官网有提到：antd 的 JS 代码默认支持基于 ES modules 的 tree shaking，对于 js 部分，直接引入 import { Button } from 'antd' 就会有按需加载的效果。

### 高级配置
1. 认识craco
上面的使用过程是无法对主题进行配置的，好像对主题等相关的高级特性进行配置，需要修改create-react-app 的默认配置。
如何修改create-react-app 的默认配置呢？
  - 前面我们讲过，可以通过yarn run eject来暴露出来对应的配置信息进行修改；
  - 但是对于webpack并不熟悉的人来说，直接修改 CRA 的配置是否会给你的项目带来负担，甚至会增加项目的隐患和不稳定性呢？
  - 所以，在项目开发中是不建议大家直接去修改 CRA 的配置信息的；

那么如何来进行修改默认配置呢？社区目前有两个比较常见的方案：
  - react-app-rewired + customize-cra；（这个是antd早期推荐的方案）
  - craco；（目前antd推荐的方案）

第一步：安装craco：`yarn add @craco/craco`
第二步：修改package.json文件
  - 原本启动时，我们是通过react-scripts来管理的；
  - 现在启动时，我们通过craco来管理；
  ```json
    "scripts": {
    -   "start": "react-scripts start",
    -   "build": "react-scripts build",
    -   "test": "react-scripts test",
    +   "start": "craco start",
    +   "build": "craco build",
    +   "test": "craco test",
    }
  ```
第三步：在根目录下创建craco.config.js文件用于修改默认配置
```js
module.exports = {
  // 配置文件
}
```

2. 配置主题
按照 配置主题 的要求，自定义主题需要用到类似 less-loader 提供的 less 变量覆盖功能：
  - 我们可以引入 craco-less 来帮助加载 less 样式和修改变量；
安装 craco-less：`yarn add craco-less`
修改craco.config.js中的plugins：
  - 使用modifyVars可以在运行时修改LESS变量；
  ```js
    const CracoLessPlugin = require('craco-less');

    module.exports = {
      plugins: [
        {
          plugin: CracoLessPlugin,
          options: {
            lessLoaderOptions: {
              lessOptions: {
                modifyVars: { '@primary-color': '#1DA57A' },
                javascriptEnabled: true,
              },
            },
          },
        },
      ],
    }
  ```
引入antd的样式时，引入antd.less文件：
```js
// import "antd/dist/antd.css";
import 'antd/dist/antd.less';
```
修改后重启 yarn start，如果看到一个绿色的按钮就说明配置成功了。

3. 配置别名
在项目开发中，某些组件或者文件的层级会较深，
  - 如果我们通过上层目录去引入就会出现这样的情况：../../../../components/button；
  - 如果我们可以配置别名，就可以直接从根目录下面开始查找文件：@/components/button，甚至是：components/button；
配置别名也需要修改webpack的配置，当然我们也可以借助于 craco 来完成：
```js
...

const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  ...
  ,
  webpack: {
    alias: {
      '@': resolve("src"),
      'components': resolve("src/components"),
    }
  }
}
```
在导入时就可以按照下面的方式来使用了：
```js
import HYCommentInput from '@/components/comment-input';
import HYCommentItem from 'components/comment-item';
```

### AntDesign案例: 详见：06_antd-demo
1. 案例-评论框
我们选来完成评论框，评论框有两部分组成：
  - TextArea的输入框：Input.TextArea；
  - 提交评论的按钮：Button；
```jsx
import React, { PureComponent } from 'react';

import moment from 'moment';
import {
  Form, Button, Input
} from 'antd';

export default class HYCommentInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    }
  }

  render() {
    return (
      <div>
        <Input.TextArea rows={4} onChange={this.onChange.bind(this)} value={this.state.value} />
        <Button onClick={this.onSubmit.bind(this)} type="primary">
          添加评论
        </Button>
      </div>
    )
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  onSubmit() {
    console.log(this.state.value, moment().fromNow());
    const commentInfo = {
      id: Date.now(),
      name: "coderwhy",
      avatar: "https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240",
      content: <p>{this.state.value}</p>,
      datetime: moment()
    }

    this.props.submitComment(commentInfo);
    this.setState({
      value: ""
    });
  }
}
```

2. 案例-评论列表
评论列表主要是使用Comment组件，Comment组件有一些属性：
  - author：展示作者的名称；
  - avatar：展示作者的头像；
    + 可以使用Avatar的组件进行展示；
  - content：展示评论的内容；
  - datetime：展示评论的时间：
    + 这里我们可以使用Tooltip组件，当鼠标放在上面时，会显示对应的title内容；
  - actions：评论下方的操作按钮；
    + 这里我们可以使用DeleteOutlined，但是它来自 @ant-design/icons，需要我们进行安装；
```jsx
import React, { PureComponent } from 'react';

import {
  Comment,
  Avatar,
  Tooltip
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default class HYCommentItem extends PureComponent {
  render() {
    const { comment } = this.props;

    return (
      <Comment
        author={<a href="/#">{comment.name}</a>}
        avatar={
          <Avatar
            src={comment.avatar}
            alt={comment.name}
          />
        }
        content={comment.content}
        datetime={
          <Tooltip title={comment.datetime.format('YYYY-MM-DD HH:mm:ss')}>
            <span>{comment.datetime.fromNow()}</span>
          </Tooltip>
        }
        actions={ this.getActions() }
      />
    )
  }

  getActions() {
    return [
      <span onClick={this.props.removeItem}><DeleteOutlined/> 删除</span>
    ]
  }
}
```

3. 案例-App组件
我们在App组件中，使用封装的两个组件：
```jsx
import React, { PureComponent } from 'react';

import HYCommentInput from './components/comment-input';
import HYCommentItem from './components/comment-item';

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      commentList: []
    }
  }

  render() {
    return (
      <div style={{width: "500px", padding: "20px"}}>
        {
          this.state.commentList.map((item, index) => {
            return <HYCommentItem key={item.id} 
                                  comment={item} 
                                  index={index} 
                                  removeItem={e => this.removeItem(index)}/>
          })
        }
        <HYCommentInput submitComment={this.submitComment.bind(this)}/>
      </div>
    )
  }

  submitComment(comment) {
    this.setState({
      commentList: [...this.state.commentList, comment]
    })
  }

  removeItem(index) {
    const newCommentList = [...this.state.commentList];
    newCommentList.splice(index, 1);
    this.setState({
      commentList: newCommentList
    })
  }
}

```

## React 过渡动画
在开发中，我们想要给一个组件的显示和消失添加某种过渡动画，可以很好的增加用户的体验。
当然，我们可以通过原生的css来实现这些过渡动画，但是 react 社区为我们提供了 react-transition-group 用来完成过渡动画
### react-transition-group介绍
React 曾为开发者提供过动画插件 `react-addons-css-transition-group`，后来由社区维护，形成了现在的 `react-transition-group
这个库可以帮我们方便的实现组件的*入场*和*离场*动画，使用时需要进行额外的安装
  - npm 方式: `npm install react-transition-group --save`
  - yarn 方式：`yarn add react-transition-group`

react-transition-group 本身非常小，不会为我们应用程序增加过多的负担
react-transition-group 主要包含四个组件
  - Transition
    + 该组件是一个和平台无关的组件（不一定要结合 css）
    + 在前端开发中，我们一般是结合css来完成动画，所以比较常用的是 CSSTransition
  - CSSTransition
    + 在前端开发中，通常使用CSSTransition来完成过渡动画效果
  - SwitchTransition
    + 两个组件显示和隐藏切换时，使用该组件
  - TransitionGroup
    + 将多个动画组件包裹在其中，一般用于列表中元素的动画；

### react-transition-group使用
1. CSSTransition
CSSTransition 是基于 Transition组件构建的
  - CSSTransition 的执行过程中，有三个状态：appear、enter、exit
  - 它们有三种状态，需要定义对应的css样式
    + 第一种：开始状态：对应的类是 -appear，-enter，-exit
    + 第二种：执行动画：对应的类是 -appear-active、-enter-active、-exit-active；
    + 第三种：执行结束：对应的类是 -appear-done、-enter-done、-exit-done；

CSSTransition 常见对应的属性
  - in：触发进入或者退出状态
    + 如果添加了 `unmountOnExit={true}`，那么该组件会在执行退出动画结束后被移除掉
    + 当 in 为 true 时，触发进入状态，会添加 -enter、-enter-active 的 class 来执行动画，当动画执行结束后，会移除这两个 class，并且添加 -enter-done 的class
    + 当 in 为 false 时，触发退出状态，会添加 -exit、-exit-active 的 class 开始执行动画，当动画执行结束后，会移除这两个 class，并且添加 -exit-done 的class
  
  - classNames：动画class的名称
    + 决定了在编写css时，对应的class名称，比如：card-enter、card-enter-active、card-enter-done

  - timeout：过渡动画的时间
  - appear：是否在初次进入添加动画（需要和in同时为true）
  - 其他属性可以参考官网来学习：https://reactcommunity.org/react-transition-group/transition

CSSTransition 对应的钩子函数：主要为了检测动画的执行过程，来完成一些javascript操作
  - onEnter：在进入动画之前被触发
  - onEntering：在进入动画时被触发
  - onEntered：在进入动画结束后被触发
  ```jsx
  import './App.css'

  import { CSSTransition } from 'react-transition-group';

  import { Card, Avatar, Button } from 'antd';
  import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

  const { Meta } = Card;

  export default class App extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isShowCard: true
      }
    }

    render() {
      return (
        <div>
          <Button type="primary" onClick={e => this.setState({isShowCard: !this.state.isShowCard})}>显示/隐藏</Button>
          <CSSTransition 
            in={this.state.isShowCard}
            classNames="card"
            timeout={1000}
            unmountOnExit={true}
            onEnter={el => console.log("进入动画前")}
            onEntering={el => console.log("进入动画")}
            onEntered={el => console.log("进入动画后")}
            onExit={el => console.log("退出动画前")}
            onExiting={el => console.log("退出动画")}
            onExited={el => console.log("退出动画后")}
          >
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
              />
            </Card>
          </CSSTransition>
        </div>
      )
    }
  }
  ```
  对应的css样式如下
  ```css
  .card-enter, .card-appear {
    opacity: 0;
    transform: scale(.8);
  }

  .card-enter-active, .card-appear-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }

  .card-exit {
    opacity: 1;
  }

  .card-exit-active {
    opacity: 0;
    transform: scale(.8);
    transition: opacity 300ms, transform 300ms;
  }
  ```

2. SwitchTransition
SwitchTransition可以完成两个组件之间切换的炫酷动画：
  - 比如我们有一个按钮需要在on和off之间切换，我们希望看到on先从左侧退出，off再从右侧进入；
  - 这个动画在vue中被称之为 vue transition modes；
  - react-transition-group中使用SwitchTransition来实现该动画；

SwitchTransition中主要有一个属性：mode，有两个值
  - in-out：表示新组件先进入，旧组件再移除；
  - out-in：表示就组件先移除，新组建再进入；

如何使用SwitchTransition呢？
  - SwitchTransition组件里面要有CSSTransition或者Transition组件，不能直接包裹你想要切换的组件；
  - SwitchTransition里面的CSSTransition或Transition组件不再像以前那样接受in属性来判断元素是何种状态，取而代之的是key属性；

我们来演练一个按钮的入场和出场效果：
```jsx
import { SwitchTransition, CSSTransition } from "react-transition-group";

export default class SwitchAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOn: true
    }
  }

  render() {
    const {isOn} = this.state;

    return (
      <SwitchTransition mode="out-in">
        <CSSTransition classNames="btn"
                       timeout={500}
                       key={isOn ? "on" : "off"}>
          {
          <button onClick={this.btnClick.bind(this)}>
            {isOn ? "on": "off"}
          </button>
        }
        </CSSTransition>
      </SwitchTransition>
    )
  }

  btnClick() {
    this.setState({isOn: !this.state.isOn})
  }
}
```
对应的css代码
```css
.btn-enter {
  transform: translate(100%, 0);
  opacity: 0;
}

.btn-enter-active {
  transform: translate(0, 0);
  opacity: 1;
  transition: all 500ms;
}

.btn-exit {
  transform: translate(0, 0);
  opacity: 1;
}

.btn-exit-active {
  transform: translate(-100%, 0);
  opacity: 0;
  transition: all 500ms;
}
```

3. TransitionGroup
当我们有一组动画时，需要将这些CSSTransition放入到一个TransitionGroup中来完成动画：
```jsx
import React, { PureComponent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class GroupAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    }
  }

  render() {
    return (
      <div>
        <TransitionGroup>
          {
            this.state.friends.map((item, index) => {
              return (
                <CSSTransition classNames="friend" timeout={300} key={index}>
                  <div>{item}</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick={e => this.addFriend()}>+friend</button>
      </div>
    )
  }

  addFriend() {
    this.setState({
      friends: [...this.state.friends, "coderwhy"]
    })
  }
}
```

对应的css代码
```css
.friend-enter, .friend-appear {
  opacity: 0;
}

.friend-enter-active, .friend-appear-active {
  opacity: 1;
  transition: all .5s;
}

.friend-exit {
  opacity: 1;
}

.friend-exit-active {
  opacity: 0;
  transition: all .5s;
}
```