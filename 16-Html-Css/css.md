## CSS

1. css 文件最好指定一个编码：@charset 'utf-8'
2. 引入外部 css 文件方式：
   2.1 通过 link 标签：<link rel='stylesheet' href='...'>
   2.2 通过 style 标签加@import ：<style> @import url(...) </style> ， @import 也可以在 css 文件中导入另一个 css 文件
3. 类名命名规范：最好使用中划线连接（class='large-font'）
4. 设置网页图标：
  - link 元素除了可以用来引入 css 文件，还可以设置网页的图标（href 的值是图标的连接）：<link rel='icon' href='bg.png'>
  - link 元素的 rel 属性不能省略，用来指定文档与连接资源的关系，一般 rel 如果确定，相应的 type 也会默认确定，可以省略 type 属性
  - 网页图标支持的格式是 ico,png。常用的大小是 16\*16，24\*24，32\*32(单位：像素)

5. css 常用属性：
  - color：设置前景色，不只是文字的颜色，也可以设置 text-decoration，border 的颜色

6. width 和 height 属性不适用于 非替换行内元素
7. 快速查看一个网页的布局结构：按下 F12，添加一个样式 div{outline: 2px solid red !important}，这样网页就会显示所有 div 的轮廓,outline 这个属性是不占用宽度的
8. RGB 颜色空间：
  - 数值范围 0-255，因为每个颜色在计算机中都是一个字节存储的，一个字节有 8bit，8 位的 0/1 组成，最大只能到 255

9. css 文本和字体
  + 文字属性：
    - text-decoration：设置文本的装饰线。none：无；underline：下划线；overline：上划线；line-through：中划线
    - letter-spacing：设置字母之间间距
    - word-spacing：设置单词之间间距
    - text-transform：用于设置文字大小写转换。capitalize：每个单词首字母大写；uppercase：全部转成大写；lowercase：全部转成小写；none：没有任何影响
    - text-indent：设置第一行内容的缩进。一般使用 em 作为单位，1 个 em 表示相对自己一个文字大小。如果 font-size 单位是 em，则相对他的父级的文字大小
    - text-align：设置元素*内容*在元素中的水平对齐方式。left：左对齐；right：右对齐；center：中间对齐；justify：两端对齐。块级元素无法居中对齐，因为块级元素默认独占一行，即使设置了宽度也是独占一行。所以会默认认为块级元素已经是居中对齐的。justify 对最后一行无效，想要最后一行为 justify，可以设置 text-align-last: justify

  + 字体属性：
    - font-size：设置字体大小，可以设置为百分百，相对于父元素文本的大小，和 em 类似。小知识：谷歌浏览器最小字体为：12px
    - font-family：设置字体名称。可以设置多个，采取就近原则设置字体，如果都不支持则使用操作系统默认的字体。如果在开发中希望中英文使用不同的字体，建议将英文字体放在前面，中文字体放在后面
    - font-style：设置文字常规、斜体显示。normal：常规显示；italic：用字体的斜体显示（使用该方式，文本字体必须是支持斜体的）；oblique：文字倾斜显示
    - font-variant：可以影响小写字母的显示形式。normal：常规显示；small-caps：将小写字母替换为缩小过的大写字母（几乎用不到）
    - font 缩写属性：font 是一个缩写属性，可以只写一个 font 来设置多个值：font: font-style font-variant font-weight font-size/line-height font-family
      font: italic small-caps 700 20px/40px "微软雅黑"
      font-style font-variant font-weight 顺序可以任意调换，也可以省略。/line-height 也可以省略，如果不省略必须跟在 font-size 后面。font-size，font-family 不可以省略也不可以调换顺序

  + line-height：用于设置文本的最小行高
    - 行高可以简单理解为*一行文字*所占的高度
    - 行高的严格定义是：两行文字基线（baseline）之间的间距。基线可以理解为四线本中的第三条线。第一条为顶线，第二条为中线，第四条为底线。两行文本底线与顶线之间的距离为行距[图片]
    - height 与 line-height 的区别：height 是元素整体的高度，line-height 是一行文字所占的高度。line-height 可以让一行文本垂直居中。原理：行距会在文本上下等分

11. css 选择器：

  - 属性选择器：[title]{color:red}：选择含有 title 属性的元素 ; [title='div']{} :选择 title 属性并且值为 div 的元素；[title|='one']：选择 title 属性值恰好等于 one 或以 one 开头且后面紧跟着连字符- 的元素。[title*='one']：选择包含单词 one 的元素。[title~='one']：选择包含单词 one 的元素，one 与其他单词之间必须用空格隔开，效果与类选择器一样
  - 子选择器：div > span{} ：选择 div 下的直接 span 子元素（不包括间接子元素）
  - 相邻兄弟选择器：div+p{}：选择 div 后面*紧挨*着的 p 元素（div 和 p 是兄弟关系）
  - 全体兄弟选择器：div~p{}：选择 div 后面所有的 p 元素
  - 交集选择器：div.one{}：选择类名是 one 的 div 元素（同时符合两个条件的元素）
  - 并集选择器：div, .one{}: 选择所有的 div 元素，所有类名为 one 的元素

