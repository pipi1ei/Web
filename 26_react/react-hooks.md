## Hook基本使用
### 认识hook
1. 为什么需要hook
Hook 是 React 16.8的新增特性，它可以让我们在不编写class 的情况下使用 state 以及其他的 React特性（比如生命周期）
我们先来思考下 *class组件* 相对于 *函数式组件* 有什么优势？比较常见的是下面的优势：
  - class 组件可以定义自己的state，用来保存组件自己内部的状态
    + 函数式组件不可以，因为函数每次调用都会产生新的临时变量
  - class 组件有自己的生命周期，我们可以在对应的生命周期中完成自己的逻辑
    + 比如在 componentDidMount 中发送网络请求，并且该生命周期函数只会执行一次
    + 函数式组件在学习 hooks 之前，如果在函数中发送网络请求，意味着每次重新渲染都会发送一次网络请求
  - class 组件可以在状态改变时只会重新执行render函数以及我们希望重新调用的生命周期函数componentDidUpdate等
    + 函数在重新渲染时，整个函数都会重新执行，似乎没有什么地方可以让它们只调用一次

所以在Hook出现之前，上面的情况我们通常都会编写class组件

**但是class组件依然存在很多问题**
*复杂组件变得难以理解*
  - 我们在最初编写一个class组件时，往往逻辑比较简单，并不会非常复杂。
  - 但是随着业务的增多，我们的class组件会变得越来越复杂；
  - 比如componentDidMount中，可能就会包含大量的逻辑代码：包括网络请求、一些事件的监听（还需要在componentWillUnmount中移除）；
  - 而对于这样的class实际上非常难以拆分：因为它们的逻辑往往混在一起，强行拆分反而会造成过度设计，增加代码的复杂度；

*难以理解的class*
  - 很多人发现学习ES6的class是学习React的一个障碍。
  - 比如在class中，我们必须搞清楚this的指向到底是谁，所以需要花很多的精力去学习this；
  - 虽然我认为前端开发人员必须掌握this，但是依然处理起来非常麻烦；

*组件复用状态很难*
  - 在前面为了一些状态的复用我们需要通过高阶组件或render props；
  - 像我们之前学习的redux中connect或者react-router中的withRouter，这些高阶组件设计的目的就是为了状态的复用；
  - 或者类似于Provider、Consumer来共享一些状态，但是多次使用Consumer时，我们的代码就会存在很多嵌套；
  - 这些代码让我们不管是编写和设计上来说，都变得非常困难；

Hook的出现，可以解决上面提到的这些问题；
简单总结一下hooks：
  - 它可以在不编写class组件的情况下使用state以及React的一些其他特性
  - 我们可以由此延伸出非常多的用法，来让我们前面所提到的问题得以解决

Hook 的使用场景：
  - Hook的出现基本可以代替我们之前所有使用class组件的地方（除了一些非常不常用的场景）；
  - 但是如果是一个旧的项目，你并不需要直接将所有的代码重构为Hooks，因为它完全向下兼容，你可以渐进式的来使用它；
  - Hook只能在函数式组件中使用，不能在类组件或者函数式组件之外的地方使用

2. hooks的基本演练
我们通过一个计数器案例，来对比一下class组件和函数式组件结合hooks的对比
- class组件实现
```jsx
import React, { PureComponent } from 'react'

export default class Counter1 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div>
        <h2>当前计数： {this.state.counter}</h2>
        <button onClick={e => this.changeCounter(1)}>+1</button>
        <button onClick={e => this.changeCounter(-1)}>-1</button>
      </div>
    )
  }

  changeCounter(changeValue) {
    this.setState({
      counter: this.state.counter + changeValue
    })
  }
}
```

- 函数式组件结合hooks实现
```jsx
import { useState } from 'react'

export default function Counter2() {
  const [count, setCount] = useState(1);

  return (
    <div>
      <h2>当前计数： {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setCount(count - 1)}>-1</button>
    </div>
  )
}
```
你会发现上面的代码差异非常大：函数式组件结合hooks让整个代码变得非常简洁，并且再也不用考虑this相关的问题；
那么我们来研究一下核心的一段代码`const [count, setCount] = useState(1)`是什么意思：
  - useState 来自 react，需要从 react 导入，它是一个hook
    + 元素一（count）：当前状态的值（第一次调用为初始值）
    + 元素二（setCount）：设置状态值的函数
    + 参数（1）：初始化值，如果不设置为 undefined
    + 返回值：数组，包含两个元素
  - 点击button后，会完成两件事情：
    + 调用setCount，设置一个新的值
    + 组件重新渲染，并根据新的值返回DOM结构
  - React在重新渲染时，会保留这个state状态，并不会每次都使用初始化值
  ```js
    const [count, setCount] = useState(0);
    // 等价于
    const counter = useState(0);
    const count = counter[0];
    const setCount = counter[1];
  ```

