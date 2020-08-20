<template>
  <div class="container">
    <media-list-top ref="mediaCp" 
      :currentCp="currentCp" 
      :cpList='cpList' 
      @switchCp="getMediaData" 
      @changeStatus="changeStatus" />

    <media-list-content 
      ref="contentList" 
      :tableData="tableData"
      :paging="paging"
      @searchTextChange="searchTextChange"
      @exportData="exportMediaData"
      @pageSizeChange="getMediaData"
      @pageNumChange="getMediaData" />

      <a ref="link" href style="display:none;" download="download" />
  </div>
</template>

<script>
import MediaListTop from "./children/MediaListTop";
import MediaListContent from "./children/MediaListContent";

import {getCpList,getMediaData,exportMediaData} from 'network/common';


export default {
  name: 'MediaList',
  data(){
    return {
      // 当前选中的CP
      currentCp: {
        cpName: '',
        cpCode: '',
        iconSrc: ''
      },
      //CP列表
      cpList: [],
      // 状态
      status: '',
      // 媒资名称
      mediaName: '',
      //分页信息
      paging: {
        pageNum: 1,
        pageSize: 15,
        totalCount: 0
      },
      // 表格数据
      tableData: [],
    }
  },
  components: {
    MediaListTop,
    MediaListContent
  },
  methods: {
    /* 获取cp列表 */
    getCpList(){
      getCpList().then(res => {
        log('获取cpList ==>',res);
        let roleCp = this.$store.state.userInfo.roleCp;
        if(res.code == '0000'){
          //判断当前用户cpCode，不是root 权限只展示自己的 cp 数据
          if(roleCp != 'all'){
            for(let item of res.data){
              if(item.cpCode == roleCp){
                this.currentCp = {
                  cpName: item.cpName,
                  cpCode: item.cpCode,
                  iconSrc: item.cpIconUrl
                }
              }
            }
          }else{
            this.cpList = res.data;
            if(this.$store.state.currentCp.cpCode){
              this.currentCp.cpName = this.$store.state.currentCp.cpName;
              this.currentCp.cpCode = this.$store.state.currentCp.cpCode;
              this.currentCp.iconSrc = this.$store.state.currentCp.cpIconUrl;
            }else{
              log('store 中没有currentCp')
              this.currentCp = {
                cpName: res.data[0].cpName,
                cpCode: res.data[0].cpCode,
                iconSrc: res.data[0].cpIconUrl
              }
            }
          }
          this.getMediaData();
        }
      })
    },

    /* 查询媒资数据列表 */
    getMediaData(){
      let searchParams = {
        cpCode: this.currentCp.cpCode,
        pageNum: this.paging.pageNum,
        pageSize: this.paging.pageSize,
        name: this.mediaName,
        startTime: '',
        endTime: '',
        status: this.status
      }
      getMediaData(searchParams).then(res => {
        log('媒资查询结果：',res);
        this.tableData = res.data.mediaList;
        this.paging.totalCount = res.data.mediaAccount;
      }).catch(err => {
        log(err)
      })
    },
    /* 选择不同的媒资状态 */
    changeStatus(status){
      log('父组件收到switchCp: ',status);
      this.status = status;
      // 重置媒资名称
      this.mediaName = '';
      this.$refs.contentList.searchText = '';
      this.getMediaData();
    },
    searchTextChange(name){
      this.paging.pageNum = 1;
      this.mediaName = name;
      this.getMediaData();
    },

    /* 导出媒资数据 */
    exportMediaData(){
      let searchParams = {
        cpCode: this.currentCp.cpCode,
        name: this.mediaName,
        startTime: '',
        endTime: '',
        status: this.status
      }
      let link = this.$refs.link;
      exportMediaData(searchParams).then(res => {
        log('导出媒资数据结果：',res)
        link.setAttribute("href",res.data);
        link.click();
      })
    }

  },
  created() {
    this.getCpList();
  }
}
</script>

<style  scoped>
  .container {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    background-color: rgba(240, 242, 245, 1);
    padding: 10px 20px;
  }
</style>