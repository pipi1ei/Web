## Emmet语法
1. 生成子代（>）和兄弟（+）元素
2. 生成多个元素（*）
3. 生成上一个层级的元素（^）
4. 分组:()
5. 属性：id属性：# ，类名：. 普通属性[]
6. 内容：{}，内容中有数字，用$代替
7. css相关用法：
  w100 = width：100px， 
  h200,p200,m200。 
  m20-30-40-50 = margin: 20px 30px 40px 50px
  fz20 = font-size: 20px
  db = display: block


## HTML 基础知识
1. 所有元素都有的属性：class,id,title。其中 title 的作用是给某个元素设置了 title 后，鼠标移到该元素上会显示 title 的值。

2. h 元素和 SEO 优化（搜索引擎优化）
  - h 元素有助于网站的 SEO（Search Engine Optimization）优化，可以促进关键词排名
  - 常见搜索引擎：百度，搜狗，360，google。搜索引擎会通过爬虫出去爬取网站数据，将网站数据存到数据库中，然后通过正则表达式去匹配 h 元素，将 h 元素中的内容放入数据库中。当用户在百度等搜索引擎搜索东西时，会优先把网页中 h 标签包裹的内容排在前面
  - 建议在网页中最多只有一个 h1 元素，乱用 h 标签不仅不会给网站带来好的权重，同时也有可能被搜索引擎认为作弊，最终导致 K 站

3. 字符实体：
  - 空格：&nbsp;
  - 小于：&lt;
  - 大于：&gt;
  - 和号(&)：&amp;

4. 常用图片格式：
  - .png：静态图片，支持透明
  - .jpg/.jpeg：静态图片，不支持透明
  - .gif：动态图片，静态图片，支持透明。gif 动态图片实际上式多张静态图片的合集，然后轮流播放，视频也是如此

5. 像素：像素（px）是图像显示的最小单位，每个像素只能表示一种颜色，计算机显示出来的图片都是由一堆像素组成的，组成图片的像素越多，图片越清晰

6. a 元素
  - target 属性：用来控制链接是在新标签页中打开还是在当前页打开，'\_self'：当前页打开链接；'\_blank'：新标签页中打开。target 属性还有其他的值：\_parent, \_top, 具体的 name。这几个属性必须是 a 元素在 iframe 标签中才生效。\_parent：在当前 a 元素所在的 iframe 父级打开链接，\_top：在最外层的 iframe 父级打开链接，相当于当前页面
  - a 元素和 base 元素结合使用：当多个 a 元素有几个相同的属性时，可以把这些相同的属性抽取到 base 元素中，base 元素写在 head 标签中：
    <a href='https://www.baidu.com' target='_blank'>百度一下</a>
    <a href='https://www.baidu.com?wd=adc' target='_blank'>百度搜索 abc</a>
    可以写成：

    <base href='https://www.baidu.com' target='_blank'>
    <a href=''>百度一下</a>
    <a href='?wd=adc'>百度搜索abc</a>

  - 伪链接：有时候点击 a 元素的时候不希望打开新的 URL，而是希望做些别的事情，这时可以使用伪链接
    <a href='#'></a> 或 <a href='javascript:'></a>

  - 锚点链接：将href的值设置为某个元素的id，点击a元素时将跳转到对应元素位置

7. a 元素的 href 并不都是打开新链接，也可以用于下载一些资源，也可以发送邮件：href='mailto:805396880@qq.com'

8. 标签语义化：选择标签的时候要尽量让每一个标签都有正确的语义。语义化的好处：1. 方便代码维护， 2. 减少开发者之间的沟通成本，3.让搜索引擎能够正确识别出重要信息

9. 定义列表dl：直接子元素只能是 dt、dd 
    dt（definition term）：列表中每一项的项目名
    dd（definition description）：列表中每一项的具体描述，是对dt的描述、解释、补充
    一个dt 后面一般紧跟着一个或多个dd。dt与dd是兄弟关系。dt，dd常见的组合：1.事物的名称，事物的描述。2. 问题，答案。3.类别名，归属于这类的各种事物

    *注意*：ol，ul的直接子元素只能是 li

    列表相关的css属性有4个：list-style-type, list-style-image, list-style-position, list-style。他们都可以继承，所以设置给ol，ul，默认也会应用到li元素
    list-style-type：设置li前面标记的样式
    list-style-image：设置li前面标记的图片
    list-style-position：设置li前面标记的位置：inside，outside

10. 表格元素：table
  其他子元素：
    tbody：表格的主体
    caption：表格的标题
    thead：表格的头部
    th：表格的表头单元格
    tfoot：表格的页脚
  示例：
    <table>
      <caption>我是表格标题</caption>
      <thead>
        <tr>
          <th></th>
          ...
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          ...
        </tr>
        ...
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          ...
        </tr>
      </tfoot>
    </table>

  表格的合并：合并要领：合并的方向是向右、向下
   - 合并列：在 td 中添加属性 colspan='2' 表示将两列合并，然后删除合并后的那个单元格
   - 合并行：在 td 中添加属性 rowspan='2' 表示将两行合并，然后删除合并后的那个单元格
   - 如果 colspan 和 rowspan 都设置则合并行和列

