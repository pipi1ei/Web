## Iterator 和 for ... of 循环
### Iterator 
1. 概念
  + JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。
  + 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
  + Iterator 的作用有三个：
    - 为各种数据结构提供一个统一、简便的访问接口
    - 使得数据结构的成员能够按某种次序排列
    - ES6 创造了一种新的遍历命令：for ... of 循环，Iterator 接口主要供 for of 消费
  + Iterator 的遍历过程
    1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上就是一个指针对象
    2. 第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员
    3. 第二次调用指针对象的 next 方法，可以将指针指向数据结构的第二个成员
    4. 不断调用指针对象的 next 方法，知道它指向数据结构的结束位置
    - 每一次调用 next 方法，都会返回数据结构的当前成员信息。就是返回一个包含 value 和 done 两个属性的对象。其中 value 属性是当前成员的值，done 属性是一个布尔值，标识遍历是否结束
  + 模拟 next 方法
    ```javascript 
      function makeIterator(array) {  
        var nextIndex = 0;
        return {
          next: function () {  
            return nextIndex < array.length ? 
              {value: array[nextIndex++], done: false} : {value: undefined, done: true}
          }
        }
      }

      var it = makeIterator(['a', 'b']);
      it.next() // { value: "a", done: false }
      it.next() // { value: "b", done: false }
      it.next() // { value: undefined, done: true }
    ```
2. 默认 Iterator 接口
  + Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
  + 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。默认的 iterator 接口部署在数据结构的 Symbol.iterator 属性。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值。
  + 原生具备Iterator 接口的数据如下：
    - Array
    - Set
    - Map
    - TypedArray
    - 函数的 arguments 对象
    - NodeList 对象

  + 对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

  + 对象之所以没有部署 iterator 接口，因为对象的属性遍历的现后顺序是不确定的，需要开发者手动指定。本质上遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。如果对象部署了遍历器接口，这时对象实际上被当作 Map 结构使用，而ES6原生提供了 Map 结构，所有对象没有必要部署 iterator 接口


3. 调用 Iterator 接口的场合
  + 解构赋值
    - 对数组和 Set 结构进行结构赋值时，会默认调用 Symbol.iterator 方法
    ```javascript 
      let set = new Set().add('a').add('b').add('c')
      let [x,y] = set   //x='a', y='b'

      let [first, ...rest] = set  // first='a', rest=['b','c']
    ```
  + 扩展运算符
    - 扩展运算符 ... 也会默认调用 Iterator 接口
    ```javascript 
      // 例一
      var str = 'hello';
      [...str] //  ['h','e','l','l','o']

      // 例二
      let arr = ['b', 'c'];
      ['a', ...arr, 'd']
      // ['a', 'b', 'c', 'd']
    ```
    - 任何部署了 Iterator 接口的数据结构都可以通过扩展运算符转为数组：`let arr = [...iterable]`
  + yield*
    - yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
    ```javascript 
      let generator = function* () {
        yield 1;
        yield* [2,3,4];
        yield 5;
      };

      var iterator = generator();

      iterator.next() // { value: 1, done: false }
      iterator.next() // { value: 2, done: false }
      iterator.next() // { value: 3, done: false }
      iterator.next() // { value: 4, done: false }
      iterator.next() // { value: 5, done: false }
      iterator.next() // { value: undefined, done: true }
    ```
  + 其他场合
    - 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。
      + for...of
      + Array.from()
      + Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
      + Promise.all()
      + Promise.race()


4. Iterator 接口与 Generator 函数 
  + Symbol.iterator方法的最简单实现，就是是使用 Generator 函数。
  ```javascript 
    let myIterable = {
      [Symbol.iterator]: function* () {  
        yield 1;
        yield 2;
        yield 3;
      }
    };
    [...myIterable]  // [1,2,3]

    // 或者采用下面的简洁写法
    let obj = {
      *[Symbol.iterator](){
        yield 'hello';
        yield 'world'
      }
    }

    for(let x of ojb){
      console.log(x)
    }
    // hello
    // world
  ```

5. 遍历器对象的 return()，throw() 
  + 遍历器对象除了具有next方法，还可以具有return方法和throw方法。如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。
  + return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。
  ```javascript 
    function readLinesSync(file) {
      return {
        [Symbol.iterator]() {
          return {
            next() {
              return { done: false };
            },
            return() {
              file.close();
              return { done: true };
            }
          };
        },
      };
    }
  ```
