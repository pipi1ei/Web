## Proxy
### 概述
+ Proxy 用于修改某些操作的默认行为，等同于在语言层面上做出修改，所以属于一种“元编程”，即对编程语言进行编程
+ Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
```javascript
  var obj = new Proxy({},{
    get: function(target, propKey, receiver){
      console.log(`getting $P{propKey}`);
      return Reflect.get(target,propKey,receiver);
    },
    set: function(target, propKey, value, receiver){
      console.log(`setting ${propKey}`)
      return Reflect.set(target, propKey, value, receiver)
    }
  })

  obj.count = 1
  //  setting count!
  ++obj.count
  //  getting count!
  //  setting count!
  //  2
```
  - 解释：上面代码对一个空对象架设了一层拦截，重定义了属性的读取（get）和设置（set）行为。这里暂时先不解释具体的语法，只看运行结果。对设置了拦截行为的对象obj，去读写它的属性，就会得到下面的结果。

+ ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
  ```javascript
    var proxy = new Proxy(target, handler);
  ```
  -  Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

+ 下面是 Proxy 支持的拦截操作一览，一共 13 种。
  - get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
  - set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
  - has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
  - deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
  - ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
  - getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
  - defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
  - preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
  - getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
  - isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
  - setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
  - apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
  - construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。


### Proxy 实例的方法
1. get():
  + get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
  ```javascript
    var person = {
      name: '张三'
    }
    var proxy = new Proxy(person, {
      get: function(target, propKey){
        if(propKey in target){
          return target[propKey]
        }else{
          throw new ReferenceError("Prop name \"" + propKey + "\" does not exist")
        }
      }
    })
  ```
  + get方法可以继承。
  ```javascript
    let proto = new Proxy({}, {
      get(target, propertyKey, receiver) {
        console.log('GET ' + propertyKey);
        return target[propertyKey];
      }
    });

    let obj = Object.create(proto);
    obj.foo // "GET foo"
  ```

  + 如果一个属性不可配置且不可写，则 Proxy 不能修改该属性，否则通过Proxy 对象访问改属性会报错
  ```javascript
    const target = Object.defineProperties({}, {
      foo: {
        value: 123,
        writable: false,
        configurable: false
      },
    });

    const handler = {
      get(target, propKey) {
        return 'abc';
      }
    };

    const proxy = new Proxy(target, handler);

    proxy.foo
    // TypeError: Invariant check failed
  ```

2. set()
  + set 方法用来拦截某个属性的赋值操作，可以接受四个参数，一次为目标对象，属性名，属性值和 Proxy 实例本身。最后一个参数可选
  ```javascript
    let validator = {
      set: function(obj, prop, value) {
        if (prop === 'age') {
          if (!Number.isInteger(value)) {
            throw new TypeError('The age is not an integer');
          }
          if (value > 200) {
            throw new RangeError('The age seems invalid');
          }
        }

        // 对于满足条件的 age 属性以及其他属性，直接保存
        obj[prop] = value;
      }
    };

    let person = new Proxy({}, validator);

    person.age = 100;

    person.age // 100
    person.age = 'young' // 报错
    person.age = 300 // 报错
  ```

  + 注意：
    - 如果目标对象自身的某个属性，不可写且不可配置，那么 set 方法将不起作用
    - 严格模式下，set代理如果没有返回true ，就会报错

3. apply()
  + apply 方法拦截函数的调用、call 和 apply 操作
  + apply 方法接收3个参数，分别时目标对象、目标对象的上下文对象（this）和目标对象的参数数组
  ```javascript
    var target = function () { return 'I am the target'; };
    var handler = {
      apply: function () {
        return 'I am the proxy';
      }
    };

    var p = new Proxy(target, handler);

    p()
    // "I am the proxy"
  ```
  + 直接调用 Reflect.apply 方法，也会被拦截

4. has()
  + has() 方法用来拦截 HasProperty 操作，即判断对象是否具有某个属性时，这个方法会生效，典型的操作就是 in 运算符
  + has 方法接收两个参数，分别是目标对象、需查询的属性名  
  ```javascript
    var handler = {
      has(target, key){
        if(key[0] === '_'){
          return false
        }
        return key in target
      }
    }

    var target = { _prop: 'foo', prop: 'foo'}
    var proxy = new Proxy(target,handler)
    '_prop' in proxy //false
  ```
  + 如果原对象不可配置或者禁止扩展，这时 has 操作会报错
  ```javascript
    var obj = { a: 10 };
    Object.preventExtensions(obj);

    var p = new Proxy(obj, {
      has: function(target, prop) {
        return false;
      }
    });

    'a' in p // TypeError is thrown
  ```
  + 注意
    - has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has方法不判断一个属性是对象自身的属性，还是继承的属性。
  
5. construct()
  + construct 方法用于拦截 new 命令
  + 该方法接收3个参数，分别是 目标对象，构造函数的参数对象，创造实例对象是，new 命令作用的构造函数
  ```javascript
    var p = new Proxy(function () {}, {
      construct: function(target, args) {
        console.log('called: ' + args.join(', '));
        return { value: args[0] * 10 };
      }
    });

    (new p(1)).value
    // "called: 1"
    // 10
  ```
  + 注意
    - construct 方法返回的必须是一个对象，否则就会报错

