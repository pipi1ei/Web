## Redux 初见
### 认识Redux
1. Javascript 纯函数
函数式编程中有个概念叫纯函数，javascript符合函数式编程的范式，所以也有纯函数的概念
在React中，纯函数的概念非常重要，所以需要学习一下纯函数

纯函数的维基百科定义：
在程序设计中，若一个函数符合以下条件，那么这个函数也被成为纯函数
  - 此函数在相同的输入值时，需产生相同的输出。和函数的输出和输入值意外的其他隐藏信息或状态无关，也和由I/O设备产生的外部输出无关
  - 该函数不能有语义上可观察的函数副作用，诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等。

上面的的定义会过于的晦涩，所以我简单总结一下：
  - 确定的输入，一定会产生确定的输出；
  - 函数在执行过程中，不能产生副作用；

那么，我们来看以下几个函数是否是纯函数
  - 案例一：很明显，下面的函数是一个纯函数，它的输出是依赖我们的输入内容，并且中间没有产生任何副作用
    ```js
      function sum(num1, num2) {
        return num1 + num2;
      }
    ```

  - 案例二：add 函数不是一个纯函数，函数依赖一个外部的变量，变量发生改变时，会影响：确定的输入产生确定的输出。能否改进成纯函数呢？ `const foo = 5` 即可
    ```js
      let foo = 5;
      function add(num) {
        return foo + num;
      }

      console.log(add(5));
      foo = 10;
      console.log(add(5));
    ```

  - 案例三：printInfo 不是纯函数。虽然无论输入什么，最终都输出undefined，但是它产生了副作用，修改了传入的对象：
    ```js
      function printInfo(info) {
        console.log(info.name, info.age)
        info.name = 'pipi1ei'
      }
    ```

当然，纯函数还有很多变种，但是我们只需要理解它的核心就可以了

为什么纯函数在函数式编程中非常重要呢？
  - 因为你可以*安心的写*和*安心的用*
  - 你在写的时候保证了函数的纯度，只需要实现自己的业务逻辑即可，不需要关心传入的内容或依赖其他的外部变量
  - 你在用的时候，你确定你的输入内容不会被任意篡改，并且自己确定的输入，一定会有一个确定的输出

React中就要求我们无论是函数还是class声明一个组件，这个组件都必须像纯函数一样，保护它们的props不被修改
在之后学习redux中，reducer也被要求是一个纯函数

2. 认识Redux
- 为什么需要redux？
javascript 开发的应用程序，已经越来越复杂了：
  - javascript需要管理的状态越来越多，越来越复杂
  - 这些状态包括服务器返回的数据、缓存数据、用户操作产生的数据等等，也包括一些UI的状态，比如某些元素是否被选中，是否显示加载动效，当前分页

管理这些不断变化的state是非常困难的
  - 状态之间存在相互依赖，一个状态的变化会引起另一个状态的变化，View页面也有可能会引起状态的变化
  - 当应用程序复杂时，state在什么时候，因为什么原因而发生了变化，发生了怎样的变化，会变的非常难以控制和追踪

React是在视图层帮助我们解决了DOM的渲染过程，但state依然是留给我们自己来管理：
  - 无论是组件定义自己的state，还是组件之间通信通过props传递，也包括通过context进行数据之间的共享
  - React主要负责帮我们管理视图，state如何维护最终还是我们自己决定

Redux就是一个帮助我们管理state的容器：Redux是javascript的状态容器，提供了可预测的状态管理
Redux除了和React一起使用之外，还可以可其他界面库一起来使用（比如Vue），并且它非常小（包括依赖在内，只有2kb）

- redux 的核心理念
redux的核心理念非常简单
比如我们有一个朋友列表需要管理：
  - 如果我们没有定义统一的规范来操作这段数据，那么整个数据的变化就是无法跟踪的；
  - 比如页面的某处通过products.push的方式增加了一条数据；
  - 比如另一个页面通过products[0].age = 25修改了一条数据；
  - 整个应用程序错综复杂，当出现bug时，很难跟踪到底哪里发生的变化；
  ```js
    const initialState = {
      friends: [
        { name: "why", age: 18 },
        { name: "kobe", age: 40 },
        { name: "lilei", age: 30 }
      ]
    }
  ```

