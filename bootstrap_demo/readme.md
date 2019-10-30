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
6. css类型序选择器: E:first-of-type: 通过E找到父元素，然后找到父元素当中索引的E类型的子元素，再                                     找到第一个E元素
                   E:last-of-type: 找到最后一个
                   E:nth-of-type: 找到第几个
                   E:nth-last-of-type: 倒数第几个
7. margin: 0 auto 使用场景：
8. 元素添加绝对定位或固定定位后如果不设置宽度，宽度将变为内容的宽度，不会默认占满整行