Hook就是javascript函数，这个函数可以帮你*钩入（hook into）*React state以及生命周期等一些特性
但是，使用它们会有两个额外的规则：
  - **只能在函数最外层调用Hook，不要在循环、条件判断、或者子函数中调用**
  - **只能在React函数式组件中调用Hook，不要再其他javascript函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，后面学习）。**

### hooks基础
1. State Hook
State Hook的API就是 useState，我们在前面已经进行了学习
  - **useState**会帮助我们定义一个 state变量，useState 是一种新方法，它与 class 里面的 this.state 提供的功能完全相同。一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。
  - **useState**接受唯一一个参数，在第一次组件被调用时使用来作为初始化值。（如果没有传递参数，那么初始化值为undefined）。
  - **useState**返回值是一个数组，我们可以通过数组的解构，来完成赋值会非常方便。

FAQ：为什么叫 useState 而不叫 createState?
  - “Create” 可能不是很准确，因为 state 只在组件首次渲染的时候被创建。
  - 在下一次重新渲染时，useState 返回给我们当前的 state。
  - 如果每次都创建新的变量，它就不是 “state”了。
  - 这也是 Hook 的名字总是以 use 开头的一个原因。
当然，我们也可以在一个组件中定义多个变量和复杂变量（数组、对象）：
```jsx
import React, { useState } from 'react';

export default function App() {
  const [age, setAge] = useState(18);
  const [names, setNames] = useState(['zhangsan', 'lisi']);
  const [info, setInfo] = useState({name: 'why', height: 1.98});

  function addFriend() {
    names.push('wangwu');
    console.log('addFriend', names);
    setNames(names);
  }

  return (
    <div>
      <h2>当前年龄: {age}</h2>
      <button onClick={e => setAge(age + 1)}>增加年龄</button>

      <h2>朋友列表</h2>
      <ul>
        {
          names.map((name, index) => {
          return <li key={index}>{name}</li>
          })
        }
      </ul>
      <button onClick={e => setNames([...names, 'coderwhy'])}>添加好友</button>

      {/* 思考: 这样的方式是否可以实现 */}
      <button onClick={e => addFriend()}>添加好友</button>

      <h2>我的信息：</h2>
      <div>名字：{info.name}</div>
      <div>身高：{info.height}</div>
      <button onClick={e => setInfo({...info, name: 'pipilei'})}>修改名字</button>
    </div>
  )
}
```

2. Effect Hook
目前我们已经通过hook在函数式组件中定义state，那么类似于生命周期这些呢？
  - Effect Hook 可以让你来完成类似于class组件中生命周期的功能
  - 事实上，类似于网络请求、手动更新DOM、一些时间的监听，都是React更新DOM的一些副作用（Side Effects）
  - 所以对于完成这些功能的Hook被称之为 Effect Hook；

Effect基本使用
假如我们现在有一个需求：页面的title总是显示counter的数字
使用class组件如何实现呢？
  - 我们会发现 document.title 的设置必须在两个生命周期中完成；
  - 这是因为React的class组件并没有给我们提供一个统一的生命周期函数，可以让无论是否是第一次渲染都会执行的生命周期函数；
```jsx
export default class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }
  }

  componentDidMount() {
    document.title = `当前计数：${this.state.counter}`
  }

  componentDidUpdate() {
    document.title = `当前计数：${this.state.counter}`
  }

  render() {
    return (
      <div>
        <h2>当前计数：{this.state.counter}</h2>
        <button onClick={e => this.changeCounter(1)}>+1</button>
        <button onClick={e => this.changeCounter(-1)}>-1</button>
      </div>
    )
  }

  changeCounter(value) {
    this.setState({
      counter: this.state.counter + value
    })
  }
}
```
这个时候，我们可以使用useEffect的Hook来完成：
```jsx
export default function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `当前计数：${count}`
  })

  return (
    <div>
      <h2>当前计数：{count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setCount(count - 1)}>-1</button>
    </div>
  )
}
```

useEffect的解析：
  - 通过 useEffect 的Hook，可以告诉React需要在渲染后执行某些操作
  - useEffect要求我们传入一个*回调函数*，在React执行完更新DOM操作之后，就会回调这个函数
  - 默认情况下，无论是第一次渲染之后还是每次更新之后，都会执行这个回调函数

