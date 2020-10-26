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
  - 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null。实际情况是 undefined 可以复制给 void 类型的变量，而 null 不行
5. null 和 undefined
  - 与 void 的区别是，*undefined 和 null 是所有类型的子类型*。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
  ```typescript
    // 这样不会报错，但编译器上会报错
    let num: number = undefined;
    // 这样也不会报错，但编译器上会报错
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
  ```typescript
    let a;
    a = '123';
    a = true;

    // 相当于
    let a:any;
    a = '123';
    a = true;
  ```

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
    - **一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：
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
  
  + **一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型**：
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
    - 注意：**只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**：
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



### 类型断言
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

## ts进阶
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
- 枚举成员会被赋值从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
  ```typescript
    enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
  ```
- 上面的例子会被编译为：
  ```javascript
    var Days;
    (function(){
      Days[Days['Sun'] = 0] = 'Sun';
      Days[Days['Mon'] = 0] = 'Mon';
      Days[Days['Tue'] = 0] = 'Tue';
      Days[Days['Wed'] = 0] = 'Wed';
      Days[Days['Thu'] = 0] = 'Thu';
      Days[Days['Fri'] = 0] = 'Fri';
      Days[Days['Sat'] = 0] = 'Sat';
    })(Days || (Days = {}))
  ```
- 也可以给枚举项手动赋值，未手动赋值的枚举项会接着上一个枚举项递增。
  ```typescript
    enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
  ```

- 常数项和计算所得项
  + 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
  + 前面我们所举的例子都是常数项，下面一个典型的计算所得项的例子：
    ```typescript
    <!-- "Blue".length 就是一个计算所得项。 -->
      enum Color { Red, Green, Blue = "Blue".length }
    ```
  + 注意：**如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错**

- 常数枚举
  + 常数枚举是使用 const enum 定义的枚举类型：
  ```typescript
    const enum Directions {
      Up,
      Down,
      Left,
      Right
    }
  ```
  + 常数项枚举与普通枚举的区别是：它会在编译阶段被删除，并且不能包含计算所得项

- 外部枚举
  + 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型：
  ```typescript
    declare enum Directions {
      Up,
      Down,
      Left,
      Right
    }
  ```
  + declare 定义的类型只会用于编译时的检查，编译结果中会被删除。
  + 外部枚举和声明语句一样，常出现在声明文件中
  + 同时使用 declare 和 const 也是可以的


### 类
- 类的概念
  + 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
  + 对象（Object）：类的实例，通过 new 生成
  + 面向对象（OOP）的三大特性：封装、继承、多态
      - 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
      - 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
      - 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
  + 存取器（getter & setter）：用以改变属性的读取和赋值行为
  + 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
  + 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
  + 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

- ES7 中类的用法
  + ES6 中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义：
    ```typescript
      class Animal {
        name = "Tom";
        constructor() {
          // ...
        }
      }

      let a = new Animal();
      console.log(a.name)  // Tom
    ```
  + 静态属性：使用 static 定义一个属性
    ```typescript
      class Animal {
        static num = 42;
        constructor() {
          // ...
        }
      }

      console.log(Animal.num)  // 42
    ```

- TypeScript 中类的用法
  + 修饰词：public、private、protected
    - public：修饰的属性或方法是公有的，可以在任何地方被访问到，*默认所有的属性和方法都是 public 的*
    - private：修饰的属性或方法是私有的，*不能在声明它的类外部访问*
    - protected：修饰的属性或方法是受保护的，*只能在类和子类中被访问到*
  ```typescript
    // public
    class A {
      public name;
      constructor(name) {
        this.name = name
      }
    }
    let a = new A('Jack');
    log(a.name); // Jack
    a.name = 'Tom';
    log(a.name); // Tom

    // private
    class A {
      private name;
      constructor(name) {
        this.name = name
      }
    }
    let a = new A('Jack');
    log(a.name); // 报错：Property 'name' is private and only accessible within class 'Animal'.
    a.name = 'Tom'; // 报错：Property 'name' is private and only accessible within class 'Animal'.

    // protected
    class A {
      protected name;
      constructor(name) {
        this.name = name
      }
    }
    class B extends A {
      constructor(name) {
        super(name);
        log(this.name)
      }
    }
  ```
  + **当构造函数被修饰为 private 时，该类不允许被继承和实例化**
  + **当构造函数修饰为 protected 时，该类只允许被继承：**

  + 参数属性：
    - readonly：只读属性关键字，*只允许出现在属性声明或索引签名或构造函数中*
    - **修饰符和readonly**还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。
    ```typescript
      class A {
        // public name: string;
        constructor(public name){
          // this.name = name
        }

        // 或者
        constructor(readonly name){}
      }
    ```
    - 注意：如果 readonly 关键字和其他访问修饰符同时出现的话，需要写在后面

  + 抽象类
    - abstract 用于定义抽象类和其中的抽象方法
    - 抽象类是不允许被实例化的
    - 抽象类中的抽象方法必须被子类实现
    ``` typescript
      abstract class A {
        public name: string;
        public constructor(name: string) {
          this.name = name;
        }

        abstract sayName(): void;
      }

      class B extends A {
        sayName() {
          console.log(this.name);
        }
      }
    ```
    - 需要注意的是：即使是抽象方法，typescript 的编译结果中，任然会存在这个类，上面代码的编译结果是：
    ```typescript
      var __extends = 
        (this && this.__extends) || 
        function (Target, Source) {
          for(var key in Source) {
            if(Source.hasOwnProperty(key)) {
              Target[key] = Source[key]
            }
          }

          function __() {
            this.constructor = Target;
          }

          Target.prototype = Source === null ? 
            Object.create(Source) : ((__.prototype = Source.prototype), new __())
        };

      var A = (function(){
        function A(name) {
          this.name = name;
        }
        return A;
      })();

      var B = (function(_super){
        __extends(B, _super);
        function B() {
          _super.apply(this. arguments);
        }
        B.prototype.sayName = function(){
          console.log(this.name)
        }
        return B;
      })(A);

      var b = new B('tom');
      b.sayName();
    ```


### 类与接口
  - 接口可以用于对【对象的形状】进行描述，还可以*对类的一部分行为进行抽象*
  - 类实现接口
    + 举例来说，门是一个类，防盗门是门的子类。如果防盗门有个报警的功能，可以简单给防盗门添加一个报警的方法。这时候如果有另外一个类：车，也有报警的功能，这时候就报报警这个功能提取出来作为一个接口，防盗门和车都去实现它
    ```typescript
      interface Alarm {
        alert(): void;
      }

      class Door {}
      class SecurityDoor extends Door implements Alarm {
        alert() {
          console.log('SecurityDoor alert')
        }
      }

      class Car implements Alarm {
        alert() {
          console.log('Car alert')
        }
      }
    ```
    + 一个类可以实现多个接口
    ```typescript
      interface Alarm {
        alert(): void;
      }

      interface Light {
        lightOn(): void;
        lightOff(): void;
      }

      class Car implements Alarm, Light {
        alert() {
          console.log('car alert')
        }

        lightOn() {
          console.log('car lightOn')
        }

        lightOff() {
          console.log('car lightOff')
        }
      }
    ```

  - 接口继承接口
    ```typescript
      interface Alarm {
        alert(): void;
      }

      interface LightableAlarm extends Alarm {
        lightOn(): void;
        lightOff(): void;
      }
    ```

  - 接口继承类
    + 常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的
    ```typescript
      class Point {
        x: number;
        y: number;
        constructor(x: number, y:number) {
          this.x = x;
          this.y = y;
        }
      }

      interface Point3d extends Point {
        z: number;
      }

      let point3d: Point3d = {x: 1, y: 2, z: 3};
    ```

    + 为什么接口能继承类呢？实际上，在声明 class Point 时，除了会创建一个名为 Point 的类之外，同时也创建了名为 Point 的类型，而接口实际上继承的是 Point 的类型。可以理解为下面的例子。所以接口继承类与接口继承接口没有本质上的区别
    ```typescript
      class Point {
        x: number;
        y: number;
        constructor(x: number, y:number) {
          this.x = x;
          this.y = y;
        }
      }

      interface PointInstanceType {
        x: number;
        y: number;
      }
    ```

    + 值得注意的是：PointInstanceType 相较于 Point，缺少了 constructor 构造方法。这是因为声明 Point 类时*创建的 Point 类型是不包含构造函数的*。另外，除了构造函数是不包含的，*静态属性和静态方法也是不包含的*
    ```typescript
      class Point {
        // 静态属性：坐标系原点
        static origin = new Point(0, 0);

        // 静态方法：计算与原点的距离
        static distanceToOrigin(p: Point) {
          return Math.sqrt(p.x * p.x + p.y * p.y);
        }

        // 示例属性，坐标x轴的值和y轴的值
        x: number;
        y: number;

        constructor(x: number, y: number){
          this.x = x;
          this.y = y;
        }

        // 示例方法：打印此点
        printPoint() {
          console.log(this.x, this.y);
        }
      }

      interface PointInstanceType {
        x: number;
        y: number;
        printPoint(): void;
      }
    ```


### 泛型
- 泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而是在使用的时候在指定类型的一种特性
- 简单的例子：实现一个函数，可以创建一个指定长度的数组，同时将每一项都填充一个默认值
  ```typescript
    function createArray(length:number, value:any): Array<any> {
    let result = [];
    for(let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
  ```
- 上例中，使用了数组泛型来定义返回值的类型。上面代码有个明显的缺陷是：它并没有准确的定义返回值的类型，Array<any> 允许数组的每一项为任意类型，但我们的预期是数组中的每一项都是参数 value 类型。这时候泛型就派上用场了
  ```typescript
    function createArray<T>(length: number, value: T): Array<T> {
      let result: T[] = [];
      for(let i = 0; i < length; i++) {
        result[i] = value;
      }
      return result;
    }

    createArray<string>(3, 'x');  // ['x', 'x', 'x']
  ```
- 上例中，在函数名后面添加了 <T> ，其中 T 用来代指任意的输入类型，在后面输入的 value: T 和 输出 Array<T> 中就可以使用了。接着在调用时可以指定它为具体的 string 类型，也可以不指定，让类型推论自动推算出来

- 多个类型参数
  + 定义泛型的时候，可以定义多个类型参数
  ```typescript
    function swap<T, U>(tuple: [T, U]): [U, T] {
      return [tuple[1], tuple[0]];
    }

    swap(['seven', 7]) // [7, 'seven']
  ```

- 泛型约束
  + 在函数内部使用泛型的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法
  ```typescript
    function loggingIdentity<T>(arg: T): T {
      console.log(arg.length);   // 报错：Property 'length' does not exist on type 'T'.
      return arg;
    }
  ```
  + 这时，我们可以对泛型进行约束
  ```typescript
    interface Lengthwise {
      length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
      console.log(arg.length);
      return arg;
    }
  ```
  + 上例中，使用 extends 约束了泛型 T 必须符合接口 Lengthwise 的形状，也就是必须包含 length 属性。此时如果调用 loggingIdentity 时，传入的参数不包含 length 属性，会在编译阶段报错
  ```typescript
    interface Lengthwise {
      length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
      console.log(arg.length);
      return arg;
    }

    loggingIdentity(7); // 报错：Argument of type '7' is not assignable to parameter of type 'Lengthwise'.
  ```
  + 多个类型参数之间也可以互相约束
  ```typescript
    function copy<T extends U, U>(target: T, source: U): T {
      for(let key in source) {
        target[key] = (<T>source)[key]
      }
      return target;
    }

    let x = {a: 1, b: 2, c: 3}
    copy(x, {b: 10, c: 20});
  ```

- 泛型接口
  + 之前学习过，可以使用接口的方式来定义一个函数需要符合的形状：
  ```typescript
    interface SearchFunc {
      (source: string, substring: string): boolean;
    }

    let mySearchFunc: SearchFunc = function(source: string, substring: string): boolean {
    return source.search(substring) !== -1;
  }
  ```
  + 也可以用含有泛型的接口来定义函数的形状
  ```typescript
    interface CreateArrayFunc {
      <T>(length: number, value: T): Array<T>;
    }

    let createArray: CreateArrayFunc = function<T>(length: number, value: T): Array<T> {
      let result: T[] = [];
      for(let i = 0 ; i < length; i++) {
        result[i] = value;
      }
      return result;
    }

    // 进一步，我们可以把泛型参数提前到接口名上：
    interface CreateArrayFunc<T> {
      (length: number, value: T): Array<T>;
    }
  ```

- 泛型类
  + 与泛型接口类似，泛型也可以用于类的定义中
  ```typescript
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) { return x + y; };
  ```

- 泛型参数的默认类型
 + 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
  ```typescript
  function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
  }
  ```

### 声明合并
- 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：
- 函数的合并
```typescript
  function reverse(x: number): number;
  function reverse(x: string): string;
  function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
      return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
      return x.split('').reverse().join('');
    }
  }