11. 表单元素
  常用元素： 
    form：表单，一般情况下，其他表单元素都是它的后代元素
    input：单行文本输入框，单选框(type='radio'，name属性值相同)，复选框(type='checkbox'，name属性值相同)，按钮(type='button')等元素
    textarea：多行文本框
    select，option：下拉多选框
    button：按钮
    label：表单元素的标题
    fieldset：表单的元素组--详情见表单元素.html
    legend：fieldset的标题--详情见表单元素.htmlreset

  - 重置按钮：<input type="reset">
      前提：1.type必须是 reset，2.要重置的内容必须被一个form元素包裹

  - input常用属性
    1. type：submit：提交表单数据给服务器，file：文件上传
    2. maxlength：允许输入的最大字数
    3. placeholder：占位文字
    4. readonly：只读
    5. disabled：禁用
    6. checked：默认被选中
    7. autofocus：当页面加载时自动聚焦
    8. name：名字，在提交表单时会把name的值作为参数名拼接到url提交到服务器
    9. value：值，在提交表单时会把value的值作为参数值拼接到url提交到服务器
    10. form：设置所属的form元素（填写form元素的id），一旦设置了此属性，input元素即使不在form元素内部，它的数据也能提交给服务器

  - textarea常用属性
    1. cols：显示的列数
    2. rows：显示的行数
    3. resize：缩放的css设置。none：禁止缩放，horizontal：水平方向可以缩放，vertical：垂直方向可以缩放，both：水平垂直方向都可以缩放（默认值）

  - 布尔属性
    布尔属性可以没有属性值，写上属性名就代表使用这个属性，常见的布尔属性有：disabled、checked（用在单选框和多选框）、readonly、multiple（在select元素上添加这个属性，表示下拉框可以选中多个值）、autofocus、selected（option元素上加这个属性，下拉框默认选中的值）

  - select : 设置 multiple 多选时，可以设置 size 属性显示几个选项

  - form的常用属性
    1. action：用于提交表单数据的url
    2. method：请求方式（get/post），默认是get
      get请求和post请求区别：
        + get：在请求url后面以?的形式拼接上请求参数，多个参数用&符号隔开，由于浏览器和服务器对url长度有限制，因此url后面携带的参数是有限制的，通常不超过1kb
        + post：发给服务器的参数全部放在请求体中，而且没有长度限制
    3. target：在什么地方打开url，与a元素的target属性类似
    4. enctype：规定了在向服务器发送表单数据之前如何对数据进行编码
      取值有三种：application/x-www-form-urlencoded：默认的编码方式
        multipart/form-data：*文件上传时必须为这个值，并且method必须为post*
        text/plain：普通文本传输
    5. accept-charset：规定表单提交时使用的字符编码（默认值UNKNOWN，和文档相同的编码）

  - 表单提交的两种方式：
    1. 传统的表单提交：
      1. 将所有的input用form包裹
      2. form元素设置action（服务器地址）
      3. 必须有一个input或button的type为submit，点击submit自动将所有的数据提交给服务器
      弊端：
        - 会进行页面的跳转（意味着服务器必须提交将一个页面写好返回给前端，前端直接展示这个页面（服务端渲染）），后端渲染的好处：利于seo优化，提高首屏的渲染速度
        - 不方便表单数据的验证

    2. 前后端分离：
      1. 通过js获取到所有的表单数据
      2. 通过正则表达式进行表单数据的验证
      3. 发送ajax请求，服务器会返回数据，前端解析数据并且渲染（前端渲染和前端路由）

12. img元素
  - <img> 是一个可替换元素。它的 display 属性的默认值是 inline，但是它的默认分辨率是由被嵌入的图片的原始宽高来确定的，使得它就像 inline-block 一样。你可以为 <img> 设置 border/border-radius、padding/margin、width、height 等等的 CSS 属性。
  - <img> 没有基线（baseline），这意味着，当在一个行内格式的上下文（an inline formatting context）中使用 vertical-align: baseline 时，图像的底部将会与容器的文字基线对齐。


## HTML5
+ html5是定义HTML标准的最新版本，该术语通过两个不同的概念来表现：
  - 狭义的HTML5说的是HTML5新的元素和属性
  - 广义的HTML5说的是HTML5的新标准，包括新的HTML元素，css新特性和JavaScript

### 语义化元素
  + 在HTML5之前，我们的网站分布层级通常包括：header、nav、main、footer

  + HTML5新增了语义化的元素：
    - <header>：头部元素
    - <nav>：导航元素
    - <section>：定义文档某个区域的元素
    - <article>：内容元素
    - <aside>：侧边栏元素
    - <footer>：尾部元素

  + 媒体元素：HTML5 增加了对媒体类型的支持（在HTML5之前是通过flash或者其他插件实现的）
    - <video>：用于在HTML 或者 XHTML 文档中嵌入媒体播放器，用于支持文档内的视频播放 。video 元素常见属性：
      1. src：媒体的来源
      2. controls：增加控制工具栏
      3. autoplay：自动播放，但存在兼容性问题
      4. muted：静音，增加后静音并且自动播放会生效
      5. loop：循环播放

    - <audio>：用于在文档中表示音频内容，常见属性：
      1. src：媒体的来源
      2. controls：增加控制工具栏
      3. autoplay：自动播放，但存在兼容性问题
      4. muted：静音
      5. loop：循环播放

    - <source>元素：video 和 audio 标签的子元素，如果存在兼容性问题（浏览器不支持某些格式的视频），可以将多个视频格式的的数据源放到<source> 中，通过 src 属性指定数据的来源。source 是单标签

  + HTML5 对表单元素的扩展
    - placeholder：输入框的占位文字
    - multiple：多个值
    - autofocus：页面加载时自动聚焦
    对input的type值也有很多扩展：
      - date：日期，用户可以选择日期
      - time：时间，用户可以选择时间
      - number：数字,要求用户只能输入数字
      - tel：电话
      - color：颜色，用户可以选择颜色
      - email：邮箱，要求用户输入的内容中必须有 @ 符号
      - 等等...
    
