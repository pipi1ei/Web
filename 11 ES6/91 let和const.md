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


## const

- 本质：const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