6. deleteProperty()
  + deleteProperty 方法用于拦截 delete 操作，如果找个方法抛出错误或者返回 false，当前属性就无法被delete命名删除
  ```javascript
    var handler = {
      deleteProperty (target, key) {
        invariant(key, 'delete');
        delete target[key];
        return true;
      }
    };
    function invariant (key, action) {
      if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
      }
    }

    var target = { _prop: 'foo' };
    var proxy = new Proxy(target, handler);
    delete proxy._prop
    // Error: Invalid attempt to delete private "_prop" property
  ```

7. defineProperty()
  + defineProperty()方法拦截了Object.defineProperty()操作。
  ```javascript
    var handler = {
      defineProperty (target, key, descriptor) {
        return false;
      }
    };
    var target = {};
    var proxy = new Proxy(target, handler);
    proxy.foo = 'bar' // 不会生效
  ```
    - 上面代码中，defineProperty()方法内部没有任何操作，只返回false，导致添加新属性总是无效。注意，这里的false只是用来提示操作失败，本身并不能阻止添加新属性。

  + 注意：
    - 如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。

8. getOwnPropertyDescriptor()
  + getOwnPropertyDescriptor()方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
  ```javascript
    var handler = {
      getOwnPropertyDescriptor (target, key) {
        if (key[0] === '_') {
          return;
        }
        return Object.getOwnPropertyDescriptor(target, key);
      }
    };
    var target = { _foo: 'bar', baz: 'tar' };
    var proxy = new Proxy(target, handler);
    Object.getOwnPropertyDescriptor(proxy, 'wat')
    // undefined
    Object.getOwnPropertyDescriptor(proxy, '_foo')
    // undefined
    Object.getOwnPropertyDescriptor(proxy, 'baz')
    // { value: 'tar', writable: true, enumerable: true, configurable: true }
  ```

9. getPrototypeOf()
  + getPrototypeOf()方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
    - Object.prototype.__proto__
    - Object.prototype.isPrototypeOf()
    - Object.getPrototypeOf()
    - Reflect.getPrototypeOf()
    - instanceof
  
  + 注意：
    - getPrototypeOf()方法的返回值必须是对象或者null，否则报错
    - 如果目标对象不可扩展（non-extensible）， getPrototypeOf()方法必须返回目标对象的原型对象。

10. isExtensible()
  + isExtensible()方法拦截Object.isExtensible()操作。
  ```javascript
    var p = new Proxy({}, {
      isExtensible: function(target) {
        console.log("called");
        return true;
      }
    });

    Object.isExtensible(p)
    // "called"
    // true
  ```
  + 注意：
    - 该方法只能返回布尔值，否则返回值会被自动转为布尔值。
    - 这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。

11. ownKeys()
  + ownKeys()方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
    - Object.getOwnPropertyNames()
    - Object.getOwnPropertySymbols()
    - Object.keys()
    - for...in循环

  + 注意：使用Object.keys()方法时，有三类属性会被ownKeys()方法自动过滤，不会返回。
    - 目标对象上不存在的属性
    - 属性名为 Symbol 值
    - 不可遍历（enumerable）的属性
  + ownKeys()方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错
  ```javascript
    var obj = {};

    var p = new Proxy(obj, {
      ownKeys: function(target) {
        return [123, true, undefined, null, {}, []];
      }
    });

    Object.getOwnPropertyNames(p)
    // Uncaught TypeError: 123 is not a valid property name
  ```
  + 如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys()方法返回，否则报错。
  + 如果目标对象是不可扩展的（non-extensible），这时ownKeys()方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。
  ```javascript
    var obj = {};
    Object.defineProperty(obj, 'a', {
      configurable: false,
      enumerable: true,
      value: 10 }
    );

    var p = new Proxy(obj, {
      ownKeys: function(target) {
        return ['b'];
      }
    });

    Object.getOwnPropertyNames(p)
    // Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'
  ```

12. preventExtensions()
  + preventExtensions()方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
  + 这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。
  ```javascript
    var proxy = new Proxy({}, {
      preventExtensions: function(target) {
        return true;
      }
    });

    Object.preventExtensions(proxy)
    // Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible
  ```

13. setPrototypeOf()
  + setPrototypeOf()方法主要用来拦截Object.setPrototypeOf()方法。
  ```javascript
    var handler = {
      setPrototypeOf (target, proto) {
        throw new Error('Changing the prototype is forbidden');
      }
    };
    var proto = {};
    var target = function () {};
    var proxy = new Proxy(target, handler);
    Object.setPrototypeOf(proxy, proto);
    // Error: Changing the prototype is forbidden
  ```
  + 注意：该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），setPrototypeOf()方法不得改变目标对象的原型。

14. Proxy.revocable()
  + Proxy.revocable()方法返回一个可取消的 Proxy 实例。
  ```javascript
    let target = {};
    let handler = {};

    let {proxy, revoke} = Proxy.revocable(target, handler);

    proxy.foo = 123;
    proxy.foo // 123

    revoke();
    proxy.foo // TypeError: Revoked
  ```
  + Proxy.revocable()方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。
  + Proxy.revocable()的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。


### this 问题
+ 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。
  ```javascript
    const target = {
      m: function () {
        console.log(this === proxy);
      }
    };
    const handler = {};

    const proxy = new Proxy(target, handler);

    target.m() // false
    proxy.m()  // true
  ```