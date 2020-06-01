## Generator 函数
### 简介
  + 基本概念
    - Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
    - 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
    - 形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield
      ```javascript
        function* helloWorldGenerator(){
          yield 'hello';
          yield 'world';
          return 'ending';
        }
        var hw = helloWorldGenerator();

        hw.next() // { value: 'hello', done: false }
        hw.next() // { value: 'world', done: false }
        hw.next() // { value: 'ending', done: true }
        hw.next() // { value: undefined, done: true }
      ```
      - 上面代码定义了一个 Generator 函数helloWorldGenerator，它内部有两个yield表达式（hello和world），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

  + Generator 函数执行过程
    - Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）。
    - 下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
    - next方法返回一个对象，它的value属性就是当前yield表达式的值hello，done属性的值表示遍历有没有结束。

### yield 表达式
  + 由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。
  + 遍历器对象的next方法的运行逻辑如下。
    1. 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
    2. 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
    3. 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
    4. 如果该函数没有return语句，则返回的对象的value属性值为undefined。

  + 注意：
    - yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”
    - yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
    - yield表达式如果用在另一个表达式之中，必须放在圆括号里面。yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

### 与 Iterator 接口的关系
  + 任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。
  + 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。
  ```javascript
    var myIterable = {};
    myIterable[Symbol.iterator] = function* () {
      yield 1;
      yield 2;
      yield 3;
    };

    [...myIterable] // [1, 2, 3]
  ```

### next 方法的参数
  + yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

### for of 循环
  + for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
  ```javascript
    function* foo() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
      return 6;
    }

    for (let v of foo()) {
      console.log(v);
    }
    // 1 2 3 4 5
  ```
  + 利用Generator函数和 for of 循环可以写出遍历任意对象的方法
  ```javascript
    function* objectEntries(obj){
      let propKeys = Reflect.ownKeys(obj);
      for(let propKey of propKeys){
        yield [propKey,obj[propKey]]
      }
    }

    let jane = { first: 'Jane', last: 'Doe' };
    for(let [key,value] of objectEntries(jane)){
      console.log(`${key}: ${value}`);
    }
  ```

### Generator.prototype.return()
  + Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
  ```javascript
    function* gen() {
      yield 1;
      yield 2;
      yield 3;
    }

    var g = gen();

    g.next()        // { value: 1, done: false }
    g.return('foo') // { value: "foo", done: true }
    g.next()        // { value: undefined, done: true }
  ```

### yield* 表达式
  + ES6 提供了yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数
  ```javascript
    function* foo() {
      yield 'a';
      yield 'b';
    }
    function* bar() {
      yield 'x';
      yield* foo();
      yield 'y';
    }

    // 等同于
    function* bar() {
      yield 'x';
      yield 'a';
      yield 'b';
      yield 'y';
    }

    // 等同于
    function* bar() {
      yield 'x';
      for (let v of foo()) {
        yield v;
      }
      yield 'y';
    }

    for (let v of bar()){
      console.log(v);
    }
    // "x"
    // "a"
    // "b"
    // "y"
  ```

### Generator 函数的应用
1. 异步操作的同步化表达
  + Generator 函数的暂停执行的效果，意味着可以把异步操作写在yield表达式里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield表达式下面，反正要等到调用next方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。
  ```javascript
    function* loadUI() {  
      showLoading();            //显示加载UI
      yield loadUIDataAsync()   //请求数据
      hideLoading()             //隐藏UI
    }

    var loader = loadUI()
    loader.next()   //加载UI

    loader.next()   //卸载UI
  ```
  - 上面代码中，第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器。下一次对该遍历器调用next方法，则会显示Loading界面（showLoadingScreen），并且异步加载数据（loadUIDataAsynchronously）。等到数据加载完成，再一次使用next方法，则会隐藏Loading界面。可以看到，这种写法的好处是所有Loading界面的逻辑，都被封装在一个函数，按部就班非常清晰。

  + 通过Generator 部署 Ajax 操作，可以用同步的方式表达
  ```javascript
    function* main(){
      var result = yield request('http://some.url')
      var resp = JSON.parse(result)
      console.log(resp.value)
    }

    function request(url){
      makeAjaxCall(url, function(res){
        it.next(res)
      })
    }

    var it = main()
    it.next()
  ```

2. 控制流管理
  + 如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。
  ```javascript
    step1(function (value1) {
      step2(value1, function(value2) {
        step3(value2, function(value3) {
          step4(value3, function(value4) {
            // Do something with value4
          });
        });
      });
    });
  ```
  + 采用 Promise 改写上面代码
  ```javascript
    Promise.resolve(step1)
      .then(step2)
      .then(step3)
      .then(step4)
      .then(function (value4) {
        // Do something with value4
      }, function (error) {
        // Handle any error from step1 through step4
      })
      .done();
  ```
  + 上面代码已经把回调函数改成从直线执行的形式，但是加入了大量 Promise 的语法，使用 Generator 函数可以进一步改善代码
  ```javascript
    function* longRunningTask(value1){
      try{
        var value2 = yield step1(value1)
        var value3 = yield step2(value2)
        var value4 = yield step3(value3)
        // Do something with value4
      }catch(e){
        // Handle any error from step1 through step4
      }
    }

    //然后，使用一个函数，按次序自动执行所有步骤。
    function scheduler(task){
      var taskObj = task.next(task.value)
      // 如果Generator函数未结束，就继续调用
      if(!taskObj.done){
        task.value = taskObj.value
        scheduler(task)
      }
    }
    scheduler(longRunningTask(initialValue))
  ```

3. 部署 Iterator 接口
  + 利用 Generator 函数，可以在任意对象上部署 Iterator 接口
  ```javascript
    function* iteratorEntries(obj){
      let keys = Reflect.ownKeys(obj)
      for(let key of keys){
        yield [key, obj[key]]
      }
    }

    let myObj = { foo: 3, bar: 7 };
    for(let [key,value] of iteratorEntries(myObj)){
      console.log(key, value)
    }
  ```

4. 作为数据结构
  + Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。
  ```javascript
    function* doStuff() {
      yield fs.readFile.bind(null, 'hello.txt');
      yield fs.readFile.bind(null, 'world.txt');
      yield fs.readFile.bind(null, 'and-such.txt');
    }
  ```

## Generator 函数的异步应用
### 传统方法
  + ES6 之前，异步编程的方法，大概有以下几种
    - 回调函数
    - 时间监听
    - 发布/订阅
    - Promise 对象


### Thunk 函数
  + 传名调用：在函数传参时直接将参数传入函数体，不计算参数的值，只有在函数体中用到它时才会求值
  + 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
  ```javascript
    function f(m){
      return m * 2
    }
    f(x + 5)

    // 等同于
    var thunk = function(){
      return x+5
    }
    function f(thunk){
      return thunk() * 2
    }
  ```

  + 在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的*单参数*函数。下面是一个简单的 Thunk 函数转换器。
  ```javascript
    //ES5版本
    var Thunk = function(fn){
      return function(){
        var args = Array.prototype.slice.call(arguments)
        return function(callback){
          args.push(callback)
          fn.apply(this,args)
        }
      }
    }

    //ES6版本
    const Thunk = function(fn){
      return function(...args){
        return function(callback){
          fn.call(this, ...args, callback)
        }
      }
    }
  ```