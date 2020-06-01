### 简介
+ ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
  ```javascript
    class Point(){
      constructor(x, y){
        this.x = x
        this.y = y
      }
      toString(){
        return '(' + this.x + ', ' + this.y + ')';
      }
    }
  ```
  - Point类除了构造方法，还定义了一个toString方法。注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，*方法之间不需要逗号分隔，加了会报错*。

+ 构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
  ```javascript
    class Point {
      constructor() {}
      toString() {}
      toValue() {}
    }

    // 等同于

    Point.prototype = {
      constructor() {},
      toString() {},
      toValue() {},
    };
  ```
+ 在类的实例上面调用方法，其实就是调用原型上的方法。
+ 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。
  ```javascript
    class Point(){
      constructor(){}
    }

    Object.assign(Point.prototype, {
      toString(){ ... }
      toValue(){ ... }
    })
  ```
+ 类的内部定义的所有方法，都是不可枚举的

+ constructor 方法
  - constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显示定义，一个空的 constructor 方法会被默认添加
  - constructor 方法默认返回实例对象（即this），完全可以指定返回另外一个对象
  ```javascript
    class Foo{
      constructor(){
        return Object.create(null)
      }
    }

    new Foo() instanceof Foo
    // false 
  ```
+ 类的实例
  - 类必须使用new 调用，否则会报错
  - 实例的属性除非显示定义在其本身上（即定义在this 对象上），否则都是定义在原型上
  ```javascript
  //定义类
    class Point {

      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }

    }

    var point = new Point(2, 3);

    point.toString() // (2, 3)

    point.hasOwnProperty('x') // true
    point.hasOwnProperty('y') // true
    point.hasOwnProperty('toString') // false
    point.__proto__.hasOwnProperty('toString') // true
  ```
  - 类的所有实例共享一个原型对象

+ 取值函数（getter）和存值函数（setter）
  - 在类的内部使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为
  ```javascript
    class MyClass{
      constructor (){}

      get prop(){
        return 'getter'
      }

      set prop(value){
        console.log('setter: ' + value)
      }
    }
    let inst = new MyClass()
    inst.prop = 123;    // setter: 123
    inst.prop;          // getter
  ```
  - 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
  ```javascript 
    var descriptor = Object.getOwnPropertyDescriptor(MyClass.prototype, 'html')
    'get' in descriptor; //true
    'set' in descriptor; //true
  ```

+ 属性表达式
  - 类的属性名可以采用表达式
  ```javascript
    let methodName = 'getArea';

    class Square {
      constructor(length) {
        this.length = length
      }

      [methodName]() {
        return this.length * this.length
      }
    }
  ```
+ Class 表达式
  ```javascript
    const MyClass = class Me {
      getClassName() {
        return Me.name;
      }
    };
  ```
  - 上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。
  - 采用 Class 表达式，可以写出立即执行的 Class
  ```javascript
    let person = new class{
      constructor(name){
        this.name = name
      }
      sayName(){
        console.log(this.name)
      }
    }('张三')
    person.sayName()  // 张三
  ```

+ 注意点
  1. 严格模式
    - 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。
  2. 不存在提升
    - 类不存在变量提升（hoist），这一点与 ES5 完全不同。
    ```javascript
      new Foo(); // ReferenceError
      class Foo {}
    ```
  3. name 属性
    - name属性总是返回紧跟在class关键字后面的类名。
  4. Generator 方法
    - 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
    ```javascript
      class Foo {
        constructor(...args) {
          this.args = args;
        }
        * [Symbol.iterator]() {
          for (let arg of this.args) {
            yield arg;
          }
        }
      }

      for (let x of new Foo('hello', 'world')) {
        console.log(x);
      }
      // hello
      // world
    ```
    - 上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。
  5. this 指向
    - 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
    ```javascript
      class Logger {
        printName(name = 'there') {
          this.print(`Hello ${name}`);
        }

        print(text) {
          console.log(text);
        }
      }

      const logger = new Logger();
      const { printName } = logger;
      printName(); // TypeError: Cannot read property 'print' of undefined
    ```
    - 上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。
    - 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
      ```javascript
        class Logger {
          constructor() {
            this.printName = this.printName.bind(this);
          }
        }
      ```
    - 另一种解决方法是使用箭头函数。
      ```javascript
        class Obj {
          constructor() {
            this.getThis = () => this;
          }
        }

        const myObj = new Obj();
        myObj.getThis() === myObj // true
      ```
    - 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
      ```javascript
        function selfish (target) {
          const cache = new WeakMap();
          const handler = {
            get (target, key) {
              const value = Reflect.get(target, key);
              if (typeof value !== 'function') {
                return value;
              }
              if (!cache.has(value)) {
                cache.set(value, value.bind(target));
              }
              return cache.get(value);
            }
          };
          const proxy = new Proxy(target, handler);
          return proxy;
        }

        const logger = selfish(new Logger());
      ```

