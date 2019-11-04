### 模拟苏宁页面，使用less + rem 布局实现

### 在浏览器中使用less
1. 和css引入一样，引入less文件，添加一个属性 type="text/less"：<link rel="stylesheet" type="text/less" href="less/test.less" />
2. 在less引入后面引入less.js 插件: <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.10.0-beta/less.min.js"></script>
3. less.js 会把less的内容加载过来，解析成css字符串
4. 本质在浏览器运行的还是css
5. 目前我在vscode中以file形式打开html文件会出现ajax请求跨域的问题，需使用 golive 打开html文件

### less适配
// length(@deviceWidthList): less 内置函数，获取数组长度
// extract(@deviceWidthList,1): 获取数组的值，数组默认下班为1
// when() : 类似if, 满足这个条件 
.adapterFun(@index:1) when (@index<=length(@deviceWidthList)){
    @media (min-width: extract(@deviceWidthList,@index)) {
        html{
            font-size: extract(@deviceWidthList,@index)/@psdWidth*@baseSize;
        }
    }

    //自调用,但会造成死循环，使用when 添加终止条件
    .adapterFun(@index+1);
}


### 移动端适配方案
1. 伸缩容器适配 flex
2. 流式布局适配 百分比
3. 响应式布局 媒体查询
4. rem适配方式 rem单位，用在内容的宽高自适应 可以结合流式布局和伸缩布局做移动端的整体适配


### zepto.js
zepto: 轻量级的js库，类似于jquery，与jQuery有类似的api，更适用于移动端开发
中文文档：https://www.html.cn/doc/zeptojs_api/