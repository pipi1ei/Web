<template>
  <!-- 已剔除媒资组件 -->
  <div class="container">
    <!-- 头部 -->
    <operation-top :filter="filter" @queryMeidiaData="search" />

    <el-row class="opration">
      <el-button type="primary" size="small" @click="exportData" style="margin-right: 10px">导出</el-button>
      <a ref="link" href style="display:none;" download="download" />
      <el-button :disabled="enableOperate" size="small" @click="online" >上线</el-button>
    </el-row>

    <!-- 内容 -->
    <operation-content
      :tableData='tableData' 
      :paging="paging"
      @selectionChange="handleSelectionChange"
      @pageSizeChange="queryElimanateData"
      @pageNumChange="queryElimanateData">

      <el-table-column slot="left" fixed type="selection" width="50" align="center">
      </el-table-column>

       <el-table-column
        slot="right"
        align="center"
        width="200"
        fixed="right"
        label="剔除原因"
        prop="status"
        :formatter="formatter">
       </el-table-column>

    </operation-content>
  </div>
</template>

<script>
import OperationTop from '../common/OperationTop';
import OperationContent from '../common/OperationContent';

import { getMediaData,exportMediaData } from 'network/common'
import { mediaToOnline } from 'network/operation/eliminate'

export default {
  name: 'MediaEliminate',
    data(){
    return {
      // 表格数据
      tableData: [],
      // 分页信息
      paging: {
        pageNum: 1,         //页数
        pageSize: 15,       //每页展示多少数据
        totalCount: 0       //总数
      },
      //过滤条件
      filter: {
        cpCode: '',         //cp唯一id
        name: '',           //媒资名称
        startDate: '',      //开始时间
        endDate: '',        //结束时间
      },
      /* 选中的项目 */
      multipleSelection :[]
    }
  },
  computed: {
    enableOperate(){
      return this.multipleSelection.length == 0;
    },
  },
  methods: {
    queryElimanateData(){
      let requestParam = {
        pageNum: this.paging.pageNum,
        pageSize: this.paging.pageSize,
        cpCode: this.filter.cpCode,
        name: this.filter.name,
        startTime: this.filter.startDate,
        endTime: this.filter.endDate,   
        status: '2',
      }
      getMediaData(requestParam).then(res => {
        log('查询已剔除媒资，结果：',res);
        this.tableData = res.data.mediaList;
        this.paging.totalCount = res.data.mediaAccount;
      })
    },
    search(){
      this.paging.pageNum = 1;
      this.queryElimanateData();
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    exportData(){
      //如果选中了指定媒资，只导出选中的媒资
      let selectionList = [];
      if(this.multipleSelection.length > 0){
        this.multipleSelection.forEach(item => {
          let selectionItem = {
            mediaId: item.mediaId,
            provideId: item.provideId
          }
          selectionList.push(selectionItem)
        });
      }
      
      let requestParam = {
        cpCode: this.filter.cpCode,
        name: this.filter.name,
        startTime: this.filter.startDate,
        endTime: this.filter.endDate,   
        status: '2'
      }

      if(selectionList.length > 0){
        requestParam.mediaListStr = JSON.stringify(selectionList)
      }
      let link = this.$refs.link;
      exportMediaData(requestParam).then(res => {
        log('导出已剔除媒资数据，结果: ',res);
        link.setAttribute("href",res.data);
        link.click();
      })
    },
    online(){
      this.$confirm("是否上线选中媒资?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let mediaArr = [];
        for(let item of this.multipleSelection){
          let mediaItem = {
            mediaId: item.mediaId,
            provideId: item.provideId
          }
          mediaArr.push(mediaItem);
        }
        log("待上线媒资： ",mediaArr);
        mediaToOnline(JSON.stringify(mediaArr)).then(res => {
          this.queryElimanateData();
        })
      })
    },
    formatter(row){
      switch(row.status){
        case '2':
          return "重名剔除";
          break;
        case '3':
          return "垃圾媒资";
          break;
      }
    }
  },
  created() {
    this.queryElimanateData();
  },
  components: {
    OperationTop,
    OperationContent
  }
}
</script>

<style scoped>
  .container{
    flex: 1;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
  }

  .container .opration{
    margin-bottom: 10px;
  }
</style>