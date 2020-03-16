### 常用设备分类
1. 超小屏幕（移动设备）：768px以下；
2. 小屏设备：768px-992px;
3. 中屏设备：992px-1200px；
4. 大屏设备：1200px以上

### bootstrap 常用类
1. container：响应式容器:利用媒体查询，宽度根据设备而定,左右15px的内边距
2. container-fluid: 流式容器，宽度100%,左右15px内边距
3. row：行，左右-15px外边距，可以清除父容器左右15px的内边距
4. col-*-*：列
    第一个参数：lg：大屏及以上生效，md：中屏及以上生效，sm：小屏及以上生效，xs：超小屏及以上生效
    第二个参数：1-12：站一行的12分之几
5. col-xs-offset-*：偏移，往右偏移几等份
6. col-xs-push-*：往右位移几等份
  col-xs-pull-*：往左位移几等份
7. 响应式工具类：
    .visible-xs-*：只在超小屏可见，其他屏幕隐藏
    .visible-sm-*：只在小屏可见，其他屏幕隐藏
    .visible-md-*：只在中屏可见，其他屏幕隐藏
    .visible-lg-*：只在大屏可见，其他屏幕隐藏

    .hidden-xs：只在超小屏隐藏，其他屏幕可见
    .hidden-sm：只在小屏隐藏，其他屏幕可见
    .hidden-md：只在中屏隐藏，其他屏幕可见
    .hidden-lg：只在大屏隐藏，其他屏幕可见
8. pull-left:左浮动
   pull-right: 右浮动
9. text-left: 文字左对齐
   text-right: 文字右对齐
   text-center: 文字居中对齐

### 不熟悉的知识点
1. css + 选择器：先找到选择器的元素，然后找这个元素的紧邻的下一个元素，给下一个元素添加样式。
2. css ~ 选择器：先找到选择器的元素，然后找到这个元素后面所有同级元素，给所有的同级元素添加样式。
3. 自定义字体图标
4. JQuery innerWidth: 内容和内边距的宽度
          outerWidth: 内容和内边距和边框的宽度
          outerWidth(true): 内容和内边距、边框、外边距的宽度
5. css box-shadow 
6. css类型序选择器: E:first-of-type: 通过E找到父元素，然后找到父元素当中索引的E类型的子元素，再找到第一个E元素
                   E:last-of-type: 找到最后一个
                   E:nth-of-type: 找到第几个
                   E:nth-last-of-type: 倒数第几个
7. margin: 0 auto 使用场景：
8. 元素添加绝对定位或固定定位后如果不设置宽度，宽度将变为内容的宽度，不会默认占满整行


### bootstrap 定制
1. 下载bootstrap源码，修改less文件重新编译生成css文件，引入重新编译后的css文件
2. 线上定制方式，在bootstrap官网修改，然后点击“编译并下载按钮”



### 排版
+ 标题：  
  - HTML 中的所有标题标签，<h1> 到 <h6> 均可使用。另外，还提供了 .h1 到 .h6 类，为的是给内联（inline）属性的文本赋予标题的样式。
  - 在标题内还可以包含 <small> 标签或赋予 .small 类的元素，可以用来标记副标题。

+ 页面主体：
  - Bootstrap 将全局 font-size 设置为 14px，line-height 设置为 1.428。这些属性直接赋予 <body> 元素和所有段落元素。另外，<p> （段落）元素还被设置了等于 1/2 行高（即 10px）的底部外边距（margin）。

+ 中心内容：
  - 通过添加 .lead 类可以让段落突出显示。

+ 内联文本元素
  - 使用 <mark> 元素给一段文本添加高亮效果
  - 使用 <del> 元素标识删除的文本
  - 使用 <s> 元素标识没用的文本，效果看起来和 <del> 一样
  - 使用 <ins> 元素标识额外插入的文本，文本会添加下划线
  - 使用 <u> 元素也可以给文本添加下划线
  - 使用 <small> 元素，其中的文本会被设置为父容器字体大小的 85%

+ 对齐
  - 使用类 `text-left` 可以让文本左对齐
  - 使用类 `text-center` 可以让文本居中对齐
  - 使用类 `text-right` 可以让文本右对齐
  - 使用类 `text-justify` 可以让文本两端对齐
  - 使用类 `text-nowrap` 可以让文本不换行

+ 改变大小写
  - 使用类 `text-lowercase` 可以让文本以小写字母形式展示
  - 使用类 `text-uppercase` 可以让文本以大写字母形式展示
  - 使用类 `text-capitalize` 可以让单词首字母大写

