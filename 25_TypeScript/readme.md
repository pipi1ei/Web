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


### TypeScript 中的数据类型
1. 布尔类型：boolean
2. 数字类型：number
3. 字符串类型：string
4. 数组类型：array
  - 定义数组的方式
  ```typescript
    // 第一种方式
    let arr:number[] = [1,2,3]

    // 第二种方式
    let arr2:Array<number> = [4,5,6]
  ```
5. 元组类型：tuple，属于数组的一种
  - 定义方式
  ```typescript
    let arr[string,number,boolean] = ['a', 123, true];
  ```
6. 枚举类型：enum
  - 定义方式
  ```typescript
    enum 枚举名 {
      标识符[=整型常数],
      标识符[=整型常数],
      ...
      标识符[=整型常数]
    };
  ```

7. 任意类型：any
8. null 和 undefined
9. void 类型
10. never 类型