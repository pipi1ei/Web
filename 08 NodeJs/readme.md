# Node.js 相关知识

## 浏览器的组成
- 人机交互部分（UI界面）
- 网络请求部分（Socket）
- Javascript 引擎部分（解析执行JavaScript）
- 渲染引擎部分（渲染HTML、CSS等）
- 数据存储部分（Cookie、HTML5中的本地存储LocalStorage、SessionStorage）

## 主流渲染引擎

### 介绍
1. 渲染引擎 又叫 排版引擎 或 浏览器内核。
2. 主流的渲染引擎有：
    - Chrome 浏览器：Blink引擎（WebKit 的一个分支）
    - Safari 浏览器：Webkit引擎，Windows版本2008年3月18日推出正式版，但苹果已于2012年7月25日停止开发Windows版的Safari。
    - Opera浏览器：Blink引擎（早期版使用Presto引擎）
    - FireFox 浏览器：Gecko引擎。
    - IE 浏览器：Trident引擎。
    - Microsoft Edge浏览器：EdgeHTML引擎（Trident的一个分支）

### 工作原理
1. 解析HTML构建DOM树
2. 构建 *渲染树* ， 渲染树 并不等同于 DOM 树，因为像 head 标签或display：none 这样的元素就没有必要放到渲染树
3. 对渲染树进行布局，定位坐标和大小、确定是否换行、确定position、overflow、z-index等等，这个过程叫`"layout" 或 "reflow"`
4. 绘制渲染树，调用操作系统底层的API进行绘图操作

### 浏览器访问网站过程：
1. 在浏览器地址中输入网址
2. 浏览器通过用户在地址栏中输入的URL构建HTTP请求报文。
3. 浏览器发起DNS解析请求，将域名解析为IP地址
4. 浏览器将请求报文发送给服务器
5. 服务器接收请求报文，并解析
6. 服务器处理用户请求，并将处理结果封装成HTTP响应报文，然后再发送给浏览器
7. 浏览器接收服务器响应的HTTP报文，并解析
8. 浏览器解析HTML页面并展示，在解析HTML页面时遇到新的资源需要再次发起请求
9. 浏览器展示最终的页面


## Web 开发本质
1. 请求：客户端发起请求
2. 处理：服务器处理请求
3. 响应：服务器将处理结果发送给客户端 