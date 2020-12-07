## 认识组件化开发
- 什么是组件化？
人面对复杂问题的处理方式：
  + 任何一个人处理信息的逻辑能力都是有限的
  + 所以，当面对一个非常复杂的问题时，我们不太可能一次性搞定一大堆的内容。
  + 但是，我们人有一种天生的能力，就是将问题进行拆解。
  + 如果将一个复杂的问题，拆分成很多个可以处理的小问题，再将其放在整体当中，你会发现大的问题也会迎刃而解。

组件化也是类似的思想：
  + 如果我们将一个页面中所有的处理逻辑全部放在一起，处理起来就会变得非常复杂，而且不利于后续的管理以及扩展。
  + 但如果，我们讲一个页面拆分成一个个小的功能块，每个功能块完成属于自己这部分独立的功能，那么之后整个页面的管理和维护就变得非常容易了。

我们需要通过组件化的思想来思考整个应用程序：
  + 我们将一个完整的页面分成很多个组件；
  + 每个组件都用于实现页面的一个功能块；
  + 而每一个组件又可以进行细分；
  + 而组件本身又可以在多个地方进行复用；

- React的组件化
组件化是React的核心思想，也是我们后续课程的重点，前面我们封装的App本身就是一个组件：
  + 组件化提供了一种抽象，让我们可以开发出一个个独立可复用的小组件来构造我们的应用。
  + 任何的应用都会被抽象成一颗组件树。

组件化思想的应用：
  + 有了组件化的思想，我们在之后的开发中就要充分的利用它。
  + 尽可能的将页面拆分成一个个小的、可复用的组件。
  + 这样让我们的代码更加方便组织和管理，并且扩展性也更强。

React的组件相对于Vue更加的灵活和多样，按照不同的方式可以分成很多类组件：
  + **根据组件的定义方式**：可以分为：函数式组件（Functional Component）和类组件（Class Component）
  + **根据组件内部是否有状态需要维护**：可以分为：无状态组件（Stateless Component）和有状态组件（Stateful Component）
  + **根据组件不同的职责**：可以分为：展示型组件（Presentational Component）和容器型组件（Container Component）

这些概念有很多重叠，但是他们最主要是**关注数据逻辑和UI展示的分离**：
  + 函数组件、无状态组件、展示型组件主要关注UI的展示；
  + 类组件、有状态组件、容器型组件主要关注数据逻辑；

当然还有很多组件的其他概念：比如异步组件、高阶组件等，我们后续再学习。

## React 创建组件
### 创建类组件
- 类组件的定义有如下要求：
  + 必须继承自 React.Component
  + 必须实现 render 函数

- 在 ES6 之前，可以通过 create-react-class 模块来定义类组件，但是目前官网建议我们使用 ES6 的 class 类来定义组件

- 使用 class 定义一个组件
  + constructor 是可选的，我们通常在constructor 中初始化一些数据
  + this.state 中维护的就是我们组件内部的数据
  + render() 方法是 class 组件中唯一必须实现的方法
  ```jsx
    import React, { Component } from 'react';

    export default class App extends Component {
      constructor() {
        super();
        this.state = {
          
        }
      }

      render() {
        return <h2>Hello App</h2>
      }
    }
  ```
  
  当 render 被调用时，它会检查 this.props 和 this.state 的变化并返回以下类型之一
  + React 元素
    - 通常通过 jsx 创建
    - 例如，<div /> 会被 React 渲染为 DOM 节点，<MyComponent /> 会被 React 渲染为自定义组件；
    - 无论是 <div /> 还是 <MyComponent /> 均为 React 元素。
  + 数组或 fragments：使得 render 方法可以返回多个元素
  + Portals：可以渲染子节点到不同的 DOM 子树中
  + 字符串或数字类型：它们在 DOM 中被渲染为文本节点
  布尔类型或 null：什么都不渲染
  另外类组件有自己的生命周期

### 创建函数式组件
- 函数组件是使用 function 定义的组件，只是这个函数会返回和类组件中 render 函数返回一样的内容
- 函数组件有自己的特点：
  + 没有生命周期
  + 没有this（组件实例）
  + 没有内部状态（state）
