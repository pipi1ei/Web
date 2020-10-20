### TypeScript 介绍
1. TypeScript 是微软开发的一款开源的编程语言
2. TypeScript 是 Javascript 的超集，遵循最新的 ES6，ES5 规范。TypeScript 扩展了 Javascript 的语法
3. TypeScript 更像后端的 java，C# 这种语言，可以让 js 开发大型项目
4. 谷歌也在大力支持 TypeScript 的推广，谷歌的 angular2.x 就是基于 TypeScript 语法
5. 最新的 Vue，React 也可以集成 TypeScript
6. Nodejs 框架 Nestjs, midway 中用的就是 TypeScript 语法


### 基本使用
1. 创建 ts 文件，但该文件需要转换成 js 文件才能执行，执行以下命令，会将ts 文件转换成对应的 js 文件
  - tsc 文件名

2. 设置自动编译ts文件：当我们修改了 ts 文件时，不希望手动执行命令去编译成 js 文件，可以做以下配置
  - 在目录中执行：tsc --init。会创建一个 tsconfig.json 文件
  - 修改 tsconfig.json 文件中的 outDir: "./js"
  - 点击 vscode 工具栏中的终端 --> 运行任务 --> tsc:监视 xxx


## TypeScript 中的数据类型
### 原始数据类型
  1. 布尔类型：boolean
    let isDone: boolean = false;
  * 注意：
    - 使用构造函数 Boolean 创造的对象不是布尔值，事实上，new Boolean() 创造的是一个对象。直接调用 Boolean() 方法是可以返回一个 boolean 类型的。
    - 在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。其他基本类型（除了 null 和 undefined）一样

2. 数字类型：number
3. 字符串类型：string
4. void 类型
  - 在 TypeScript 中，可以用 void 表示没有任何返回值的函数：
    ```typescript
      function alertName(): void {
        alert('My name is Tom');
      }
    ```
  - 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null
5. null 和 undefined
  - 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
  ```typescript
    // 这样不会报错
    let num: number = undefined;
    // 这样也不会报错
    let u = undefined;
    let x: number = u;
  ```

7. 元组类型：tuple，属于数组的一种
  - 定义方式
  ```typescript
    let arr[string,number,boolean] = ['a', 123, true];
  ```
8. 枚举类型：enum
  - 定义方式
  ```typescript
    enum 枚举名 {
      标识符[=整型常数],
      标识符[=整型常数],
      ...
      标识符[=整型常数]
    };
  ```

9. 任意类型：any
  - 如果是一个普通类型，在赋值过程中改变类型是不被允许的,但如果是 any 类型，则允许被赋值为任意类型。
  ``` typescript
    let m:any = 'lalala';
    m = 7  // 不包错
  ```
  - 在任意值上访问任何属性和方法都是允许的：
  ```typescript
    let anyThing: any = 'Tom';
    console.log(anyThing.myName);
    console.log(anyThing.myName.firstName);
    anyThing.setName('Jerry');
    anyThing.setName('Jerry').sayHello();
  ```
  - 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

10. 联合类型
- 联合类型（Union Types）表示取值可以为多种类型中的一种。
- 联合类型使用 | 分隔每个类型。
  ```typescript
    let a: string|number = 123
    a = 'lalala'
  ```
- 访问联合类型的属性或方法
  + 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

- 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
  ```typescript
    let x: string|number;
    x = 'seven'
    console.log(x.length)
    x = 7
    console.log(x.length) //编译时报错
  ```


### 类型推论
- TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
- 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

### 对象类型--接口
- 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。
- 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
- TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
  ```typescript
    interface Person {
      name: string;
      age: number;
    }

    let tom: Person = {
      name: 'Tom',
      age: 25
    }
  ```
- 上面的例子中，我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。这样，我们就约束了 tom 的形状必须和接口 Person 一致。定义的变量比接口少了一些属性或多一些的属性是不允许的：
- 可选属性：
  + 有时我们希望不要完全匹配一个形状，那么可以用可选属性：
  ```typescript
    interface Person {
      name: string;
      age?: number;
    }

    let tom: Person = {
      name: 'Tom'
    }
  ```
  + 可选属性的含义是该属性可以不存在。但*仍然不允许添加未定义的属性*：

- 任意属性
  + 有时候我们希望一个接口允许有任意的属性，可以使用如下方式：
    ```typescript
      interface Person {
        name: string;
        age?: number;
        [propName:string]: any;
      }

      let tom:Person = {
        name: 'Tom',
        gender: 'male'
      }
    ```
  + 注意
    - 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
    ```typescript
      interface Person {
        name: string;
        age?: number;
        [propName:string]: string;
      }

      let tom: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
      }
    ```
    - 上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。
  
  + 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：
    ```typescript
      interface Person {
        name: string;
        age: number;
        [propName:string]: string | number; 
      }

      let tom: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
      }
    ```
  + 只读属性：有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：
    ```typescript
      interface Person {
        readonly id: number;
        name: string;
        age?: number;
        [propName:string]: any;
      }

      let tom:Person = {
        id: 805396,
        name: 'Tom',
        gender: 'male'
      }

      tom.id = 1234; // 报错：Cannot assign to 'id' because it is a constant or a read-only property.
    ```
    - 注意：只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
      ```typescript
        interface Person {
          readonly id: number;
          name: string;
          age?: number;
          [propName: string]: any;
        }

        let tom:Person = {
          name: 'Tom',
          gender: 'male'
        }

        tom.id = 1234;
        // 上例中，报错信息有两处，第一处是在对 tom 进行赋值的时候，没有给 id 赋值。
      ```


