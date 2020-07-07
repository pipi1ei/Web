## 总结
### let
1. 存在块级作用域
  - 块级作用域和函数声明问题
    + ES5 规定不能在块级作用域中声明函数，只能在全局作用域和函数作用域中声明函数。但浏览器并没有遵循这个规定，所有在块级作用域中声明函数不会报错，且函数声明会被提升到作用域顶端
    + ES6 规定可以在块级作用域中声明函数，但函数声明语句类似 let 声明。但浏览器的实现可以不遵守上面的规定，可以有自己的行为方式
      - 允许在块级作用域声明函数
      - 函数声明类似 var，会提升到全局作用域或函数作用域头部（*声明提升，值为undefined*）
      - 同时函数声明还会提升到块级作用域的头部
2. 不存在变量提升：暂时性死区问题
3. 全局作用域中，let 声明的变量不是 window 的属性

### const
1. 存在块级作用域
2. 不存在变量提升
3. 全局作用域中，const 声明的变量不是 window 的属性
4. const 声明的变量表示内存地址不可变，但里面的内容可变
5. 如果想要把一个对象冻结，可以使用 Object.freeze() 方法

## let
  1. for 循环的计数器，很适合用 let 命令
    ```javascript
      for(let i = 0; i < 10; i++){ ... }
      console.log(i) //ReferenceError: i is not defined
      ```
  
    如果使用 var
    ```javascript
      var a = [];
      for(var i = 0; i < 10; i++){
        a[i] = function(){
          console.log(i)
        }
      }
      a[6]() // 10
      // 变量 i 是 var 命令声明的，在全局范围内都有效，所以全局只有一个变量 i。
    ```
  2. 不存在变量提升
    - let 声明的变量一定要在声明后使用，否则报错。


### 暂时性死区
- 只要块级作用域内存在 let 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
- “暂时性死区”也意味着 typeof 不再是一个百分之百安全的操作。
```javascript
  var tmp = 123;

  if (true) {
    tmp = "abc"; // ReferenceError
    let tmp;
  }

  typeof x; // ReferenceError
  let x;
```

- 有些“死区”比较隐蔽，不太容易发现。

```javascript
  function bar(x = y, y = 2) {
    return [x, y];
  }
  bar(); // 报错

  // 报错
  let x = x; //在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。
```

- 上面代码中，调用 bar 函数之所以报错（某些实现可能不报错），是因为参数 x 默认值等于另一个参数 y，而此时 y 还没有声明，属于“死区”。如果 y 的默认值是 x，就不会报错，因为此时 x 已经声明了。



### 块级作用域与函数声明
- ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
- 下面两种情况在 es5 中都是非法的,但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。
```javascript
  // 情况一
  if (true) {
    function f() {}
  }

  // 情况二
  try {
    function f() {}
  } catch (e) {
    // ...
  }
```

- 在 es6 中，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于 let，在块级作用域之外不可引用。
  ```javascript
    function f() {
      console.log("I am outside!");
    }

    (function () {
      if (false) {
        function f() {
          console.log("I am inside!");
        }
      }
      f();
    })();
    // 上面代码在 es5 中会得到 'I am inside!'，而在 es6 中会报错：Uncaught TypeError: f is not a function
  ```
上述代码 在 es6 中报错的原因：
  + ES6 在附录 B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。
    - 允许在块级作用域内声明函数。
    - 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
    - 同时，函数声明还会提升到所在的块级作用域的头部。

- ES6 的块级作用域必须要有大括号，如果没有，Javascript 引擎就会认为不存在块级作用域
  ```javascript
    if(true) let x = 1;   //报错
    if(true){
      let x = 1;    //不报错
    }
  ```
  + 上面代码中，第一种写法没有大括号，所以不存在块级作用域，而let只能出现在当前作用域的顶层，所以报错
- 函数声明也是如此，*严格模式下*，函数只能声明在当前作用域的顶层。
  ```javascript
    // 不报错
    'use strict';
    if (true) {
      function f() {}
    }

    // 报错
    'use strict';
    if (true)
      function f() {}
  ```



## const
+ const声明一个只读的常量。一旦声明，常量的值就不能改变。
+ const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。对于const来说，只声明不赋值，就会报错。

+ 本质：const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

+ 如果真的想将对象冻结，应该使用Object.freeze方法。
  ```javascript
    const foo = Object.freeze({})
    // 常规模式时，下面一行不起作用；
    // 严格模式时，该行会报错
    foo.prop = 123;
  ```
+ 如果冻结的对象中的属性是一个对象，那么这个属性可以改变
+ 如果想把对象的属性也冻结，可以使用下面的函数
``` javascript
  function constantize(obj){
    Object.freeze(obj)
    Object.keys(obj).forEach(prop => {
      if(typeof obj[prop] === 'object'){
        constantize(obj[prop])
      }
    })
  }
```


## 顶层对象的属性
+ 顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。ES5 之中，顶层对象的属性与全局变量是等价的。
```javascript
  window.a = 1;
  a // 1

  a = 2;
  window.a // 2
```

+ 在 ES6 中，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
```javascript
  var a = 1;
  // 如果在 Node 的 REPL 环境，可以写成 global.a
  // 或者采用通用方法，写成 this.a
  window.a // 1

  let b = 1;
  window.b // undefined
```