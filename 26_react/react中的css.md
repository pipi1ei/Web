## React 中的 css 方案
目前整个前端已经是组件化的天下，而css设计就不是为组件化而生的，所以在目前组件化的框架中都需要一种合适的css解决方案

### React 中的 css
事实上，css一直是React的痛点，也是被很多开发者吐槽、诟病的一个点。
在组件化中选择合适的CSS解决方案应该符合以下条件：
  - 可以编写局部css：css具备自己的作用域，不会污染其他组件内的元素
  - 可以动态的编写css：可以获取当前组件的一些状态，根据状态的变化生成不同的css样式
  - 支持所有的css特性：伪类、动画、媒体查询等
  - 编写起来简洁方便、最好符合一贯的css风格特点

在这一点上，Vue做的要远远好于React：
  - Vue通过在.vue文件中编写 <style><style> 标签来编写自己的样式；
  - 通过是否添加 scoped 属性来决定编写的样式是全局有效还是局部有效；
  - 通过 lang 属性来设置你喜欢的 less、sass等预处理器；
  - 通过内联样式风格的方式来根据最新状态设置和改变css；
Vue在CSS上虽然不能称之为完美，但是已经足够简洁、自然、方便了，至少统一的样式风格不会出现多个开发人员、多个项目采用不一样的样式风格。

相比而言，React官方并没有给出在React中统一的样式风格：
  - 从普通的css到css modules，再到css in js，有几十种不同的方案，上百个不同的库
  - 大家一致在寻找最好的或者说最适合自己的CSS方案，但是到目前为止也没有统一的方案；

在这篇文章中，我会介绍挑选四种解决方案来介绍：
  - 内联样式的css写法
  - 普通的css写法
  - css modules
  - css in js（styled-components）

### 普通的解决方案
1. 内联样式
内联样式是官方推荐的一种css样式的写法：
  - style 接受一个采用**小驼峰式命名的javascript对象**，而不是css字符串
  - 并且可以引用state中的状态来设置相关的样式
  ```jsx
    class App extends React.PureComponent {
      constructor(props) {
        super(props)
        this.state = {
          titleColor: 'red'
        }
      }

      render() {
        return(
          <div>
            <h2 style={{color: this.state.titleColor, fontSize: "20px"}}>我是APP标题</h2>
            <p style={{color: "green", textDecoration: "underline"}}>我是一段文字描述</p>
          </div>
        )
      }
    }

    ReactDOM.render(<App/>, document.getElementById('app'))
  ```

内联样式的优点：
  - 样式之间不会有冲突
  - 可以动态获取当前state中的状态

内联样式的缺点：
  - 写法上都需要使用驼峰标识
  - 某些样式没有提示
  - 大量的样式, 代码混乱
  - 某些样式无法编写(比如伪类/伪元素)

所以官方依然是希望内联合适和普通的css来结合编写；

2. 普通的css
普通的css我们通常会编写到一个单独的文件。
App.js中编写React逻辑代码：
```jsx
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="app">
        <h2 className="title">我是App的标题</h2>
        <p className="desc">我是App中的一段文字描述</p>
        <Home/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
```

App.css中编写React样式代码：
```css
.title {
  color: red;
  font-size: 20px;
}

.desc {
  color: green;
  text-decoration: underline;
}
```

这样的编写方式和普通的网页开发中编写方式是一致的：
  - 如果我们按照普通的网页标准去编写，那么也不会有太大的问题；
  - 但是组件化开发中我们总是希望组件是一个独立的模块，即便是样式也只是在自己内部生效，不会相互影响；
  - 但是普通的css都属于全局的css，样式之间会相互影响；
比如编写Home.js的逻辑代码：
```jsx
import React, { PureComponent } from 'react';
import './Home.css';

export default class Home extends PureComponent {
  render() {
    return (
      <div className="home">
        <h2 className="title">我是Home标题</h2>
        <span className="desc">我是Home中的span段落</span>
      </div>
    )
  }
}
```
又编写了Home.css的样式代码：
```css
.title {
  color: orange;
}

.desc {
  color: purple;
}
```
最终样式之间会相互层叠，只有一个样式会生效；

3. css modules
css modules 并不是react 特有的解决方案，而是所有使用了类似于 webpack 配置环境下都可以使用的
但是，如果在其他项目中使用，那么我们需要自己来进行配置，比如配置webpack.config.js中的 `modules: true` 等
但是，React的脚手架已经内置了 css modules 的配置
  - .css/.less/.scss等样式文件都修改成 .module.css/.module.less/.module.scss 等
  - 之后就可以引用并且进行使用了
