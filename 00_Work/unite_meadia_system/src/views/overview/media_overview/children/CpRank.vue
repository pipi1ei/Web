<template>
  <panel title="CP排行榜">
    <btn-group :btnsData="btnsData" @itemClick="btnGroupItemClick"/>
    <el-table 
    class="table"
    :data="tableData"
    max-height="300"
    :default-sort = "{prop: 'rank'}"
    >
      <el-table-column
        prop="rank"
        label="排名"
        width="70"
        align="center"
        :sort-method="sortRank"
        sortable>
      </el-table-column>
      <el-table-column
        prop="cp"
        label="CP"
        width="70">
      </el-table-column>
      <el-table-column
        label="本周平均值">
        <template slot-scope="scope">
          <el-progress :percentage="parseInt(scope.row.averageValue)" color="rgba(73, 169, 238, 1)"></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        width="70"
        label="周环比">
        <template slot-scope="scope">
          <span class="incre" v-if="scope.row.weeklyRatio > 0">{{ weeklyRadio(scope.row.weeklyRatio) }}%</span>
          <span class="reduce" v-else>{{ weeklyRadio(scope.row.weeklyRatio) }}%</span>
        </template>
      </el-table-column>
    </el-table>
  </panel>
</template>

<script>
import Panel from 'components/common/Panel';
import BtnGroup from 'components/common/BtnGroup';

import { getCpLeaderboard } from 'network/overview/mediaOverview';

export default {
  name: 'CpRank',
  props: {
    // 完整度数据
    completionData: {
      type: Array,
      default(){
        return []
      }
    },
    // 有效率数据
    efficientData: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      // 按钮组数据
      btnsData: [
        {
          fieIdName: '完整度',
          fieIdCode: 'completion'
        },
        {
          fieIdName: '有效率',
          fieIdCode: 'efficient'
        }
      ],
      // 表格数据
      tableData: this.completionData,
    }
  },
  methods: {
    /* 选择完整度或有效率 */
    btnGroupItemClick(btnGroupItem){
      log('btnGroupItemClick: ',btnGroupItem);
      if(btnGroupItem.fieIdCode == 'efficient'){
        this.tableData = this.efficientData;
      }else if(btnGroupItem.fieIdCode =='completion'){
        this.tableData = this.completionData;
      }
    },
    /* 周环比 */
    weeklyRadio(data){
      return Math.abs(parseInt(data))
    },
    sortRank(row1,row2){
      return parseInt(row1.rank) - parseInt(row2.rank);
    }
  },
  components: {
    Panel,
    BtnGroup
  }
}
</script>

<style scoped>
  .table{
    flex: 1;
    width: 100%;
    font-size: 12px;
  }
  .table::before{
    content: "";
    width: 0;
    height: 0;
  }
  .table >>> .el-progress__text{
    font-size: 12px !important;
  }
  .table .incre{
    color: #00a753;
  }
  .table .reduce{
    color: #f04133
  }
</style>