+ 缩略语
  - 当鼠标悬停在缩写和缩写词上时就会显示完整内容，Bootstrap 实现了对 HTML 的 <abbr> 元素的增强样式。缩略语元素带有 title 属性，外观表现为带有较浅的虚线框，鼠标移至上面时会变成带有“问号”的指针。如想看完整的内容可把鼠标悬停在缩略语上（对使用辅助技术的用户也可见）, 但需要包含 title 属性。
  - 基本缩略语：<abbr>
  - 首字母缩略语：为缩略语添加 .initialism 类，可以让 font-size 变得稍微小些。
    eg: <abbr title="HyperText Markup Language" class="initialism">HTML</abbr>

+ 引用：
  - 默认样式的引用：将任何 HTML 元素包裹在 <blockquote> 中即可表现为引用样式。对于直接引用，我们建议用 <p> 标签。
  - 多种引用样式：对于标准样式的 <blockquote>，可以通过几个简单的变体就能改变风格和内容。
    1. 命名来源：添加 <footer> 用于标明引用来源。来源的名称可以包裹进 <cite>标签中。
      ```html
      <blockquote>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
      </blockquote>
      ```
    2. 另一种展示风格：通过给 <blockquote> 赋予 .blockquote-reverse 类可以让引用呈现内容右对齐的效果。

+ 列表：
  - 无样式列表：给<ul>、<ol> 添加类 `list-unstyled` 可以移除列表默认样式
  - 内联列表：给<ul>、<ol> 添加类 `list-inlin` 可以让列表元素放置于同一行
  - 给 <dl> 列表添加类 `dl-horizontal` 可以让 <dl> 内的短语及其描述排在一行。开始是像 <dl> 的默认样式堆叠在一起，随着导航条逐渐展开而排列在一行。


### 表格
+ 基本表格：为任意 <table> 标签添加 `.table` 类可以为其赋予基本的样式 — 少量的内补（padding）和水平方向的分隔线
+ 条纹状表格：通过给 <table> 添加 `.table-striped` 类可以给 <tbody> 之内的每一行增加斑马条纹样式。条纹状表格是依赖 :nth-child CSS 选择器实现的，而这一功能不被 IE8 支持。
+ 带边框的表格：给<table>添加 `.table-bordered` 类为表格和其中的每个单元格增加边框。
+ 鼠标悬停：通过给 <table> 添加 `.table-hover` 类可以让 <tbody> 中的每一行对鼠标悬停状态作出响应。
+ 紧缩表格：通过给 <table> 添加 `.table-condensed` 类可以让表格更加紧凑，单元格中的内补（padding）均会减半。
+ 响应式表格：将任何 .table 元素包裹在 .table-responsive 元素内，即可创建响应式表格，其会在小屏幕设备上（小于768px）水平滚动。当屏幕大于 768px 宽度时，水平滚动条消失。

+ 状态类：
  - active：鼠标悬停在行或单元格上时所设置的颜色
  - success：标识成功或积极的动作
  - info：	标识普通的提示信息或动作
  - warning：	标识警告或需要用户注意
  - danger：标识危险或潜在的带来负面影响的动作

### Firefox 和 fieldset 元素
Firefox 浏览器对 fieldset 元素设置了一些影响 width 属性的样式，导致响应式表格出现问题。可以使用下面提供的针对 Firefox 的 hack 代码解决，但是以下代码并未集成在 Bootstrap 中：
```css
@-moz-document url-prefix() {
  fieldset { display: table-cell; }
}
```

### 表单
+ 基本实例：单独的表单控件会被自动赋予一些全局样式。所有设置了 .form-control 类的 <input>、<textarea> 和 <select> 元素都将被默认设置宽度属性为 width: 100%;。 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列。
  ```html
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div class="form-group">
      <label for="exampleInputFile">File input</label>
      <input type="file" id="exampleInputFile">
      <p class="help-block">Example block-level help text here.</p>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox"> Check me out
      </label>
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
  </form>
  ```
+ 内联表单：
  - 为 <form> 元素添加 .form-inline 类可使其内容左对齐并且表现为 inline-block 级别的控件。只适用于视口（viewport）至少在 768px 宽度时（视口宽度再小的话就会使表单折叠）。

+  一定要添加 label 标签，如果没用添加，屏幕阅读器将无法正确识别。可以给 <label> 标签设置类 `.sr-only` 将其隐藏

+ 水平排列的表单：
  - 通过为表单添加 .form-horizontal 类，并联合使用 Bootstrap 预置的栅格类，可以将 label 标签和控件组水平并排布局。这样做将改变 .form-group 的行为，使其表现为栅格系统中的行（row），因此就无需再额外添加 .row 了。
  ```html
  <form class="form-horizontal">
    <div class="form-group">
      <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <div class="checkbox">
          <label>
            <input type="checkbox"> Remember me
          </label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default">Sign in</button>
      </div>
    </div>
  </form>
  ```

