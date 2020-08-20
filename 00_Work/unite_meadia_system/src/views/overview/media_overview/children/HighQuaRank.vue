<template>
  <panel title="高质量媒资占比排行榜">
    <btn-group :btnsData="btnsData" @itemClick="btnGroupItemClick"/>
    <el-table 
    class="table"
    :data="tableData"
    max-height="300"
    :default-sort = "{prop: 'rank'}">
      <el-table-column
        prop="rank"
        label="排名"
        width="70"
        align="center"
        sortable
        :sort-method="sortRank">
      </el-table-column>
      <el-table-column
        prop="cpName"
        label="CP"
        width="70">
      </el-table-column>
      <el-table-column
        label="高质量媒资占比">
        <template slot-scope="scope">
          <el-progress :percentage="parseInt(scope.row.cpHighQualityRatio)" color="rgba(73, 169, 238, 1)"></el-progress>
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

import { getMediaTypeList,getHighQualityRank } from 'network/overview/mediaOverview';

export default {
  name: 'HighQuaRank',
  data(){
    return{
      // 按钮组数据
      btnsData: [],
      // 表格数据
      tableData: [],
      typeCode: ''
    }
  },
  methods: {
    /* 查询媒资类型列表 */
    getMediaTypeList(){
      getMediaTypeList(this.typeCode).then(res => {
        log('查询媒资类型列表,结果: ',res);
        if(res.data.length > 0){
          res.data.forEach(item => {
            item.fieIdName = item.typeName;
          })
        }
        this.btnsData = res.data;
        this.typeCode = this.btnsData[0].typeCode;
        this.getHighQualityRank();
      }).catch(err => {
        console.log('查询媒资类型列表错误,error ==> ',err);
        this.getHighQualityRank();
      })
    },

    /* 查询高质量媒资排行榜 */
    getHighQualityRank(){
      getHighQualityRank(this.typeCode).then(res => {
        log('查询高质量媒资排行榜,结果：',res);
        this.tableData = res.data.sort((item1, item2) => {
          return parseInt(item1.rank) - parseInt(item2.rank);
        });
      })
    },

    /* 点击某一类型 */
    btnGroupItemClick(btnGroupItem){
      log('btnGroupItemClick: ',btnGroupItem);
      this.typeCode = btnGroupItem.typeCode;
      this.getHighQualityRank();
    },
    /* 周环比 */
    weeklyRadio(data){
      return Math.abs(data)
    },
    sortRank(row1,row2){
      return parseInt(row1.rank) - parseInt(row2.rank);
    }
  },
  created() {
    this.getMediaTypeList();
  },
  components: {
    Panel,
    BtnGroup
  },
}
</script>

<style scoped>
  .table{
    flex: 1;
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