redux要求我们通过action来更新数据
  - 所有数据的变化，必须通过派发（dispatch）action来更新
  - action 是一个普通的javascript对象，用来描述这次更新的type和content

比如下面就是几个更新friends的action：
  - 强制使用action的好处是可以清晰的知道数据到底发生了什么样的变化，所有的数据变化都是可追踪、可预测的
  - 当然，目前我们的action是固定的对象，真实应用中，我们会通过函数来定义，返回一个action；
  ```js
    const action1 = { type: "ADD_FRIEND", info: { name: "lucy", age: 20 } }
    const action2 = { type: "INC_AGE", index: 0 }
    const action3 = { type: "CHANGE_NAME", playload: { index: 0, newName: "coderwhy" } }
  ```

但是，如何将state和action连在一起呢？答案就是reducer
  - reducer是一个纯函数
  - reducer做的事情就是将传入的state和action结合起来生成一个新的state
  ```js
    function reducer(state = initialState, action) {
      switch (action.type) {
        case "ADD_FRIEND":
          return { ...state, friends: [...state.friends, action.info] }
        case "INC_AGE":
          return {
            ...state, friends: state.friends.map((item, index) => {
              if (index === action.index) {
                return { ...item, age: item.age + 1 }
              }
              return item;
            })
          }
        case "CHANGE_NAME":
          return {
            ...state, friends: state.friends.map((item, index) => {
              if (index === action.index) {
                return { ...item, name: action.newName }
              }
              return item;
            })
          }
        default:
          return state;
      }
    }
  ```

- redux的三大原则
1. 单一数据源
整个应用程序的state被存储在一颗object tree中，并且这个object tree只存储在一个 store 中：
  - Redux并没有强制让我们不能创建多个Store，但是那样做并不利于数据的维护；
  - 单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改；

2. state是只读的
唯一修改State的方法一定是触发action，不要试图在其他地方通过任何的方式来修改State：
  - 这样就确保了View或网络请求都不能直接修改state，它们只能通过action来描述自己想要如何修改state；
  - 这样可以保证所有的修改都被集中化处理，并且按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题；

3. 使用纯函数来执行修改
通过reducer将旧state和actions联系在一起，并且返回一个新的State：
  - 随着应用程序的复杂度增加，我们可以将reducer拆分成多个小的reducers，分别操作不同state tree的一部分；
  - 但是所有的reducer都应该是纯函数，不能产生任何的副作用；

### redux的基本使用
1. redux使用过程
安装redux：
  - npm：`npm install redux --save`
  - yarn：`yarn add redux`

这里，我通过创建一个简单的js文件，我们先来简单学习一下redux：
- 搭建项目结构
  1. 创建一个新的项目文件夹：learn-redux
    - 执行初始化操作：`yarn init`
    - 安装redux：`yarn add redux`
  2. 创建src目录，并且创建index.js文件
    - 暂时没有任何内容
  3. 修改package.json可以执行index.js
    ```json
      "scripts": {
        "start": "node src/index.js"
      }
    ```
- 开始在index.js中编写代码
  1. 创建一个对象，作为我们要保存的状态：
    ```js
      const initialState = {
        counter: 0
      }
    ```
  2. 创建Store来存储这个state
    - 创建store时必须创建reducer
    - 我们可以通过 store.getState() 来获取当前的state
    ```js
      // 创建reducer
      const reducer = (state, action) => {
        return state
      }
      // 根据reducer创建store
      const store = redux.createStore(reducer)
      console.log(store.getState());
    ```
  3. 通过action来修改state
    - 通过dispatch来派发action
    - 通常action中都会有type属性，也可以携带其他数据
    ```js
      store.dispatch({
        type: "INCREMENT"
      })

      store.dispath({
        type: "DECREMENT"
      })

      store.dispatch({
        type: "ADD_NUMBER",
        number: 5
      })
    ```
  4. 修改reducer中的处理代码
    - 这里一定要记住，reducer是一个纯函数，不需要直接修改state；
    - 后面我会讲到直接修改state带来的问题；
    ```js
      const reducer = (state = initialState, action) => {
        switch (action.type) {
          case "INCREMENT":
            return {...state, counter: state.counter + 1};
          case "DECREMENT":
            return {...state, counter: state.counter - 1};
          case "ADD_NUMBER":
            return {...state, counter: state.counter + action.number}
          default: 
            return state;
        }
      }
    ```
  5. 可以在派发action之前，监听store的变化：
    ```js
      store.subscribe(() => {
        console.log(store.getState())
      })
    ```