使用的方式如下：
```jsx
import styles from "App.modules.css"

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="app">
        <h2 className={styles.title}>我是App的标题</h2>
        <p className={styles.desc}>我是App中的一段文字描述</p>
      </div>
    )
  }
}
```

这种css使用方式最终生成的class名称会全局唯一
css modules确实解决了局部作用域的问题，也是很多人喜欢在React中使用的一种方案。
但是这种方案也有自己的缺陷：
  - 引用的类名，不能使用连接符(.home-title)，在 javascript 中是不识别的
  - 所有的className都必须使用{style.className}的形式来编写
  - 不方便动态来修改某些样式，依然需要使用内联样式的方式


### CSS in JS
1. 认识CSS in JS
实际上，官方文档也有提到过CSS in JS这种方案：
  - “CSS-in-JS” 是指一种模式，其中 CSS 由 JavaScript 生成而不是在外部文件中定义；
  - 注意此功能并不是 React 的一部分，而是由第三方库提供。 React 对样式如何定义并没有明确态度；

在传统的前端开发中，我们通常会将结构（HTML）、样式（CSS）、逻辑（JavaScript）进行分离。
  - 但是在前面的学习中，我们就提到过，React的思想中认为逻辑本身和UI是无法分离的，所以才会有了JSX的语法。
  - 样式呢？样式也是属于UI的一部分；
  - 事实上CSS-in-JS的模式就是一种将样式（CSS）也写入到JavaScript中的方式，并且可以方便的使用JavaScript的状态；
  - 所以React有被人称之为 All in JS；

当然，这种开发的方式也受到了很多的批评：
批评声音虽然有，但是在我们看来很多优秀的CSS-in-JS的库依然非常强大、方便：
  - CSS-in-JS 通过javascript来为css赋予一些能力，包括类似于css预处理器一样的样式嵌套、函数定义、逻辑复用、动态修改状态等等
  - 虽然css预处理器也具备某些能力，但是动态获取状态是一个不好处理的点
  - 所以，目前可以说CSS-in-JS是React编写CSS最为受欢迎的一种解决方案

目前比较流行的CSS-in-JS的库有哪些呢？
  - styled-components
  - emotion
  - glamorous

目前可以说styled-components依然是社区最流行的CSS-in-JS库，所以我们以styled-components的讲解为主；
安装styled-components：`yarn add styled-components`

2. styled-components
- 标签模板字符串
  ES6种增加了模板字符串的语法，这个对于很多人来说都会使用
  但是模板字符串中还有另一种用法：标签模板字符串（Tagged Template Literals）
  我们来看一个普通的javascript函数
  ```js
    function foo(...args) {
      console.log(args)
    }

    foo("hello world")
  ```
  正常情况下，我们都是使用函数名的方式来进行调用的，其实函数还有另外一种调用方式
  ```js
    foo`hello world`
  ```
  如果我们在调用时插入了其他变量：
    - 模板字符串被拆分了
    - 第一个元素是数组，是被模板字符串拆分的字符组合
    - 后面的元素是一个个模板字符串传入的内容
  ```js
    foo`hello ${name}`;  // [["hello ", ""], "kobe"]
  ```

  在 styled-components 中，就是通过这种方式来解析模板字符串，最终生成我们想要的样式的

- styled 基本使用
  styled-components 的本质是通过函数调用，最终创建出一个*组件*
    + 这个组件会被自动添加上一个不重复的 class
    + styled-components 会给该 class 添加相关的样式

  比如我们正常开发出来的Home组件是这样的格式：
  ```html
  <div>
    <h2>我是Home标题</h2>
    <ul>
      <li>我是列表1</li>
      <li>我是列表2</li>
      <li>我是列表3</li>
    </ul>
  </div>
  ```
  我们希望给最外层的 div 添加一个特殊的 class，并且添加相关的样式
  ```jsx
    const HomeWrapper = styled.div`
      color: purple;
    `

    export default class Home extends PureComponent {
      render() {
        return (
          <HomeWrapper>
            <h2>我是Home标题</h2>
            <ul>
              <li>我是列表1</li>
              <li>我是列表2</li>
              <li>我是列表3</li>
            </ul>
          </HomeWrapper>
        )
      }
    }
  ```

  另外，它支持类似于css预处理器一样的样式嵌套
    + 支持直接子代选择器或后代选择器，并且直接编写样式
    + 可以通过 & 符号获取当前元素
    + 支持伪类选择器、伪元素等
  ```jsx
    const HomeWrapper = styled.div`
      color: purple;

      h2 {
        font-size: 50px;
      }

      ul > li {
        color: orange;

        &.active {
          color: red;
        }

        &:hover {
          background: #aaa;
        }

        &::after {
          content: "abc"
        }
      }
    `
  ```

