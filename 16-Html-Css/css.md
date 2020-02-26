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
    - text-transform：用于设置文字大小写转换。capitalize：首字母大写；uppercase：全部转成大写；lowercase：全部转成小写；none：没有任何影响
    - text-indent：设置第一行内容的缩进。一般使用 em 作为单位，1 个 em 表示相对自己一个文字大小。如果 font-size 单位是 em，则相对他的父级的文字大小
    - text-align：设置元素*内容*在元素中的水平对齐方式。left：左对齐；right：右对齐；center：中间对齐；justify：两端对齐。块级元素无法居中对齐，因为块级元素默认独占一行，即使设置了宽度也是独占一行。所有会默认认为块级元素已经是居中对齐的。justify 对最后一行无效，想要最后一行为 justify，可以设置 text-align-last: justify

  + 字体属性：

    - font-size：设置字体大小，可以设置为百分百，相对于父元素文本的大小，和 em 类似。小知识：谷歌浏览器最小字体为：12px
    - font-family：设置字体名称。可以设置多个，采取就近原则设置字体，如果都不支持则使用操作系统默认的字体。如果在开发中希望中英文使用不同的字体，建议将英文字体放在前面，中文字体放在后面
    - font-style：设置文字常规、斜体显示。normal：常规显示；italic：用字体的斜体显示（使用该方式，文本字体必须是支持斜体的）；oblique：文字倾斜显示
    - font-variant：可以影响小写字母的显示形式。normal：常规显示；small-caps：将小写字母替换为缩小过的大写字母（几乎用户到）
    - font 缩写属性：font 是一个缩写属性，可以只写一个 font 来设置多个值：font: font-style font-variant font-weight font-size/line-height font-family
      font: italic small-caps 700 20px/40px "微软雅黑"
      font-style font-variant font-weight 顺序可以任意调换，也可以省略。/line-height 也可以省略，如果不省略必须跟在 font-size 后面。font-size，font-family 不可以省略也不可以调换顺序

  + line-height：用于设置文本的最小行高
    - 行高可以简单理解为一行文字所占的高度
    - 行高的严格定义是：两行文字基线（baseline）之间的间距。基线可以理解为四线本中的第三条线。第一条为顶线，第二条为中线，第三条为底线。两行文本底线与顶线之间的距离为行距[图片]
    - height 与 line-height 的区别：height 是元素整体的高度，line-height 是一行文字所占的高度。line-height 可以让一行文本垂直居中。原理：行距会在文本上下等分

11. css 选择器：

  - 属性选择器：[title]{color:red}：选择含有 title 属性的元素 ; [title='div']{} :选择 title 属性并且值为 div 的元素；[title|='one']：选择 title 属性值恰好等于 one 或以 one 开头且后面紧跟着连字符- 的元素。[title~='one']：选择包含单词 one 的元素，one 与其他单词之间必须用空格隔开，效果与类选择器一样
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
    - 目标伪类：:target
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
      - first-of-type： 等同于:nth-of-type(1)
      - last-of-type;：等同于:nth-last-of-type(1)
      - :only-child：是父元素中的唯一子元素（父元素下只有一个子元素）
      - only-of-type：是父元素中的唯一的这种类型的子元素
      - :root：根元素，就是 HTML 元素
      - :empty：选中元素内容为空的元素。
        <div>
            <div></div>  // 该元素会被选中
            <p>我是段落</p>
        <div>
    - 否定伪类：not()
      格式：not(x), x 是一个简单选择器：元素选择器，通用选择器，属性选择器，类选择器，id 选择器，伪类（除否定伪类）
      not(div){color: red}：除了 div 之外的全部元素前景色未红色

  + 伪元素：伪元素可以看成行内元素
    常见的伪元素：
    :first-line, ::first-line： 第一行，（两种写法，开发中一般写两个冒号，为了和伪类区分）。只有字体属性、颜色属性、背景属性可以应用在::first-line 上
    ::first-letter：选中第一个字母，只有字体属性、颜色属性、背景属性、margin 属性、padding 属性、border 属性可以应用在::first-letter 上
    ::before：content 属性不能省略
    ::after：content 属性不能省略

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
  一个元素如果没有设置某个属性的值，就会跟随父元素的值，并不是所有属性都可以继承的，不能继承的属性，一般可以使用 inherit 值强制继承，浏览器开发者工具也会标识出哪些样式是继承过来的
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
  行内级元素（包括 inline-block 元素）的代码之间如果有空格，会被解析显示为空格
  目前建议的解决方法：
    1. 代码之间不要留空格（这种方法不好）
    2. 注释掉空格（也不好）
    3. 设置父元素的 font-size 为 0，然后在元素中重新设置自己需要的 font-size，此方法 Safari 不适用（也不好）
    4. 给元素加 float。（推荐使用这个方案）

  注意：
    1. 块级元素，inline-block 元素一般情况下，可以包含其他任何元素（比如块级元素，行内级元素，inline-block 元素）
    2. 行内元素（span、strong、a）一般情况下只包含行内级元素，里面不要嵌套块级元素

21. margin
  + 上下 margin 的传递（父子关系）
    - margin-top 的传递：如果块级元素的顶部线和父元素的顶部线重叠，那么给子元素设置 margin-top: 20px; 会作用到父元素上，相当于父元素往下移动了 20px
    - margin-bottom 的传递：如果块级元素的底部线和父元素的底部线重叠，并且父元素的高度是 auto，那个这个块级元素的 margin-bottom 会传递到父元素
  + 如何防止出现传递问题？
    - 给父元素设置padding-top/padding-bottom
    - 给父元素设置border
    - 触发BFC：设置 overflow 为 auto或 hidden（推荐这种方式）
  + 建议：
    - margin 一般是用来设置兄弟元素之间的间距
    - padding 一般是用来设置父子之间的间距
    
  + 上下 margin 的折叠（兄弟关系）
    - 垂直方向上相邻的两个 margin（margin-top、margin-bottom）有可能合并为1个margin，这种现象叫 collapse（折叠）
    - 水平方向上的 margin（margin-left、margin-right）是永远不会 collapse
  + 如何防止 margin collapse 
    - 只给其中一个元素设置margin