```

- 接口的合并
  + 接口中的属性在合并时会简单的合并到一个接口中：
  ```typescript
    interface Alarm {
      price: number;
    }
    interface Alarm {
      weight: number;
    }

    // 相当于
    interface Alarm {
      price: number;
      weight: number;
    }
  ```
  + 注意，合并的属性的类型必须是唯一的：
  ```typescript
    interface Alarm {
      price: number;
    }
    interface Alarm {
      price: number;  // 虽然重复了，但是类型都是 `number`，所以不会报错
      weight: number;
    }

    interface Alarm {
      price: number;
    }
    interface Alarm {
      price: string;  // 类型不一致，会报错
      weight: number;
    }
  ```
  + 接口中方法的合并，与函数的合并一样：
  ```typescript
    interface Alarm {
      price: number;
      alert(s: string): string;
    }
    interface Alarm {
      weight: number;
      alert(s: string, n: number): string;
    }

    // 相当于
    interface Alarm {
      price: number;
      weight: number;
      alert(s: string): string;
      alert(s: string, n: number): string;
    }
  ```

- 类的合并
  + 与接口的合并规则一致


## 声明文件
  - 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
### 什么是声明语句
  - 假如我们使用 jQuery 第三方库，一种常见的方式就是在 html 中通过 `<script>` 标签引入 jquery，然后就可以使用全局变量 $ 或者 jQuery
  - 但在 ts 文件中，编译器并不知道 $ 或者 jQuery 是什么东西，这时我们需要使用 `declare var` 来定义它的类型
  ```typescript
    jQuery('#foo'); // 报错：Cannot find name 'jQuery'.

    declare var jQuery: (selector: string) =>　any;
    jQuery('#foo');  // 不报错
  ```
  + 上例中，declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。他的编辑结果是：`jQuery('#foo');`

### 什么是声明文件
- 通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这个就是声明文件。
```typescript
  // scr/jQuery.d.ts
  declare var jQuery: (selector: string) => any;

  // src/index.ts
  jQuery('#foo');
