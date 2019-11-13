### 获取内容和属性
一、获取内容：
1. text(): 设置或返回所选元素的文本内容
    获取内容：$("#test1").text();
    设置内容：$("#test1").text("Hello world!");
2. html(): 设置或返回所选元素的内容（包括 HTML 标签）
3. val(): 设置或返回*表单字段*的值

二、获取属性：
attr(): 获取属性值。如下获取id为w3s元素href属性的值：
$("button").click(function(){
  alert($("#w3s").attr("href"));
});

### 设置内容和属性
上面的三个 jQuery 方法：text()、html() 以及 val()，同样拥有回调函数。回调函数有两个参数：1.被选元素列表中当前元素的下标，2.原始（旧的）值。然后以函数新值返回您希望使用的字符串。
示例：
    $("#btn1").click(function(){
        $("#test1").text(function(i,origText){
            return "Old text: " + origText + " New text: Hello world!(index: " + i + ")";
        });
    });

设置属性：attr() 方法也允许您同时设置多个属性。
示例：
    $("button").click(function(){
        $("#w3s").attr({
            "href" : "http://www.w3school.com.cn/jquery",
            "title" : "W3School jQuery Tutorial"
        });
    });
attr() 的回调函数：attr()方法也提供回调函数。回调函数有两个参数：1.被选元素列表中当前元素的下标，2.原始（旧的）值。然后以函数新值返回您希望使用的字符串


### 添加元素
1. append(): 在被选元素的结尾插入内容。
2. prepend(): 在被选元素的开头插入内容。
    append() 和 prepend() 方法还可以添加无限数量的新元素：
    function appendText(){
        var txt1="<p>Text.</p>";               // 以 HTML 创建新元素
        var txt2=$("<p></p>").text("Text.");   // 以 jQuery 创建新元素
        var txt3=document.createElement("p");  // 以 DOM 创建新元素
        txt3.innerHTML="Text.";
        $("p").append(txt1,txt2,txt3);         // 追加新元素
    }
3. after(): 在被选元素之后插入内容。
4. before()：在被选元素之前插入内容。
    通过after() 和 before() 方法添加若干新元素：
    function afterText(){
        var txt1="<b>I </b>";                    // 以 HTML 创建新元素
        var txt2=$("<i></i>").text("love ");     // 通过 jQuery 创建新元素
        var txt3=document.createElement("big");  // 通过 DOM 创建新元素
        txt3.innerHTML="jQuery!";
        $("img").after(txt1,txt2,txt3);          // 在 img 之后插入新元素
    }


### 删除元素
1. remove(): 删除被选元素（及其子元素）。
    remove() 方法也可接受一个参数，允许您对被删元素进行过滤。下面的例子删除所有 class="italic" 的 <p> 元素：
    $("p").remove(".italic");
2. empty(): 从被选元素中删除子元素，不会删除备选元素


### 获取并设置CSS类
1. addClass(): 向被选元素添加一个或多个类,多个类之间用空格分隔
2. removeClass(): 从被选元素删除一个或多个类
3. toggleClass(): 对被选元素进行添加/删除类的切换操作
4. css(): 设置或返回样式属性。
    返回css属性：
    如需返回指定的 CSS 属性的值，请使用如下语法：`css("propertyname");`
    设置css属性：`css("propertyname","value");` 设置多个css属性：`css({"propertyname":"value","propertyname":"value",...});`


### 尺寸方法
1. width(): 返回元素的宽度（不包括内边距、边框或外边距）。
2. height(): 返回元素的高度（不包括内边距、边框或外边距）。
3. innerWidth(): 元素的宽度（包括内边距）。
4. innerHeight(): 元素的高度（包括内边距）。
5. outerWidth(): 返回元素的宽度（包括内边距和边框）。
6. outerHeight(): 返回元素的高度（包括内边距和边框）。
7. outerWidth(true): 返回元素的宽度（包括内边距和边框和外边距）。
8. outerHeight(true): 返回元素的高度（包括内边距和边框和外边距）。

设置高度或宽度：`$("#div1").width(500).height(500);`


### DOM元素方法
1. get(): 获得由选择器指定的 DOM 元素。
    `$("p").get(0);` 获取第一个P元素
2. index(): 返回指定元素相对于其他指定元素的 index 位置。如果未找到元素将返回 -1 
    语法：`$(selector).index()`: 获得第一个匹配元素相对于其同胞元素的 index 位置。
          `$(selector).index(element)`: 获得元素相对于选择器的 index 位置。
3. size(): 返回被 jQuery 选择器匹配的元素的数量。
    语法：`$(selector).size()`
4. toArray(): 以数组的形式返回 jQuery 选择器匹配的元素。
