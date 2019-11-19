# 介绍 Express 框架相关知识

## Express 介绍
1. 什么是 Express ：
    - 基于 Node.js 平台开发的 “Web开发框架”，就是一个Node.js 模块
    - express 作用：提供一系列强大的特性，帮助你创建各种 web 和移动设备应用
    - express 同时也是 Node.js 的一个模块

2. 为什么学习 Express 框架
    - 让我们基于 Node.js 开发Web应用程序更加高效

3. express 官方网站
    - [http://expressjs.com/](http://expressjs.com/)
    - [](http://www.expressjs.com.cn)


## express 特点
1. 实现了路由功能
2. 中间件（函数）功能
3. 对 req 和 res 对象的扩展
4. 可以继承其他模板引擎


## express 基本使用
1. 安装 express：
    - npm 搜索，安装。按照文档一步一步进行
        + 创建 package.json 文件
        + 安装 express 模块：`npm install express --save`

2. 演示 Hello World 案例
    - 在 express 中 request 对象和 response 对象一样使用，同时这两个对象还额外添加了其他好用的功能