- 下面是如何定义函数组件：
  ```jsx
    export default function App() {
      return (
        <div>hello world</div>
      )
    }
  ```

## 组件的生命周期
### 认识生命周期
- 很多的事物都有从创建到销毁的整个过程，这个过程称之为是生命周期；

- React组件也有自己的生命周期，了解组件的生命周期可以让我们在最合适的地方完成自己想要的功能；

- 生命周期和生命周期函数的关系：
  + 生命周期是一个抽象的概念，在生命周期的整个过程，分成了很多个阶段；
    - 比如装载阶段（Mount），组件第一次在DOM树中被渲染的过程；
    - 比如更新过程（Update），组件状态发生变化，重新更新渲染的过程；
    - 比如卸载过程（Unmount），组件从DOM树中被移除的过程；

  + React内部为了告诉我们当前处于哪些阶段，会对我们组件内部实现的某些函数进行回调，这些函数就是生命周期函数：
    - 比如实现componentDidMount函数：组件已经挂载到DOM上时，就会回调；
    - 比如实现componentDidUpdate函数：组件已经发生了更新时，就会回调；
    - 比如实现componentWillUnmount函数：组件即将被移除时，就会回调；
    - 我们可以在这些回调函数中编写自己的逻辑代码，来完成自己的需求功能；

- 我们谈React生命周期时，主要谈的类的生命周期，因为函数式组件是没有生命周期函数的；（后面我们可以通过hooks来模拟一些生命周期的回调）

### 生命周期解析
- componentDidMount：
  + 当我们挂载一个组件时，会先执行constructor构造方法来创建组件；
  + 紧接着调用render函数，获取要渲染的DOM结构（jsx），并且开始渲染DOM；
  + 当组件挂载成功（DOM渲染完成），会执行componentDidMount生命周期函数；

- componentDidUpdate
  + 当我们通过修改props，或者调用setState修改内部状态，或者直接调用forceUpdate时会重新调用render函数，进行更新操作；
  + 当更新完成时，会回调componentDidUpdate生命周期函数；

- componentWillUnmount
  + 当我们的组件不再使用，会被从DOM中移除掉（卸载）；
  + 这个时候会回调componentWillUnmount生命周期函数；

### 生命周期函数
- constructor：`constructor(props)`
  + 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。
  + constructor中通常只做两件事情：
    1. 通过给 this.state 赋值对象来初始化内部的state；
    2. 为事件绑定实例（this）；

- componentDidMount: `componentDidMount()`
  + componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。
  + componentDidMount中通常进行哪些操作呢？
    1. 依赖于DOM的操作可以在这里进行；
    2. 在此处发送网络请求就最好的地方；（官方建议）
    3. 可以在此处添加一些订阅（会在componentWillUnmount取消订阅）；

- componentDidUpdate: `componentDidUpdate(prevProps, prevState, snapshot)`
  + componentDidUpdate() 会在更新后会被立即调用，首次渲染不会执行此方法。
  + 当组件更新后，可以在此处对 DOM 进行操作；
  + 如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求；（例如，当 props 未发生变化时，则不会执行网络请求）。
  ```js
    componentDidUpdate(prevProps) {
      // 典型用法（不要忘记比较 props）：
      if(this.props.userID !== prevProps.userID) {
        this.fetchData(this.props.userID);
      }
    }
  ```

- componentWillUnmount: `componentWillUnmount()`
  + componentWillUnmount() 会在组件卸载及销毁之前直接调用。
  + 在此方法中执行必要的清理操作；
  + 例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等；

