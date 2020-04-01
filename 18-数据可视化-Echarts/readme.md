### 屏幕适配方案
+ 设计稿是1920px
  1. flexible.js 把屏幕分成 24 等份
  2. cssrem插件的基准值是 80px
    - 插件-配置按钮-配置扩展设置-Root Font Size 里面设置-重启 vscode 

### 基础设置
+ body 设置背景图，缩放为 100% ， 行高1.15
+ css 初始化


## EChart 介绍
### 常见的数据可视化库：
  + D3.js: 目前 web 端评价最高的 JavaScript 可视化工具库
  + ECharts.js：百度出品的一个开源的 JavaScript 数据可视化库。可以流畅的运行在PC和移动设备上，兼容当前绝大多数浏览器（IE8/9/10/11，Chrome，Firefox，Safari），底层依赖矢量图形库 ZRender，提供直观、交互丰富、可高度个性化丁之的数据可视化库
  + HighCharts.js：国外前端数据可视化库，非商用免费，被许多国外大公司使用
  + AntV：蚂蚁金服全新一代数据可视化解决方案
  + HighCharts 和 ECharts 就像是 Office 和 WPS 的关系

### ECharts 使用步骤
1. 下载并引入 echarts.js 文件
2. 准备一个具有大小的 DOM 容器（必须有宽度和高度）
3. 初始化 echarts 实例对象
4. 指定配置项和数据（option）
5. 将配置项设置给echarts实例对象

### Echarts 基础配置
+ series：系列列表，每个系列通过 type 决定自己的图标类型：指定什么类型的图表，可以多个图表重叠
  - stack： 数据堆叠：两个类目轴上系列配置相同的 stack 值后，后一个系列的值会在前一个系列的值上相加

+ xAxis：直角坐标系中的 x 轴
  - type: 'category': x轴的类型，category为类目轴，value为数值轴，time为时间轴，log为对数轴
  - boundaryGap：是否让我们的线条和坐标轴有间隙
+ yAxis：直角坐标系中的 y 轴
+ grid：直角坐标系和绘图网格:可以控制线性图、柱状图的图表大小
  - left: '3%',:grid 距离 dom 容器左边的距离
  - right: '10%',grid 距离 dom 容器右边的距离
  - bottom: '5%',grid 距离 dom 容器下边的距离
  - containLabel: true 是否显示坐标系上的刻度
+ title：标题组件
+ tooltip：提示框组件
+ toolbox：工具箱组件，可以另存为图片等功能
+ legend：图例组件
  - 如果series 里面有 name，那么 legend 里面的 data 可以删除
+ color：调色盘颜色列表



