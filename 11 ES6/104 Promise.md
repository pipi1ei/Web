## promise
### Promise 的含义
  + 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。 

  + Promise 对象有以下两个特点
    1. 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，其他任何操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
    2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再改变，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的

  + Promise 的缺点
    1. 无法取消 Promise，一旦新建它就会*立即执行*，无法中途取消。
    2. 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
    3. 当处于 pending 状态时，无法得知进展到哪一个阶段

### promise 介绍和基本使用
+ ES6 中一个非常重要和好用的特性就是 Promise，Promise 是异步编程的一种解决方案
+ 一种常见的异步场景就是网络请求了，我们封装一个网络请求函数，因为不能立即得到结果，所有往往会传入另外一个函数，在数据请求成功是，将数据通过传入的函数回调出去，但当网络请求非常复杂是，就会出现回调地狱
+ ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例
  ```javascript
    const promise = new Promise(function(resolve, reject){
      //  ... some code 
      if(/* 异步操作成功 */){
        resolve()
      }else {
        reject()
      }
    })
  ```
+ Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
  - resolve 函数的作用是将 Promise 的状态从 pending 状态变成 resolve 状态
  - reject 函数的作用是将 Promise 的状态从 pending 状态变成 rejected 状态

+ then 方法中的回调函数返回的也是 Promise 对象，而且then 方法中的代码会在当前脚本中所以同步任务执行完才会执行




  ```javascript

  ```