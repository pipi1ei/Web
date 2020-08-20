<template>
  <panel title="CP同步分布">
    <div class="chart pie1">
      <echart-pie selector=".pie1" :option="option" />
    </div>
  </panel>
</template>

<script>
import Panel from 'components/common/Panel';
import EchartPie from 'components/common/EchartPie';

export default {
  name: 'CpSyncDis.vue',
  props: {
    totalSyncNum: {
      type: Number,
      default: 0
    },
    echartsData: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{}
  },
  computed: {
    option(){
      let totalSyncNum = this.totalSyncNum;
      let echartsData = this.echartsData;
      return {
        color: ['#49a9ee','#98d87d','#ffd86e','#f18b63','#8996e6','#b37feB','#fc8db3','#ffbe63','#5dccc1','#a1887f'],
        title: {
          text: [
            '{value|' + totalSyncNum + '}',
            '{name|媒资(部)}',
          ].join('\r\n'),
          top: 'center',
          left: '30',
          textStyle: {
            rich: {
              value: {
                width: 130,
                color: '#666',
                align: 'center',
                fontSize: 32,
                fontWeight: 500
              },
              name: {
                color: '#989898',
                align: 'center',
                fontSize: 12,
                fontWeight: 400,
              },
            },
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          right: 'right',
          top: 'middle',
          orient: 'vertical',
          itemWidth: 8,
          itemHeight: 8,
          formatter(name){
            let syncRatio = ''
            for(let item of echartsData){
              if(item.name == name){
                syncRatio = item.value;
                break;
              }
            }
            syncRatio = (syncRatio/totalSyncNum * 100).toFixed(2);
            return `${name}    ${syncRatio}%`;
          }
        },
        series: [
          {
            name: 'CP同步分布',
            type: 'pie',
            radius: ['40%', '50%'],
            center: ['100','50%'],
            label: {
              show: false
              // normal: {
              //   show: true,
              //   position: 'center',
              //   formatter: this.getEchartsTotal,
              //   rich: {
              //     value: {
              //       color: '#666',
              //       align: 'center',
              //       fontSize: 32,
              //       fontWeight: 500
              //     },
              //     desc: {
              //       color: '#989898',
              //       align: 'center',
              //       fontSize: 12,
              //       fontWeight: 400
              //     }
              //   },
              // },
            },
            labelLine: {
              show: false
            },
            data: echartsData
          }
        ]
      }
    }
  },
  methods: {
    // getEchartsTotal(){
    //   return '{value|'+ this.totalSyncNum +'}' + '\r\n\r\n' + '{desc|媒资（部）}'
    // },
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