- 代码验证
  ```jsx
  import React, { Component } from 'react'

  class MyComponent extends Component {
    constructor(props) {
      super(props)
      console.log('MyComponent constructor')
    }

    render() {
      console.log('MyComponent render')
      return <h2>MyComponent</h2>
    }

    componentDidMount() {
      console.log('MyComponent componentDidMount')
    }

    componentDidUpdate() {
      console.log('MyComponent componentDidUpdate')
    }

    componentWillUnmount() {
      console.log('MyComponent componentWillUnmount')
    }
  }



  class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 0
      }
      console.log('App constructor')
    }

    render() {
      console.log('App render')
      return (
        <div>
          <h2>当前计数： {this.state.count}</h2>
          {this.state.count <= 5 && <MyComponent/>}
          <button onClick={e => this.btnClick()}>+1</button>
        </div>
      )
    } 

    btnClick() {
      this.setState({
        count: this.state.count + 1
      })
    }

    componentDidMount() {
      console.log('App componentDidMount')
    }

    componentDidUpdate() {
      console.log('App componentDidUpdate')
    }

    componentWillUnmount() {
      console.log('App componentWillUnmount')
    }
  }

  export default App;
  ```

- 不常用生命周期
除了上面介绍的生命周期函数之外，还有一些不常用的生命周期函数：
  + getDerivedStateFromProps：state 的值在任何时候都依赖于 props时使用；该方法返回一个对象来更新state；
  + getSnapshotBeforeUpdate：在React更新DOM之前回调的一个函数，可以获取DOM更新前的一些信息（比如说滚动位置）；
  + shouldComponentUpdate：该生命周期函数很常用，但是我们等待讲性能优化时再来详细讲解； 


## 父子组件通信
### 认识组件的嵌套
组件之间存在嵌套关系：

- 在之前的案例中，我们只是创建了一个组件App；
- 如果我们一个应用程序将所有的逻辑都放在一个组件中，那么这个组件就会变成非常的臃肿和难以维护；
- 所以组件化的核心思想应该是对组件进行拆分，拆分成一个个小的组件；
- 再将这些组件组合嵌套在一起，最终形成我们的应用程序；
我们来分析一下下面代码的嵌套逻辑：
```jsx
  function Header() {
    return (
      <h2>Header</h2>
    )
  }

  function Main() {
    return (
      <div>
        <Banner/>
        <ProductList/>  
      </div>
    )
  }

  function Banner() {
    return <div>Banner</div>
  }

  function ProductList() {
    return (
      <ul>
        <li>商品1</li>
        <li>商品2</li>
        <li>商品3</li>
        <li>商品4</li>
        <li>商品5</li>
      </ul>
    )
  }

  function Footer() {
    return <h2>Footer</h2>
  }

  class App extends React.Component {

    render() {
      return(
        <div>
          <Header />
          <Main/>
          <Footer/>
        </div>
      )
    }
  }

  ReactDOM.render(<App/>, document.getElementById('app'))
```
上面的嵌套关系如下：
  - App 组件是 Header、Main、Footer组件的父组件
  - Main 组件是 Banner、ProductList组件的父组件

在开发过程中，我们会经常遇到需要组件之间相互进行通信：
  - 比如App可能使用了多个Header，每个地方的Header展示的内容不同，那么我们就需要使用者传递给Header一些数据，让其进行展示；
  - 又比如我们在Main中一次性请求了Banner数据和ProductList数据，那么就需要传递给他们来进行展示；
  - 也可能是子组件中发生了事件，需要由父组件来完成某些操作，那就需要子组件向父组件传递事件；

父组件在展示子组件，可能会传递一些数据给子组件：
  - 父组件通过 属性=值 的形式来传递给子组件数据；
  - 子组件通过 props 参数获取父组件传递过来的数据；

### 父组件传递子组件
1. 子组件是 class 组件
我们这里先演示子组件是class组件：
```jsx
  class ChildCpn1 extends React.Component {
    constructor(props) {
      super()
      this.props = props
    }

    render() {
      const {name, age, height} = this.props

      return (
        <div>
          <h2>我是class子组件</h2>  
          <p>展示父组件传递过来的数据：{name} {age} {height}</p>
        </div>
      )
    }
  }

  class App extends React.Component {
    render() {
      return(
        <div>
          <ChildCpn1 name="pipi1ei" age="18" height="180" />
        </div>
      )
    }
  }
```
按照上面的结构，我们每个子组件都需要写一个构造器来完成：`this.props = props`，其实可以不用这样，我们可以调用 `super(props)`，我们来看一下 Component 的源码：
```js
  function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    // If a component has string refs, we will assign a different object later.
    this.refs = emptyObject;
     // We initialize the default updater but the real one gets injected by the renderer.
    this.updater = updater;
  }
```
  - 这里我们先不关心 context，updater，我们发现传入的 props 会被设置到this中（父类的对象），那么子类就可以继承过来

