<template>
  <div class="content-box">
    <!-- 搜索不到数据时显示 -->
    <div v-if='!hasData' class="content-x" >
      <div class="no-data">暂无数据</div>
    </div>

    <!-- 媒资卡片部分 -->
    <div v-else class="content-x">
      <el-row :gutter="20">
        <el-col v-for="item in data" :key="item.id" :xs="24" :sm="12" :lg="8" :xl="6">
          <media-card :mediaData="item" @showDetails="showDetails(item)"></media-card>
        </el-col>
      </el-row>
    </div>

    <!-- 分页部分 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[12, 24, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCounter"
      ></el-pagination>
    </div>

    <!-- 展示详情对话框 -->
    <search-details ref="details"></search-details>
  </div>
</template>

<script>
import MediaCard from "components/MediaCard";
import SearchDetails from "views/details/Details";

import { getMediaList, getMediaDetails } from "network/home.js";

export default {
  name: "HomeContent2",
  data() {
    return {
      data: [], // 媒资数据列表
      hasData: true,

      totalCounter: 0, //一共多少条数据
      currentPage: 1, // 当前页
      pageSize: 12, // 每页展示多少条数据
      searchName: "", // 当前搜索的媒资名称
      productName: ""
    };
  },
  components: {
    MediaCard,
    SearchDetails
  },
  methods: {
    /* 获取搜索参数 */
    getSearchParam(pageNum, pageSize, name) {
      // let productName = this.$store.state.productName[0];
      let productName = this.productName;
      return {
        productName,
        pageNum,
        pageSize,
        name
      };
    },

    /* 查询媒资 */
    search(currentPage, pageSize, name) {
      getMediaList(this.getSearchParam(currentPage, pageSize, name))
        .then(res => {
          if(res.data.dataList.length === 0){
            this.hasData = false
          }else{
            this.hasData = true
          }
          this.data = res.data.dataList;
          this.totalCounter = res.data.recordCount;
        })
        .catch(err => {
          console.log("查询媒资错误：", err);
        });
    },
    /* pageSize 改变 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.search(this.currentPage, this.pageSize, this.searchName);
    },
    /* currentPage 改变 */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search(this.currentPage, this.pageSize, this.searchName);
    },
    /* 显示详情 */
    showDetails(item) {
      const mediaId = item.mediaId;
      // let productName = this.$store.state.productName[0];
      let productName = this.productName;
      getMediaDetails(productName, mediaId)
        .then(res => {
          // console.log(res)
          this.$refs.details.beforeCompletion = res.data[0];
          this.$refs.details.afterCompletion = res.data[1];
        })
        .catch(err => {
          console.log(err);
        });
      this.$refs.details.dialogVisible = true;
    }
  },
  created() {
    this.productName = this.$store.state.productName[0]
    this.search(this.currentPage, this.pageSize, this.searchName);
  },
};
</script>

<style lang="less">
  .content-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .content-x {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      width: 100%;
      padding-top: 10px;

      .el-col {
        margin-bottom: 20px;
      }

      .no-data {
        color: #757575;
        font-size: 20px;
        font-weight: bold;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .pagination {
      border-top: 1px solid #ccc;
      text-align: center;
      padding-top: 5px;
    }
  }
</style>