需要清除Effect
在class组件的编写过程中，某些副作用的代码，我们需要在componentWillUnmount中进行清除：
  - 比如我们之前的事件总线或Redux中手动调用subscribe；
  - 都需要在componentWillUnmount有对应的取消订阅；
Effect Hook通过什么方式来模拟componentWillUnmount呢？
useEffect传入的回调函数A本身可以有一个返回值，这个返回值是另外一个回调函数B：
```ts
type EffectCallback = () => (void | (() => void | undefined));
```

我们可以这样来编写Effect Hook：
```jsx
import React, { useState, useEffect } from 'react';

export default function EffectHookClear() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `当前计数: ${count}`;
    console.log("每次DOM更新时会回调");

    return () => {
      console.log("DOM被移除时会回调")
    }
  })

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setCount(count - 1)}>-1</button>
    </div>
  )
}
```
为什么要在 effect 中返回一个函数？
  - 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数；
  - 如此可以将添加和移除订阅的逻辑放在一起；
  - 它们都属于 effect 的一部分；

React 何时清除 effect？
  - React 会在组件更新和卸载的时候执行清除操作；
  - 正如之前学到的，effect 在每次渲染的时候都会执行；

使用多个Effect
使用Hook的其中一个目的就是解决class中生命周期经常将很多的逻辑放在一起的问题：
  - 比如网络请求、事件监听、手动修改DOM，这些往往都会放在componentDidMount中；
使用Effect Hook，我们可以将它们分离到不同的useEffect中：
```jsx
import React, { useEffect } from 'react';

export default function MultiUseEffect() {
  useEffect(() => {
    console.log("网络请求")
  })

  useEffect(() => {
    console.log("DOM更新")
  })

  useEffect(() => {
    console.log("监听事件")

    return () => {
      console.log("取消监听")
    }
  })

  return (
    <div>
      <h2>MultiUseEffect</h2>
    </div>
  )
}
```
Hook 允许我们按照代码的用途分离它们， 而不是像生命周期函数那样：
  - React 将按照 effect 声明的顺序依次调用组件中的每一个 effect；

**Effect性能优化**
默认情况下，useEffect的回调函数会在每次渲染时都重新执行，但是这会导致两个问题：
  - 某些代码我们只是希望执行一次即可，类似于componentDidMount和componentWillUnmount中完成的事情；（比如网络请求、订阅和取消订阅）；
  - 另外，多次执行也会导致一定的性能问题；
我们如何决定useEffect在什么时候应该执行和什么时候不应该执行呢？
  - useEffect实际上有两个参数：
  - 参数一：执行的回调函数；
  - 参数二：该useEffect在哪些state发生变化时，才重新执行；（受谁的影响）
我们来看下面的一个案例：
  - 在这个案例中，我们修改show的值，是不会让useEffect重新被执行的；
```jsx
import React, { useState, useEffect } from 'react';

export default function EffectPerformance() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log("修改DOM");
  }, [count])

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setShow(!show)}>切换</button>
    </div>
  )
}
```
但是，如果一个函数我们不希望依赖任何的内容时，也可以传入一个空的数组 []：
  - 那么这里的两个回调函数分别对应的就是componentDidMount和componentWillUnmount生命周期函数了；
  ```jsx
    useEffect(() => {
      console.log("监听事件");

      return () => {
        console.log("取消监听");
      }
    }, [])
  ```

3. Context Hook
在之前的开发中，我们要在组件中使用共享的Context有两种方式：
  - 类组件可以通过 类名.contextType = MyContext方式，在类中获取context；
  - 多个Context或者在函数式组件中通过 MyContext.Consumer 方式共享context；
但是多个Context共享时的方式会存在大量的嵌套：
  - Context Hook允许我们通过Hook来直接获取某个Context的值；
  ```jsx
    const value = useContext(MyContext)
  ```

在App.js中使用Context
```jsx
import React, { createContext } from 'react';

import ContextHook from './04_useContext使用/01_ContextHook';

export const UserContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  return (
    <div>
      <UserContext.Provider value={{name: "why", age: 18}}>
        <ThemeContext.Provider value={{color: "red", fontSize: "20px"}}>
          <ContextHook/>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </div>
  )
}
```

