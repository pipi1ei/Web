<template>
  <div id="bar"></div>
</template>

<script>
// let echarts = require('echarts');
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框、标题、legend 组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require("echarts/lib/component/legend");

export default {
  name: 'EchartBar',
  props: {
    // 选择器
    selector: {
      type: String,
      default: 'pie'
    },
    option: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      echartsBar: null
    }
  },
  watch: {
    option(){
      // let echartsBar = echarts.init(document.querySelector(this.selector));
      this.echartsBar.setOption(this.option);
    }
  },
  methods: {
    initEchartBar(){
      let echartsBar = echarts.init(document.querySelector(this.selector));
      this.echartsBar = echartsBar;
      echartsBar.setOption(this.option);
      window.addEventListener('resize', function () {  
        echartsBar.resize();
      })
    }
  },
  mounted() {
    this.initEchartBar();
  },
  // activated() {
  //   log('EchartBar activated');
  //   this.echartsBar.resize();
  // },
}
</script>

<style scoped>
  #bar{
    width: 100%;   
    height: 100%;
  }
</style>