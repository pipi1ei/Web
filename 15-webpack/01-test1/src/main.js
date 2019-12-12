// 项目入口 js 文件

// 1. 导入jquery, import ** from '**' 是es6 中导入模块的方式
import $ from 'jquery'

// 使用 import 语法，导入 css 样式表
// import './css/index.css'
// import './css/index.less'
// import './css/index.scss'

$(function () {
  $('li:odd').css('backgroundColor', 'yellow') //选择奇数行
  $('li:even').css('backgroundColor', () => '#f00') // 选择偶数行
})