在对应的函数式组件中使用Context Hook：
```jsx
import React, { useContext } from 'react'
import { UserContext, ThemeContext } from '../App'

export default function ContextHook() {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  console.log(user);
  console.log(theme);

  return (
    <div>
      ContextHook
    </div>
  )
}
```
**注意事项**：当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重新渲染，并使用最新传递给 MyContext provider 的 context value 值。


## Hook高级使用
### Hook高级使用
1. useReducer
很多人看到useReducer的第一反应应该是redux的某个替代品，其实并不是。
useReducer 仅仅是 useState 的一种替代方案
  - 在某些场景下，如果state的处理逻辑比较复杂，我们可以通过useReducer来对其进行拆分
  - 或者这次修改的state需要依赖之前的state时，也可以使用

单独创建 reducer/counter.js
```jsx
export function counterReducer(state, action) {
  switch(action.type) {
    case "increment":
      return {...state, counter: state.counter + 1}
    case "decrement":
      return {...state, counter: state.counter - 1}
    default:
      return state;
  }
}
```
home.js
```jsx
import React, { useReducer } from 'react'
import { counterReducer } from '../reducer/counter'

export default function Home() {
  const [state, dispatch] = useReducer(counterReducer, {counter: 100});

  return (
    <div>
      <h2>当前计数: {state.counter}</h2>
      <button onClick={e => dispatch({type: "increment"})}>+1</button>
      <button onClick={e => dispatch({type: "decrement"})}>-1</button>
    </div>
  )
}
```
我们来看一下，如果我们创建另外一个profile.js也使用这个reducer函数，是否会进行数据的共享：
```jsx
import React, { useReducer } from 'react'
import { counterReducer } from '../reducer/counter'

export default function Profile() {
  const [state, dispatch] = useReducer(counterReducer, {counter: 0});

  return (
    <div>
      <h2>当前计数: {state.counter}</h2>
      <button onClick={e => dispatch({type: "increment"})}>+1</button>
      <button onClick={e => dispatch({type: "decrement"})}>-1</button>
    </div>
  )
}
```

数据是不会共享的，它们只是使用了相同的counterReducer而已。
**所以，useReducer只是useState的一种替代品，并不能替代Redux。**

2. useCallback
useCallback 的实际目的是为了性能优化
如何进行性能优化呢？
  - useCallback会返回一个函数的 memoized（记忆的）值
  - 在依赖不变的情况下，多次定义的时候，返回值是相同的
  ```jsx
    const memoizedCallback = useCallback(
      () => {
        doSomething(a, b)
      },
      [a, b]
    );
  ```

我们来看下面一段很有趣的代码：
  - increment1在每次函数组件重新渲染的时候，会返回相同的值
  - increment2每次定义的都是不同的值
  - 问题：是否increment1会比increment2更加节省性能呢？
    + 事实上，经过一些测试，并没有更加节省性能，因为useCallback中还是会传入一个函数作为参数
    + 所有并不存在increment2每次创建新的函数，而increment1不需要创建新的函数这种性能优化
  - 那么为什么说useCallback是为了进行性能优化呢？
  ```jsx
  import React, { memo, useState, useCallback } from 'react'

  export default function CallbackHookDemo() {
    const [count, setCount] = useState(0);

    const increment1 = useCallback(function increment() {
      setCount(count + 1);
    }, []);

    const increment2 = function() {
      setCount(count + 1);
    }

    return (
      <div>
        <h2>当前计数: {count}</h2>
        <button onClick={increment1}>+1</button>
        <button onClick={increment2}>+1</button>
      </div>
    )
  }
  ```

我们来对上面的代码进行改进：
  - 在下面的代码中，我们将回调函数传递给了子组件，在子组件中会进行调用
  - 在发生点击时，我们会发现接受increment1的子组件不会重新渲染，但是接受increment2的自组件会重新渲染
  - 所以，useCallback最主要用于性能渲染的地方应该是和memo结合起来，决定子组件是否需要重新渲染
  ```jsx
  import React, { memo, useState, useCallback } from 'react';

  const CounterIncrement = memo((props) => {
    console.log("CounterIncrement被渲染:", props.name);
    return <button onClick={props.increment}>+1</button>
  })

  export default function CallbackHookDemo() {
    const [count, setCount] = useState(0);

    const increment1 = useCallback(function increment() {
      setCount(count + 1);
    }, []);

    const increment2 = function() {
      setCount(count + 1);
    }

    return (
      <div>
        <h2>当前计数: {count}</h2>
        {/* <button onClick={increment1}>+1</button>
        <button onClick={increment2}>+1</button> */}
        <CounterIncrement increment={increment1} name="increment1"/>
        <CounterIncrement increment={increment2} name="increment2"/>
      </div>
    )
  }
  ```

