# node.js 介绍

### node.js 是什么
1. node.js 是一个开发平台，就想java开发平台， .net 开发平台，PHP 开发平台一样。
    - 何为开发平台？ 有对应编程语言、有语言运行时、有能实现特定功能的API（SDK）
2. 该平台使用的编程语言时 Javascript 语言。
3. node.js 平台是基于 chrome V8 Javascript 引擎构建
4. 基于 node.js 可以开发控制台程序（命令行程序、CLI程序）、桌面应用程序（GUI）（借助 node-webkit、electron等框架实现）、web 应用程序（网站）

PHP 开发技术栈：LAMP - Linux Apache Mysql PHP
node.js 全栈开发技术栈：MEAN - MongoDB Express Angular Node.js

### node.js 特点
1. 事件驱动（当事件触发时，执行传递过去的回调函数）
2. 非阻塞 I/O 模型（当执行 I/O 操作时，不会线程阻塞）
3. 单线程
4. 拥有世界最大的开源库生态系统：nmp

### node.js 网站
1. [node.js 官方网站](https://nodejs.org/)
2. [node.js 中文网](http://nodejs.cn/)
3. [node.js 中文社区](https://cnodejs.org/)


### 为什么学习node.js
1. 通过学习node.js 开发深入理解*服务器开发*、*web请求何响应过程*、*了解服务器如何与客户端配合*
2. 学习服务器端渲染
3. 学习服务器端为客户端编写接口
4. 现在前端工程师面试对 node.js 开发有要求


### 学习目标
1. 了解服务器开发过程
2. 会使用node.js 开发基本的 http 服务程序（web应用程序）

### node.js 安装和配置
1. 下载地址
    + [当前版本](http://nodejs.org/en/download/)
    + [历史版本](http://nodejs.org/en/download/releases/)
2. 官方术语解释：
    + LTS 版本：long-term Support 版本，长期支持版，即稳定版
    + Current 版本：latest Features 版本，最新版本
3. 注意：
    + 安装完毕后通过命令 `node -v` 来确定是否安装成功【注意：打开"命令窗口"时建用使用"管理员方式"打开】
4. 通过 nvm-windows 管理一台计算机上多个 node 版本


# 在 node.js 上编写程序

## REPL 介绍
1. REPL 全称：Read-Eval-Print-Loop（交互式解释器）
    - R 读取 - 读取用户输入，解析输入的JavaScript 数据结构并存储在内存中
    - E 执行 - 执行输入的数据结构
    - P 打印 - 输出结构
    - L 循环 - 循环操作以上步骤直到用户两次按下 ctrl-c 按钮退出
2. 在REPL中编写程序（类似于浏览器开发人员工具其中的控制台功能）
    + 直接在控制台输入`node`命令进入 REPL 环境
3. 按两次 ctrl+c 退出REPL界面或者输入 `.exit` 退出REPL界面
    + 按住 ctrl 键不放，然后按下两次 c 键


## 创建 JavaScript 文件编写程序

### JavaScript 文件命名规则
1. 不要用中文
2. 不要包含空格
3. 不要出现node关键字
4. 建议以 '-' 分割单词


### 文件读写案例
使用到的模块 `var fs = require('fs');`
1. 写文件：`fs.writeFile(file,data[,options],callback);`
    + 参数1：要写入的文件路径，*必填*
    + 参数2：要写入的数据，*必填*
    + 参数3：写入文件时的选项，比如：文件编码，选填
    + 参数4：文件写入完毕后的回调函数，*必填*
    + 写入文件注意：
        * 该操作采用异步执行
        * 如果文件已存在则替换掉
        * 默认写入的文件编码为 utf8
        * 回调函数有一个参数，err：表示在写入文件的操作过程中是否出错了
            - 如果出错了`err != null`, 否则 `err === null`

2. 读文件：`fs.readFile(file,[,options],callback)`
    + 参数1：要读取的文件路径，*必填*
    + 参数2：读取文件时的选项，比如：文件编码，选填
    + 参数3：文件读取完毕后的回调函数，*必填*
    + 读取文件注意：
        * 该操作采用异步执行
        * 回调函数有2个参数，分别时err 和 data
        * 如果读取文件时没有指定编码，那么返回的将是原生的二进制数据，如果指定了编码，那么会根据指定的编码返回对应的字符串数据