### 数组类型
  - 定义数组的方式：
    1. 类型 + 方括号 的表示形式
    2. 数组泛型
  ```typescript
    // 第一种方式
    let arr:number[] = [1,2,3]

    // 第二种方式
    let arr2:Array<number> = [4,5,6]
  ```
  - 用接口表示数组：
    ``` typescript
      // NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。
      interface NumberArray {
        [index: number]: number;
      }

      let fibonacci = [1, 1, 2, 3, 5, 8]
    ```
    + 虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。
    + 不过有一种情况例外，那就是它常用来表示类数组。

  - 类数组
    + 类数组（Array-like Object）不是数组类型，比如 arguments：
    ```javascript
      function sum() {
        let args: number[] = arguments;
      }
    ```
    + 上例中，arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：
    ```typescript
      function sum() {
        let args: {
           [index: number]: number;
           length: number;
           callee: Function; 
        } = arguments
      }
    ```

  - any在数组中的应用：用 any 表示数组中允许出现任意类型：
  ```typescript
    let arr:any[] = [1, 'a', true. {name: 'pipilei'}]
  ```


### 函数类型
- 一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：
  ```typescript
    function sum(x: number, y: number): number {
      return x + y;
    }
  ```
  + 注意：输入多余的（或者少于要求的）参数，是不被允许的：

- 函数表达式
  + 如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：
  ```typescript
    const myuSum = function(x: number, y: number): number {
      return x + y;
    }
  ```
  + 这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样：
  ```typescript
    const muSum: (x: number, y: number) => number = function(x: number, y: number): number {
      return x + y;
    }
  ```
    - 注意：上述案例中的 => 不是 es6 中的箭头函数，而是用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型

- 用接口定义函数的形状
  ```typescript
    interface SearchFunc {
      (source: string, substring: string): boolean;
    }

    let mySearch: SearchFunc;
    mySearch = function(source: string, substring: string) {
      return source.search(substring) !== -1;
    }
  ```
  + 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

- 可选参数
  + 前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？与接口中的可选属性类似，我们用 ? 表示可选的参数：
  ```typescript
    function sayName(firstName: string, lastName?: string): void {
      if(lastName) {
        console.log(`hello ${firstName} ${lastName}`)
      } else {
        console.log(`hello ${firstName}`)
      }
    }
  ```
  + 注意：可选参数必须接在必需参数后面。

- 参数默认值
 + 在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数：
  ```typescript
    function sayNmae2(fName: string, lName: string = 'tom'):void {
      console.log(`hello ${fName} ${lName}`)
    }
  ```
  + 此时就不受「可选参数必须接在必需参数后面」的限制了：

- 剩余参数
  + ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）：
  ```typescript
    function push(arr, ...items) {
      items.forEach(item => {
        arr.push(item)
      })
      return arr;
    }
  ```
  + 事实上，items 是一个数组。所以我们可以用数组的类型来定义它：
  ```typescript
    function push(arr: any[], ...items: any[]) {
      items.forEach(item => {
        arr.push(item)
      })
      return arr;
    }
    let a: any[] = []
    push(a, 1, 2, 3);
  ```

- 重载
  + 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
  + 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。 利用联合类型，我们可以这么实现：
    ```typescript
      function reverse(x: number | string): void | number | string {
        if(typeof x === 'number') {
          return Number(x.toString().split('').reverse().join(''));
        } else if(typeof x === 'string') {
          return x.split('').reverse().join('');
        }
      }
    ```
  + 然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。这时，我们可以使用重载定义多个 reverse 的函数类型：
    ```typescript
      function reserve(x: number): number;
      function reserve(x: string): string;
      function reserve(x: number | string): void | number | string {
        if(typeof x === 'number') {
          return Number(x.toString().split('').reverse().join(''));
        } else if(typeof x === 'string') {
          return x.split('').reverse().join('');
        }
      }
    ```
  + 上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。
  + 注意：TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。


###　类型断言
- 语法：推荐使用下述第一种方式
  1. 值 as 类型
  2. <类型>值