所以我们的构造方法可以换成下面的写法：
```js
  constructor(props) {
    super(props);
  }
```

甚至可以省略，因为如果不指定构造方法，则使用默认的构造函数，对于基类，默认构造函数是：
```js
  constructor() {}
```

对于派生类，默认构造函数是：
```js
  constructor(...args) {
    super(...args);
  }
```

2. 子组件是 function 组件
```jsx
  function ChildCpn2(props) {
    const {name, age, height} = props

    return (
      <div>
        <h2>我是function类型的子组件</h2>  
        <p>展示父组件传递过来的数据：{name} {age} {height}</p>
      </div>
    )
  }

  class App extends React.Component {
    render() {
      return(
        <div>
          <ChildCpn2 name="why" age="18" height="1.88"/>
          <ChildCpn2 name="kobe" age="30" height="1.98"/>
        </div>
      )
    }
  }
```
functional组件相对来说比较简单，因为不需要有构造方法，也不需要有this的问题。

3. 参数验证 propTypes
对于传递给子组件的数据，有时候我们可能希望进行验证，特别是对于大型项目来说：
  - 当然，如果项目中默认继承了 Flow 或 TypeScript，那么就可以直接进行类型验证
  - 但是，即使我们没有使用 Flow 或 Typescript，也可以通过 **prop-types** 库来进行参数验证

从 React v15.5 开始，React.PropTypes已移入另一个包中：prop-types 库
我们对之前的class组件进行验证：
```js
ChildCpn1.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  height: PropTypes.number
}
```
这时候，控制台就会报出警告

如果没有传递参数，我们希望有默认值可以使用 defaultProps
```js
ChildCpn1.defaultProps = {
  name: "王小波",
  age: 40,
  height: 1.92
}
```

### 子组件传递父组件
某些情况，我们也需要子组件向父组件传递消息：
  - 在vue中是通过自定义事件来完成的；
  - 在React中同样是通过props传递消息，只是让父组件给子组件传递一个回调函数，在子组件中调用这个函数即可；

我们这里来完成一个案例：
  - 将计数器案例进行拆解；
  - 将按钮封装到子组件中：CounterButton；
  - CounterButton发生点击事件，将内容传递到父组件中，修改counter的值；

```jsx
  function CounterButton(props) {
    const {operator, btnClick} = props
    return <button onClick={btnClick}>{operator}</button>
  }

  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        counter: 0
      }
    }

    render() {
      return(
        <div>
          <h2>当前计数：{this.state.counter}</h2>
          <CounterButton operator="+1" btnClick={e => this.changeCounter(1)} />
          <CounterButton operator="-1" btnClick={e => this.changeCounter(-1)} />
        </div>
      )
    }

    changeCounter(count) {
      this.setState({
        counter: this.state.counter + count
      })
    }
  }
```

### 组件通信练习
- 详见：./04_react组件化/04-component-communicate-demo

### React 插槽的实现
1. 为什么使用插槽？
在开发中，我们抽取了一个组件，但是为了让这个组件具备更强的通用性，我们不能将组件中的内容限制为固定的div、span等等这些元素。
我们应该让使用者可以决定某一块区域到底存放什么内容。
举个栗子：假如我们定制一个通用的导航组件 - NavBar
  - 这个组件分成三块区域：左边-中间-右边，每块区域的内容是不固定；
  - 左边区域可能显示一个菜单图标，也可能显示一个返回按钮，可能什么都不显示；
  - 中间区域可能显示一个搜索框，也可能是一个列表，也可能是一个标题，等等；
  - 右边可能是一个文字，也可能是一个图标，也可能什么都不显示；

这种需求在Vue当中有一个固定的做法是通过slot来完成的，React呢？
  - React对于这种需要插槽的情况非常灵活；
  - 有两种方案可以实现：children和props；

- 详见：./04_react组件化/05-react-slot