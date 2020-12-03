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