12. 伪类和伪元素
  + 伪类：常见的伪类有：

    - 动态伪类：:link(未访问的), :visited(访问过的), :hover, :active(激活状态，手指按下去没有松开时), :focus。
      小知识：去除 a 元素 focus 状态：<a tabindex='-1'></a> tabindex 可以调整 tab 选中顺序
      :hover 必须在:link 和 :visited 之后才会生效, :active 必须在 :hover 之后才会生效。记忆：女朋友看到 LV 之后 haha 大笑
      - 细节：给 a 元素设置样式时，相当于给 a 的所有动态伪类都设置了统一的样式
    - 目标伪类：:target ：a标签点击跳到对应锚点时生效
    - 语言伪类：:lang()
    - 元素状态伪类：:enabled, :disabled, :checked
    - 结构伪类：
      - :nth-child()：选中第几个子元素。:nth-child(3){}： 选中第 3 个子元素；:nth-child(3n){}：选中 3 的倍数的子元素。2n 相当于偶数，可以用关键字 even 代替。奇数可以用 odd 代替。:nth-child(-n+3){}：选中前三个子元素
      - :nth-last-child()：与 :nth-child()类似，只是倒序选择子元素
      - :nth-of-type()：选中第几个子元素。与:nth-child()区别：
        p:nth-child(3): 选中第三个子元素，并且第三个子元素是 p 元素
        p:nth-of-type(3): 选中子元素中的 p 元素，再选中第三个 p 元素
      - :nth-last-of-type(): 语法与:nth-of-type()一样，只不过从最后一个子元素开始计数
      - :first-child：选中第一个子元素，等同于:nth-child(1)
      - :last-child：选中最后一个子元素，等同于:nth-last-child(1)
      - :first-of-type： 等同于:nth-of-type(1)
      - :last-of-type;：等同于:nth-last-of-type(1)
      - :only-child：是父元素中的唯一子元素（父元素下只有一个子元素）
      - :only-of-type：是父元素中的唯一的这种类型的子元素
      - :root：根元素，就是 HTML 元素
      - :empty：选中*元素内容为空*的元素。
        <div>
            <div></div>  // 该元素会被选中
            <p>我是段落</p>
        <div>
    - 否定伪类：not()
      格式：not(x), x 是一个简单选择器：元素选择器，通用选择器，属性选择器，类选择器，id 选择器，伪类（除否定伪类）
      not(div){color: red}：除了 div 之外的全部元素前景色未红色

  + 伪元素：伪元素可以看成行内元素
    常见的伪元素：
    :first-line, ::first-line： 第一行，（两种写法，开发中一般写两个冒号，为了和伪类区分）。只有*字体属性、颜色属性、背景属性*可以应用在::first-line 上
    ::first-letter：选中第一个字母，只有*字体属性、颜色属性、背景属性、margin 属性、padding 属性、border 属性*可以应用在::first-letter 上
    ::before：content 属性不能省略，content 可以写字符串，也可以写 url ：content: url("xxxx)
    ::after：content 属性不能省略
    ::placeholder：input元素的伪元素，可以设置 placeholder 的样式

13. css 选择器权重
  !important：10000
  内联样式：1000
  id 选择器：100
  类选择器、属性选择器、伪类选择器：10
  元素选择器、伪元素：1
  通配符：0

  比较优先级的严谨方法：从权重最大的开始比较每一种权值是多少，数量多的优先级高，即可结束比较。如果数量相同，比较一下较小的权值，以此类推。如果所有权值比较完毕后发现数量都相同，就采取"就近原则"

14. css 属性使用经验
  为何有时编写的 css 属性无法生效，可能因为：
  - 选择器的优先级太低
  - 选择器没有选中对应的元素
  - css 属性的使用形式不对
  - 浏览器不支持此 css 属性

15. css 继承
  一个元素如果没有设置某个属性的值，就会跟随父元素的值，并不是所有属性都可以继承的，不能继承的属性，一般可以使用 inherit 值强制继承，浏览器开发者工具也会标识出哪些样式是继承过来的。如果元素自己设置了属性，则不会使用继承的属性
  继承的注意点：css 属性继承的是计算值，并不是当初编写属性时所指定的值（字面值）

16. 将表格边框合并：可以给 table 设置 border-collapse: collapse
17. css 属性：border-spacing
  border-spacing 用于设置单元格之间的水平、垂直间距。该属性用于设置在 table 元素上
  table{ border-spacing: 10px 20px; }：第一个值是水平方向的间距，第二个值是垂直方向的间距。如果只设置一个值就是水平和垂直方向的值相同

18. css 元素分类
  + 根据元素的显示（能不能在同一行显示）类型，HTML 元素主要分为 2 大类
    - 块级元素（block-level elements）：独占父元素的一行
    - 行内级元素（inline-level elements）：多个行内及元素可以在父元素的同一行显示
  + 根据元素的内容（浏览器是否会替换掉元素）类型，HTML 元素主要分为两大类
    - 替换元素（replaced element）：元素本身没有实际的内容，浏览器会根据元素的类型和属性，来决定元素的具体显示内容
      比如：img、input、iframe、video、embed、canvas、audio、object 等
    - 非替换元素（non-replaced element）：和替换元素相反，元素本身是有实际内容的，浏览器会直接将其内容显示出来，而不需要根据元素的属性和类型来判断到底显示什么内容

  块级非替换元素特点：独占父元素一行，可以随意设置宽高，高度默认由内容决定
  行内级替换元素特点：跟其他行内级元素同一行显示，可以随意设置宽高
  行内级非替换元素特点：跟其他行内级元素同一行显示，不可以随意设置宽高，宽高由内容决定

  + 行内非替换元素注意点：
    - 以下几个属性对行内非替换元素不起作用：width、height、margin-top、margin-bottom、
    - 一下几个属性对行内非替换元素的效果比较特殊：padding-top、padding-bottom（虽然会有padding的效果，但padding的距离不占据空间，可能回覆盖到下面的元素）、上下方向的border（和padding类似，会有border的效果，但也不占据空间）
      解决方案：给行内元素设置 display: inline-block

19. display 属性的常用值
  - block：让元素显示为块级元素
  - inline：让元素显示为行内级元素
  - inline-block：让元素同时具备块级元素、行内级元素的特点
  - none：隐藏元素，元素不再占据空间

  display 的以下取值，等同于某些 HTML 元素
    1. table：<table>，一个 block-level 表格
    2. inline-table：<table>，一个 inline-level 表格
    3. table-row：<tr>
    4. table-row-group：<tbody>
    5. table-header-group：<thead>
    6. table-footer-group：<tfoot>
    7. table-cell：<td>、<th>，一个单元格
    8. table-caption：<caption>，表格的标题
    9. list-item：<li>

20. 行内级元素之间的空格
  行内级元素（包括 inline-block 元素）的代码之间如果有空格，会被解析显示为空格。空格的宽度跟父元素的 font-size 有关
  目前建议的解决方法：
    1. 代码之间不要留空格（这种方法不好）
    2. 注释掉空格（也不好）
    3. 设置父元素的 font-size 为 0，然后在元素中重新设置自己需要的 font-size，此方法 Safari 不适用（也不好）
    4. 给元素加 float。（推荐使用这个方案）

  注意：
    1. 块级元素，inline-block 元素一般情况下，可以包含其他任何元素（比如块级元素，行内级元素，inline-block 元素）。
      -  特殊情况：p 元素不能包含其他块级元素
    2. 行内元素（span、strong、a）一般情况下只包含行内级元素，里面不要嵌套块级元素

- 补充知识点：css 中的 word-break: break-all 属性可以让单词在超出元素宽度时换行

21. margin
  + 上下 margin 的传递（父子关系）
    - margin-top 的传递：如果*块级*元素的顶部线和父元素的顶部线重叠，那么给子元素设置 margin-top: 20px; 会作用到父元素上，相当于父元素往上移动了 20px
    - margin-bottom 的传递：如果块级元素的底部线和父元素的底部线重叠，并且父元素的高度是 auto，那个这个块级元素的 margin-bottom 会传递到父元素
  + 如何防止出现传递问题？
    - 给父元素设置padding-top/padding-bottom
    - 给父元素设置border
    - 触发BFC：设置父元素的 overflow 为 auto或 hidden（推荐这种方式）
      - 如何触发BFC
        1. 设置浮动
        2. 设置 overflow 为 非 visible
  + 建议：
    - margin 一般是用来设置兄弟元素之间的间距
    - padding 一般是用来设置父子之间的间距
    
  + 上下 margin 的折叠（兄弟关系）
    - 垂直方向上相邻的两个 margin（margin-top、margin-bottom）有可能合并为1个margin，这种现象叫 collapse（折叠）
    - 水平方向上的 margin（margin-left、margin-right）是永远不会 collapse
  + 如何防止 margin collapse 
    - 只给其中一个元素设置margin

22. border
  + border-style 的取值：
    - none：无
    - solid：实线
    - dotted：点线
    - dashed：虚线
    - double：双实线
    - groove：凹槽，看起来边框凹陷
    - ridge：凸槽，看起来边框凸起
    - inset：看起来内容凹陷
    - outset：看起来内容凸起
  + border 实现形状：边框的姓形状可能是矩形、梯形、三角形等形状
    - 设置上三角形：
      width: 0;
      height: 0;
      border-top: 150px solid red;
      border-left: 150px solid transparent;
      transform: rotate(-45deg);

    - 实现下三角形：
      width: 0;
      height: 0;
      border-width: 100px;
      border-style: solid;
      border-top-color: red;
      border-right-color: transparent;
      border-bottom-color: transparent;
      border-left-color: transparent;
  
  + border-radius 属性：设置圆角，可以设置百分比值，*参考的是当前元素的border-box的宽度*

23. outline
  + outline 表示元素的外轮廓，它不占用空间。
  + outline 属性：与border类似
    - outline-width：轮廓的宽度
    - outline-style：轮廓的样式 
    - outline-color：轮廓的颜色
  + 应用实例：去除a元素、input元素的focus轮廓效果

24. box-shadow
  + box-shadow 可以设置一个或多个阴影，每个阴影用<shadow> 表示，多个阴影之间用逗号隔开，从前到后叠加
  + <shadow> 格式：<shadow> = inset? && <length>{2,4} && <color>?
    - 第一个<length>：水平方向的偏移，正数往右偏移
    - 第二个<length>：垂直方向的偏移，正数往下偏移
    - 第三个<length>：模糊半径（会向外扩散）
    - 第四个<length>：延伸距离（向四周扩散）
    - <color>：阴影的颜色，如果没有设置就跟随 color 属性的颜色
    - inset：外框阴影变成内框阴影
  + 阴影设置多个可以设置多个方向的阴影

25. text-shadow
  + 用法类似于 box-shadow(没有 inset 值， <length>{2,3})，用于给文字添加阴影，text-shadow 同样适用于 ::first-line, ::first-letter

26. box-sizing
  + box-sizing 用来设置盒子模型中宽高的行为，默认值是 content-box，是W3C标准盒子模型。border-box是IE(IE8以下)盒子模型

27. 水平居中
  + 内容（普通文本）居中：text-align: center;
  + 行内元素居中：text-align: center;
  + 行内替换元素（图片）居中：text-align: center;
  + 行内块级元素(display: inline-block)居中：text-align: center;
  + 块级元素居中：margin: 0 auto;
    - margin 水平居中原理：margin-left 和 margin-right 属性的默认值是0，块级元素是默认占据整行的，如果给块级元素设置了宽度但没有达到父元素的整行，这时剩下的空间不会被分配，当margin-left 或 margin-right 设置了 auto 值时，就会把宽度剩余的空间分配给margin，如果 margin-left 和 margin-right 都设置了auto，那么左右的margin 就会平分剩余的宽度，使盒子水平居中。但垂直方向的margin设置为 auto 不会居中。如果margin-top 和 margin-bottom 都设置为auto，那么它们的值都是0，所以垂直方向上不会居中。
    - margin 值为auto 对于不同类型的元素有不同的取值，都为以下两种取值之一
      1. 父元素剩余空间的值
        - 普通块级元素且设置了 width 时，margin-left 和 margin-right
      2. 0px
        - 普通块级元素没设置 width 时的 margin-left，margin-right
        - 元素的 margin-top，margin-bottom
        - 行内元素、浮动元素、position 为 absolute 或 fixed 的元素

28. css属性 background
  + background-image：用于设置元素的背景图片，会*盖在（不是覆盖）*background-color 上面。background-image 可以设置多张图片，但默认显示第一张，当第一张图片不可用时，才会显示后面的图片
    - background-image: url("../image/xxx1.jpg"), url("../image/xxx2.jpg");
    - *注意*：如果设置了背景图片后，元素没有具体的宽高，图片是显示不出来的
  + background-repeat：图片的平铺效果，默认值 repeat：水平和垂直方向都平铺；repeat-x：水平方向平铺；repeat-y：垂直方向平铺；no-repeat：图片不平铺；
  + background-size：设置背景图片的大小，
    - 默认值是 auto：以背景图本身大小显示；
    - cover：等比拉伸背景图，以完全覆盖铺满元素；
    - contain：对背景图片进行等比拉伸，但当图片拉伸到高度或宽度时就不会再拉伸了；
    - <percent>:百分比,可以设置两个值，分别是占据元素宽度和高度的百分比，只设置一个值是占元素宽度的百分比。background-size: 30% 50%; 背景图占元素宽度的30%，高度的50%；
    - <length>：具体的大小，比如100px
  + background-position：用于设置图片在水平、垂直方向上的具体位置
    - 设置具体值：background-position: 100px 100px; 水平方向偏移100px，垂直方向偏移100px。可以设置负值
    - 设置关键字：background-position: center center; 水平方向居中，垂直方向居中。水平方向的值：left，center，right；垂直方向的值：top，center，bottom
    - 如果只设置了一个值，那么另一个方向默认是 center。比如background-position: 100px; 等价于 background-position: 100px center;
  + background-attachment：可以设置以下三个值
    - scroll：背景图片跟随元素一起滚动（默认值）
    - local：背景图片跟随元素以及元素内容一起滚动
    - fixed：背景图片相对浏览器窗口固定
  + background：该属性是一系列背景相关属性的简写形式，常用格式是：image position/size repeat attachment color
    - background-size 属性可以省略，如果不省略必须紧跟在 background-position 后面
    - 其他属性可以省略，且顺序任意
    - 示例：background: url("./image/sprite.png") center center/150px 200px no-repeat #f00;
  + background-image 和 img 的选择
    - 利用 background-image 和 img 都能实现显示图片的需求
                                background-image      img
    性质                            css样式            HTML元素
    图片是否占用空间                  ×                 √
    浏览器右键直接查看地址            ×                  √
    支持 css sprite                  √                 ×
    更有可能被搜索引擎收录            ×                  √（结合alt属性）
    加载顺序                 等待html元素加载完后在加载   优先加载

    - 总结：
      1. img，作为网页内容的重要组成部分，比如广告图片，logo图片，文章配图，产品图片。
      2. background-image，可有可无，有，能让网页更美观，无，也不影响用户获取完整的网页内容信息

29. css Sprite：精灵图
  + 什么是css Sprite？
    - 这是一种css图像合成技术，将各种小图片合并到一张图片上，然后利用css的背景定位来显示对应的图片部分
  + css Sprite 的好处
    - 减少http请求次数，加快网页响应速度，减轻服务器压力
    - 减少图片总大小
    - 解决了图片命名的困扰，只需要针对一张集合的图片命名
  + Sprite 图片的制作
    - Photoshop
    - [https://www.toptal.com/developers/css/sprite-generator]

## 定位
  ### 标准流（normal flow）
  + 默认情况下，元素都是按照 normal flow（标准流，常规流，正常流，文档流[document flow]）进行排布
  + 排列方向：从左到右，从上到下
  + 默认情况下，不存在层叠现象
  + 在标准流中，可以使用margin 和 padding 对元素进行定位，其中 margin 还可以设置负值。比较明显的缺点：设置一个元素的margin 或 padding 会影响到标准流中其他元素的定位效果

  ### css 属性- position
  + 利用 position 可以对元素进行定位，常用的取值有4个
    - static：静态定位（默认值，元素按照 normal flow 布局，设置 left、top、right、bottom 没有作用）
    - relative：相对定位（相对元素本身在文档流中的位置，元素按照 normal flow 布局，可以通过设置 left、top、right、bottom 来定位，参照元素是自己原来的位置），元素还占据自己在标准流中的位置
      相对定位应用场景：在不影响其他元素位置的前提下，对当前元素位置进行微调
    - absolute：绝对定位（相对最近有定位（position的值为非 static）的祖先元素，如果没有找到有定位的父元素，则相对浏览器的视口定位）
      - 绝对定位的元素想要在定位参照元素中居中：只设置margin: 0 auto; 无效，还要加上 left: 0; right: 0; （同时设置宽度）（不设置宽度的话宽度为参照的定位元素的宽度，也可以认为是居中的）
    - fixed：固定定位（相对浏览器的视口定位）,元素会脱离标准流，元素不再占据自己在标准流中的位置，可以通过设置 left、top、right、bottom 来定位，当画布滚动时，元素固定不动
  
  + 绝对定位的使用技巧：position 值为 absolute 或 fixed 的元素
    - 对绝对定位的元素来说：
      1. 定位参照对象的宽度 = left + right + margin-left + margin-right + 绝对定位元素的实际占用宽度。可以利用这个公式让绝对定位元素相对参照元素水平居中，也可以占满相对定位元素的宽度
      2. 定位参照对象的高度 = top + bottom + margin-top + margin-bottom + 绝对定位元素的实际占用高度。可以利用这个公式让绝对定位元素相对参照元素垂直居中，也可以占满相对定位元素的高度
    

  ### 脱标元素的特点
    + 如何让元素脱离标准流：
      - position 为 fixed 或 absolute
      - 设置浮动
    + 特点： 
      - 可以随意设置宽度和高度（行内级非替换元素也可以设置宽高）
      - 不设置宽高时，宽高默认由内容决定（块级元素宽度也不会占据父元素的整行）
      - 不再受标准流约束
      - 不再给父元素汇报宽高数据
    + 脱标元素和display的关系
      - 脱标元素如果设置了display 的值，那么元素脱标后display 会发生变化，原 display 为 inline-table 会变成 table，
      - inline，inline-block，table-cell，table-caption，table-row，table-row-group，table-column，table-column-group，table-header-group，table-footer-group 这些值都会变为 display: block;
      - 其他值保持原来的值
      - 可以认为大部分脱标元素的display 都会变成 block， 但为什么宽度不会再占满父元素整行了呢？因为脱离标准流后就不在相对父元素，所有就会产生包裹内容的现象

  ### 元素的层叠
    + 父子关系的元素：子元素会层叠在父元素上
    + 兄弟关系的元素：
      - 都是非定位元素：不会出现层叠
      - 1个是定位元素1个是非定位元素：定位元素会层叠在非定位元素上
      - 2个都是定位元素：通过 z-index 来控制层叠顺序

30. css 属性 z-index
  + 该属性用来设置*定位元素*的层叠顺序（仅对定位元素有效），*对于 position 为 static 的元素，该属性无效*
  + 比较原则：
    - 如果是兄弟关系：z-index 值越大，层叠在越上面，z-index 值相等，写在后面的元素层叠在上面
    - 如果不是兄弟关系：各自元素从自己以及祖先元素中找出最近相邻的两个定位元素进行比较

### 浮动
  + 浮动的规则：
    - 元素一旦浮动后，会脱离标准流，朝着向左或向右的方向移动，直到自己的边界紧贴着包含块（一般是父元素）或者其他浮动元素的边界为止。定位元素会层叠在浮动元素上面
    - 浮动元素不能与*行内级内容*层叠，行内级内容将会被浮动元素推出去。比如行内级元素，inline-block元素，*块级元素的文字内容*（图文环绕就是根据该规则实现的）
    - 行内级元素、inline-block 元素浮动后，其顶部将与所在行的顶部对齐（只会左右移动，不会上下移动）
    - 如果元素是向左（右）浮动，浮动元素的左（右）边界不能超出包含块的左（右）边界
    - 浮动元素之间不能层叠，如果一个浮动元素已经在那个位置了，后浮动的元素将紧贴着前一个浮动元素
    - 浮动元素的顶端不能超过包含块的顶端，也不能超过之前所有浮动元素的顶端

  + 浮动的应用：
    - 常用场景：解决行内级元素、inline-block 元素的水平间隙问题
    - 布局：
      布局中存在的问题：在进行布局时，同一行摆放多个元素后，设置 margin-right 来让它们之间产生间距，那么最后一个元素设置的 margin-right 总是多余的
      解决方法：
        1. 每一行的最后一个元素，总是增加一个 class，通过类选择器去去除这个 margin-right
        2. 通过伪类选择器去除每一行最后一个元素的 margin-right。但可能存在浏览器不兼容的情况（IE8及以下不支持某些伪类）
        3. 加一个中间层，给中间层设置一个 margin-right 为*负*的多余的margin值。 .container 固定的宽度 > .wrap 设置负的margin-right > 水平排列的很多的item。
          原理：包含块的宽度 = 自己的宽度 + padding宽度 + border宽度 + margin宽度，由于包含块宽度固定，给中间层加一个负的margin-right就会使中间层的宽度多出这么多值，而item被包裹在中间层，所有那么最后一个元素多余的 margin-right 正好被中间层多出的这么多宽度抵消。

  + css 属性 clear
    - clear 的常用取值：
      1. left：要求元素的顶部低于之前生成的所有*左浮动*元素的底部
      2. right：要求元素的顶部低于之前生成的所有*右浮动*元素的底部
      3. both：要求元素的顶部低于之前生成的所有*浮动*元素的底部
      4. none：默认值
    - 该属性一般只用在非浮动元素上，可以让非浮动元素与浮动元素不层叠

  + 浮动存在的问题
    - 由于浮动元素脱离了标准流，变成了脱标元素，所以不再向父元素汇报高度，父元素计算总高度时，就不会计算浮动元素的高度，导致高度坍塌的问题
    - 解决父元素高度坍塌的过程叫做清除浮动
  
  + 清除浮动的方法
    - 给父元素设置固定高度，这种方法扩展性不好，不推荐
    - 在父元素最后增加一个空的块级元素，并且让它设置 clear: both。这种做法会增加很多无意义的空标签，维护麻烦，违反了结构与样式分离的原则，不推荐
    - 在父元素最后增加一个 <br> 标签：<br clear="all">（这个clear是br的属性）。这种做法会增加很多无意义的空标签，维护麻烦，违反了结构与样式分离的原则，不推荐
    - 给父元素增加::after伪元素，纯css样式解决，结果与样式分离（推荐）写法如下：
      .clear-fix::after{
        content: "";
        clear: both;
        display: block; //因为伪元素默认是行内级元素
        height: 0;  //兼容旧浏览器 
        visibility: hidden;  //兼容旧浏览器 
      }

      .clear-fix{
        *zoom: 1; //兼容IE6~7浏览器。zoom 是缩放的意思
      }
  
  + 定位方案对比
    定位方案          应用场景
    标准流            垂直布局
    绝对定位          层叠布局
    浮动              水平布局

### css 属性 transform
+ css transform 属性允许你旋转、缩放、倾斜或平移给定元素。transform 是形变的意思,形变之后元素可能会发生位移、变大，但形变的元素占据自己原来的位置。
+ *注意*：该属性对行内元素（inline element）无效，对块级元素，inline-block 元素有效
+ 常见的函数 transform function 有：
  - *平移*：translate(x, y)。
    可以只写一个值，一个值就表示水平方向的平移。除了可以设置具体的值，也可以设置百分比，设置百分比参照的是元素本身宽高
     eg：transform: translate(100px，50px); 表示水平向右移动100px；垂直向下移动50px

  - *缩放*：scale(x, y)。默认从中心向西周缩放，可以通过设置 transform-origin 来改变缩放的原点
    值个数：一个值时，设置x轴和y轴方向相同的缩放；两个值时，设置x和y轴方向的缩放
    值类型：数字：1：保持不变；2：放大一倍；0.5：缩小一半。   百分比：不支持
    eg：transform: scale(2，1); 表示水平方向放大两倍，垂直方向不变

  - *旋转*：rotate(deg)
    值个数：1个值，表示旋转的角度
    值类型：deg：旋转的角度；正数为顺时针，负数为逆时针
    旋转的原点可以通过 transform-origin 属性改变
    eg：transform: rotate(45deg); 表示顺时针方向旋转45度

  - *倾斜*：skew(deg, deg)
    值个数：1个值，表示x轴倾斜的角度；2个值：表示x轴和y轴上的倾斜
    值类型：deg：旋转的角度；正数为顺时针，负数为逆时针
    倾斜的原点可以通过 transform-origin 属性改变

+ transform-origin 属性：设置形变的原点
  - 一个值：设置x轴的原点
  - 两个值：设置x轴和y轴的原点
  - 必须是<length>，<percentage>或left、center、right、top、bottom关键字中的一个
    - <length>：从左上角开始计算
    - 百分比：参考元素本身大小


### css 属性 transition
+ transition 属性是 transition-property，transition-duration，transition-timing-function 和 transition-delay 的一个简写属性
+ transition-property：指定使用过度属性的名称
  - 可以写 all 表示所有可动画的属性，属性是否支持动画可查看文档
+ transition-duration：指定过渡动画所需的时间
  - 单位是可以是秒（s）或是毫秒（ms）
+ transition-timing-function：指定动画的变化曲线
  - 参考链接：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function]
+ transition-delay：指定过渡动画执行之前的等待时间

### css 属性 vertical-align
+ vertical-align 会影响*行内级元素*在一个*行盒*中垂直方向的位置
+ 思考：当一个div没有设置高度的时候，会不会有高度？
  - 没有内容，没有高度
  - 有内容，高度由内容撑起来，但是内容撑起来高度的本质是行高撑起了div的高度
+ 行高为什么可以撑起div的高度
  - 这是因为 line boxes 的存在，并且line-boxes有一个特性：包裹每行的 inline level
  - 而且其中文字是有行高的，必须将整个行高包裹进去，才算包裹这个 line-level
+ 那么，进一步思考：如果一个div中有图片，文字，inline-block，甚至他们设置了margin 这些属性呢
  - 行盒会把文字，图片，margin 都包裹在内

+ 元素默认是基线对齐的，对于行内块级（inline-block）元素，没有文本的情况下，它的基线就是margin-bottom的底部。有文本的情况下，基线在最后一行文字的基线。块级元素的基线在块级元素的底部的上面一点，因为要给文字留出一部分距离

+ vertical-align 的取值
  - baseline（默认值）：基线对齐
  - top：把行内级盒子的顶部和line boxes（行盒）顶部对齐
  - middle：行内级盒子的中心点与父盒基线加上 X height一半的线对齐
  - bottom：把行内级盒子的底部和line boxes底部对齐
  - <percentage>：把行内级盒子提升或者下降一段距离（距离相对于line-height计算\元素高度），0%意味着同baseline一样
  - <length>：把行内级盒子提升或下降一段距离，0cm意味着同baseline 一样

+ 图片居中方式，其中div有固定高度，高度比图片的高度高
  <div class="box">
    <img>
    我是一些文本
  </div>
  - 方式一：给div设置一个和高度相等的行高，同时设置font-size 为0；给图片设置 vertical-align: middle; 这种方式不好，如果div中有文字，由于设置了 font-size 为0，会显示不出文字
  - 方式二：给图片设置 position: relative; top: 50%; transform: translate(0, -50%); 推荐这种方式

### 颜色渐变
+ 背景颜色渐变：background: linear-gradient(角度，颜色1，颜色2)。
  - 角度决定了渐变的方向，角度为 0deg 是从下往上渐变
  - 颜色1决定了渐变开始的颜色
  - 颜色2决定了渐变结束的颜色

### css 高斯模糊效果
+ 通过css 属性 filter来设置
  - filter: blur(8px);
  - blur 是一个css函数，8px是模糊半径

### 元素隐藏方式
1. display: none;
2. visibility: hidden;
3. opacity: 0;


## CSS3
+ 目前并不存在真正意义上的css3，只是对某些 Module Level3 的统称
  - 关于某些 level3 是否已经成为标准，还需多查阅文档
  - 可以通过caniuse查看浏览器的兼容性问题


## flex 布局
+ flex 布局是目前 web 开发中使用最多的布局方案，目前在移动端使用特别多，现在PC端用的也越来越多了
+ 两个重要概念：
  - 开启了 flex 布局的元素叫 `flex container`
  - flex container 里面的*直接子元素*叫做 `flex items`
+ 设置 display 属性为 flex 或者 inline-flex 可以成为 flex container
  - flex：flex container 以 block-level 形式存在
  - inline-flex：flex container 以 inline-level 形式存在

+ 应用在 flex container 上的css属性
  - flex-flow：是 flex direction 和 flex wrap 的缩写属性
    1. 可以省略，顺序任意

  - flex-direction：flex items 默认都是沿着 main axis（主轴）从 main start 开始往 main end 方向排布。flex-direction 决定了 main axis 的方向，有4个取值：
    1. row：默认值，主轴方向从左到右
    2. row-reverse：主轴方向与 row 方向相反，方向从右到左
    3. column：主轴方向从上到下
    4. column-reverse：主轴方向与 column 方向相反，方向从下到上

  - flex-wrap：默认情况下，所有的 flex items 都会在同一行显示。flex-wrap 决定了 flex items 是单行还是多行
    1. nowrap：默认值，单行显示，父元素宽度不够时会将 flex items 的宽度压缩，使所有的 flex items 都能在父元素中一行显示
    2. wrap：多行显示
    3. wrap-reserve：多行显示（对比 wrap， cross start 与 cross end 相反。交叉轴方向翻转排列）

  - justify-content：决定了 flex items 在 main axis 上的对齐方式，有以下几个取值：
    1. flex-start：默认值，与main start 对齐
    2. flex-end：与 main end 对齐
    3. center：居中对齐
    4. space-between：flex items 之间距离相等，与 main start、main end 两端对齐
    5. space-evenly：flex items 之间距离相等，flex items 与 main start、main end 之间的距离等于 flex items 之间的距离
    6. space-around：flex items 之间距离相等，flex items 与 main start、main end 之间的距离等于 flex items 之间距离的一半

  - align-items：决定了flex items 在 cross axis 上的对齐方式，有以下几个取值
    1. normal：在弹性布局中，效果和 stretch 一样
    2. stretch：当 flex items 在 cross axis 方向的 size 为 auto 时，会自动拉伸至填充 flex container
    3. flex-start：与 cross start 对齐
    4. flex-end：与 cross end 对齐
    5. center：居中对齐
    6. baseline：与基准线对齐，flex 布局中基线是第一行文本的基线

  - align-content：决定了*多行 flex items*在 cross axis 上的对齐方式，用法与 justify-content 类似
    1. stretch：默认值，与 align-items 的 stretch 类似
    2. flex-start：与 cross start 对齐
    3. flex-end：与 cross end 对齐，但多行仍然是从 cross start 向 cross end 排列
    4. center：居中对齐
    5. space-between：flex-items 之间距离相等，与 cross start ， cross end 两端对齐
    6. space-evenly：flex-items 之间距离相等，与 cross start ， cross end 之间的距离等于flex items 之间的距离
    6. space-around：flex-items 之间距离相等，与 cross start ， cross end 之间的距离等于flex items 之间的距离的一半

+ 应用在 flex items 上的css属性
  - flex：该属性是 flex-grow | flex-shrink | flex-basis 属性的简写，flex 属性可以指定 1个、2个 或3个值
    1. 单值语法：值必须为以下其中之一
      - 一个无单位数，它会被当成 flex-grow 的值
      - 一个有效的宽度值，它会被当成 flex-basis 的值
      - 关键字：none，auto，initial
    2. 双值语法：第一个值必须是无单位数，并且会被当成 flex-grow 的值。第二个值必须为以下之一：
      - 一个无单位数，它会被当成 flex-shrink 的值
      - 一个有效的宽度值，它会被当成 flex-basis 的值
    3. 三值语法：
      - 第一个必须是无单位数值，它会被当成 flex-grow 的值
      - 第二个值必须是无单位数值，它会被当成 flex-shrink 的值
      - 第三个值必须是一个有效的宽度值，它会被当成 flex-basis 的值

  - order：决定了 flex items 的排布顺序
    1. 可以设置任意整数（整数、负数、0），值越小就越排在前面
    2. 默认值是 0

  - flex-grow：决定了 flex items 如何扩展
    1. 可以设置任意非负数字（正小数、正整数、0），默认值是 0 
    2. 当 flex container 在 main axis 上有剩余 size 时，flex-grow 属性才生效
    3. 如果所有的 flex items 的 flex-grow 总和(sum)超过1，每个 flex item 扩展的 size 为：
      - flex container 的剩余 size*flex-grow/sum
    4. 如果所有的 flex items 的 flex-grow 总和(sum)不超过1，每个 flex item 扩展的 size 为：
      - flex container 的剩余 size * flex-grow
    5. flex items 扩展后的最终 size 不过超过 max-width 和 max-height

  - flex-shrink：决定了 flex items 如何收缩
    1. 可以设置任意非负数字（正小数、正整数、0），默认值是 1
    2. 当 flex items 在 main axis 上超过 flex container 的 size 时，flex-shrink 属性才生效
    3. 如果所有的 flex items 的 flex-shrink 总和(sum)超过1，每个 flex item 收缩的 size 为：
      - flex items 超出 flex container 的 size * 收缩比例 / 所有 flex item 的收缩比例之和
    4. 如果所有的 flex items 的 flex-shrink 总和(sum)不超过1，每个 flex item 收缩的 size 为：
      - flex items 超出 flex container 的 size * sum * 收缩比例/所有 flex item 的收缩比例之和
      - 收缩比例 = flex-shrink * flex item 的 base size。 base size 就是 flex item 放入 flex container 之前的 size。
      - 这种情况下 flex items 有部分内容会超出 flex container
    5. flex items 收缩后的 size 不能小于 元素的 min-width 和 min-height

  - flex-basis：设置 flex items 在 main axis 方向上的 base size。可以设置以下值
    1. auto：默认值
    2. 具体的宽度数值

    - 决定 flex items 最终 base size 的因素，从优先级高到低：
      1. max-width、max-height、min-width、min-height
      2. flex-basis
      3. width、height
      4. 内容本身的 size

  - align-self：可以通过该属性覆盖 flex container 设置的 align-items
    1. auto：默认值，遵从flex container 的 align-items 设置
    2. stretch、flex-start、flex-end、center、baseline，效果和 align-items 一致

  
## 网络字体
### @font-face 可以让网页支持网络字体（Web Font），不再局限于系统自带的字体

+ 常见的字体种类：
  - TrueType字体：拓展名是 .ttf
  - OpenType字体：拓展名是 .ttf, .otf。建立在 TrueType 字体之上
  - Embedded OpenType字体：拓展名是 .eot  OpenType字体的压缩版
  - SVG字体：拓展名是 .svg, .svgz
  - Web开放字体：拓展名是 .woff ，建立在TrueType 字体之上

+ 但并不是所有浏览器都支持以上字体

+ 字体下载：[https://fonts.google.com]

+ @font-face 的使用
  <style>
    @font-face {
        /* 字体名称，可以随便起，但建议跟原字体名称一致 */
        font-family: "pipilei";
        /* 浏览器会加载每一个字体文件，直到找到它支持的字体 */
        src: url("fonts/mini_black.test-f"),
             url("fonts/mini_black.test-f");
      }

    div{
      font-family: "迷你简立黑";
      font-size: 50px;
    }
  </style>

+ 字体图标的好处：
  - 放大不会失真
  - 可以切换任意颜色
  - 用到很多个图标时，文件相对图片较小

### 关键帧动画
  + 之前可以使用 transition 来进行过渡动画，但是过渡动画只能控制首尾两个值
    - 从关键帧动画的角度相当于只定义了两帧的状态：第一帧和最后一帧
    - 如果我们希望可以有更多状态的变化，可以直接使用关键帧动画

  + 关键帧动画使用 @keyframe 来定义多个变化状态，并且使用 animation-name 来声明匹配
    1. 使用 @keyframes 创建一个规则
    2. @keyframes 中使用百分比定义各个阶段的样式
    3. 通过 animation 将动画添加到属性上

  + css animation 属性是 animation-name、animation-duration、animation-timing-function、animation-delay、animation-iteration-count、animation-direction、animation-fill-mode 和 animation-play-state 属性的一个简写形式
    - animation-name：指定执行哪一个关键帧动画
    - animation-duration：指定动画的持续时间
    - animation-timing-function：指定动画的变化曲线
    - animation-delay：指定延迟执行的时间
    - animation-iteration-count：指定动画执行的次数，执行 infinite 表示无限动画
    - animation-direction：指定动画执行的方向，常用值 normal 和 reverse
    - animation-fill-mode：执行动画最后保留哪一个值
      - none：回到没有执行动画的位置
      - forwards：动画最后一帧的位置
      - backwards：动画第一帧的位置
    - animation-play-state：指定动画运行或暂停（在 JavaScript 中使用，用于暂停动画）
      - play：执行动画
      - pause：暂停动画

    eg:
    .box:hover{
      animation: test 4s linear;
    }

    @keyframes test {
      0% {
        transform: translate(0,0);
      }
      25%{
        transform: translate(200px,0);
      }
      50%{
        transform: translate(200px,200px);
      }
      75%{
        transform: translate(0,200px);
      }
      100%{
        transform: translate(0,0);
      }
    }


### 3D动画
+ css 实现3D
  1. transform-style: preserve-3d，开启3d效果
  2. perspective: z轴距我们的距离，一般给父元素设置

+ JS 实现 3D 的库
  - three.js

### CSS知识补充
  + white-space：用于设置空白处理和换行规则
    - normal：默认值。合并所有连续的空白，允许单词超屏时自动换行
    - nowrap：合并所有连续的空白，不允许单词超屏时自动换行

  + text-overflow：通常用来设置文字溢出时的处理行为（处理那部分不可见的内容）
    - clip：溢出的内容直接裁剪掉（字符可能会显示不完整）
    - ellipsis：溢出的那行的结尾处用省略号表示
  + text-overflow 生效的前提时 overflow 不为 visible

  + 如果想让一个有固定宽度的元素永远只显示一行文字，并且溢出结尾处显示省略号，可以设置以下样式
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

  + 如果想让文字最多显示几行可以通过设置 line-clamp 属性，但这个属性的浏览器支持率很低，IE不支持该属性，其他浏览器需要加前缀
    - -webkit-line-clamp: 2; // 最多显示两行文字,并且超出部分显示省略号
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;