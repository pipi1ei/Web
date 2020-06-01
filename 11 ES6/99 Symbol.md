### Symbol 概述
+ ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上*防止属性名的冲突*。这就是 ES6 引入Symbol的原因

+ ES6 引入了一种新的*原始数据类型Symbol*，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

+ Symbol 值通过Symbol函数生成。
  - 这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型
  - 凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
  ```javascript
    let s = Symbol();

    typeof s  // "symbol"
  ```
+ 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
  ```javascript
    const obj = {
      toString() {
        return 'abc';
      }
    };
    const sym = Symbol(obj);
    sym // Symbol(abc)
  ```

+ 注意：
  - Symbol 函数前不能使用 new 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。
  - Symbol函数的参数只是表示对当前 Symbol 值的描述，因此*相同参数的Symbol函数的返回值是不相等*的。
    ```javascript
      // 没有参数的情况
      let s1 = Symbol();
      let s2 = Symbol();

      s1 === s2 // false

      // 有参数的情况
      let s1 = Symbol('foo');
      let s2 = Symbol('foo');

      s1 === s2 // false
    ```
  - Symbol 值不能与其他类型的值进行运算，会报错。
  - 但是，Symbol 值可以显式转为字符串。也可以转为布尔值，但是不能转为数值。
    ```javascript
      let sym = Symbol('My symbol');

      String(sym) // 'Symbol(My symbol)'
      sym.toString() // 'Symbol(My symbol)'
      let sym = Symbol();
      Boolean(sym) // true
      !sym  // false

      if (sym) {
        // ...
      }

      Number(sym) // TypeError
      sym + 2 // TypeError
    ```


### Symbol.prototype.description
+ 创建 Symbol 的时候，可以添加一个描述。下面代码中，sym的描述就是字符串foo。
    ```javascript
      const sym = Symbol('foo');
    ```
  - 但是，读取这个描述需要将 Symbol 显式转为字符串，即下面的写法。
    ```javascript
      const sym = Symbol('foo');

      String(sym) // "Symbol(foo)"
      sym.toString() // "Symbol(foo)"
    ```

+ ES2019 提供了一个实例属性description，直接返回 Symbol 的描述。
  ```javascript
    const sym = Symbol('foo');
    sym.description;  // "foo"
  ```

### 作为属性名的 Symbol
+ 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。
  - 这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
  ```javascript
    let mySymbol = Symbol();

    // 第一种写法
    let a = {};
    a[mySymbol] = 'Hello';
    // 第二种写法
    let b = {
      [mySymbol]: 'Hello'
    };
    // 第三种写法
    let c = {};
    Object.defineProperty(c,mySymbol,{
      value: 'Hello'
    });

    // 以上写法都得到同样的结果
    log(a[mySymbol])  // "Hello"
  ```

+ 注意：
  - 注意，Symbol 值作为对象属性名时，不能用点运算符。因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值。
    ```javascript
      const mySymbol = Symbol();
      const a = {};
      a.mySymbol = 'Hello';
      a[mySymbol];   // undefined
      a['mySymbol']  // 'hello'
    ```
  - 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
    ```javascript
      let s = Symbol();

      let obj = {
        [s]: function (arg) { ... }
      };

      obj[s](123);

      // 采用增强的对象写法
      let obj = {
        [s](arg) { ... }
      };
    ```

+ Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
  ```javascript
    const log = {};

    log.levels = {
      DEBUG: Symbol('debug'),
      INFO: Symbol('info'),
      WARN: Symbol('warn')
    };
    console.log(log.levels.DEBUG, 'debug message');
    console.log(log.levels.INFO, 'info message');
  ```
+ Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。


### 实例：消除魔术字符串
+ 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
+ 常用的消除魔术字符串的方法，就是把它写成一个变量。
  ```javascript
    const shapeType = {
      triangle: 'Triangle'
    };

    function getArea(shape, options) {
      let area = 0;
      switch (shape) {
        case shapeType.triangle:
          area = .5 * options.width * options.height;
          break;
      }
      return area;
    }

    getArea(shapeType.triangle, { width: 100, height: 100 });
  ```
  - 上面代码中，我们把Triangle写成shapeType对象的triangle属性，这样就消除了强耦合。如果仔细分析，可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。
  ```javascript
    const shapeType = {
      triangle: Symbol()
    };
  ```

### 属性名的遍历
+ Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
+ Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
  ```javascript
    const obj = {};
    let a = Symbol('a');
    let b = Symbol('b');

    obj[a] = 'Hello';
    obj[b] = 'World';

    const objectSymbols = Object.getOwnPropertySymbols(obj);

    objectSymbols
    // [Symbol(a), Symbol(b)]
  ```

+ 另一个新的 API，Reflect.ownKeys()方法可以*返回所有类型的键名*，包括常规键名和 Symbol 键名。
  ```javascript
    let obj = {
      [Symbol('my_key')]: 1,
      enum: 2,
      nonEnum: 3
    };

    Reflect.ownKeys(obj)  //  ["enum", "nonEnum", Symbol(my_key)]
  ```

+ 由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。
  ```javascript
    let size = Symbol('size');

    class Collection {
      constructor() {
        this[size] = 0;
      }

      add(item) {
        this[this[size]] = item;
        this[size]++;
      }

      static sizeOf(instance) {
        return instance[size];
      }
    }

    let x = new Collection();
    Collection.sizeOf(x) // 0

    x.add('foo');
    Collection.sizeOf(x) // 1

    Object.keys(x) // ['0']
    Object.getOwnPropertyNames(x) // ['0']
    Object.getOwnPropertySymbols(x) // [Symbol(size)]
  ```

