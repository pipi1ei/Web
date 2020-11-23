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
  + 默认情况下开发react其实可以不同babel
  + 但是前提是我们使用 React.createElement 来编写代码，它编写的代码非常繁琐且可读性差
  + 我们可以使用 jsx（JavaScript XML）的语法，并且babel帮助我们转换成React.createElement 

- 如何引入这三个依赖：
  + CDN 引入
  + 下载后本地依赖
  + npm（后续在脚手架中使用）