3. props、attrs 属性
- props可以穿透
  定义一个 styled 组件
  ```jsx
    const HYInput = styled.input`
      border-color: red;

      &:focus {
        outline-color: orange;
      }
    `
  ```

  使用styled的组件：
  ```jsx
    <HYInput type="password"/>
  ```

  props可以被传递给 styled 组件
  ```jsx
    <HomeWrapper color="blue">
    </HomeWrapper>
  ```
  使用时可以获取到传入的color：
    - 获取 props 需要通过${}传入一个插值函数，props会作为该函数的参数
    - 这种方式可以有效的解决动态样式的问题
  ```jsx
    const HomeWrapper = styled.div`
      color: ${props => props.color};
    }
  ```

- 添加attrs属性
  ```jsx
    const HYInput = styled.input.attrs({
      placeholder: "请输入密码",
      paddingLeft: props => props.left || "5px"
    })`
      border-color: red;
      padding-left: ${props => props.paddingLeft};

      &:focus {
        outline-color: orange;
      }
    `
  ```

4. styled高级特性
- 支持样式的继承
编写styled 组件
```jsx
const HYButton = styled.button`
  padding: 8px 30px;
  border-radius: 5px;
`

const HYWarnButton = styled(HYButton)`
  background-color: red;
  color: #fff;
`

const HYPrimaryButton = styled(HYButton)`
  background-color: green;
  color: #fff;
`
```

按钮的使用
```html
<HYButton>我是普通按钮</HYButton>
<HYWarnButton>我是警告按钮</HYWarnButton>
<HYPrimaryButton>我是主要按钮</HYPrimaryButton>
```
- styled设置主题
在全局定制自己的主题，通过Provider进行共享：
```jsx
import { ThemeProvider } from 'styled-components'

<ThemeProvider theme={{color: "red", fontSize: "30px"}}>
  <Home />
  <Profile />
</ThemeProvider>
```

在styled组件中可以获取到主题的内容：
```jsx
const ProfileWrapper = styled.div`
  color: ${props => props.theme.color};
  font-size: ${props => props.theme.fontSize};
`
```

5. classnames
- vue中添加class
  在vue中给一个元素添加动态的class是一件非常简单的事情：
  你可以通过传入一个对象：
  ```jsx
  <div
    class="static"
    v-bind:class="{ active: isActive, 'text-danger': hasError }"
  ></div>
  ```
  你也可以传入一个数组：
  ```jsx
  <div v-bind:class="[activeClass, errorClass]"></div>
  ```
  甚至是对象和数组混合使用：
  ```jsx
  <div v-bind:class="[{ active: isActive }, errorClass]"></div>
  ```

- react中添加class
  react 在 jsx 给我们开发者足够多的灵活性，你可以像编写JavaScript代码一样，通过一些逻辑来决定是否添加某些class：
  ```jsx
    import React, { PureComponent } from 'react'

    export default class App extends PureComponent {
      constructor(props) {
        super(props);

        this.state = {
          isActive: true
        }
      }

      render() {
        const {isActive} = this.state; 

        return (
          <div>
            <h2 className={"title " + (isActive ? "active": "")}>我是标题</h2>
            <h2 className={["title", (isActive ? "active": "")].join(" ")}>我是标题</h2>
          </div>
        )
      }
    }
  ```
  这个时候我们可以借助于一个第三方的库：classnames
    + 很明显，这是一个用于动态添加classnames的一个库。
  使用案例
  ```jsx
    classNames('foo', 'bar'); // => 'foo bar'
    classNames('foo', { bar: true }); // => 'foo bar'
    classNames({ 'foo-bar': true }); // => 'foo-bar'
    classNames({ 'foo-bar': false }); // => ''
    classNames({ foo: true }, { bar: true }); // => 'foo bar'
    classNames({ foo: true, bar: true }); // => 'foo bar'

    // lots of arguments of various types
    classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

    // other falsy values are just ignored
    classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
  ```