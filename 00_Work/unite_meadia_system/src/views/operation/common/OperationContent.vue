<template>
  <div class="content">
    <div ref="table" class="table">
      <el-table 
        :data="tableData"
        stripe
        border
        :height="tableHeight"
        style="max-width: 100%"
        :default-sort = "{prop: 'updateTime', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <slot name="left"></slot>
        <el-table-column
            prop="name"
            align="center"
            label="片名"
          >
        </el-table-column>
        <el-table-column
            prop="mediaId"
            label="媒资ID"
            align="center"
          >
        </el-table-column>
        <el-table-column
            prop="director"
            align="center"
            label="导演"
            width="120"
            :formatter="formatter"
          >
        </el-table-column>
        <el-table-column
            prop="actor"
            align="center"
            label="演员"
            :formatter="formatter"
          >
        </el-table-column>
        <el-table-column
            prop="cpName"
            align="center"
            label="内容方"
            width="100"
          >
        </el-table-column>
        <el-table-column
            prop="updateTime"
            align="center"
            label="更新时间"
            width="180"
            sortable
            :formatter="formatterDate"
          >
        </el-table-column>
        <slot name="right"></slot>
      </el-table>
    </div>
    
    <!-- 分页 -->
    <div class="pagination" ref="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.pageNum"
        :page-sizes="[10, 15, 20, 25, 30]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="paging.totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { arr2string } from 'utils/utils'

export default {
  name: 'OperationContent',
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
          pageSize: 10,
          totalCount: 0
        }
      }
    }
  },
  data(){
    return {
      // 表格高度
      tableHeight:'300'
    }
  },
  methods: {
    handleSelectionChange(val){
      this.$emit('selectionChange',val);
    },
    /* 页数改变 */
    handleSizeChange(val) {
      this.paging.pageSize = val;
      this.$emit('pageSizeChange');
    },
    /* 当前页码改变 */
    handleCurrentChange(val) {
      this.paging.pageNum = val;
      this.$emit('pageNumChange');
    },
    /* 格式化表格列内容 */
    formatter(row, column){
      return arr2string(row[column.property]);
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
  },
}
</script>

<style scoped>
  .content{
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .content .table{
    flex: 1;
  }

  .content .pagination{
    text-align: center;
    padding-top: 10px;
  }

  .el-table >>> thead{
    color: #656565;
  } 
  .el-table >>> .el-table__header{
    background-color: rgba(243, 243, 243, 1);
  }

  .el-table >>> th,.el-table >>> tr{
    background-color: transparent;
  }
</style>