### Ajax相关知识

1. Ajax 的作用：获取服务器数据
2. Ajax 的效果：在不刷新整个页面的情况下，通过一个URL地址获取服务器的数据，然后进行页面的局部刷新
3. 一些熟悉的场景：
    A.评论加载效果
    B.用户名验证
    

### Ajax的使用
Ajax 简单的来说，就是一个异步的 JavaScript 请求，用来获取后台服务器的数据，而并不是整个页面的跳转
在原始JS中来实现Ajax的主要的类就是 XMLHttpRequest，它的使用一般有四个步骤：
1. 创建 XMLHttpRequest 对象：
    var xhr = new XMLHttpRequest();
    <!-- 兼容写法 -->
    var xhr;
    if(window.XMLHttpRequest){ IE7+，Firefox，Chrome，Safari
        xhr = new XMLHttpRequest();
    }else{ // IE5，IE6
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }   
2. 准备发送网络请求
    xhr.open('get','./server/checkUsername.php?username='+username, true);
    调用open方法，这里面有三个参数，第一个参数代表的是这个Http 请求是以 get 方式还是 post 方式，如果是 get 请求，则如果有参数的化，则需要将参数跟在url的后面，如果是 post 请求，参数应跟在请求体中。第二个参数是请求的 url，第三个参数是否使用异步请求，true 表示异步请求，false 表示同步请求；
3. 开始发送网络请求:
    xhr.send(String): string: 仅用于 POST 请求； get 请求可以不传或null。
    post 请求要在send() 之前加：xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
4. 指定回调函数：
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
            var result_Str = xhr.responseText; // 服务器返回的字符串形式数据
            var result_XML = xhr.responseXML; // 服务器返回的XML形式数据
            var e_check_result = document.getElementById('check_result');
            e_check_result.innerHTML = result_Str;
        }
    }
    xhr.readyState: 0: 请求未初始化；1：服务器连接以建立；2：请求已接收；3：请求处理中；4：请求已完成，且响应已就绪。
    xhr.status: 200："OK"；404：未找到页面；500：服务器错误。


### 同步和异步的理解
1. 将Ajax请求改为同步请求：xhr.open(method,url, false);
    这样做的话会有两个问题，第一、界面会卡顿，卡顿时间取决于网络速度，第二、 xhr.onreadystatechange 的回调将不会被执行，需要修改代码后才能获取到数据，直接将回调中的代码提取出来放到 xhr.send() 方法之后
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.open('get', 'checkUsername.php?username=' + usernameValue, false);
    xhr.send();
    
    if (xhr.readyState == 4 && xhr.status == 200) {
        var result = xhr.responseText;
        console.log(result);
        if ('OK' == result) {
            console.log("ok111")
            document.getElementById('username_check_result').innerHTML = "用户名可用";
        } else if ('error' == result) {
            document.querySelector('#username_check_result').innerHTML = "用户名已存在";
        }
    }
        
2. 异步的实现原理：
    js 中异步的实现原理是单线程加事件队列， js 的代码执行时单线程的，所谓的单线程的含义时 js 的代码是从上往下按顺序执行的，一定是上一行代码执行完之后再执行下一行代码。事件队列可以认为是一个容器，这个容器中存储一些回调函数。这些回调函数只有在js代码全部执行完成之后，才有可能会去调用，因为js是单线程的，一次智能做一件事情。


### Ajax 封装
/* Ajax请求方法
    @type: 请求方式：'get' 或 'post';
    @url: 请求的url
    @params: 请求参数：格式为：username=" + username;
    @isAsync: 是否异步请求，true：异步，false：同步
    @dataType: 返回数据类型：'json'：json格式数据, 'xml'：xml格式数据
    @callback: 请求结果回调
    */        
function myAjax(type, url, params, isAsync, dataType, callback){
  var xhr = null;
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  }else{  
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  if(type.toLowerCase() == 'get'){
    if(params && params != ''){
      url += "?" + params;
    }
  }
  xhr.open(type, url, isAsync);
  if(type.toLowerCase() == 'get'){
    xhr.send();
  }else if(type.toLowerCase() == 'post'){
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    xhr.send(params);
  }
    
  if(isAsync){
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var result = null;
        if (dataType == 'xml') {
          result = xhr.responseXML;
        } else {
          result = xhr.responseText;
        }
        if (callback) {
          callback(result);
        }
      }
    }
  }else{
    if (xhr.readyState == 4 && xhr.status == 200) {
      var result = null;
      if(dataType == 'json'){
        result = JSON.parse(xhr.responseXML);
      }else if (dataType == 'xml') {
        result = xhr.responseXML;
      } else {
        result = xhr.responseText;
      }
      if (callback) {
        callback(result);
      }
    }
  }
}

