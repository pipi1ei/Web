### window 对象
1. 窗口尺寸：
    window.innerHeight: 浏览器窗口的内高度（以像素计，不包含工具栏和滚动条）；
    window.innerWidth: 浏览器窗口的内宽度（以像素计，不包含工具栏和滚动条）；
    对于IE8，7，6，5：
        document.documentElement.clientHeight
        document.documentElement.clientWidth
    或
        document.body.clientHeight
        document.body.clientWidth
兼容写法（适配所以浏览器）：
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

其他窗口方法：
    window.open() - 打开新窗口
    window.close() - 关闭当前窗口
    window.moveTo() -移动当前窗口
    window.resizeTo() -重新调整当前窗口


### Window.Screen 对象
window.Screen 对象包含用户屏幕的信息
属性：
    screen.width： 返回以像素计的访问者的屏幕宽度；
    screen.height：返回以像素计的访问者的屏幕高度；
    screen.availWidth：可用宽度，返回访问者屏幕的宽度，以像素计，减去诸如窗口工具条之类的界面特征。
    screen.availHeight：可用高度，返回访问者屏幕的高度，以像素计，减去诸如窗口工具条之类的界面特征
    screen.colorDepth：色深，用于显示一种颜色的比特数
    screen.pixelDepth：像素深度，返回屏幕的像素深度。


### Location 对象：
window.location 对象可用于获取当前页面地址（URL）并把浏览器重定向到新页面。
属性：
    window.location.href： 返回当前页面的 href (URL)
    window.location.hostname： 返回 web 主机的域名
    window.location.pathname： 返回当前页面的路径或文件名
    window.location.protocol： 返回使用的 web 协议（http: 或 https:）
    window.location.port： 返回（当前页面的）互联网主机端口的编号。
    window.location.assign： 加载新文档


### History 对象：
window.history 对象包含浏览器历史。
方法： 
    history.back() - 等同于在浏览器点击后退按钮
    history.forward() - 等同于在浏览器中点击前进按钮


### Navigator 对象
window.navigator 对象包含有关访问者的信息
属性： 
    navigator.appName: 返回浏览器的应用程序名称,*"Netscape" 是 IE11、Chrome、Firefox 以及 Safari 的应用程序名称的统称。*
    navigator.appCodeName: 返回浏览器的应用程序代码名称,*"Mozilla" 是 Chrome、Firefox、IE、Safari 以及 Opera 的应用程序代码名称。*
    navigator.product: 返回浏览器引擎的产品名称,*大多数浏览器都将 “Gecko” 作为产品名称返回*
    navigator.appVersion: 返回有关浏览器的版本信息
    navigator.userAgent: 返回由浏览器发送到服务器的用户代理报头
    navigator.platform: 属性返回浏览器平台（操作系统）
    navigator.cookieEnabled: 如果 cookie 已启用，返回 true，否则返回 false
    navigator.language: 返回浏览器语言
    navigator.onLine: 假如浏览器在线,返回 true
方法：
navigator.javaEnabled()：如果 Java 已启用，返回 true

*警告*：来自 navigator 对象的信息通常是误导性的，不应该用于检测浏览器版本，因为：
1. 不同浏览器能够使用相同名称
2. 导航数据可被浏览器拥有者更改
3. 某些浏览器会错误标识自身以绕过站点测试
4. 浏览器无法报告发布晚于浏览器的新操作系统


### 弹出框
JavaScript 有三种类型的弹出框：警告框、确认框和提示框。
1. 警告框：如果要确保信息传递给用户，通常会使用警告框。当警告框弹出时，用户将需要单击“确定”来继续。
    window.alert("sometext"); window.alert() 方法可以不带 window 前缀来写。
2. 确认框：如果您希望用户验证或接受某个东西，则通常使用“确认”框。当确认框弹出时，用户将不得不单击“确定”或“取消”来继续进行。如果用户*单击“确定”，该框返回 true*。如果用户*单击“取消”，该框返回 false*。
    window.confirm("sometext");
3. 提示框：如果您希望用户在**进入页面前输入值*，通常会使用提示框。如果用户*单击“确定”，该框返回输入值*。如果用户*单击“取消”，该框返回 NULL*。
    window.prompt("sometext","defaultText");


### Cookies
Cookie 让您在网页中存储用户信息。
什么是cookie:
    Cookie 是在计算机上存储在小的文本文件中的数据。当 web 服务器向浏览器发送网页后，连接被关闭，服务器会忘记用户的一切。Cookie 是为了解决“如何记住用户信息”而发明的：当用户访问网页时，他的名字可以存储在 cookie 中。下次用户访问该页面时，cookie 会“记住”他的名字。
Cookie 保存在名称值对中，如：username = Bill Gates。当浏览器从服务器请求一个网页时，将属于该页的 cookie 添加到该请求中。这样服务器就获得了必要的数据来“记住”用户的信息

1. 通过JS 创建 cookie：
    JavaScript 可以用 document.cookie 属性创建、读取、删除 cookie。
    创建 cookie：`document.cookie = "username=Bill Gates";` ，还可以添加有效日期和path参数：`document.cookie = "username=Bill Gates; expires=Sun, 31 Dec 2017 12:00:00 UTC; path=/";`

2. 通过JS 读取 cookie：
    `var x = document.cookie;` ,document.cookie 会在一条字符串中返回所有 cookie，比如：cookie1=value; cookie2=value; cookie3=value;

3. 通过JS 改变 cookie：
    通过使用 JavaScript，你可以像你创建 cookie 一样改变它，这样旧的cookie就会被覆盖：`document.cookie = "username=Steve Jobs; expires=Sun, 31 Dec 2017 12:00:00 UTC; path=/";`

4. 通过JS 删除 cookie：
    删除cookie时不必指定cookie值，直接把 *expires* 参数设置为过去的日期即可：`document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";`
    *注意*：应该定义 cookie 路径以确保删除正确的 cookie。，如果不指定路径，一些浏览器不会让你删除 cookie。

5. 设置cookie函数：
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} 

6. 获取cookie的函数：
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie); //解码 cookie 字符串，处理带有特殊字符的 cookie，例如 “$”。
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
} 

7. 检查cookie函数：
function checkCookie(key) {
    var value = getCookie(key);
    if (value != "") {
        alert("Welcome again " + value);
    } else {
        value = prompt("Please enter your name:", "");
        if (value != "" && username != null) {
            setCookie(key, value, 365);
        }
    }
} 