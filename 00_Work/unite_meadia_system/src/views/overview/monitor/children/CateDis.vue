<template>
  <panel title="媒资类型分布">
    <div class="chart pie-cate">
      <echart-pie selector=".pie-cate" :option="option" />
    </div>
  </panel>
</template>

<script>
import Panel from 'components/common/Panel';
import EchartPie from 'components/common/EchartPie';

import { getMediaCateDis } from 'network/overview/common';

export default {
  name: 'CateDis',
  data(){
    return{
      colorList: ['#49a9ee','#98d87d','#ffd86e','#f18b63','#8996e6','#b37feB','#fc8db3','#ffbe63','#5dccc1','#a1887f'],
      echartsData: []
    }
  },
  computed: {
    option(){
      const that = this;
      return {
        color: that.colorList,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {d}%'
        },
        legend: {
          show: false
        },
        series: [
          {
            name: '媒资类型分布',
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
  watch: {
    /* 监听cp改变 */
    '$store.state.currentCp':function (param) {
      this.getMediaCateDis();
    }
  },
  methods: {
    getMediaCateDis(){
      let cpCode = this.$store.state.currentCp.cpCode;
      getMediaCateDis(cpCode).then(res => {
        log('查询媒资类型分布，结果：',res);
        let cateDisDataList = [];
        if(res.data.length > 0){
          for(let item of res.data){
            let cateDisData = {};
            cateDisData.value = parseInt(item.typeAccount);
            cateDisData.name = item.typeName;
            cateDisDataList.push(cateDisData);
          }
        }
        this.echartsData = cateDisDataList;
      })
    }
  },
  created() {
    this.getMediaCateDis();
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