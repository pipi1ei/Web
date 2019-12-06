<template>
  <div class="search-content">
    <div class="title">
      <!-- <slot name=title></slot> -->
      <div class="item poseter">媒资海报</div>
      <div class="item detail">媒资名称</div>
      <div class="item detail">导演</div>
      <div class="item detail">演员</div>
      <div class="blank"></div>
    </div>
    <div class="content" >
      <!-- <slot name=item></slot> -->
      <div class="content-item" v-for="(item, index) in dataList" :key='index'>
        <div class="item">
          <img :src="item.thumbnails" alt="">
        </div>
        <div class="item">{{ item.name }}</div>
        <div class="item">{{ array2String(item.director) }}</div>
        <div class="item">{{ array2String(item.actor) }}</div>
        <div class="btn" @click="showDetails(item.mediaId)">查看详情</div>
      </div>
    </div>

    <div class="footer">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalcoutenter">
        </el-pagination>
      </div>
    </div>

     <search-details ref="details" ></search-details>
  </div>
</template>

<script>
import { 
  getMediaList,
  getMediaDetails
 } from "network/home.js";

import SearchDetails from 'views/details/Details'

export default {
  name: 'Content',
  props:{},
  data(){
    return {
      totalcoutenter: 0, //一共多少条数据
      currentPage: 1, // 当前页
      pageSize: 10, // 每页展示多少条数据
      searchName: '', // 当前搜索的媒资名称
      dataList: [],

      dialogTableVisible: false,
    }
  },
  components: {
    SearchDetails
  },
  methods: {
    array2String(str){
      return str.replace('[', '').replace(']', '').replace(new RegExp('\"', "g"), '')
    },

    /* 获取搜索参数 */
    getSearchParam(pageNum,pageSize,name){
      let provideId = this.$store.state.provideId;
      return {
        provideId,
        pageNum,
        pageSize,
        name
      }
    },

    /* pageSize 改变 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.search(this.currentPage,this.pageSize,this.searchName)
    },

    /* currentPage 改变 */
    handleCurrentChange(val) {
      this.currentPage = val
      this.search(this.currentPage,this.pageSize,this.searchName)
    },

    search(currentPage,pageSize,name){
      getMediaList(this.getSearchParam(currentPage,pageSize,name)).then(res => {
        if(res.code == '0000'){
          this.dataList = res.data.dataList
          this.totalcoutenter = res.data.recordCount
        }else{
          console.log('查询失败')
          // todo 提示查询失败
        }
      }).catch(err => {
        console.log('查询失败')
        // todo 提示查询失败
      })
    },
    showDetails(mediaId){
      let provideId = this.$store.state.provideId;
      getMediaDetails(provideId,mediaId).then(res => {
        console.log(res)
        if(res.code == '0000'){
          this.$refs.details.beforeCompletion = res.data[0]
          this.$refs.details.afterCompletion = res.data[1]
        }
      })
      .catch(err => {
        console.log(err)
      })
      this.$refs.details.dialogVisible = true
    }
  },
  created(){
    this.search(this.currentPage,this.pageSize,this.searchName)
  }
}
</script>

<style lang="less">
  .search-content{
    flex: 1;
    -webkit-box-flex:1;
	  -webkit-flex:1;
    display: flex;
    flex-direction: column;
    position: relative;

    .title{
      margin-bottom: 20px;
      display: flex;
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 2px solid rgb(44, 43, 43);

      .item{
        flex: 1;
        font-weight: 600;
        font-size: 18px;
        margin-right: 10px;
      }
      .blank{
        width: 170px;
      }
    }

    .content{
      flex: 1;
      overflow-y: auto;
      flex-wrap: wrap;

      .content-item{
        width:100%;
        display: flex;
        min-height: 70px;
        text-align: center;
        align-items: center;
        margin-bottom: 10px;
        
        padding-bottom: 10px;
        border-bottom: 1px solid #888787;

        .item{
          flex: 1;
          margin-right: 10px;
          img{
            display: block;
            width: 100px;
            height: auto;
            margin: 0 auto;
          }
          
        }

        .btn{
          margin: 0 40px;
          width: 80px;
          height: 50px;
          color: #fff;
          background-color: #409eff;
          border-color: #409eff;
          text-align: center;
          line-height: 50px;
          border-radius: 5px;
          &:active{
            background: #3a8ee6;
            border-color: #3a8ee6;
          }
        }
      }
    }

    .footer{
      padding-top: 10px;
      box-shadow: 0 -1px 1px rgba(100,100,100, .2);
      text-align: center;
    }
  }
</style>