3. useMemo
useMemo实际的目的也是为了进行性能的优化。
如何进行性能的优化呢？
  - useMemo返回的也是一个 memoized（记忆的） 值；
  - 在依赖不变的情况下，多次定义的时候，返回的值是相同的；
  ```jsx
    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```

我们来看一个案例
  - 无论我们点击了是 +1还是 切换 案例都会重新计算一次；
  - 事实上，我们只是希望在count发生变化时重新计算；
```jsx
import React, { useState, useMemo } from 'react';

function calcNum(count) {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += i;
  }
  console.log("计算一遍");
  return total
}

export default function MemoHookDemo() {
  const [count, setCount] = useState(10);
  const [isLogin, setIsLogin] = useState(true);

  const total = calcNum(count);

  return (
    <div>
      <h2>数字和: {total}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      {isLogin && <h2>Coderwhy</h2>}
      <button onClick={e => setIsLogin(!isLogin)}>切换</button>
    </div>
  )
}
```
这个时候，我们可以使用useMemo来进行性能的优化：
```jsx
import React, { useState, useMemo } from 'react';

function calcNum(count) {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += i;
  }
  console.log("计算一遍");
  return total
}

export default function MemoHookDemo() {
  const [count, setCount] = useState(10);
  const [isLogin, setIsLogin] = useState(true);

  const total = useMemo(() => {
    return calcNum(count);
  }, [count]);

  return (
    <div>
      <h2>数字和: {total}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      {isLogin && <h2>Coderwhy</h2>}
      <button onClick={e => setIsLogin(!isLogin)}>切换</button>
    </div>
  )
}
```
当然，useMemo也可以用于子组件的性能优化
  - ShowCounter子组件以来的是一个基本数据类型，所以在比较的时候，只要值不变，那么就不会重新渲染
  - ShowInfo接收的是一个对象，每次都会定义一个新的对象，所有我们需要通过useMemo对其进行优化
  ```jsx
    import React, { useState, useMemo, memo } from 'react';

    function calcNum(count) {
      let total = 0;
      for (let i = 0; i < count; i++) {
        total += i;
      }
      console.log("计算一遍");
      return total
    }

    const ShowCounter = memo((props) => {
      console.log("重新渲染");
      return <h1>Counter: {props.total}</h1>
    })

    const ShowInfo = memo((props) => {
      console.log("ShowInfo重新渲染");
      return <h1>信息: {props.info.name}</h1>
    })

    export default function MemoHookDemo() {
      const [count, setCount] = useState(10);
      const [isLogin, setIsLogin] = useState(true);

      const total = useMemo(() => {
        return calcNum(count);
      }, [count]);

      const info = useMemo(() => {
        return {name: "why"}
      }, [])

      return (
        <div>
          <h2>数字和: {total}</h2>
          <ShowCounter total={total} />
          <ShowInfo info={info}/>
          <button onClick={e => setCount(count + 1)}>+1</button>
          {isLogin && <h2>Coderwhy</h2>}
          <button onClick={e => setIsLogin(!isLogin)}>切换</button>
        </div>
      )
    }
  ```

4. useRef
useRef返回一个ref对象，返回的ref对象在组件的整个生命周期保持不变。
最常用的ref是两种用法：
  - 用法一：引用DOM（或者组件，但是需要是class组件）元素；
  - 用法二：保存一个数据，这个对象在整个生命周期中可以保存不变；

用法一：引用DOM
```jsx
import React, { useRef } from 'react';

export default function RefHookDemo() {
  const inputRef = useRef();
  const titleRef = useRef();

  const handleOperating = () => {
    titleRef.current.innerHTML = "我是coderwhy";
    inputRef.current.focus();
  }

  return (
    <div>
      <input type="text" ref={inputRef}/>
      <h2 ref={titleRef}>默认内容</h2>

      <button onClick={e => handleOperating()}>操作</button>
    </div>
  )
}
```

用法二：使用ref保存上一次的某一个值
  - useRef 可以想象成在ref对象中保存了一个 .current 的可变盒子
  - useRef 在组件重新渲染时，返回的依然是之前的ref对象，但是current是可以修改的
```jsx
import React, { useState, useEffect, useRef } from 'react';

let preValue = 0;

export default function RefHookDemo02() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  return (
    <div>
      <h2>前一次的值: {countRef.current}</h2>
      <h2>这一次的值: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

5. useImperativeHandle
useImperativeHandle并不是特别好理解，我们一点点来学习。
我们先来回顾一下ref和forwardRef结合使用：
  - 通过forwardRef可以将ref转发到子组件中
  - 子组件拿到父组件中创建的ref，绑定到自己的某个元素中
```jsx
import React, { useRef, forwardRef } from 'react';

