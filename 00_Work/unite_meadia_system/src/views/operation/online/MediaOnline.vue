<template>
  <!-- 已上线媒资组件 -->
  <div class="container">
    <!-- 头部 -->
    <operation-top :filter="filter" @queryMeidiaData="search" />

    <el-row class="opration">
      <el-button type="primary" size="small" @click="exportData" style="margin-right: 10px">导出</el-button>
      <a ref="link" style="display:none;" download="download" />
      <el-button :disabled="enableOperate" size="small" @click="offline" >下线</el-button>
    </el-row>

    <!-- 内容 -->
    <operation-content
      :tableData='tableData' 
      :paging="paging"
      @selectionChange="handleSelectionChange"
      @pageSizeChange="queryOnlineData"
      @pageNumChange="queryOnlineData">

      <el-table-column slot="left" fixed type="selection" width="50" align="center">
      </el-table-column>

       <el-table-column
        slot="right"
        align="center"
        width="100"
        fixed="right"
        label="状态">

        <template slot-scope="scope">
          <span class="status"></span>
          <span style="color: #00a854">{{getStatus(scope.row.status)}}</span>
        </template>
       </el-table-column>

    </operation-content>
  </div>
</template>

<script>
import OperationTop from '../common/OperationTop';
import OperationContent from '../common/OperationContent';

import { getMediaData,exportMediaData } from 'network/common';
import { mediaToOffline } from 'network/operation/online';
import { Message } from 'element-ui'

export default {
  name: 'MediaOnline',
  data(){
    return {
      // 表格数据
      tableData: [],
      /* 选中的项目 */
      multipleSelection :[],
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
    }
  },
  computed: {
    enableOperate(){
      return this.multipleSelection.length == 0;
    },
  },
  methods: {
    /* 查询已上线数据 */
    queryOnlineData(){
      let requestParam = {
        pageNum: this.paging.pageNum,
        pageSize: this.paging.pageSize,
        cpCode: this.filter.cpCode,
        name: this.filter.name,
        startTime: this.filter.startDate,
        endTime: this.filter.endDate,   
        status: '0'
      }
      getMediaData(requestParam).then(res => {
        log('查询已上线媒资，结果：',res);
        this.tableData = res.data.mediaList;
        this.paging.totalCount = res.data.mediaAccount;
      })
    },
    search(){
      this.paging.pageNum = 1;
      this.queryOnlineData();
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
        status: '0'
      }
      if(selectionList.length > 0){
        requestParam.mediaListStr = JSON.stringify(selectionList)
      }
      let link = this.$refs.link;
      exportMediaData(requestParam).then(res => {
        log('导出上线媒资数据，结果: ',res);
        link.setAttribute("href",res.data);
        link.click();
      })
    },
    offline(){
      this.$confirm("是否下线选中媒资?", "提示", {
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
        log("待下线媒资： ",mediaArr);
        mediaToOffline(JSON.stringify(mediaArr)).then(res => {
          this.queryOnlineData();
        })
      });
    },
    getStatus(status){
      switch(status){
        case '0':
          return '已上线';
        case '1':
          return '已下线';
        case '2':
          return '已剔除';
        default:
          return '已上线'
      }
    }
  },
  created() {
    this.queryOnlineData();
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

  .status{
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #00a854;
    border-radius: 50%;
    margin-right: 5px;
  }
</style>