### Symbol.for()，Symbol.keyFor()
1. Symbol.for()
  + 有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
  ```javascript
    let s1 = Symbol.for('foo');
    let s2 = Symbol.for('foo');

    s1 === s2 // true
  ```

  + Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是:
    - 前者会被登记在全局环境中供搜索，后者不会
    - Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。

  + 注意：
    - Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。

  + Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值
    ```javascript
      iframe = document.createElement('iframe');
      iframe.src = String(window.location);
      document.body.appendChild(iframe);

      iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')  // true
    ```

2. Symbol.keyFor()
  + Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
  ```javascript
    let s1 = Symbol.for("foo");
    Symbol.keyFor(s1) // "foo"

    let s2 = Symbol("foo");
    Symbol.keyFor(s2) // undefined
  ```


### 内置的 Symbol 值
+ 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。
+ Symbol.hasInstance
  - 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
    ```javascript
      class MyClass {
        [Symbol.hasInstance](foo) {
          return foo instanceof Array;
        }
      }

      [1, 2, 3] instanceof new MyClass() // true
    ```

+ Symbol.isConcatSpreadable
  - 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
  ```javascript
    let arr1 = ['c', 'd'];
    ['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
    arr1[Symbol.isConcatSpreadable] // undefined

    let arr2 = ['c', 'd'];
    arr2[Symbol.isConcatSpreadable] = false;
    ['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
  ``` 
  - 上面代码说明，数组的默认行为是可以展开，Symbol.isConcatSpreadable默认等于undefined。该属性等于true时，也有展开的效果。

+ Symbol.species
  - 对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。
  ```javascript
    class MyArray extends Array {
    }

    const a = new MyArray(1, 2, 3);
    const b = a.map(x => x);
    const c = a.filter(x => x > 1);

    b instanceof MyArray // true
    c instanceof MyArray // true
  ```
  - 上面代码中，子类MyArray继承了父类Array，a是MyArray的实例，b和c是a的衍生对象。你可能会认为，b和c都是调用数组方法生成的，所以应该是数组（Array的实例），但实际上它们也是MyArray的实例。
  - Symbol.species属性就是为了解决这个问题而提供的。现在，我们可以为MyArray设置Symbol.species属性。
    ```javascript
      class MyArray extends Array {
        static get [Symbol.species]() { return Array; }
      }
    ```

  - 总之，Symbol.species的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。

+ Symbol.match
  - 对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
  ```javascript
    String.prototype.match(regexp)
    // 等同于
    regexp[Symbol.match](this)

    class MyMatcher {
      [Symbol.match](string) {
        return 'hello world'.indexOf(string);
      }
    }

    'e'.match(new MyMatcher()) // 1
  ```

+ Symbol.replace
  - 对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
  ```javascript
    String.prototype.replace(searchValue, replaceValue)
    // 等同于
    searchValue[Symbol.replace](this, replaceValue)
  ```

+ Symbol.search
  - 对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值。
  ```javascript
    String.prototype.search(regexp)
    // 等同于
    regexp[Symbol.search](this)

    class MySearch {
      constructor(value) {
        this.value = value;
      }
      [Symbol.search](string) {
        return string.indexOf(this.value);
      }
    }
    'foobar'.search(new MySearch('foo')) // 0
  ```

+ Symbol.split
  - 对象的Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值。
  ```javascript
    String.prototype.split(separator, limit)
    // 等同于
    separator[Symbol.split](this, limit)
  ```

+ Symbol.iterator
  - 对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
  ```javascript
    const myIterable = {};
    myIterable[Symbol.iterator] = function* () {
      yield 1;
      yield 2;
      yield 3;
    };

    [...myIterable] // [1, 2, 3]
  ```

+ Symbol.toPrimitive
  - 对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
  - Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。
    1. Number：该场合需要转成数值
    2. String：该场合需要转成字符串
    3. Default：该场合可以转成数值，也可以转成字符串

    ```javascript
      let obj = {
        [Symbol.toPrimitive](hint) {
          switch (hint) {
            case 'number':
              return 123;
            case 'string':
              return 'str';
            case 'default':
              return 'default';
            default:
              throw new Error();
          }
        }
      };

      2 * obj // 246
      3 + obj // '3default'
      obj == 'default' // true
      String(obj) // 'str'
    ```

+ Symbol.toStringTag
  - 对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串
  ```javascript
    // 例一
    ({[Symbol.toStringTag]: 'Foo'}.toString())
    // "[object Foo]"

    // 例二
    class Collection {
      get [Symbol.toStringTag]() {
        return 'xxx';
      }
    }
    let x = new Collection();
    Object.prototype.toString.call(x) // "[object xxx]"
  ```

+ Symbol.unscopables
  - 对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
  ```javascript
    Array.prototype[Symbol.unscopables]
    // {
    //   copyWithin: true,
    //   entries: true,
    //   fill: true,
    //   find: true,
    //   findIndex: true,
    //   includes: true,
    //   keys: true
    // }

    Object.keys(Array.prototype[Symbol.unscopables])
    // ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']
  ```






  ```javascript

  ```