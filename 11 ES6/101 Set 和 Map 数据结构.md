## Set
+ ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
+ Set本身是一个构造函数，用来生成 Set 数据结构。
  ```javascript
    const s = new Set();
    [1,2,2,5,3,4,6,6,4].forEach(x => s.add(x));

    for(let i of s){
      console.log(i);
    }
  ```

+ Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
  ```javascript
    // 例一
    const set = new Set([1, 2, 3, 4, 4]);
    [...set]
    // [1, 2, 3, 4]

    // 例二
    const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
    items.size // 5
  ```

+ 向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。
  - Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。

+ Set 实例的属性和方法
  - Set 结构的实例有以下属性。
    1. Set.prototype.constructor：构造函数，默认就是Set函数。
    2. Set.prototype.size：返回Set实例的成员总数。

  - Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。
    + 操作方法：
      1. Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
      2. Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
      3. Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
      4. Set.prototype.clear()：清除所有成员，没有返回值。

    + 遍历方法：
      1. Set.prototype.keys()：返回键名的遍历器
      2. Set.prototype.values()：返回键值的遍历器
      3. Set.prototype.entries()：返回键值对的遍历器
      4. Set.prototype.forEach()：使用回调函数遍历每个成员

      - Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。
      - keys()，values()，entries()：keys方法、values方法、entries方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以*keys方法和values方法的行为完全一致*。
      ```javascript
        let set = new Set(['red', 'green', 'blue']);

        for (let item of set.keys()) {
          console.log(item);
        }
        // red
        // green
        // blue

        for (let item of set.values()) {
          console.log(item);
        }
        // red
        // green
        // blue

        for (let item of set.entries()) {
          console.log(item);
        }
        // ["red", "red"]
        // ["green", "green"]
        // ["blue", "blue"]
      ```

      - forEach(): Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
      - forEach方法的参数就是一个处理函数。该函数的参数与数组的forEach一致，依次为键值、键名、集合本身。另外，forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。
      ```javascript
        let set = new Set([1, 4, 9]);
        set.forEach((value, key) => console.log(key + ' : ' + value))
        // 1 : 1
        // 4 : 4
        // 9 : 9
      ```

    + 遍历的应用
      1. 数组的map和filter方法可以间接用于 Set 了。
      ```javascript
        let set = new Set([1,2,3])
        set = new Set([...set].map(x => x * 2))  // [2,4,6]
      ```

      2. 去除数组重复成员
      ```javascript
        let arr = [1,1,2,2,3,3]
        arr = [...new Set(arr)]  // [1,2,3]
      ```

      3. 实现并集（Union）、交集（Intersect）和差集
      ```javascript
        let a = new Set([1, 2, 3]);
        let b = new Set([4, 3, 2]);

        // 并集
        let union = new Set([...a, ...b]);
        // Set {1, 2, 3, 4}

        // 交集
        let intersect = new Set([...a].filter(x => b.has(x)));
        // set {2, 3}

        // 差集
        let difference = new Set([...a].filter(x => !b.has(x)));
        // Set {1}
      ```


## WeakSet
+ WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
  - 首先，WeakSet 的成员只能是对象，而不能是其他类型的值
  - 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
+ WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

+ 由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

+ WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

+ 其他用处：
  ```javascript
    const foos = new WeakSet();

    class Foo {
      constructor(){
        foos.add(this)
      }
      method(){

      }
    }
  ```


## Map
+ JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
  ```javascript
    const data = {};
    const element = document.getElementById('myDiv');

    data[element] = 'metadata';
    data['[object HTMLDivElement]'] // "metadata"
  ```
  - 上面代码原意是将一个 DOM 节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串[object HTMLDivElement]。

+ 为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
  ```javascript
    const m = new Map();
    const o = {p: 'Hello World'};

    m.set(o, 'content')
    m.get(o) // "content"

    m.has(o) // true
    m.delete(o) // true
    m.has(o) // false
  ```

+ Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
  ```javascript
    const map = new Map([
      ['name', '张三'],
      ['title', 'Author']
    ]);

    map.size  // 2
    map.has('name') // true
    map.get('name') // "张三"
    map.has('title') // true
    map.get('title') // "Author"
  ```
  - Map构造函数接受数组作为参数，实际上执行的是下面的算法。
    ```javascript 
      const items = [
        ['name', '张三'],
        ['title', 'Author']
      ];

      const map = new Map();
      items.forEach(
        ([key,value]) => map.add(key,value)
      )
    ```

