<template>
  <el-row :gutter="20" class="top">
    <el-col :span="6">
      <top-item title="昨日同步" :number="getFomatNum(daySyncNum)" :showCompare="true" :value="daySyncNumRatio" desc="同比前一天">
        <img slot="icon" src="~assets/images/overview/icon-day.png">
      </top-item>
    </el-col>
    <el-col :span="6">
      <top-item title="本周同步" :number="getFomatNum(weekSyncNum)" :showCompare="true" :value="weekSyncNumRatio" desc="同比上周">
        <img slot="icon" src="~assets/images/overview/icon-week.png">
      </top-item>
    </el-col>
    <el-col :span="6">
      <top-item title="累计同步" :number="getFomatNum(totalSyncNum)">
        <img slot="icon" src="~assets/images/overview/icon-total.png">
      </top-item>
    </el-col>
    <el-col :span="6">
      <top-item title="对接CP（个）" :number="getFomatNum(totalCpNum)">
        <img slot="icon" src="~assets/images/overview/icon-cp.png">
      </top-item>
    </el-col>
  </el-row>
</template>

<script>
import TopItem from './TopItem';

import { formatNum } from 'utils/utils'
import { getOverviewData } from 'network/overview/mediaOverview'

export default {
  name: 'OverviewTop',
  data(){
    return {
      daySyncNum: '',      //昨日同步数量
      daySyncNumRatio: '',     //同比上一天比例
      weekSyncNum: '',     //本周同步数量
      weekSyncNumRatio: '',   //同比上一周比例
      totalSyncNum: '',   //累计同步数
      totalCpNum: ''           //对接cp数
    }
  },
  methods: {
    /* 获取媒资概览数据 */
    getOverviewData(){
      getOverviewData().then(res => {
        log('媒资概览数据：',res);
        this.daySyncNum = res.data.daySyncNum;
        this.daySyncNumRatio = res.data.daySyncNumRatio;
        this.weekSyncNum = res.data.weekSyncNum;
        this.weekSyncNumRatio = res.data.weekSyncNumRatio;
        this.totalSyncNum = res.data.totalSyncNum;
        this.totalCpNum = res.data.totalCpNum;
      }).catch(err => {
        console.log(err);
      })
    },
    /* 格式化数字，每三位加一个逗号 */
    getFomatNum(num){
      let value = formatNum(num);
      return value;
    }
  },
  components: {
    TopItem
  },
  created() {
    this.getOverviewData();
  },
}
</script>

<style scoped>

</style>