```
- 声明文件需要以 .d.ts 为后缀
- 一般来说，ts会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所有当我们将 jQuery.d.ts 文件放到项目中时，其他所有的 .ts 文件就都可以获得 jQuery 的类型定义了。
- 假如仍然无法解析，那么可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件。

#### 第三方声明文件
- 当然，jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了：(jQuery in DefinitelyTyped)[https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jquery/index.d.ts]
- 我们可以直接下载下来使用，但更*推荐的是使用 @types 统一管理第三方库的声明文件*。
- @types 的使用方式也很简单，直接 npm 安装对应的声明模块即可，以 jQuery 举例：npm install @types/jquery --sava-dev


### 书写声明文件
- 当一个第三方库没有提供声明文件时，我们需要书写自己的声明文件了。前面知识介绍了最简单的声明文件内容，而真正书写一个声明文件并不是一件简单的事情。
- 在不同场景下，声明文件的内容和使用方式会有所区别
- 库的使用场景主要有以下几种
  + 全局变量：通过 `<script>` 标签引入第三方库，注入全局变量
  + npm包：通过 `import foo from 'foo'` 导入，符合 ES6 规范
  + UMD库：既可以通过 `<script>` 标签引入，又可以通过 `import` 导入
  + 直接扩展全局变量：通过 `<script>` 标签引入后，改变一个全局变量的结构
  + 在 npm包或UMD库中扩展全局变量：引入 npm 包或 UMD 库后，改变一个全局变量的结构
  + 模块插件：通过 `<script>` 标签或 import 导入后，改变另一个模块的结构

#### 全局变量
- 全局变量是最简单的一种场景，使用全局变量的声明文件时，如果是以 npm install @types/xxx --save-dev 安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）
- 全局变量的声明文件主要有以下几种语法：
  + declare var 声明全局变量
  + declare function 声明全局方法
  + declare class 声明全局类
  + declare enum 声明全局枚举
  + declare namespace 声明（含有子属性的）全局对象
  + interface 和 type 声明全局类型

- declare var
  + 在所有的声明语句中，declare var 是最简单的，它能够用来定义一个全局变量的类型。与其类似的，还有 declare let 和 declare const。使用 declare let 与使用 declare var 并没有什么区别。当使用 const 定义时，表示此时的全局变量是一个常量，不能再去修改它的值；
  ```typescript
    // src/jQuery.d.ts
    declare const jQuery: (selector: string) => any;

    // src/index.ts
    jQuery('#foo');

    // Cannot assign to 'jQuery' because it is a constant or a read-only property.
    jQuery = function(selector){
      return document.querySelector(selector)
    }
  ```
  + 一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let。
  + 注意：声明语句中只能定义类型，切勿在声明语句中定义具体的实现
  ```typescript
    declare const jQuery = function(selector) {
        return document.querySelector(selector);
    };
    // ERROR: An implementation cannot be declared in ambient contexts.
  ```

- declare function
  + declare function 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义：
    ```typescript
      // src/jQuery.d.ts
      declare function jQuery(selector: string): any;
    ```
  + 在声明语句中，函数重载也是支持的
    ```typescript
      // src/jQuery.d.ts
      declare function jQuery(selector: string): any;
      declare function jQuery(domReadyCallback: () => any): any;

      // src/index.ts
      jQuery('#foo');
      jQuery(function() {
        alert('Dom Ready!');
      });
    ```

- declare class
  + 当全局变量是一个类的时候，我们用 declare class 来定义它的类型
  ```typescript
    // src/Animal.d.ts
    declare class Animal {
      name: string;
      constructor(name: string);
      sayHi(): string;
    }

    // src/index.ts
    let cat = new Animal('Tom');
  ```
  + declare class 语句也只能用来定义类型，不能用来定义具体的实现
  ```typescript
    // src/Animal.d.ts
    declare class Animal {
      name: string;
      constructor(name: string);
      sayHi() {
        return `My name is ${this.name}`;
      };
      // ERROR: An implementation cannot be declared in ambient contexts.
    }
  ```

- declare enum
  + 使用 declare enum 定义的枚举类型也称作外部枚举（Ambient Enums）
  ```typescript
    // src/Directions.d.ts
    declare emun Directions { Up, Down, Left, Right }

    // src/index.ts
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
  ```
  + 与其他全局变量的类型声明一致，declare enum 仅用来定义类型，而不是具体的值。
  + Directions.d.ts 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。它编译结果是：
  ```typescript
    var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    // 其中 Directions 是由第三方库定义好的全局变量。
  ```

- declare namespace
  + namespace 是 ts 早期时为了解决模块化而创造的关键字，中文成为命名空间。
  + 由于历史原因，在早期还没有 ES6 的时候，ts 提供了一种模块化的解决方案，使用 module 关键字表示内部模块。但由于 ES6 也使用了 module 关键字，ts 为了兼容 ES6，使用 namespace 替代了自己的 module，更名为命名空间。
  + 随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 namespace，而推荐使用 ES6 的模块化方案了。
  + namespace 被淘汰了，但是在声明文件中，declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。
  + 比如 jQuery 是一个全局变量，它是一个对象，提供 jQuery.ajax 方法可以调用，那么就应该使用 declare namespace jQuery 来声明这个拥有多个子属性的全局变量
  ```typescript
    // src/jQuery.d.ts
    declare namespace jQuery {
      function ajax(url: string, setting?: any): void;
    }

    // src/index.ts
    jQuery.ajax('/api/get_something');
  ```
  + 注意，在 declare namespace 内部，我们直接使用 function ajax 来声明函数，而不是使用 declare function ajax。类似的，也可以使用 const, class, enum 等语句
  ```typescript
    // src/jQuery.d.ts
    declare namespace jQuery {
      function ajax(url:string, setting?: any):void;
      const version: number;
      class Event {
        blur(eventType: EventType): void;
      }
      enum EventType {
        CustomClick
      }
    }

    // src/index.ts
    jQuery.ajax('/api/get_something');
    console.log(jQuery.version);
    const e = new jQuery.Event();
    e.blur(jQuery.EventType.CustomClick);
  ```

  + 嵌套的命名空间
    - 如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型
    ```typescript
      // src/jQuery.d.ts
      declare namespace jQuery {
          function ajax(url: string, settings?: any): void;
          namespace fn {
              function extend(object: any): void;
          }
      }

      // src/index.ts
      jQuery.ajax('/api/get_something');
      jQuery.fn.extend({
          check: function() {
              return this.each(function() {
                  this.checked = true;
              });
          }
      });
    ```
    - 假如 jQuery 下仅有 fn 这一个属性（没有 ajax 等其他属性或方法），则可以不需要嵌套 namespace
    ```typescript
      // src/jQuery.d.ts
      declare namespace jQuery.fn {
          function extend(object: any): void;
      }

      // src/index.ts
      jQuery.fn.extend({
          check: function() {
              return this.each(function() {
                  this.checked = true;
              });
          }
      });
    ```

- interface 和 type
  + 除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，我们可以直接使用 interface 或 type 来声明一个全局的接口或类型
  ```typescript
    // src/jQuery.d.ts
    interface AjaxSettings {
      method?: 'GET' | 'POST'
      data?: any;
    }
    declare namespace jQuery {
      function ajax(url: string, settings?: AjaxSettings): void;
    }
  ```
  + 在其他文件中也可以使用这个接口或类型了：
  ```typescript
    // src/index.ts
    let settings: AjaxSettings = {
      method: 'POST',
      data: {
        name: 'foo'
      }
    };
    jQuery.ajax('/api/post_something', settings);
  ```
  + 防止命名冲突
    - 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下
    ```typescript
      // src/jQuery.d.ts
      declare namespace jQuery {
        interface AjaxSettings {
          method?: 'GET' | 'POST'
          data?: any;
        }
        function ajax(url: string, settings?: AjaxSettings): void;
      }

      // 在使用这个接口的时候，前面应该也加上 jQuery 前缀
      // src/index.ts
      let settings: jQuery.AjaxSettings = {
        method: 'POST',
        data: {
          name: 'foo'
        }
      };
      jQuery.ajax('/api/post_something', settings);
    ```
  + 声明合并
    - 假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来
    ```typescript
      // src/jQuery.d.ts
      declare function jQuery(selector: string): any;
      declare namespace jQuery{
        function ajax(url: string, setting?: any): void;
      }

      // src/index.ts
      jQuery('#foo');
      jQuery.ajax('/api/get_something');
    ```

#### npm 包
- 一般我们通过 import foo from 'foo' 导入一个 npm 包，这是符合 ES6 模块规范的。
- 在我们尝试给一个 npm 包创建声明文件之前，需要先看看它的声明文件是否存在，一般来说，npm 包的声明文件可能存在于两个地方：
  1. 与该 npm 包绑定到一起。判断依据是 package.json 中有 type 字段，或者有一个 index.d.ts 的声明文件。这种模式不需要安装其他包，是最为推荐的，所有以后我们自己创建 npm 包的时候，最好也将声明文件与 npm 包绑定在一起。
  2. 发布到 @types 里。我们只需要尝试安装一下对应的 @types 包就知道是否存在该声明文件，安装命令是 `npm install @types/foo --save-dev`。这种模式一般是由于 npm 包的维护者没有提供声明文件，所有由其他人将声明文件发布到 @types 里了。
- 假如以上两种方式都没有找到相应的声明文件，那么我们就需要自己为它写声明文件了。由于是通过 import 语句导入的模块，所有声明文件存放的位置也有约束，一般有两种方案
  1. 创建一个 node_modules/@types/foo/index.d.ts 文件，存放 foo 模块的声明文件。这种方式不需要额外配置，但是 node_modules 目录不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，不太建议这种方案，一般只用作临时测试
  2. 创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中。这种方式需要额外配置下 tsconfig.json 中的 path 和 baseUrl 字段
    - 目录结构：
      /path/to/project
      ├── src
      |  └── index.ts
      ├── types
      |  └── foo
      |     └── index.d.ts
      └── tsconfig.json
    - tsconfig.json 内容：
      {
        "compileOptions" : {
          "module": "commonjs",
          "baseUrl": "./",
          "path": {
            "*": ["types/*"]
          }
        }
      }
    - 如此配置之后，通过 import 导入 foo 的时候，也会去 types 目录下寻找对应模块的声明文件了
    - 注意：module 配置可以有很多种选项，不同的选项会影响模块的导入导出模式。这里使用了 commonjs 这个最常用的选项，后面也都默认使用的这个选项。

- npm 包的声明文件主要有以下几种语法
  + export 导出变量
  + export namespace 导出（含有子属性的）对象
  + export default ES6默认导出
  + export = commonjs 模块导出

- export：
  + npm 包的声明文件与全局变量的生命文件有很大的区别。在 bpm 包中 declare 不会再声明一个全局变量，而是只在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明。
  + export 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现
  ```typescript
    // types/foo/index.d.ts
    export const name: string;
    export function getName(): string;
    export class Animal {
      constructor(name: string);
      sayHi(): string;
    }
    export enums Directions {
      Up,
      Down,
      Left,
      Right
    }
    export interface Options {
      data: any;
    }
  ```
  + 对应的导入和使用模块应该是这样的：
  ```typescript
    // src/index.ts
    import { name, getName, Animal, Directions, Options } from 'foo';

    console.log(name);
    let myName = getName();
    let cat = new Animal('tom');
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    let options: Options = {
      data: {
        name: 'foo'
      }
    }
  ```

  + 混用 declare 和 export
    - 我们也可以使用 declare 先声明多个变量，然后再用 export 一次性导出。
    ```typescript
      // types/foo/index.d.ts
      declare const name: string;
      declare function getName(): string;
      declare class Animal {
          constructor(name: string);
          sayHi(): string;
      }
      declare enum Directions {
          Up,
          Down,
          Left,
          Right
      }
      interface Options {
          data: any;
      }

      export { name, getName, Animal, Directions, Options };
    ```
    + 注意：与全局变量声明类似，interface 前是不需要 declare 的。

- export namespace：
  + 与 declare namespace 类似，export namespace 用来导出一个拥有子属性的对象
  ```typescript
    // types/foo/index.d.ts
    export namespace foo {
        const name: string;
        namespace bar {
            function baz(): string;
        }
    }

    // src/index.ts
    import { foo } from 'foo';

    console.log(foo.name);
    foo.bar.baz();
  ```

- export default：
  + 在 ES6 模块系统中，使用 export default 可以导出一个默认值，使用方可以用 import foo from 'foo' 而不是 import { foo } from 'foo' 来导入这个默认值。
  + 在类型声明文件中，export default 用来导出默认值的类型
  ```typescript
    // types/foo/index.d.ts
    export default function foo(): string;

    // src/index.ts
    import foo from 'foo';
    foo();
  ```
  + 注意：只有function，class 和 interface 可以直接默认导出，其他的变量需要先定义出来再默认导出
  ```typescript
    // types/foo/index.d.ts
    export default enum Directions {
      // ERROR: Expression expected.
      Up,
      Down,
      Left,
      Right
    }

    // 正确的方式
    declare enum Directions {
      Up,
      Down,
      Left,
      Right
    }
    export default Directions;
  ```
  + 针对这种默认导出，我们一般会将导出语句放在整个声明文件的最前面
  ```typescript
    export default Directions;
    declare enum Directions {
      Up,
      Down,
      Left,
      Right
    }
  ```

- export =
  + 在 commonjs 规范中，我们用以下方式来导出一个模块：
  ```typescript
    // 整体导出
    module.exports = foo;
    // 单个导出
    exports.bar = bar;
  ```
  + 在 ts 中，针对这种模块导出，有多种方式可以导入
    1. const ... = require：
    ```typescript
      // 整体导入
      const foo = require('foo');
      // 单个导入
      const bar = require('foo').bar;
    ```

    2. import ... from，注意针对整体导出，需要使用 import * as 来导入：
    ```typescript
      // 整体导入
      import * as foo from 'foo';
      // 单个导入
      import { bar } from 'foo'
    ```

    3. import ... require，这也是 ts 官方推荐的方式：
    ```typescript
      // 整体导入
      import foo = require('foo');
      // 单个导入
      import bar = foo.bar;
    ```

  + 对于这种使用 commonjs 规范的库，假如要为它写类型声明文件的话，就需要使用到 export = 这种语法了
  ```typescript
    // types/foo/index.d.ts
    export = foo;
    declare function foo(): string;
    declare namespace foo {
      const bar: number;
    }
  ```
  + 需要注意的是，上例中使用了 export = 之后，就不能再单个导出 export { bar } 了。所以我们通过声明合并，使用 declare namespace foo 来将 bar 合并到 foo 里。
  + 准确地讲，export = 不仅可以用在声明文件中，也可以用在普通的 ts 文件中。实际上，import ... require 和 export = 都是 ts 为了兼容 AMD 规范和 commonjs 规范而创立的新语法
  + 由于很多第三方库是 commonjs 规范的，所以声明文件也就不得不用到 export = 这种语法了。但是还是需要再强调下，相比与 export =，我们更推荐使用 ES6 标准的 export default 和 export。


#### UMD 库
- 既可以通过 `<script>` 标签引入，又可以通过 import 导入的库，称为 UMD 库。相比于 npm 包的类型声明文件，我们需要额外声明一个全局变量，为了实现这种方式，ts 提供了一个新语法 `export as namespace`。
- export as namespace：
  + 一般使用 export as namespace 时，都是现有了 npm 包的声明文件，再基于它添加一条 export as namespace 语句，即可将声明好的变量声明变为一个全局变量：
  ```typescript
    // types/foo/index.d.ts
    export as namespace foo;
    export = foo;

    declare function foo(): string;
    declare namespace foo {
      const bar: number;
    }
  ```
- 直接扩展全局变量
  + 有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致 ts 编译错误，此时就需要扩展全局变量的类型。比如扩展 String 类型：
  ```typescript
    interface String {
      prependHello(): string;
    }

    'foo'.prependHello()
  ```
  + 通过声明合并，使用 interface String 即可给 String 添加属性或方法。也可以使用 declare namespace 给已有的命名空间添加类型声明
  ```typescript
    // types/jquery-plugin/index.d.ts
    declare namespace JQuery {
      interface CustomOptions {
        bar: string;
      }
    }
    interface JQueryStatic {
      foo(options: JQuery.CustomOptions): string;
    }

    // src/index.ts
    jQuery.foo({
      bar: ''
    })
  ```

#### 在 npm 包或 UMD 库中扩展全局变量
- 对于一个 npm 包或者 UMD 库的声明文件，只有 export 导出的类型声明才能被导入。所以对于 npm 包或 UMD 库，如果导入此库之后会扩展全局变量，则需要使用另一种语法在声明文件中扩展全局变量的类型，那就是 declare global。
- declare global
  + 使用 declare global 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型
  ```typescript
    // types/foo/index.d.ts
    declare global {
      interface String {
        prependHello(): string;
      }
    }

    export {}

    // src/index.ts
    'bar'.prependHello();
  ```
  + 注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。


#### 模块插件
- 有时通过 import 导入一个模块插件，可以改变另一个原有模块的结构。此时如果原有模块已经有了类型声明文件，而插件模块没有类型声明文件，就会导致类型不完整，缺少插件部分的类型。ts 提供了一个语法 declare module，它可以用来扩展原有模块的类型。
- declare module
  + 如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 declare module 扩展原有模块
  ```typescript
    // types/moment-plugin/index.d.ts
    import * as moment from 'moment';

    declare module 'moment' {
      export function foo(): moment.CalendarKey;
    }

    // src/index.ts
    import * as moment from 'moment';
    import 'moment-plugin';
    moment.foo();
  ```
  + declare module 也可用于在一个文件中一次性声明多个模块的类型
  ```typescript
    // types/foo-bar.d.ts
    declare module 'foo' {
      export interface Foo {
        foo: string;
      }
    }
    declare module 'bar' {
      export function bar(): string;
    }

    // src/index.ts
    import { Foo } from 'foo';
    import * as bar from 'bar';

    let f: Foo;
    bar.bar();
  ```

#### 声明文件中的依赖
- 除了可以在声明文件中通过 import 导入另一个声明文件中的类型之外，还有一个语法也可以用来导入另一个声明文件，那就是三斜线指令。
- 三斜线指令
  + 与 namespace 类似，三斜线指令也是 ts 在早期版本中为了描述模块之间的依赖关系而创造的语法。随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的三斜线指令来声明模块之间的依赖关系了。
  + 但是在声明文件中，它还是有一定的用武之地。
  + 类似于声明文件中的 import，它可以用来导入另一个声明文件。与 import 的区别是，当且仅当在以下几个场景下，我们才需要使用三斜线指令替代 import：
    1. 当我们在书写一个全局变量的声明文件时
    2. 当我们需要依赖一个全局变量的声明文件时

  + 书写一个全局变量的声明文件
    - 这些场景听上去很拗口，但实际上很好理解——在全局变量的声明文件中，是不允许出现 import, export 关键字的。一旦出现了，那么他就会被视为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了。故当我们在书写一个全局变量的声明文件时，如果需要引用另一个库的类型，那么就必须用三斜线指令了
    ```typescript
      // types/jquery-plugin/index.d.ts

      /// <reference types="jquery" />
      declare function foo(options: JQuery.AjaxSettings): string;

      // src/index.ts
      foo({});
    ```
    - 三斜线指令的语法如上，/// 后面使用 xml 的格式添加了对 jquery 类型的依赖，这样就可以在声明文件中使用 JQuery.AjaxSettings 类型了。
    - 注意：**三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现单行或多行注释**。

  + 依赖一个全局变量的声明文件
    - 在另一个场景下，当我们需要依赖一个全局变量的声明文件时，由于全局变量不支持通过 import 导入，当然也就必须使用三斜线指令来引入了
    ```typescript
      // types/node-plugin/index.d.ts

      /// <reference types="node" />
      export function foo(p: NodeJS.Process): string;

      // src/index.ts
      import { foo } from 'node-plugin';
      foo(global.process);
    ```
    - 在上面的例子中，我们通过三斜线指引入了 node 的类型，然后在声明文件中使用了 NodeJS.Process 这个类型。最后在使用到 foo 的时候，传入了 node 中的全局变量 process。
    - 由于引入的 node 中的类型都是全局变量的类型，它们是没有办法通过 import 来导入的，所以这种场景下也只能通过三斜线指令来引入了。

- 拆分声明文件
  + 当我们的全局变量的声明文件太大时，可以通过拆分为多个文件，然后在一个入口文件中将它们一一引入，来提高代码的可维护性。比如 jQuery 的声明文件就是这样的：
  ```typescript
    // node_modules/@types/jquery/index.d.ts

    /// <reference types="sizzle" />
    /// <reference path="JQueryStatic.d.ts" />
    /// <reference path="JQuery.d.ts" />
    /// <reference path="misc.d.ts" />
    /// <reference path="legacy.d.ts" />

    export = jQuery;
  ```
  + 其中用到了 types 和 path 两种不同的指令。它们的区别是：types 用于声明对另一个库的依赖，而 path 用于声明对另一个文件的依赖。

#### 自动生成声明文件
- 如果库的源码本身就是由 ts 写的，那么在使用 tsc 脚本将 ts 编译为 js 的时候，添加 declaration 选项，就可以同时也生成 .d.ts 声明文件了。
- 我们可以在命令行中添加 --declaration（简写 -d），或者在 tsconfig.json 中添加 declaration 选项。这里以 tsconfig.json 为例：
```typescript
  {
    "compilerOptions": {
      "module": "commonjs",
      "outDir": "lib",
      "declaration": true,
    }
  }