+ 如果对同一个键多次赋值，后面的值将覆盖前面的值。
  ```javascript
    const map = new Map();

    map.set(1, 'aaa').set(1, 'bbb');

    map.get(1) // "bbb"
  ```

+ 如果读取一个未知的键，则返回undefined。

+ 注意：
  - 只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
    ```javascript
      const map = new Map();

      map.set(['a'], 555);
      map.get(['a']) // undefined


      const map = new Map();
      const k1 = ['a'];
      const k2 = ['a'];

      map.set(k1, 111).set(k2, 222);

      map.get(k1) // 111
      map.get(k2) // 222
    ```
  - 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
    ```javascript
      let map = new Map();

      map.set(-0, 123);
      map.get(+0) // 123

      map.set(true, 1);
      map.set('true', 2);
      map.get(true) // 1

      map.set(undefined, 3);
      map.set(null, 4);
      map.get(undefined) // 3

      map.set(NaN, 123);
      map.get(NaN) // 123
    ```

+ 实例属性和方法
  - size 属性：返回 Map 结构的成员总数
  - Map.prototype.set(key, value)：设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
  - Map.prototype.get(key)：读取key对应的键值，如果找不到key，返回undefined。
  - Map.prototype.has(key)：返回一个布尔值，表示某个键是否在当前 Map 对象之中。
  - Map.prototype.delete(key)：删除某个键，返回true。如果删除失败，返回false。
  - Map.prototype.clear()：清除所有成员，没有返回值。

+ 遍历方法
  - Map.prototype.keys()：返回键名的遍历器。
  - Map.prototype.values()：返回键值的遍历器。
  - Map.prototype.entries()：返回所有成员的遍历器。
  - Map.prototype.forEach()：遍历 Map 的所有成员。

+ Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）
  ```javascript
    const map = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);

    [...map.keys()]  // [1, 2, 3]

    [...map.values()]  // ['one', 'two', 'three']

    [...map.entries()]  // [[1,'one'], [2, 'two'], [3, 'three']]

    [...map]  // [[1,'one'], [2, 'two'], [3, 'three']]
  ```

+ 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
  ```javascript
    const map0 = new Map()
      .set(1, 'a')
      .set(2, 'b')
      .set(3, 'c');

    const map1 = new Map(
      [...map0].filter(([k, v]) => k < 3)
    );
    // 产生 Map 结构 {1 => 'a', 2 => 'b'}

    const map2 = new Map(
      [...map0].map(([k, v]) => [k * 2, '_' + v])
        );
    // 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
  ```

+ Map 与其他数据结构相互转换
  - Map 转数组：使用扩展运算符 ...
    ```javascript
      const myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
      [...myMap]
      // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
    ```
  - 数组转Map
    ```javascript
      new Map([
        [true, 7],
        [{foo: 3}, ['abc']]
      ]);
    ```

  - Map 转对象
    1. 如果 Map 所有的键都是字符串，他可以完好无损的转为对象
    ```javascript
      function strMapToObj(strMap){
        var obj = Object.create(null);
        for(let [k,v] of strMap){
          obj[k] = v;
        }
        return obj;
      }
    ```

    2. 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

  - 对象转 Map
    ```javascript
      function objToMap(obj){
        return new Map(obj.entries());
      }
    ```

  - Map 转 JSON
    1. Map 的键名都是字符串，这时可以选择转为对象 JSON。
      ```javascript
        function srtMap2Json(strMap){
          return JSON.stringify(strMapToObj(strMap))
        }
      ```
    2. Map 的键名有非字符串，这时可以选择转为数组 JSON。
      ```javascript
        function map2ArrayJson(map){
          return JSON.stringify([...map])
        }
      ```

  - JSON 转 Map
    1. 所有键名都是字符串。
    ```javascript
      function json2StrMap(jsonStr){
        return objToMap(JSON.parse(jsonStr));
      }
    ```
    2. 整个 JSON 就是一个数组，且每个数组成员本身又是一个有两个成员的数组。
    ```javascript
      function json2Map(jsonStr){
        return new Map(JSON.parse(jsonStr))
      }
    ```


## WeakMap
+ WeakMap结构与Map结构类似，也是用于生成键值对的集合。
+ WeakMap与Map的区别有两点。
  - WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
  - WeakMap的键名所指向的对象，不计入垃圾回收机制。

+ WeakMap 与 Map 在 API 上的区别主要是两个
  - 一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。
  - 二是无法清空，即不支持clear方法
  - 因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。



  ```javascript

  ```