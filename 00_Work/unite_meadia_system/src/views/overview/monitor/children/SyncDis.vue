<template>
  <panel title="同步状态分布">
    <div class="chart pie-sync">
      <echart-pie selector=".pie-sync" :option="option" />
    </div>
  </panel>
</template>

<script>
import Panel from 'components/common/Panel';
import EchartPie from 'components/common/EchartPie';

export default {
  name: 'SyncDis',
  props: {
    echartsData: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      colorList: ['#49a9ee','#98d87d','#ffd86e'],
    }
  },
  computed: {
    option(){
      const that = this;
      return {
        color: that.colorList,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}({d}%)'
        },
        legend: {
          show: false
        },
        series: [
          {
            name: '同步状态分布',
            type: 'pie',
            radius: ['0%', '50%'],
            label: {
              show: true,
              formatter: '{b}\n{d}%'
            },
            labelLine: {
              show: true
            },
            data: that.echartsData
          }
        ]
      }
    }
  },
  components: {
    Panel,
    EchartPie
  }
}
</script>

<style scoped>
  .chart{
    flex: 1;
  }
</style>