- 完成的案例代码如下：
```js
const redux = require('redux');

const initialState = {
  counter: 0
}

// 创建reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {...state, counter: state.counter + 1};
    case "DECREMENT":
      return {...state, counter: state.counter - 1};
    case "ADD_NUMBER":
      return {...state, counter: state.counter + action.number}
    default: 
      return state;
  }
}

// 根据reducer创建store
const store = redux.createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
})

// 修改store中的state
store.dispatch({
  type: "INCREMENT"
})
// console.log(store.getState());

store.dispatch({
  type: "DECREMENT"
})
// console.log(store.getState());

store.dispatch({
  type: "ADD_NUMBER",
  number: 5
})
// console.log(store.getState());
```

2. redux结构划分
如果我们将所有的逻辑代码写到一起，那么当redux变得复杂时代码就难以维护。
接下来，我会对代码进行拆分，将store、reducer、action、constants拆分成一个个文件。
注意：**node中对ES6模块化的支持**
  - 从node v13.2.0开始，node才对ES6模块化提供了支持：
  - node v13.2.0之前，需要进行如下操作：
    + 在package.json中添加属性："type": "module"
    + 在执行命令中添加如下选项：node --experimental-modules src/index.js
  - node v13.2.0之后，只需要进行如下操作：
    + 在package.json中添加属性："type": "module"

注意：**导入文件时，需要跟上.js后缀名**

- 对redux结构进行划分
  + 创建store/index.js文件：
  ```js
    import redux from 'redux';
    import reducer from './reducer.js';

    const store = redux.createStore(reducer);

    export default store;
  ```

  + 创建store/reducer.js文件：
  ```js
    import {
      ADD_NUMBER,
      SUB_NUMBER
    } from './constants.js';

    const initialState = {
      counter: 0
    }

    function reducer(state = initialState, action) {
      switch(action.type) {
        case ADD_NUMBER:
          return {...state, counter: state.counter + action.num};
        case SUB_NUMBER:
          return {...state, counter: state.counter - action.num};
        default:
          return state;
      } 
    }

    export default reducer;
  ```

  + 创建store/actionCreators.js文件：
  ```js
    import {
      ADD_NUMBER,
      SUB_NUMBER
    } from './constants.js'

    const addAction = (count) => ({
      type: ADD_NUMBER,
      num: count
    });

    const subAction = (count) => ({
      type: SUB_NUMBER,
      num: count
    })

    export {
      addAction,
      subAction
    }
  ```

  + 创建store/constants.js文件：
  ```js
    const ADD_NUMBER = "ADD_NUMBER";
    const SUB_NUMBER = "SUB_NUMER";

    export {
      ADD_NUMBER,
      SUB_NUMBER
    }
  ```

3. Redux流程图
我们已经知道了redux的基本使用过程，那么我们就更加清晰来认识一下redux在实际开发中的流程：
  - 1.全局通常只有一个Store，存储我们的State；
  - 2.Component中在某些情况会派发Action（这些Action是我们提前定义好的）；
  - 3.Reducer会接收到这些Action，并且在Reducer中会返回一个新的State，作为Store的State；
  - 4.State发生更新之后会触发通知，告知订阅者数据发生了改变；
  - 5.订阅者拿到最新的数据（在props中），更新到jsx中，界面发生改变；
![redux_01.jpg](./img/redux_01.jpg)

## react-redux
### react结合redux
1. redux融入react代码
目前redux在react中使用是最多的，所以我们需要将之前编写的redux代码，融入到react当中去。
这里我创建了两个组件：
  - Home组件：其中会展示当前的counter值，并且有一个+1和+5的按钮；
  - Profile组件：其中会展示当前的counter值，并且有一个-1和-5的按钮；
