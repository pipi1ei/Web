<template>
  <div id="pie"></div>
</template>

<script>
// let echarts = require('echarts');
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入饼形图
require('echarts/lib/chart/pie');
// 引入提示框、标题、legend 组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require("echarts/lib/component/legend");

export default {
  name: 'EchartPie',
  props: {
    // 选择器
    selector: {
      type: String,
      default: 'pie'
    },
    // echarts配置
    option: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      echartsPie: null
    }
  },
  watch: {
    option(){
      // let echartsPie = echarts.init(document.querySelector(this.selector));
      this.echartsPie.setOption(this.option);
    }
  },
  methods: {
    initEchartPie(){
      let echartsPie = echarts.init(document.querySelector(this.selector));
      this.echartsPie = echartsPie;
      echartsPie.setOption(this.option);
      window.addEventListener('resize', function () {  
        echartsPie.resize();
      })
    }
  },
  mounted() {
    this.initEchartPie();
  },
  // activated() {
  //   log('EchartPie activated');
  //   this.echartsPie.resize();
  // },
}
</script>

<style scoped>
  #pie{
    width: 100%;   
    height: 100%;
  }
</style>