<template>
  <div class="overview-content">
    <el-row :gutter="20" >
      <el-col :span="16">
        <quality-monitor />
      </el-col>
      <el-col :span="8">
        <cp-rank :completionData="cpRank.completionData" :efficientData="cpRank.efficientData" />
      </el-col>
    </el-row>
    <el-row :gutter="20" >
      <el-col :span="8">
        <cp-sync-dis :totalSyncNum="cpSyncDis.totalSyncNum" :echartsData="cpSyncDis.echartsData" />
      </el-col>
      <el-col :span="8">
        <category-dis />
      </el-col>
      <el-col :span="8">
        <high-qua-rank />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QualityMonitor from './QualityMonitor';
import CpRank from './CpRank';
import CpSyncDis from './CpSyncDis';
import CategoryDis from './CategoryDis';
import HighQuaRank from './HighQuaRank';

import { getCpLeaderboard } from 'network/overview/mediaOverview';

export default {
  name: 'OverviewContent',
  data(){
    return {
      // CP排行榜组件数据
      cpRank: {
        // 完整度数据
        completionData: [],
        // 有效率数据
        efficientData: [],
      },

      // CP同步分布组件数据
      cpSyncDis: {
        // 同步媒资总数
        totalSyncNum: 0,
        // 各牌照商同步数据
        echartsData: []
      }
      
    }
  },
  methods: {
    /* 获取CP排行榜数据 */
    getCpLeaderboard(){
      getCpLeaderboard().then(res => {
        log('查询CP排行榜,结果：',res);

        let cateDisData = [];
        if(res.data.length > 0){
          let totalSyncNum = 0;
          for(let item of res.data){
            // 提取完整度数据
            let completion = {}
            completion.rank = item.completionRank;
            completion.cp = item.cpName;
            completion.averageValue = item.completionAverage;
            completion.weeklyRatio = item.completionWeeklyRatio;
            this.cpRank.completionData.push(completion);

            //提取有效率数据
            let efficient = {};
            efficient.rank = item.efficientRank;
            efficient.cp = item.cpName;
            efficient.averageValue = item.efficientAverage;
            efficient.weeklyRatio = item.efficientWeeklyRatio;
            this.cpRank.efficientData.push(efficient);

            //提取媒资同步数据
            let syncData = {};
            syncData.name = item.cpName;
            syncData.value = item.cpSyncNum;
            syncData.syncRatio = item.syncRatio;
            cateDisData.push(syncData)

            totalSyncNum += parseInt(item.cpSyncNum)
          }
          this.cpSyncDis.totalSyncNum = totalSyncNum;

          // 对完整度数据排序
          let completionData = this.cpRank.completionData 
          this.cpRank.completionData = completionData.sort((item1,item2) => {
            return parseInt(item1.rank) - parseInt(item2.rank);
          });

          // 对有效率数据排序
          let efficientData = this.cpRank.efficientData 
          this.cpRank.efficientData = efficientData.sort((item1,item2) => {
            return parseInt(item1.rank) - parseInt(item2.rank);
          });

          cateDisData = cateDisData.sort((item1, item2) => {
            return item2.value - item1.value
          })
          this.cpSyncDis.echartsData = cateDisData;
        }
      })
    },
  },
  created() {
    this.getCpLeaderboard();
  },
  components: {
    QualityMonitor,
    CpRank,
    CpSyncDis,
    CategoryDis,
    HighQuaRank
  },
}
</script>

<style lang="less" scoped>
</style>