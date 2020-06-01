## async函数
1. 含义：
  + ES2017 标准引入了 async 函数，使得异步操作变得更加方便。async 函数就是 Generator 函数的语法糖
  - 前文有一个 Generator 函数，依次读取两个文件。
  ```javascript
    const fs = require('fs')

    const readFile = function(fileName){
      return new Promise(function(resolve, reject){
        fs.readFile(fileName, function(err, data){
          if(err) reject(err)
          resolve(data)
        })
      })
    }

    const gen = function* (){
      const f1 = yield readFile('/etc/fstab')
      const f2 = yield readFile('/etc/shells')
      console.log(f1.toString())
      console.log(f2.toString())
    }
  ```
  - 将上面函数 gen 可以改写成 async 函数
  ```javascript
    const asyncReadFile = async function (){
      const f1 = await readFile('/etc/fstab')
      const f2 = await readFile('/etc/shells')
      console.log(f1.toString())
      console.log(f2.toString())
    }
  ```
  + async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。async函数对 Generator 函数的改进，体现在以下四点。
    1. 内置执行器
      Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行：`asyncReadFile()`
      - 上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。
    2. 更好的语义
      async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
    3. 更广的适用性
      co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
    4. 返回值时 Promise 模块
      async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。

    
2. 基本用法
  + async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
  ```javascript
    function timeout(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    async function asyncPrint(value, ms) {
      await timeout(ms);
      console.log(value);
    }

    asyncPrint('hello world', 50);
  ```
  - 上面代码指定50毫秒以后，输出 hello world


3. 语法
  + async 函数返回一个 Promise 对象，async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数
  ```javascript
    async function f(){
      return 'hello world'
    }

    f().then(v => console.log(v))  // hello world
  ```
  + async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
  ```javascript
    async function f(){
      throw new Error('出错了')
    }
    f().then(v => console.log(v), e => console.log(e))  // Error: 出错了
  ```

  + Promise 状态变化
    - async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

  + await 命令
    - 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
    - 另一种情况是，await命令后面是一个thenable对象（即定义了then方法的对象），那么await会将其等同于 Promise 对象。
    ```javascript
      class Sleep(){
        constructor(timeout){
          this.timeout = timeout
        }
        then(resolve, reject){
          const startTime = Date.now();
          setTimeout(() => resolve(Date.now() - startTime), this.timeout)
        }
      }

      (async () => {
        const sleepTime = await new Sleep(1000)
        console.log(sleepTime)
      })()
      // 1000
    ```
    - 上面代码中，await命令后面是一个Sleep对象的实例。这个实例不是 Promise 对象，但是因为定义了then方法，await会将其视为Promise处理。

    - await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
    ```javascript
      async function f(){
        await Promise.reject('出错了')
      }

      f()
      .then(v => console.log(v))
      .catch(e => console.log(e))
      // 出错了
    ```
    - 注意：
      + 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
      ```javascript
        async function f(){
          await Promise.reject('出错了');
          await Promise.resolve('hello world'); // 不会执行
        }
      ```
      + 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
      ```javascript
        async function f() {
          try {
            await Promise.reject('出错了');
          } catch(e) {
          }
          return await Promise.resolve('hello world');
        }

        f()
        .then(v => console.log(v))
        // hello world
      ```

    - 使用注意点
      1. await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
      ```javascript
        async function myFunction() {
          try {
            await somethingThatReturnsAPromise();
          } catch (err) {
            console.log(err);
          }
        }

        // 另一种写法

        async function myFunction() {
          await somethingThatReturnsAPromise()
          .catch(function (err) {
            console.log(err);
          });
        }
      ```
      2. 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
      ```javascript
        // 写法一
        let [foo, bar] = await Promise.all([getFoo(), getBar()]);

        // 写法二
        let fooPromise = getFoo();
        let barPromise = getBar();
        let foo = await fooPromise;
        let bar = await barPromise;
      ```
      3. await命令只能用在async函数之中，如果用在普通函数，就会报错。


4. async 函数的实现原理 
  + async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