该封装方式有两个缺点：1. 参数的顺序不可以改变； 2. 参数没有默认值，每次都得传递。这两个缺点通过一个小技巧就可以解决，我们将封装的参数变为一个对象即可。得到如下代码：
function myAjax2(obj) {

    var defaults = {
        type: 'get',
        url: '#',
        params: {},
        isAsync: true,
        dataType: 'json',
        success: function (result) {console.log(result)}
    }

    //obj 中的属性覆盖到 defaults 中的属性
    //1.如果有一些属性只存在obj中，会给defaults 中增加属性
    //2.如果有一些属性在obj和defaults中都存在，会覆盖defaults中的属性
    //3.如果有一些属性只存在defaults中，会保留 defaults 中的属性
    for(var key in obj){
        defaults[key] = obj[key];
    }

    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //得到params
    var params = '';
    for(var key in defaults.params){
        params += key + "=" + defaults.params[key] + "&";
    }
    if(params){
        params = params.substring(0,params.length - 1);
    }

    if(defaults.type.toLowerCase() == 'get'){
        defaults.url += "?" + params;
    }
    xhr.open(defaults.type, defaults.url, defaults.isAsync);


    if (defaults.type.toLowerCase() == 'get') {
        xhr.send();
    } else if (defaults.type.toLowerCase() == 'post') {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }

    if (defaults.isAsync) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = null;
                if (defaults.dataType == 'json') {
                    result = xhr.responseText;
                } else if (defaults.dataType == 'xml') {
                    result = xhr.responseXML;
                } else {
                    result = xhr.responseText;
                }
                defaults.success(result);
            }
        }
    } else {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = null;
            if (defaults.dataType == 'json') {
                result = xhr.responseText;
            } else if (defaults.dataType == 'xml') {
                result = xhr.responseXML;
            } else {
                result = xhr.responseText;
            }
            defaults.success(result);
        }
    }
}


### jQuery 中使用Ajax
jQuery对Ajax方法进行了封装，提供了很多方法供开发者调用
1. $.ajax();
    $.ajax() 的使用和我在自己封装的myAjax2() 使用非常类似，传入一个对象，有些参数不传递的话采用默认值。
    $.ajax({
        type:'get',
        url: url,
        data:{},
        success: function(result){},
        dataType: 'json',
        async: true
    })
2. $.get();
    $.get(url + "?" + params,function(result){});
3. $.post();
    $.post(url,{},function(result){});


### 跨域
1. 同源策略的概念：
    同源策略是浏览器上为了安全性考虑实施的非常重要的安全机制。Ajax 默认是能获取到同源的数据，对于非同源的数据，Ajax默认是获取不到的。所谓同源策略就是协议、端口、域名三者都完全一样，如果我们使用ajax来请求非同源路径下的数据，会报错。
2. 跨域的实现：和Ajax没有任何关系，跨域的本质其实就是服务器返回了一个方法调用，这个方法是我们事先定义好的，而方法中的参数就是我们想要的数据。
    XMLHttpRequest 对象默认情况下是无法获取到非同源服务器下的数据。那么怎么获取到别人服务器上的数呢？使用 XMLHttpRequest 是达不到的，只能使用其他方法。
    我们可以通过 script 标签，用 script 标签的 src 属性引入一个外部文件，这个外部文件是不涉及到同源策略的影响的。
3. 跨域方式：
    1.访问外部 js 文件
    2.访问外部 php 文件
    3.动态创建 script 标签动态传入参数
    4.前端页面决定方法名称
    5.给 window 增加属性进行方法定义

4. JSONP 方式跨域的本质是服务器返回了一个方法的调用，但有的服务器返回的并不是一个方法的调用，这样jsonp跨域的方式就无法使用，受到同源策略的影响，也不能够使用ajax的方式去获取服务器数据，这是应该借助自己的本地服务器做一个中转，本地服务器获取到第三反服务器数据后，前端通过ajax的方式访问本地服务器获取到数据



### 模板引擎的使用
无论是 Ajax 还是跨域，目的都是为了获取服务器的数据，获取数据之后将前端页面进行渲染。怎么渲染到前端界面呢？前端界面都是由标签构成的，所以前端页面的渲染主要做的就是生成 html 标签。
生成 html 标签我们可以通过拼接字符串的方式来实现。这种方式在标签结构比较复杂的情况之下很不好操作和后期的维护，并且容易出错。通过使用模板引擎可以很方便的生成 html 标签
1. 模板引擎的本质：
    将数据和模板结合起来生成 html 片段。所以模板引擎需要两个组成部分: 模板和数据。通过数据，将模板指定的标签动态生成，方便维护。
    常见的模板引擎很多，这里介绍一个效率最高的模板引擎 artTemplate ，这个是腾讯公司出品的开源模板引擎，在 GitHub 上可以下载到源代码。
2. 使用步骤：
    1.引入js文件：
        <script src="../../lib/art-template/template-web.js"></script>
    2.定义模板：1.模板的type=text/html  2.给模板配一个id
        <script type='text/html' id='resultTemplate'>
            <li>
                <div>
                    <span>结果1：</span>
                    <span>1</span>
                </div>
            </li>
        </script>
    3.将数据和模板结合起来生成 html 片段：
        var html = template('resultTemplate',data)
    4.将 html 片段渲染到界面中：
        var ul = document.getElementById('ul');
        ul.innerHTML = html;

3. 基本语法：
    1.得到数据中的值： {{ value }}
    2.循环操作：
        {{ each object as value index }} {{/each}} ； object 是要遍历的数组， value 是数组中的值，index是数组的下标, 现在版本的template.js文件 as 可以去掉
    3.转义：#的使用
    4.条件判断：{{ if ... }} {{ /if }}
    5.获取数组长度：{{ array.length }}
    6.技巧：有时候可能需要对原始数据进行加工操作