## Reflect
### 概述
+ Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个。
  1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。
  2. 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
    ```javascript
      // 老写法
      try {
        Object.defineProperty(target, property, attributes);
        // success
      } catch (e) {
        // failure
      }

      // 新写法
      if (Reflect.defineProperty(target, property, attributes)) {
        // success
      } else {
        // failure
      }
    ```
  3.  让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
    ```javascript
      // 老写法
      'assign' in Object // true

      // 新写法
      Reflect.has(Object, 'assign') // true
    ```
  4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
    ```javascript
      Proxy(target, {
        set: function(target, name, value, receiver) {
          var success = Reflect.set(target, name, value, receiver);
          if (success) {
            console.log('property ' + name + ' on ' + target + ' set to ' + value);
          }
          return success;
        }
      });
    ```

### 静态方法
+ Reflect对象一共有 13 个静态方法。
  - Reflect.apply(target, thisArg, args)
  - Reflect.construct(target, args)
  - Reflect.get(target, name, receiver)
  - Reflect.set(target, name, value, receiver)
  - Reflect.defineProperty(target, name, desc)
  - Reflect.deleteProperty(target, name)
  - Reflect.has(target, name)
  - Reflect.ownKeys(target)
  - Reflect.isExtensible(target)
  - Reflect.preventExtensions(target)
  - Reflect.getOwnPropertyDescriptor(target, name)
  - Reflect.getPrototypeOf(target)
  - Reflect.setPrototypeOf(target, prototype)
+ 上面这些方法的作用，大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的。

1. Reflect.get(target, name, receiver)
  + Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
  + 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
  ```javascript
    var myObject = {
      foo: 1,
      bar: 2,
      get baz() {
        return this.foo + this.bar;
      },
    };

    var myReceiverObject = {
      foo: 4,
      bar: 4,
    };

    Reflect.get(myObject, 'baz', myReceiverObject) // 8
  ```
  + 如果第一个参数不是对象，Reflect.get方法会报错。

2. Reflect.set(target, name, value, receiver) 
  + Reflect.set方法设置target对象的name属性等于value。
  + 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
  ```javascript
    var myObject = {
      foo: 4,
      set bar(value) {
        return this.foo = value;
      },
    };

    var myReceiverObject = {
      foo: 0,
    };

    Reflect.set(myObject, 'bar', 1, myReceiverObject);
    myObject.foo // 4
    myReceiverObject.foo // 1
  ```

3. Reflect.has(obj, name)
  + Reflect.has方法对应name in obj里面的in运算符。

4. Reflect.deleteProperty(obj, name)
  + Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性
  ```javascript
    const myObj = { foo: 'bar' };

    // 旧写法
    delete myObj.foo;

    // 新写法
    Reflect.deleteProperty(myObj, 'foo');
  ```

5. Reflect.construct(target, args)
  + Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
  ```javascript
    function Greeting(name) {
      this.name = name;
    }

    // new 的写法
    const instance = new Greeting('张三');

    // Reflect.construct 的写法
    const instance = Reflect.construct(Greeting, ['张三']);
  ```
  + 如果Reflect.construct()方法的第一个参数不是函数，会报错。

6. Reflect.getPrototypeOf(obj)
  + Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
  + Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。

7. Reflect.setPrototypeOf(obj, newProto)
  + Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。
  ```javascript 
    const myObj = {};
    // 旧写法
    Object.setPrototypeOf(myObj, Array.prototype);
    // 新写法
    Reflect.setPrototypeOf(myObj, Array.prototype);
    myObj.length // 0
  ```
  + 如果无法设置目标对象的原型（比如，目标对象禁止扩展），Reflect.setPrototypeOf方法返回false。
  + 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。
  + 如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。

8. Reflect.apply(func, thisArg, args) 
  + Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
  + 一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。
  ```javascript
    const ages = [11, 33, 12, 54, 18, 96];

    // 旧写法
    const youngest = Math.min.apply(Math, ages);
    const oldest = Math.max.apply(Math, ages);
    const type = Object.prototype.toString.call(youngest);

    // 新写法
    const youngest = Reflect.apply(Math.min, Math, ages);
    const oldest = Reflect.apply(Math.max, Math, ages);
    const type = Reflect.apply(Object.prototype.toString, youngest, []);
  ``` 

9. Reflect.defineProperty(target, propertyKey, attributes)
  + Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。
  ```javascript
    function MyDate() {
      /*…*/
    }

    // 旧写法
    Object.defineProperty(MyDate, 'now', {
      value: () => Date.now()
    });

    // 新写法
    Reflect.defineProperty(MyDate, 'now', {
      value: () => Date.now()
    });
  ```

10. Reflect.getOwnPropertyDescriptor(target, propertyKey)
  +  Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。
  ```javascript
    var myObject = {};
    Object.defineProperty(myObject, 'hidden', {
      value: true,
      enumerable: false,
    });

    // 旧写法
    var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');

    // 新写法
    var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');
  ```

11. Reflect.isExtensible (target)
  + Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
  ```javascript
    const myObject = {};

    // 旧写法
    Object.isExtensible(myObject) // true

    // 新写法
    Reflect.isExtensible(myObject) // true
  ```
  + 如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。

12. Reflect.preventExtensions(target)
  + Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
  ```javascript
    var myObject = {};

    // 旧写法
    Object.preventExtensions(myObject) // Object {}

    // 新写法
    Reflect.preventExtensions(myObject) // true
  ```

13. Reflect.ownKeys (target)
  + Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
  ```javascript
    var myObject = {
      foo: 1,
      bar: 2,
      [Symbol.for('baz')]: 3,
      [Symbol.for('bing')]: 4,
    };

    // 旧写法
    Object.getOwnPropertyNames(myObject)
    // ['foo', 'bar']

    Object.getOwnPropertySymbols(myObject)
    //[Symbol(baz), Symbol(bing)]

    // 新写法
    Reflect.ownKeys(myObject)
    // ['foo', 'bar', Symbol(baz), Symbol(bing)]
  ```

### 实例
  + 观察者模式
  ```javascript
    const queuedObservers = new Set();

    const observe = fn => queuedObservers.add(fn);
    const observable = obj => new Proxy(obj, {set});

    function set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      queuedObservers.forEach(observer => observer());
      return result;
    }
  ```
  - 上面代码中，先定义了一个Set集合，所有观察者函数都放进这个集合。然后，observable函数返回原始对象的代理，拦截赋值操作。拦截函数set之中，会自动执行所有观察者。