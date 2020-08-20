<template>
  <panel title="媒资有效率监控">
    <!-- 按钮组 -->
    <btn-group :btnsData="btnsData" @itemClick="btnGroupItemClick"/>
    <div class="filter">
      <ul class="f-right" ref="filterUL">
        <li :class="{active: currentIndex == 0}" @click="changeDate(dateFilter.yesterday, 0)">昨日</li>
        <li :class="{active: currentIndex == 1}" @click="changeDate(dateFilter.lastWeek, 1)">近7天</li>
        <li :class="{active: currentIndex == 2}" @click="changeDate(dateFilter.lastMonth, 2)">近30天</li>
        <li @click="changeDate(dateFilter.customDate, 3)">
          <el-date-picker
            style="width: 200px"
            v-model="date"
            type="daterange"
            size="mini"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </li>
      </ul>
    </div>
    <div class="chart bar-efficiency">
      <echart-bar selector=".bar-efficiency" :option="option" />
    </div>
  </panel>
</template>

<script>
import Panel from 'components/common/Panel';
import BtnGroup from 'components/common/BtnGroup';
import EchartBar from 'components/common/EchartBar';

import { getEssentialFieldInfo, getFieldMonitor } from 'network/overview/common';
import { formatDate, getPastDate } from 'utils/utils';

export default {
  name: 'Efficiency',
  data(){
    return {
      // 获取媒资监控字段信息请求参数
      fieldMonitorParams: {
        fieIdCode: 'director',
        cpCode: this.$store.state.currentCp.cpCode,
        startTime: getPastDate(7),
        endTime: formatDate(new Date(), 'yyyy-MM-dd')
      },
      // 按钮组数据
      btnsData: [],
      date: ['',''],
      // 设置时间选择器范围
      pickerOptions: {
        disabledDate(time) {
          let curDate = (new Date()).getTime();
          let twoMonthsTime = 60 * 24 * 3600 * 1000;
          let twoMonths = curDate - twoMonthsTime;
          return time.getTime() > Date.now() || time.getTime() < twoMonths;;
        }
      }, 
      // 日期选择
      dateFilter:{
        yesterday: 'yesterday',
        lastWeek: 'lastWeek',
        lastMonth: 'lastMonth',
        customDate: 'custom'
      },
      currentIndex: 1,
      echartOptions: {
        xAxisData: [],
        seriesData: []
      }
    }
  },
  computed: {
    option(){
      const that = this;
      return {
        color: 'rgba(255, 216, 110, 1)',
        tooltip: {
          formatter: '{a}<br />{b}: {c}%'
        },
        legend: {
          show: false
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '3%',
          bottom: '15%',
          containLabel: true    //是否显示刻度标签
        },
        xAxis: {
          //刻度标签设置
          axisLabel: {
            fontSize: 12,
            color: '#666'
          },
           axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          // 刻度设置
          axisTick: {
            show: false   //不显示刻度
          },
          data: that.echartOptions.xAxisData
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: '#666'
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          // 不显示y轴分割线
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '媒资有效率',
            type: 'bar',
            barWidth: '10px',
            data: that.echartOptions.seriesData
          }
        ]
      }
    }
  },
  watch: {
    date(){
      if(this.date.length > 0){
        this.fieldMonitorParams.startTime = this.date[0];
        this.fieldMonitorParams.endTime = this.date[1];
        this.getFieldMonitor();
      }
    },
    /* 监听cp改变 */
    '$store.state.currentCp':function (param) {  
      this.fieldMonitorParams.cpCode = this.$store.state.currentCp.cpCode;
      this.getFieldMonitor();
    }
  },
  methods: {
    /* 查询必要字段：柱状图的选择维度 */
    getEssentialFieldInfo(){
      getEssentialFieldInfo().then(res => {
        log('查询必要字段,结果：',res);
        this.btnsData = res.data;
        this.fieldMonitorParams.fieIdCode = res.data[0].fieIdCode;
        this.getFieldMonitor();
      })
    },
    /* 获取媒资监控字段信息 */
    getFieldMonitor(){
      getFieldMonitor(this.fieldMonitorParams).then(res => {
        log('获取媒资有效率监控字段,结果: ',res);
        var echartOptions = this.echartOptions;
        echartOptions.xAxisData = [];
        echartOptions.seriesData = [];
        echartOptions.seriesData.effective = [];

        if(res.data && res.data.length > 0){
          res.data = res.data.sort((item1, item2) => {
            let item1Day = Date.parse(item1.day);
            let item2Day = Date.parse(item2.day);
            return item1Day- item2Day;
          })
          for(let item of res.data){
            echartOptions.xAxisData.push(item.day);
            echartOptions.seriesData.push(item.efficient);
          }
        }
      }).catch(err => {
        console.log('获取媒资有效率监控字段信息错误：',err);
      })
    },
    /* 点击按钮组中的某个按钮 */
    btnGroupItemClick(btnGroupItem){
      log('btnGroupItemClick: ',btnGroupItem);
      this.fieldMonitorParams.fieIdCode = btnGroupItem.fieIdCode;
      this.getFieldMonitor();
    },
    /* 选择不同的日期 */
    changeDate(filterDate,index){
      this.date = [];
      this.currentIndex = index;
      log('filterDate: ',filterDate);
      if(filterDate == this.dateFilter.customDate){
        return;
      }
      switch(filterDate){
        case this.dateFilter.yesterday:
          this.fieldMonitorParams.startTime = getPastDate(1);
          this.fieldMonitorParams.endTime = getPastDate(0);
          break;
        case this.dateFilter.lastWeek:
          this.fieldMonitorParams.startTime = getPastDate(7);
          this.fieldMonitorParams.endTime = getPastDate(0);
          break;
        case this.dateFilter.lastMonth:
          this.fieldMonitorParams.startTime = getPastDate(30);
          this.fieldMonitorParams.endTime = getPastDate(0);
          break;
        default:
          this.fieldMonitorParams.startTime = getPastDate(7);
          this.fieldMonitorParams.endTime = getPastDate(0);
          break;
      }
      this.getFieldMonitor();
    },
  },
  created() {
    this.getEssentialFieldInfo();
  },
  components: {
    Panel,
    BtnGroup,
    EchartBar
  }
}
</script>

<style lang="less" scoped>
  .filter{
    ul{
      display: flex;
      align-items: center;

      li{
        font-size: 12px;
        color: #666;
        cursor: pointer;
        margin-right: 10px;

        &:hover,
        &.active{
          color: #108ee9;
        }
      }
    }
  }
  
  .chart{
    flex: 1;
  }
</style>