home.js代码实现：
```js
import React, { PureComponent } from 'react';

import store from '../store';
import {
  addAction
} from '../store/actionCreators';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        counter: store.getState().counter
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.addCounter()}>+5</button>
      </div>
    )
  }

  increment() {
    store.dispatch(addAction(1));
  }

  addCounter() {
    store.dispatch(addAction(5));
  }
}
```
Profile.js代码实现：
```js
import React, { PureComponent } from 'react';

import store from '../store';
import {
  subAction
} from '../store/actionCreators';

export default class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        counter: store.getState().counter
      })
    })
  }

  render() {
    return (
      <div>
        <hr/>
        <h1>Profile</h1>
        <div>
          <h2>当前计数: {this.state.counter}</h2>
          <button onClick={e => this.decrement()}>-1</button>
          <button onClick={e => this.subCounter()}>-5</button>
        </div>
      </div>
    )
  }

  decrement() {
    store.dispatch(subAction(1));
  }

  subCounter() {
    store.dispatch(subAction(5));
  }
}
```
上面的代码其实非常简单，核心代码主要是两个：
  - 在 componentDidMount 中定义数据的变化，当数据发生变化时重新设置 counter;
  - 在发生点击事件时，调用store的dispatch来派发对应的action；

2. 自定义connect函数
上面的代码是否可以实现react组件和redux结合起来呢？
  - 当然是可以的，但是我们会发现每个使用的地方其实会有一些重复的代码：
  - 比如监听store数据改变的代码，都需要在 componentDidMount中完成；
  - 比如派发事件，我们都需要去先拿到 store， 在调用其 dispatch 等；
能否将这些公共的内容提取出来呢？
我们来定义一个connect函数：
  - 这个connect函数本身接受两个参数：
    + 参数一：里面存放 component 希望使用到的 State 属性；
    + 参数二：里面存放 component 希望使用到的 dispatch动作；
  - 这个connect函数有一个返回值，是一个高阶组件：
    + 在constructor中的state中保存一下我们需要获取的状态；
    + 在componentDidMount中订阅store中数据的变化，并且执行 setState操作；
    + 在componentWillUnmount中需要取消订阅；
    + 在render函数中返回传入的WrappedComponent，并且将所有的状态映射到其props中；
    + 这个高阶组件接受一个组件作为参数，返回一个class组件；
    + 在这个class组件中，我们进行如下操作：
  ```js
    import React, { PureComponent } from "react";
    import store from '../store';

    export default function connect(MapStateToProps, mapDispatchToProps) {
      return function(WrappedComponent) {
        return class extends PureComponent {
          constructor(props) {
            super(props)

            this.state = {
              storeState: MapStateToProps(store.getState())
            }
          }

          componentDidMount() {
            this.unsubscribe  = store.subscribe (() => {
              this.setState({
                storeState: MapStateToProps(store.getState())
              })
            })
          }

          componentWillUnmount() {
            this.unsubscribe ()
          }

          render() {
            return <WrappedComponent {...this.props} {...MapStateToProps(store.getState())} {...mapDispatchToProps(store.dispatch)} />
          }
        }
      }
    }
  ```
在home和props文件中，我们按照自己需要的state、dispatch来进行映射：
比如home.js中进行如下修改：
  - mapStateToProps：用于将state映射到一个对象中，对象中包含我们需要的属性；
  - mapDispatchToProps：用于将dispatch映射到对象中，对象中包含在组件中可能操作的函数；
    + 当调用该函数时，本质上其实是调用dispatch(对应的Action)；
```js
const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNumber: function(number) {
      dispatch(addAction(number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```
在Profile中也是类似的操作。
有了connect函数，我们之后只需要关心从state和dispatch中映射自己需要的状态和行为即可；

3. store的context处理
上面的connect函数有一个很大的缺陷：依赖导入的store
  - 如果我们将其封装成一个独立的库，需要依赖用于创建的store，我们应该如何去获取呢？
  - 难道让用户来修改我们的源码吗？不太现实；
