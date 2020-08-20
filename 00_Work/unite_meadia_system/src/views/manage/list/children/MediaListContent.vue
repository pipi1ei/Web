<template>
  <!-- 媒资列表组件 -->
  <div class="wrap">
    <el-row :gutter="20">
      <el-col :span="4" style="font-weight: 700; font-size: 15px; padding-left:20px">媒资列表</el-col>
      <!-- 搜索框 -->
      <el-col :span='6' :offset="10">
        <label class="search">
          <el-input v-model='searchText'
            size="small" 
            placeholder='请按名称搜索媒资'
            @keyup.enter.native="searchClick">
            <i style="cursor:pointer" slot="suffix" class="el-input__icon el-icon-search" @click="searchClick"></i>
          </el-input>
        </label>
      </el-col>
      <!-- 导出按钮 -->
      <el-col :span='2'>
        <el-button @click="exportMediaData" type="primary" size="small">导出</el-button>
        <a ref="link" style="display: none" :href="fileAddress" :download="fileName"></a>
      </el-col>
    </el-row>
    <div class="table" ref="table">
      <el-table
        style="width: 100%;font-size: 20px;color: black;"
        :height="tableHeight"
        :data="tableData"
        :default-sort = "{prop: 'updateTime', order: 'descending'}">
        <el-table-column
          fixed
          width="60"
          align="right">
          <template slot-scope="scope">
            <img v-if="scope.row.thumbnails" :src="scope.row.thumbnails" style="width:30px;height:30px"/>
            <img v-else src="~assets/images/manage/thumbnails.png" style="width:30px;height:30px"/>
          </template>
        </el-table-column>
        <el-table-column
            fixed
            label="片名">
          <template slot-scope="scope">
            <span style="font-weight: 700;" class="bold">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="120"
            align="center"
            :formatter="formatterStatus">
        </el-table-column>
        <el-table-column
          sortable
          prop="updateTime"
          label="同步时间"
          align="center"
          :formatter="formatterDate">
        </el-table-column>
        <el-table-column
            prop="completionRatio"
            label="完整度"
            align="center">
          <template slot-scope="scope">
          <span v-if="scope.row.completionRatio < 100">
            <el-progress :percentage="parseInt(scope.row.completionRatio)"></el-progress>
          </span>
            <span v-else>
            <el-progress :percentage="parseInt(scope.row.completionRatio)" status="success"></el-progress>
          </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="efficientRatio"
          label="有效率"
          align="center">
          <template slot-scope="scope">
          <span v-if="scope.row.efficientRatio < 100">
            <el-progress :percentage="parseInt(scope.row.efficientRatio)"></el-progress>
          </span>
            <span v-else>
            <el-progress :percentage="parseInt(scope.row.efficientRatio)" status="success"></el-progress>
          </span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label=""
          align="center">
          <template slot-scope="scope">
            <el-button @click="showDetails(scope.row)" type="primary" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center; padding: 10px; background-color: #fff" >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.pageNum"
        :page-sizes="[10, 15, 20, 25, 30]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: "MediaListTable",
  props: {
    tableData: {
      type: Array,
      default(){
        return []
      }
    },
    paging:{
      type: Object,
      default(){
        return {
          pageNum: 1,
          pageSize: 15,
          totalCount: 0
        }
      }
    }
  },
  data(){
    return {
      searchText: '',
      tableHeight: 300,//表格高度
      fileName: '',
      fileAddress: ''
    }
  },
  methods: {
    exportMediaData(){
      this.$emit('exportData');
    },
    searchClick(){
      this.$emit('searchTextChange',this.searchText);
    },
    showDetails(mediaDetails){
      this.$store.commit('saveMediaDetails',mediaDetails);
      this.$router.push('/manage/details');
    },
    handleSizeChange(val){
      this.paging.pageSize = val;
      this.$emit('pageSizeChange');
    },
    handleCurrentChange(val){
      this.paging.pageNum = val;
      this.$emit('pageNumChange');
    },
    formatterStatus(row){
      if(row.status == '0'){
        return '已上线';
      }else if(row.status == '1'){
        return '已下线';
      }else{
        return '已剔除';
      }
    },
      formatterDate(row){
      let updateTime = row.updateTime;
      if(updateTime){
        updateTime = updateTime.split('.')[0]
      }else{
        updateTime = '空'
      }
      return updateTime;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = this.$refs.table.offsetHeight;
    });
  }
}
</script>

<style scoped>
  .wrap{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .table{
    flex: 1;
  }
  .el-table {
    font-size: 14px !important;
  }
  .el-table >>>.cell{
    color: black ;
  }
  .el-row{
    margin: 0 !important;
    display: flex;
    padding: 10px 0;
    align-items: center;
    background-color: #fff;
  }
  .search {
    height: 60px;
  }
  .el-button{
    position: relative;
    right: 2px;
  }
</style>