```
  + 上例中我们添加了 outDir 选项，将 ts 文件的编译结果输出到 lib 目录下，然后添加了 declaration 选项，设置为 true，表示将会由 ts 文件自动生成 .d.ts 声明文件，也会输出到 lib 目录下。
  + 运行 tsc 之后，目录结构如下
    /path/to/project
    ├── lib
    |  ├── bar
    |  |  ├── index.d.ts
    |  |  └── index.js
    |  ├── index.d.ts
    |  └── index.js
    ├── src
    |  ├── bar
    |  |  └── index.ts
    |  └── index.ts
    ├── package.json
    └── tsconfig.json

- 使用 tsc 自动生成声明文件时，每个 ts 文件都会对应一个 .d.ts 声明文件。这样的好处是，使用方不仅可以在使用 import foo from 'foo' 导入默认的模块时获得类型提示，还可以在使用 import bar from 'foo/lib/bar' 导入一个子模块时，也获得对应的类型提示。
- 除了 declaration 选项之外，还有几个选项也与自动生成声明文件有关：
  + declarationDir 设置生成 .d.ts 文件的目录
  + declarationMap 对每个 .d.ts 文件，都生成对应的 .d.ts.map（sourcemap）文件
  + emitDeclarationOnly 仅生成 .d.ts 文件，不生成 .js 文件


### 发布声明文件
- 当我们为一个库写好了声明文件之后，下一步就是将它发布出去了。
- 此时有两种方案：
  1. 将声明文件和源码放在一起
  2. 将声明文件发布到 @types 下
- 这两种方案中优先选择第一种方案。保持声明文件与源码在一起，使用时就不需要额外增加单独的声明文件库的依赖了，而且也能保证声明文件的版本与源码的版本保持一致。

- 将声明文件和源码放在一起
  + 如果声明文件是通过 tsc 自动生成的，那么无需做任何其他配置，只需要把编译好的文件也发布到 npm 上，使用方就可以获取到类型提示了。
  + 如果是手动写的声明文件，那么需要满足以下条件之一，才能被正确的识别：
    1. 给 package.json 中的 types 或 typings 字段指定一个类型声明文件地址
    2. 在项目根目录下，编写一个 index.d.ts 文件
    3. 针对入口文件（package.json 中的 main 字段指定的入口文件），编写一个同名不同后缀的 .d.ts 文件
  + 声明文件的查找顺序
    1. 查找package.json 中的 types 或 typings 字段，查看声明文件，没有这两个字段走下一步
    2. 在根目录下寻找 index.d.ts 文件，将它视为此库的类型声明文件。没有走下一步
    3. 寻找入口文件（package.json 中的 main 字段指定的入口文件）是否存在对应同名不同后缀的 .d.ts 文件。
    4. 都没找到说明没有声明文件

- 将声明文件发布到 @types 下
  + 与普通的 npm 模块不同，@types 是统一由 DefinitelyTyped 管理的。要将声明文件发布到 @types 下，就需要给 DefinitelyTyped 创建一个 pull-request，其中包含了类型声明文件，测试代码，以及 tsconfig.json 等。
  + pull-request 需要符合它们的规范，并且通过测试，才能被合并，稍后就会被自动发布到 @types 下。


## 工程
### 代码检查
### 编译选项




```typescript

```