### HTML DOM Document对象
文档对象代表当前网页，如果想访问HTML页面中的任何元素，都可以通过document对象开始

### 查找HTML元素
1. document.getElementById(id): 通过id来查找元素
2. document.getElementsByTagName(name)：通过标签名来查找元素，返回HTML元素集合
3. document.getElementsByClassName(name): 通过类名来查找元素，返回HTML元素集合,该方法不适用于 Internet Explorer 8 及其更早版本。
4. document.querySelector(),document.querySelectorAll(): 通过 CSS 选择器查找 HTML 元素
    document.querySelector(): 只返回匹配的第一个元素，如果没有匹配项怎返回 null；
    document.querySelectorAll()：返回匹配的元素集合，如果没有匹配项，返回空的nodelist（节点数组）。


### 改变 HTML 元素
1. element.innerHTML = new html content：改变元素的 inner HTML
2. element.attribute = new value：改变 HTML 元素的属性值
3. element.setAttribute(attribute, value)：	改变 HTML 元素的属性值
4. element.style.property = new style：	改变 HTML 元素的样式
5. document.write(text): 写入HTML输出流


### 添加和删除元素
1. document.createElement(element): 创建HTML元素
2. document.createTextNode(text): 创建文本节点
3. document.removeChild(element): 删除HTML元素,document 为 element 的父元素，删除元素是必须知道其父元素，可通过如下方式删除：
    `var child = document.getElementById("p1");`
    `child.parentNode.removeChild(child);`
4. document.appendChild(element): 添加HTML元素，追加新元素作为父元素的最后一个子元素
5. document.insertBefore(element, child): 在child之前插入element元素
5. document.replaceChild(element,child): 替换HTML元素,将child元素替换为element元素



### HTML DOM 动画
JavaScript 动画是通过对元素样式进行渐进式变化编程完成的。这种变化通过一个计数器来调用。当计数器间隔很小时，动画看上去就是连贯的。
示例：
    function myMove() {
        var elem =  document.getElementById("animate"); 
        var pos = 0;
        var id = setInterval(frame, 5);
        function frame() {
            if (pos ==  350) {
                clearInterval(id);
            } else {
                pos++; 
                elem.style.top = pos + 'px'; 
                elem.style.left = pos + 'px'; 
            }
        }
    }


### HTML DOM 事件监听器
addEventListener() 方法为指定元素指定事件处理程序。该方法为元素附加事件处理程序而不会覆盖已有的事件处理程序。
能够向一个元素添加多个事件处理程序；能够向一个元素添加多个相同类型的事件处理程序，例如两个 "click" 事件；能够向任何 DOM 对象添加事件处理程序而非仅仅 HTML 元素，例如 window 对象。
可以通过使用 removeEventListener() 方法轻松地删除事件监听器。

语法：element.addEventListener(event, function, useCapture);
    第一个参数是事件的类型（比如 "click" 或 "mousedown"）。
    第二个参数是当事件发生时我们需要调用的函数。
    第三个参数是布尔值，指定使用事件冒泡还是事件捕获。此参数是可选的。

*注意*：IE 8、Opera 6.0 及其更早版本不支持 addEventListener() 和 removeEventListener() 方法。不过，对于这些特殊的浏览器版本，您可以使用 attachEvent() 方法向元素添加事件处理程序，并由 detachEvent() 方法删除：
跨浏览器解决方案：
var x = document.getElementById("myBtn");
if (x.addEventListener) {                    // 针对主流浏览器，除了 IE 8 及更正版本
    x.addEventListener("click", myFunction);
} else if (x.attachEvent) {                  // 针对 IE 8 及更早版本
    x.attachEvent("onclick", myFunction);
} 


### DOM导航
通过js，可以使用以下节点属性在节点之间导航：
1. parentNode
2. childNodes[nodenumber]
3. firstChild
4. lastChild
5. nextSibling
6. previousSibling

子节点和节点值：*DOM处理中一种常见的错误就是认为元素节点中包含文本*
示例：
    <title id="demo">DOM 教程</title> 
    元素节点<title>不包含文本，它包含了值为“DOM 教程”的*文本节点*
文本节点的值能通过节点的`innerHTML`属性进行访问：`var myTitle = document.getElementById("demo").innerHTML;`
访问`innerHTML`属性等同于访问受个子节点的`nodeValue`：`var myTitle = document.getElementById("demo").firstChild.nodeValue;`

1. nodeName 属性：规定节点的名称
    1.nodeName 是只读的。
    2.元素节点的 nodeName 等同于标签名
    3.属性节点的 nodeName 是属性名称
    4.文本节点的 nodeName 总是 #text
    5.文档节点的 nodeName 总是 #document
2. nodeValue 属性：规定节点的值
    1.元素节点的 nodeValue 是 undefined
    2.文本节点的 nodeValue 是文本值
    3.属性节点的 nodeValue 是属性值
3. nodeType 属性：返回节点的类型。nodeType 是只读的。
    重要的nodeType:  
       节点	            类型	       例子
    ELEMENT_NODE	     1	    <h1 class="heading">W3School</h1>
    ATTRIBUTE_NODE	     2	    class = "heading" （弃用）
    TEXT_NODE	         3	    W3School
    COMMENT_NODE	     8	    <!-- 这是注释 -->
    DOCUMENT_NODE	     9	    HTML 文档本身（<html> 的父）
    DOCUMENT_TYPE_NODE	 10	    <!Doctype html>


### DOM 集合
1. HTMLCollection对象：
    getElementsByTagName() 方法返回 HTMLCollection 对象。HTMLCollection 对象是类数组的 HTML 元素列表（集合）
    length 属性定义了 HTMLCollection 中元素的数量：document.getElementsByTagName("p").length
    *注意*：HTMLCollection 也许看起来像数组，但并非数组。所以无法对HTMLCollection 使用数组方法

### DOM 节点列表
1. NodeList 对象: NodeList 对象是从文档中提取的节点列表（集合）
    如使用 getElementsByClassName() 方法，某些（老的）浏览器会返回 NodeList 对象而不是 HTMLCollection。所有浏览器都会为 childNodes 属性返回 NodeList 对象。大多数浏览器会为 querySelectorAll() 方法返回 NodeList 对象。
    length 属性定义节点列表中的节点数：
    *注意*：节点数组看起来像数组，但并不是，所以无法对节点列表使用数组方法

### HTMLCollection 与 NodeList 的相同之处和区别
1. NodeList 和 HTML 集合几乎完全相同。
2. HTMLCollection 和 NodeList 对象都是类数组的对象列表（集合）。
3. 它们都有定义列表（集合）中项目数的 length 属性。都可以通过索引 (0, 1, 2, 3, 4, ...) 像数组那样访问每个项目。
4. HTMLCollection 是 HTML 元素的集合,NodeList 是文档节点的集合。
5. 访问 HTMLCollection 项目，可以通过它们的名称、id 或索引号。访问 NodeList 项目，只能通过它们的索引号。
6. 只有 NodeList 对象能包含属性节点和文本节点