正确的做法是我们提供一个Provider，Provider来自于我们创建的Context，让用户将store传入到value中即可；
创建一个context.js文件：
```js
import { createContext } from 'react';

export const StoreContext = createContext();
```
修改connect函数中class组件部分的代码：
  - 注意下面我们将class组件的名称明确的定义出来，并且给它的contextType进行了赋值；
  - 在组件内部用到store的地方，统一使用this.context代替（注意：constructor中直接使用第二个参数即可）
```js
import React, { PureComponent } from "react";

import { StoreContext } from './context';

export default function connect(mapStateToProps, mapDispatchToProps) {
  return function handleMapCpn(WrappedComponent) {
    class ConnectCpn extends PureComponent {
      constructor(props, context) {
        super(props);

        this.state = {
          storeState: mapStateToProps(context.getState())
        }
      }

      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(this.context.getState())
          })
        })
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return <WrappedComponent {...this.props}
          {...mapStateToProps(this.context.getState())}
          {...mapDispatchToProps(this.context.dispatch)} />
      }
    }

    ConnectCpn.contextType = StoreContext;

    return ConnectCpn;
  }
}
```
在入口的index.js中，使用Provider并且提供store即可：
```js
import { StoreContext } from './utils/context';
import store from './store';

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);
```

### react-redux使用
1. react-redux的使用
开始之前需要强调一下，redux和react没有直接的关系，你完全可以在React, Angular, Ember, jQuery, or vanilla JavaScript中使用Redux。
尽管这样说，redux依然是和React或者Deku的库结合的更好，因为他们是通过state函数来描述界面的状态，Redux可以发射状态的更新，让他们作出相应。
虽然我们之前已经实现了connect、Provider这些帮助我们完成连接redux、react的辅助工具，但是实际上redux官方帮助我们提供了 react-redux 的库，可以直接在项目中使用，并且实现的逻辑会更加的严谨和高效。

安装react-redux：`yarn add react-redux` 
使用connect函数：
  - 将之前使用的connect函数，换成react-redux的connect函数；
    ```js
    import React, { PureComponent } from 'react';
    import { connect } from "react-redux";
    // import connect from '../utils/connect2';

    export default connect(mapStateToProps, mapDispatchToProps)(Home);
    ```
使用Provider：
  - 将之前自己创建的Context的Provider，换成react-redux的Provider组件：
  - 注意：这里传入的是store属性，而不是value属性（待会儿可以在源码中查看）；
    ```js
    import { Provider } from 'react-redux';

    import store from './store';

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
    ```

2. react-redux的源码
这里我简单带着大家看一下react-redux的源码：
  - 但是第一因为这个教程不是讲源码为主的教程（穿插讲解部分源码），所以源码只会阅读核心的部分；
  - 另外我经常会说，整个社区在hooks出现后大量的库转向了hooks，所以在源码中会出现大量的hooks代码；
  - 因为目前还没有讲解hooks相关的API，所以某些hooks的作用在这里也不方便解释（可以学习完hooks之后再详细阅读）；

首先，我们简单看一下Provider的源码：
  - 使用了一个useMemo来返回一个contextValue的对象；
    + 这里使用useMemo的原因是为了进行性能的优化；
    + 在依赖的store不改变的情况下，不会进行重新计算，返回一个新的对象；
  - 在下面的Context的Provider中就会将其赋值给value属性；
  !{react-redux_01.jpg}(./img/react-redux_01.jpg)
  - ReactReduxContext来自另外一个文件：
  !{react-redux_02.jpg}(./img/react-redux_02.jpg)

  - connect函数的依赖比较复杂：
    + 调用createConnect来返回一个connect函数：
    !{react-redux_03.jpg}(./img/react-redux_03.jpg)
    + createConnect函数的调用：
    !{react-redux_04.jpg}(./img/react-redux_04.jpg)
    + connect函数最终调用的是connectHOC：
      - connectHOC其实是connectAdvanced的函数；
      - connectAdvanced函数最终返回的是wrapWithConnect函数；
    !{react-redux_05.jpg}(./img/react-redux_05.jpg)
    + wrapWithConnect函数：
    !{react-redux_06.jpg}(./img/react-redux_06.jpg)
    !{react-redux_07.jpg}(./img/react-redux_07.jpg)