const HYInput = forwardRef(function (props, ref) {
  return <input type="text" ref={ref}/>
})

export default function ForwardDemo() {
  const inputRef = useRef();

  return (
    <div>
      <HYInput ref={inputRef}/>
      <button onClick={e => inputRef.current.focus()}>聚焦</button>
    </div>
  )
}
```

上面的做法本身没有什么问题，但是我们是将子组件的DOM直接暴露给了父组件：
  - 直接暴露给父组件带来的问题是某些情况的不可控
  - 父组件可以拿到DOM后任意的操作
  - 但是，事实上在上面的案例中，我们只希望父组件可以操作focus，并不希望它任意的操作

通过 useImperativeHandle 可以只暴露固定的操作
  - 通过 useImperativeHandle 的Hook，将传入的 ref 和 useImperativeHandle 的第二个参数返回的对象绑定到了一起
  - 所以在父组件中，使用 `inputRef.current` 时，实际上是用的是返回的对象
  - 这是我们可以调用 focus 函数和printHello函数
```jsx
import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const HYInput = forwardRef(function (props, ref) {
  // 创建组件内部的ref
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    printHello: () => {
      console.log("Hello World")
    }
  }))

  // 这里绑定的是组件内部的inputRef
  return <input type="text" ref={inputRef}/>
})

export default function ImperativeHandleHookForwardDemo() {
  const inputRef = useRef();

  return (
    <div>
      <HYInput ref={inputRef}/>
      <button onClick={e => inputRef.current.focus()}>聚焦</button>
      <button onClick={e => inputRef.current.printHello()}>Hello World</button>
    </div>
  )
}
```

6. useLayoutEffect
useLayoutEffect看起来和useEffect非常的相似，事实上他们也只有一点区别而已：
  - useEffect会在渲染的内容更新到DOM上后执行，不会阻塞DOM的更新；
  - useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新；

如果我们希望在某些操作发生之后再更新DOM，那么应该将这个操作放到useLayoutEffect。
我们来看下面的一段代码：
  - 这段代码在开发中会发生闪烁的现象；
  - 因为我们先将count设置为了0，那么DOM会被更新，并且会执行一次useEffect中的回调函数；
  - 在useEffect中我们发现count为0，又执行一次setCount操作，那么DOM会再次被更新，并且useEffect又会被执行一次；
  ```jsx
    import React, { useEffect, useState, useLayoutEffect } from 'react';

    export default function EffectHookDemo() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        if (count === 0) {
          setCount(Math.random()*200)
        }
      }, [count]);

      return (
        <div>
          <h2>当前数字: {count}</h2>
          <button onClick={e => setCount(0)}>随机数</button>
        </div>
      )
    }
  ```

事实上，我们上面的操作的目的是在count被设置为0时，随机另外一个数字：
  - 如果我们使用useLayoutEffect，那么会等到useLayoutEffect代码执行完毕后，再进行DOM的更新；
  ```jsx
    import React, { useEffect, useState, useLayoutEffect } from 'react';

    export default function EffectHookDemo() {
      const [count, setCount] = useState(0);

      useLayoutEffect(() => {
        if (count === 0) {
          setCount(Math.random()*200)
        }
      }, [count]);

      return (
        <div>
          <h2>当前数字: {count}</h2>
          <button onClick={e => setCount(0)}>随机数</button>
        </div>
      )
    }
  ```
  ![hooks_useEffect和useLayoutEffect对比][./img/hooks_useEffect和useLayoutEffect对比.jpg]

### 自定义Hook
1. 认识自定义hook
*自定义hook本质上只是一种函数代码逻辑的抽取，严格意义上来说，它本身并不算react的特性*
需求：所有的组件在创建和销毁时都进行打印：
  - 组件被创建：打印 组件被创建了；
  - 组件被销毁：打印 组件被销毁了；
```jsx
export default function CustomHookDemo() {
  useEffect(() => {
    console.log("组件被创建了");
    return () => {
      console.log("组件被销毁了");
    }
  }, [])

  return (
    <div>
      <h2>CustomHookDemo</h2>
    </div>
  )
}
```
但是这样来做意味着所有的组件都需要有对应的逻辑：
```jsx
function Home(props) {
  useEffect(() => {
    console.log("组件被创建了");
    return () => {
      console.log("组件被销毁了");
    }
  }, [])
  return <h2>Home</h2>
}