+ 内联单选和多选框
  - 通过将 .checkbox-inline 或 .radio-inline 类应用到一系列的多选框（checkbox）或单选框（radio）控件上，可以使这些控件排列在一行
  ```html
  <label class="checkbox-inline">
    <input type="checkbox" id="inlineCheckbox1" value="option1"> 1
  </label>
  <label class="checkbox-inline">
    <input type="checkbox" id="inlineCheckbox2" value="option2"> 2
  </label>

  <label class="radio-inline">
    <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
  </label>
  <label class="radio-inline">
    <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
  </label>
  ```

+ 静态控件：如果需要在表单中将一行纯文本和 label 元素放置于同一行，为 <p> 元素添加 .form-control-static 类即可。
+ 被禁用的 fieldset：为<fieldset> 设置 disabled 属性,可以禁用 <fieldset> 中包含的所有控件。但 a标签的链接功能不受影响，IE11及以下浏览器中的 <fieldset> 元素并不完全支持 disabled 属性，建议通过 js 代买来禁用 <fieldset>


### 按钮
+ 为 <a>、<button> 或 <input> 元素添加按钮类（button class）即可使用 Bootstrap 提供的样式。
  ```html
  <a class="btn btn-default" href="#" role="button">Link</a>
  <button class="btn btn-default" type="submit">Button</button>
  <input class="btn btn-default" type="button" value="Input">
  <input class="btn btn-default" type="submit" value="Submit">
  ```
+ 注意
  1. 虽然按钮类可以应用到 <a> 和 <button> 元素上，但是，导航和导航条组件只支持 <button> 元素。
  2. 如果 <a> 元素被作为按钮使用 -- 并用于在当前页面触发某些功能 -- 而不是用于链接其他页面或链接当前页面中的其他部分，那么，务必为其设置 role="button" 属性。
  3. 跨浏览器展现：强烈建议尽可能使用 <button> 元素来获得在各个浏览器上获得相匹配的绘制效果。在 Firefox < 30 的版本中使用 input 元素创建的按钮设置的 line-height 属性无效

+ 按钮样式
  - 默认样式：设置class 为 `btn btn-default`
  - 首选项样式：设置class 为 `btn btn-primary`
  - 成功样式：设置class 为 `btn btn-success`
  - 一般信息样式：设置class 为 `btn btn-info`
  - 警告信息样式：设置class 为 `btn btn-warning`
  - 危险信息样式：设置class 为 `btn btn-danger`
  - 链接信息样式：设置class 为 `btn btn-link`

+ 按钮尺寸：
  - 大按钮：给按钮设置类 `btn-lg`
  - 小按钮：给按钮设置类 `btn-sm`
  - 超小按钮：给按钮设置类 `btn-xs`

+ 通过给按钮添加 .btn-block 类可以将其拉伸至父元素100%的宽度，而且按钮也变为了块级（block）元素。

+ 跨浏览器兼容性：如果为 <button> 元素添加 disabled 属性，Internet Explorer 9 及更低版本的浏览器将会把按钮中的文本绘制为灰色，并带有恶心的阴影，目前我们还没有解决办法。


### 图片
+ 在 Bootstrap 版本 3 中，通过为图片添加 .img-responsive 类可以让图片支持响应式布局。其实质是为图片设置了 max-width: 100%;、 height: auto; 和 display: block; 属性，从而让图片在其父元素中更好的缩放。
+ 如果想让图片水平居中请添加 `.center-block` 类
+ 注意：IE8中不支持圆角属性


### 辅助类
+ 关闭按钮：通过使用一个象征关闭的图标，可以让模态框和警告框消失。
  ```html
  <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  ```

+ 三角符号：使用三角符号可以指示某个元素具有下拉菜单的功能
  ```html
  <span class="caret"></span>
  ```

+ 快速浮动：
  - 左浮动：使用类 `pull-left`
  - 右浮动：使用类 `pull-right`
+ 清除浮动：通过为父元素添加 .clearfix 类可以很容易地清除浮动

+ 让内容可居中：使用类 `center-block`

+ 显示或隐藏：
  显示：使用类 `show`
  隐藏：使用类 `hidden`

+ 屏幕阅读器和键盘导航：.sr-only 类可以对屏幕阅读器以外的设备隐藏内容。.sr-only 和 .sr-only-focusable 联合使用的话可以在元素有焦点的时候再次显示出来（例如，使用键盘导航的用户）。对于遵循 可访问性的最佳实践 很有必要。这个类也可以作为 mixin 使用。

+ 图片替换：使用 .text-hide 类或对应的 mixin 可以用来将元素的文本内容替换为一张背景图。


### 响应式工具