### 静态方法
  + 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
  ```javascript
    class Foo{
      static classMethod(){
        return 'hello'
      }
    }

    Foo.classMethod()  // hello
    var foo = new Foo()
    foo.classMethod()  // TypeError: foo.classMethod is not a function
  ```
  + 如果静态方法包含this关键字，这个this指的是类，而不是实例。
  ```javascript
    class Foo {
      static bar() {
        this.baz();
      }
      static baz() {
        console.log('hello');
      }
      baz() {
        console.log('world');
      }
    }

    Foo.bar() // hello
  ```
  + 父类的静态方法，可以被子类继承。


### 实例属性的新写法
  + 实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。
  ```javascript
    class IncreasingCounter {
      _count = 0;
      get value() {
        console.log('Getting the current value!');
        return this._count;
      }
      increment() {
        this._count++;
      }
    }
  ```
  + 这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

### 静态属性
  + 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
  ```javascript
    class Foo {
    }

    Foo.prop = 1;
    Foo.prop // 1
  ```

### 私有方法和私有属性
  + 私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。
  + 一种做法是在命名上加以区别。
  ```javascript
    class Widget {

      // 公有方法
      foo (baz) {
        this._bar(baz);
      }

      // 私有方法
      _bar(baz) {
        return this.snaf = baz;
      }
    }
  ```
  + 另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。
  ```javascript
    class Widget {
      foo (baz) {
        bar.call(this, baz);
      }

      // ...
    }

    function bar(baz) {
      return this.snaf = baz;
    }
  ```
  + 还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。
  ```javascript
    const bar = Symbol('bar');
    const snaf = Symbol('snaf');

    export default class myClass{

      // 公有方法
      foo(baz) {
        this[bar](baz);
      }

      // 私有方法
      [bar](baz) {
        return this[snaf] = baz;
      }
    };
  ```

## Class 的继承
### 简介
  + Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
  ```javascript
    class ColorPoint extends Point {
      constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
      }

      toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
      }
    }
  ```
  + 注意
    - 子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
    - 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。

### Object.getPrototypeOf()
  + Object.getPrototypeOf方法可以用来从子类上获取父类。
  ```javascript
    Object.getPrototypeOf(ColorPoint) === Point
    // true
  ```

### super 关键字
  + super这个关键字，既可以当作函数使用，也可以当作对象使用
  + 第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
  + 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
  ```javascript
    class A {
      p() {
        return 2;
      }
    }

    class B extends A {
      constructor() {
        super();
        console.log(super.p()); // 2
      }
    }

    let b = new B();
  ```
  + 注意
    - 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。

### 类的 prototype 属性和__proto__属性
  + 子类的__proto__属性，表示构造函数的继承，总是指向父类。
  + 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
  + 这样的结果是因为，类的继承是按照下面的模式实现的。
  ```javascript
    class A {
    }

    class B {
    }

    // B 的实例继承 A 的实例
    Object.setPrototypeOf(B.prototype, A.prototype);

    // B 继承 A 的静态属性
    Object.setPrototypeOf(B, A);

    const b = new B();
  ```

### Mixin 模式的实现
  + Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。
  ```javascript
    const a = {
      a: 'a'
    };
    const b = {
      b: 'b'
    };
    const c = {...a, ...b}; // {a: 'a', b: 'b'}
  ```
+ 下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。
  ```javascript
    function mix(...mixins){
      class Mix{
        constructor(){
          for (let mixin of mixins){
            copyProperties(this, new mixin());    //拷贝实例属性
          }
        }
      }

      for(let mixin of mixins){
        copyProperties(Mix, mixin);    //拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype);    //拷贝原型属性
      }

      return Mix
    }

    function copyProperties(target, source){
      for(let key of Reflect.ownKey(source)){
         if ( key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name'
          ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
          }
      }
    }
  ```

  


  ```javascript

  ```