function Profile(props) {
  useEffect(() => {
    console.log("组件被创建了");
    return () => {
      console.log("组件被销毁了");
    }
  }, [])
  return <h2>Profile</h2>
}
```

如何可以对它们的逻辑进行抽取呢？
  - 我们可能希望抽取到一个函数中；
  ```jsx
    function loggingLife() {
      useEffect(() => {
        console.log("组件被创建了")

        return () => {
          console.log("组件被销毁了")
        }
      }, [])
    }
  ```

但是，抽取到这里调用之后，代码是报错的：
  - 原因是普通的函数中不能使用hook

那么，我们应该如何操作呢？
  - 非常简单，函数以特殊的方式命名，以 **use** 开头即可；
  ```jsx
    function useLoggingLife() {
      useEffect(() => {
        console.log("组件被创建了")

        return () => {
          console.log("组件被销毁了")
        }
      }, [])
    }
  ```

当然，自定义Hook可以有参数，也可以有返回值：
```jsx
function useLoggingLife(name) {
  useEffect(() => {
    console.log(`${name}组件被创建了`);
    return () => {
      console.log(`${name}组件被销毁了`);
    }
  }, [])
}
```
完整代码
```jsx
import { useState, useEffect } from 'react'

function useLoggingLife(name) {
  useEffect(() => {
    console.log(`${name}组件被创建了`)
    return () => {
      console.log(`${name}Home组件被销毁了`)
    }
  }, [])
}

function Home() {
  useLoggingLife('Home')

  return <h2>Home</h2>
}

function Profile() {
  useLoggingLife('Profile')

  return <h2>Profile</h2>
}

export default function App() {
  const [showCpn, setShowCpn] = useState(true)

  return (
    <div>
      { showCpn && <Home/> }
      { showCpn && <Profile/> }
      <button onClick={e => setShowCpn(!showCpn)}>toggle</button>
    </div>
  )
}
```

2. 自定义Hook练习
我们通过一些案例来练习一下自定义Hook。
- *使用User、Token的Context*
  + 比如多个组件都需要使用User和Token的Context：
  这段代码我们在每次使用user和token时都需要导入对应的Context，并且需要使用两次useContext；
  ```jsx
  import { useContext, createContext } from 'react'

  const UserContext = createContext({name: '默认', age: 0})
  const TokenContext = createContext({token: '000000'})

  function useUserAndToken() {
    const user = useContext(UserContext)
    const token = useContext(TokenContext)

    return [user, token]
  }

  function Home() {
    const [user, token] = useUserAndToken()
    console.log("Home", {user, token})

    return <h2>Home</h2>
  }

  function Profile() {
    const [user, token] = useUserAndToken()
    console.log("Profile", {user, token})

    return <h2>Profile</h2>
  }

  export default function App() {

    return (
      <div>
        <UserContext.Provider value={{name: 'pipi1ei', age: 18}}>
          <TokenContext.Provider value={{token: '123456'}}>
            <Home/>
            <Profile/>
          </TokenContext.Provider>
        </UserContext.Provider>
      </div>
    )
  }
  ```

- *获取窗口滚动的位置*
在开发中，某些场景我们可能总是希望获取创建滚动的位置：
```jsx
import React, { useEffect, useState } from 'react'

export default function CustomScrollPositionHook() {

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    }
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <div style={{padding: "1000px 0"}}>
      <h2 style={{position: "fixed", top: 0, left: 0}}>CustomScrollPositionHook: {scrollPosition}</h2>
    </div>
  )
}
```

但是如果每一个组件都有对应这样的一个逻辑，那么就会存在很多的冗余代码。可以定义如下hook
```jsx
function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    }
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return scrollPosition;
}
```

- *数据存储的localStorage*
在开发中，我们会有一些数据希望通过localStorage进行存储（当然，你可以根据自己的情况选择sessionStorage）
```jsx
import React, { useState, useEffect } from 'react'

