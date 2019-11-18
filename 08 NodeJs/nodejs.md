# node.js 介绍

### node.js 是什么
1. node.js 是一个开发平台，就像java开发平台， .net 开发平台，PHP 开发平台一样。
    - 何为开发平台？ 有对应编程语言、有语言运行时、有能实现特定功能的API（SDK）
2. 该平台使用的编程语言是 Javascript 语言。
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

*注意*：文件路径获取使用 path 模块进行路径拼接：`var filename = path.join(__dirname, 'hello.txt');`


### 创建文件案例
``` javascript
// 创建一个文件夹

// 加载文件操作模块
var fs = require('fs);

// 创建一个目录
fs.mkdir('test-mkdir',function(err){
    if(err){
        console.log('创建目录出错，详细信息如下：')
        console.log(err)
    }else{
        console.log('目录创建成功');
    }
})

```


### 注意
1. 异步操作无法通过 try-catch 来捕获异常，要通过 error 来判断是否出错
2. 同步操作可以通过 try-catch 来捕获异常
3. 不要使用 `fs.exists(path, callback)` 来判断文件是否存在，直接判断error即可
4. 文件操作时的路径问题：
    - 在读写文件的时候，以 './' 表示的是当前执行 node 命令的那个路径，不是被执行的js文件路径
    - __dirname：表示的永远是“当前被执行的js文件所在的目录”
    - __filename：表示的是“被执行的js文件的文件名（含路径）”
5. error-first 介绍（错误优先）


### 案例3：通过 node.js 编写http服务程序 -- 极简版本
步骤：
1. 加载 http 模块
2. 创建 http 服务
3. 为 http 服务对象添加 request 事件处理程序
4. 开启 http 服务监听，准备接受客户端请求

注意：
1. 浏览器的显示可能是乱码，所以可以通过 `res.setHeader('Content-type','text/plain; charset=utf-8');` 设置浏览器显示时所使用的编码
2. chrome 浏览器默认无法手动设置编码，需要安装 "Set Character Encoding" 扩展
3. 演示一下设置 `Content-Type=text/html` 和 `Content-Type=text/plain` 的区别
    - `Content-Type=text/html`：浏览器会解析返回数据中的 html 标签
    - `Content-Type=text/plain`：浏览器不会解析返回数据中的 html 标签
4. 当返回html文档中有 css 或img 等资源，会再次请求服务器，需要对css 或 img 的请求再做出响应

模拟apache 服务器：
1. 加载http模块
2. 下载第三方插件 mime， npm install mime
3. 将所有静态资源放在一个文件夹下（public）
4. 响应给浏览器的数据都从这个静态资源的文件夹下去返回


### HTTP request（http.IncomingMessage） 对象和 response(http.ServerResponse) 对象
1. request：request 对象继承子 stream.Readable ,包含了用户请求报文中的所有内容， 通过 request 对象可以获取用户提交过来的所有数据
 + request 对象常用成员
  - `request.headers`： 客户端请求报文头，返回一个对象，
  - `request.rawHeaders`：客户端原生的请求报文头，返回一个数组
  - `request.httpVersion`：客户端使用的http协议版本号
  - `request.method`：客户端请求方法
  - `request.url`：客户端请求路径，不包含主机名称、端口号、协议
2. response 对象用来向用户响应一些数据，当服务器要向客户端响应数据的时候必须使用 response 对象
 + response 对象常用成员
  - `response.writeHead(statusCode[, statusMessage][,Headers])`: 这个方法在每次请求响应前都必须被调用（之呢个调用一次）。并且必须在end（）方法调用前调用；如果在调用writeHead() 方法之前调用了write() 或 end() 方法，系统会自动帮你调用writeHead() 方法，并且会生成默认的响应头  
  - `respond.end([data][,encoding][,callback])`: 此方法向服务器发出信号，表明已发送所有响应头和主体，该服务器应该视为此消息已完成。 必须在每个响应上调用此 response.end() 方法。如果指定了 data，则相当于调用 response.write(data, encoding) 之后再调用 response.end(callback)。
  - response.setHeader(name, value): 为隐式响应头设置单个响应头的值。 如果此响应头已存在于待发送的响应头中，则其值将被替换。 在这里可以使用字符串数组来发送具有相同名称的多个响应头。 非字符串值将被原样保存。 因此 response.getHeader() 可能返回非字符串值。 但是非字符串值将转换为字符串以进行网络传输。
  - res.statusCode: 设置 http 响应状态码
  - res.statusMessage: 设置 http 响应状态码对象消息

### node.js 错误调试
1. 当开启服务后，在浏览器输入地址，如果出现浏览问题，首先看服务器控制台是否报错。如果报错，可以直接根据错误提示排错
2. 打开浏览器开发者工具中的NetWork 部分，查看请求是否成功发出去了
3. 看一下请求报文是不是和我们想的一样
4. 响应状态码



## npm介绍：Node Package Manager - Node 包管理器
### nmp是什么
- npm（全称Node Package Manager），是Node.js 默认的、以JavaScript 编写的软件包管理系统
- 一般我们说npm的时候可能指3件事：
    + nmp网站：https://wwww.npmjs.com/
    + NPM包管理库，存储了大量的JavaScript代码库
    + NPM客户端，我们所使用的npm命令行工具。使用JavaScript开发的基于node.js的命令行工具，本身也是node的一个包

### npm 常用命令
1. install: 安装包。 `npm install 包名`
2. uninstall： 卸载包。 `npm uninstall 包名`
3. version：查看当前npm版本。 `npm version` 或 `npm -v`
4. init：创建一个package.json文件。 `npm init`
5. 注意： 当使用 `npm init -y` 的时候。如果当前文件夹（目录）的名字比较怪（有大写、中文等）就会影响 npm init -y 的一步生成操作，此时需要 npm init 根据向导来生成。


### “模块”（Modules）和 “包”（packages）的区别
1. 模块可以是任何一个文件或目录（目录下可以有多个文件），只要能被node.js 通过require() 即可
2. 包是一个文件或目录（目录下馈页有多个文件）必须有一个package.json 文件来描述，就可以是一个包

### package.json 文件的作用
1. package.json 文件是一个包说明文件（项目描述文件），用来管理组织一个包（一个项目）
2. package.json 文件是一个json格式的文件
3. 位于当前项目的跟目录下

package.json 文件中常见的项有哪些
1. name：包的名字（必须有）
2. version： 包的版本（必须有）
3. description：包的描述
4. author：包的作者
5. main：包的入口js文件，从main自u但这里指定的那个 js 文件开始执行
6. dependencies：当前包依赖的其他包

如何创建一个 package.json 文件
1. 通过 `npm init` 命令或者 `npm init -y` 或者 `npm init -yes` 命令
2. 手动创建

注意：
1. 通过 `npm init -y` 或者 `npm init -yes` 命令创建package.json 文件时没执行命令所在的目录名称中不能包含大写字母
2. package.json 文件中，项目名称本身不能包含大写字母
3. npm 更新版本后，项目所在的文件夹如果包含中文等特殊字符，创建的时候不会提示一步一步的数组，直接报错