- 用途
  1. 将一个联合类型断言为其中一个类型
    - 之前提到过，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法：
    - 而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法, 此时可以使用类型断言
    ```typescript
      interface Cat {
        name: string;
        run(): void;
      }
      interface Fish {
        name: string;
        swim(): void;
      }

      function isFish(animal: Cat | Fish) {
        if(typeof (animal as Fish).swim == 'function') {
          return true
        }
        return false
      }
    ```
    - 注意：类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：
  2. 将一个父类型断言为更加具体的子类
    ```typescript
      interface ApiError extends Error {
        code: number;
      }

      interface HttpError extends Error {
        statusCode: number;
      }

      function isApiError(e: Error): boolean{
        if(typeof (e as ApiError).code == 'number') {
          return true
        }
        return false
      }
    ```
  3. 将任何一个类型断言为 
    - 下面例子运行时不会报错，但在编译时会报错：Property 'foo' does not exist on type 'Window & typeof globalThis'.
    ```typescript
      window.foo = 1
    ```
    - 此时我们可以使用 as any 临时将 window 断言为 any 类型：
    ```typescript
      (window as any).foo = 1
    ```

  4. 将 any 断言为一个具体的类型
    - 历史遗留的代码中有个 getCacheData，它的返回值是 any：
    ```typescript
      function getCacheData(key: string): any {
        return (window as any).cache[key];
      }
    ```
    - 那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：
    ```typescript
      function getCacheData(key: string): any {
        return (window as any).cache[key];
      }

      interface Cat {
        name: string;
        run(): void;
      }

      const tom = getCacheData('tom') as Cat
      tom.run();
    ```
    - 上面的例子中，我们调用完 getCacheData 之后，立即将它断言为 Cat 类型。这样的话明确了 tom 的类型，后续对 tom 的访问时就有了代码补全，提高了代码的可维护性。

- 类型断言的限制
  - 并不是任何一个类型都可以被断言为任何另一个类型。若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A。
  ```typescript
    interface Animal {
      name: string;
    }

    interface Cat {
      name: string;
      run(): void;
    }

    let tom: Cat = {
      name: 'Tom',
      run(){ console.log('run') }
    }

    let animal: Animal = tom;
  ```
  - 在上面的例子中，Cat 包含了 Animal 中的所有属性，除此之外，它还有一个额外的方法 run。TypeScript 并不关心 Cat 和 Animal 之间定义时是什么关系，而只会看它们最终的结构有什么关系——所以它与 Cat extends Animal 是等价的：我们把它换成 TypeScript 中更专业的说法，即：Animal 兼容 Cat。
  - 当 Animal 兼容 Cat 时，它们就可以互相进行类型断言了：
  ```typescript
    interface Animal {
      name: string;
    }

    interface Cat {
      name: string;
      run(): void;
    }

    function testAnimal(animal: Animal) {
      return (animal as Cat)
    }

    function testCat(cat: Cat) {
      return (cat as Animal)
    }
  ```

- 双重断言
  + 任何类型都可以被断言为 any
  + any 可以被断言为任何类型
  + 双重断言：可以使用 as any as Foo 来将任何一个类型断言为任何另一个类型，但这种写法非常容易导致运行时错误，开发时尽量不要使用


### 声明文件




##　ts进阶
### 类型别名
- 类型别名用来给一个类型起个新名字
  + 简单的例子
  ```typescript
    type Name = string;
    type NameResolver = () => string;
    type NameOrResolver = Name | NameResolver;

    function getName(n: NameOrResolver): Name {
      if(typeof n === 'string') {
        return n;
      }
      return n();
    }
  ```
  + 上例中，我们使用 type 创建类型别名。类型别名常用于联合类型。

### 字符串字面量类型
- 字符串字面量类型用来约束取值只能是某几个字符串中的一个
  + 简单的例子
  ```typescript
    type EventNames = 'click' | 'scroll' | 'mousemove';
    function handleEvent(ele: Element, event: EventNames) {
      // do something
    }
    handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
    handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'
  ```
- 注意：类型别名与字符串字面量类型都是使用 *type* 进行定义。

### 元组
- 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
- 元组起源于函数编程语言（如 F#），这些语言中会频繁使用元组。
- 简单的例子
  ```typescript
    let tom: [string, number] = ['Tom', 25];

    // 当赋值或访问一个已知索引的元素时，会得到正确的类型：
    let tom: [string, number];
    tom[0] = 'Tom';
    tom[1] = 25

    tom[0].slice(1);
    tom[1].toFixed(2);

    // 也可以只赋值其中一项：
    let tom: [string, number];
    tom[0] = 'Tom';
  ```
- 注意：当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。
  ```typescript
    // 不报错
    let tom: [string, number];
    tom = ['Tom', 25];

    // 报错：Property '1' is missing in type '[string]' but required in type '[string, number]'.
    let tom: [string, number];
    tom = ['Tom'];
  ```
- 越界的元素
  + 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
  ```typescript
    let tom: [string, number];
    tom = ['Tom', 25];
    tom.push('male');

    <!-- 报错 -->
    tom.push(true);  // Argument of type 'true' is not assignable to parameter of type 'string | number'.
  ```

### 枚举
- 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。 
- 枚举使用 *enum* 关键字来定义：



```typescript

```