export default function CustomDataStoreHook() {
  const [name, setName] = useState(() => JSON.parse(window.localStorage.getItem('name')))

  useEffect(() => {
    window.localStorage.setItem('name', JSON.stringify(name))
  }, [name])

  return (
    <div>
      <h2>CustomDataStoreHook: {name}</h2>
      <button onClick={e => setName("coderwhy")}>设置name</button>
    </div>
  )
}
```
如果每一个里面都有这样的逻辑，那么代码就会变得非常冗余：
```jsx
function useLocalStorage(key) {
  const [data, setData] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key))
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData];
}
```

### Hook 原理分析
这里我主要分析一下useState的原理，因为本次教程是穿插讲解源码的，所以不会所有源码一一讲解。
1. useState代码位置
useState还是从React中导入的，所以我们可以先查看：
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_01.jpg)
点到useState的源码中：
  - useState本质上，是使用的dispatcher的useState；
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_02.jpg)
dispatcher来自另外的一个函数resolveDispatcher：
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_03.jpg)
运行的过程中，会赋值一个current的值是一个Dispatcher类型：
  - Dispatcher来自于 react-reconciler/src/ReactFiberHooks
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_04.jpg)
Dispatch类型的定义：
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_05.jpg)
这里的Dispatch仅仅是一个类型而已，我们赋值具体的值在不同的阶段是不同的：
  - 在挂载阶段：HooksDispatcherOnMount
  - 在更新阶段：HooksDispatcherOnUpdate
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_06.jpg)
挂载哪一个取决于renderWithHook函数：
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_07.jpg)

2. HooksDispatcherOnMount
HooksDispatcherOnMount对应的useState是mountState
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_08.jpg)
mountState的源码：
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_09.jpg)
绑定的dispatchAction函数，事实上是将所有的action放到了queue的队列中：
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_10.jpg)

3. HooksDispatcherOnUpdate
HooksDispatcherOnUpdate对应的useState是updateState
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_11.jpg)
updateState本质上会执行updateReducer：
  - 所有其实就更新阶段而言，useState本质上用的是updateReducer
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_12.jpg)
updateReducer的源码如下：
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_13.jpg)
![hook_Hook原理分析_01.jpg](./img/hook_Hook原理分析_14.jpg)

### Redux Hooks
在之前的redux开发中，为了让组件和redux结合起来，我们使用了react-redux中的connect：
  - 但是这种方式必须使用`高阶函数`结合返回的`高阶组件`；
  - 并且必须编写：`mapStateToProps`和 `mapDispatchToProps`映射的函数；
在Redux7.1开始，提供了Hook的方式，我们再也不需要编写connect以及对应的映射函数了

1. useSelector 的使用
useSelector的作用是将state映射到组件中
  - 参数一：将state映射到需要的数据中
  - 参数而：可以进行比较来决定组件是否重新渲染
  ```jsx
    const result: any = useSelector(selector: Function, equalityFn?: Function)
  ```

现在，我可以改进一下之前的Profile中使用redux的代码：
```jsx
function Profile(props) {
  const { banners, recommends, counter } = useSelector(state => ({
    banners: state.homeInfo.banners,
    recommends: state.homeInfo.recommends
  }))

  console.log("Profile重新渲染");

  return (
    <div>
      <h2>数字: {counter}</h2>
      <h1>Banners</h1>
      <ul>
        {
          banners.map((item, index) => {
            return <li key={item.acm}>{item.title}</li>
          })
        }
      </ul>
      <h1>Recommends</h1>
      <ul>
        {
          recommends.map((item, index) => {
            return <li key={item.acm}>{item.title}</li>
          })
        }
      </ul>
    </div>
  )
}
```
但是这段代码会有一个问题：
  - 当前我们的组件并不依赖counter，但是counter发生改变时，依然会引起Profile的重新渲染；
原因是什么呢？
  - useSelector默认会比较我们返回的两个对象是否相等；
  - 如何比较呢？const refEquality = (a, b) => a === b；
  - 也就是我们必须返回两个完全相等的对象才可以不引起重新渲染；
这个时候，我们可以使用react-redux中给我们提供的 shallowEqual：
  - 这段代码的作用是避免不必要的重新渲染；
  ```jsx
  const {banners, recommends, counter} = useSelector(state => ({
    banners: state.homeInfo.banners,
    recommends: state.homeInfo.recommends
  }), shallowEqual);
  ```
当然，你也可以编写自己的比较函数，来决定是否重新渲染。

2. useDispatch
useDispatch非常简单，就是直接获取dispatch函数，之后在组件中直接使用即可：
```jsx
const dispatch = useDispatch()
```
直接使用dispatch：
```jsx
<button onClick={e => dispatch(subAction(1))}>-1</button>
<button onClick={e => dispatch(subAction(5))}>-5</button>
```
我们还可以通过useStore来获取当前的store对象：
```jsx
const store = useStore()
```
在组件中可以使用store：
```jsx
const store = useStore();
console.log(store.getState());
```