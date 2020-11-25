### React 是什么
- 官方解释：a JavaScript library for building user interfaces

### react 特点
- 声明式编程
  + 声明式编程是目前整个大前端的开发模式：Vue、React、Flutter、SwiftUI
  + 它允许我们只要维护自己的状态，当状态改变时，React 可以根据最新的状态去渲染我们的UI界面
- 组件化开发
- 多平台适配
  + 2013年，React 发布之初主要开发web界面
  + 2015年，FaceBook 推出了 ReactNative，用于开发移动端跨平台；（虽然目前 flutter 很火爆，但仍有很多公司使用 ReactNative）
  + 2017年，Facebook 推出了ReactVR，用于开发虚拟现实 Web应用程序；（随着5G的火爆，VR也会是一个火爆的应用场景）

### React 开发依赖
- 开发 react 项目必须依赖三个库：
  + react：包含react所必须的核心代码
  + react-dom：react渲染在不同平台所需的核心代码
  + babel：将jsx转成React代码的工具

- 在 react 0.14版本之前是没有react-dom这个概念的，所有的功能都包含在react里
- 为什么要进行拆分呢？原因就是 react-native
- react包中包含了react和react-native所共同拥有的核心代码
- react-dom 针对web和native所完成的事情不同
  + web端：react-dom会将 jsx 最终渲染成真实的dom，显示在浏览器中
  + native端：react-dom会将 jsx 最终渲染成原生的控件（比如Android中的Button，ios中的UIButton）

- babel：
  + babel 是目前前端使用最广泛的编辑器、转换器
  + 比如当下很多浏览器并不支持ES6的语法，使用Babel工具可以将ES6语法转化成浏览器可以识别的ES5语法

- react 和 babel 的关系
  + 默认情况下开发react其实可以不用babel
  + 但是前提是我们使用 React.createElement 来编写代码，它编写的代码非常繁琐且可读性差
  + 我们可以使用 jsx（JavaScript XML）的语法，并且babel帮助我们转换成React.createElement 

- 如何引入这三个依赖：
  + CDN 引入
  + 下载后本地依赖
  + npm（后续在脚手架中使用）

### 基本使用-hello react
- 导入三个包：
```html
<!-- crossorigin 的作用是源码内部发生的错误能在控制台上显示出来 -->
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

- hello react
```html
  <div id="app"></div>
  <script type="text/babel">
    let message = 'hello world'

    function btnClick() {
      console.log('按钮点击了')
      
      message = 'hello React'   // 这种方式界面不会发生改变
      render()
    }

    function render() {
      ReactDOM.render(
        <div>
          <h2>{message}</h2>
          <button onClick={btnClick}>改变文字</button>
        </div>,
        document.getElementById('app')
      )
    }

    render()
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

## JSX
### 认识 JSX
```js
  const element = <h2>hello world</h2>
  ReactDOM.render(element, document.getElementById('app'))
```
- 上面这段 element 变量的声明右侧赋值的标签语法是什么呢？
  + 它不是一段字符串（因为没有引号包裹），它看起来是一段HTML元素，但是在 js 中是不能给一个变量直接赋值html的，需要在 script 标签中添加 type="text/babel"，同时引入 babel 包。这其实就是一段 jsx 语法

- jsx 是什么？
  + JSX 是一种 JavaScript 的语法扩展，也在很多地方称之为 JavaScript XML，因为看起来就是一段 XML 语法
  + 它用于描述我们的UI界面，并且完全可以和 JavaScript 融合在一起使用
  + 它不同于 vue 中的模板语法，你不需要专门学习一种模板语法中的一些指令（如：v-if，b-bind 等）

- 为什么 React 选择了 JSX
  + React 认为渲染逻辑本质上与其他UI逻辑存在内在耦合
    - 比如UI需要绑定事件（button，a 元素等）
    - 比如UI中需要展示状态数据，在某些状态发生改变时，又需要改变UI
  + 它们之间密不可分，所以 React 没有将标记分离到不同的文件中，而是将它们组合到了一起，这个地方就是组件（Component）

- JSX其实是嵌入到JavaScript中的一种结构语法

### JSX的书写规范
- JSX 的顶层只能有一个根元素，所以我们很多时候会在外层包裹一个 div 元素（或者使用后面学习的 Fragment）
- 为了方便阅读，通常在 jsx 的最外层包裹一个小括号()，这样可以方便阅读，并且 jsx 可以换行书写
- jsx 中的标签可以是单标签，也可以是双标签，单标签必须以 /> 结尾

- jsx 中如何写注释：`{/* 注释内容 */}`
  ```html
    <script type="text/babel">
      (
        <div>
          {/* 我是一段注释 */}
          <h2>hello world</h2>
        </div>
      )
    </script>
  ```

- jsx 中嵌入变量
  + 情况一：当变量是 Number，String，Array 类型时，可以直接显示
  + 情况二：当变量时 null，undefined，Boolean类型时，内容为空
    - 如果希望显示 null, undefined, Boolean ，则需要转换成字符串
    - 转换的方式有很多，比如 toString 方法，和空字符串拼接，String()方法等
  + 情况三：对象类型不能作为子元素（not valid as React child）