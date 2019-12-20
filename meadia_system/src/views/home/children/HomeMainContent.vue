<template>
  <div class="content-box" ref="table">
    <!-- 表格展示部分 -->
    <div class="content-table">
      <el-table  :data="tableData" border :height='tableHeight' style="width: 100%;">
        <el-table-column prop="thumbnails" label="媒资海报" width="120">
          <template slot-scope="scope">
            <img style="width: 100%" :src="scope.row.thumbnails" alt />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="媒资名称"></el-table-column>
        <el-table-column label="导演">
          <template slot-scope="scope">{{ getInfo(scope.row.director) }}</template>
        </el-table-column>
        <el-table-column label="演员">
          <template slot-scope="scope">{{ getInfo(scope.row.actor) }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              style="display: block; margin: 0 auto; padding: 15px 10px;"
              @click="showDetails(scope)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页部分 -->
    <div class="content-pagination" ref="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
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
import SearchDetails from "views/details/Details";

import { getMediaList, getMediaDetails } from "network/home.js";

export default {
  name: "HomeMainContent",
  data() {
    return {
      totalCounter: 0, //一共多少条数据
      currentPage: 1, // 当前页
      pageSize: 10, // 每页展示多少条数据
      searchName: "", // 当前搜索的媒资名称

      tableData: [],
      tableHeight: '450'
    };
  },
  mounted() {
    this.$nextTick(() => {
      let self = this
      console.log(this.$refs)
      console.log("-->",this.$refs.table.offsetHeight - this.$refs.pagination.offsetHeight)
      this.tableHeight = this.$refs.table.offsetHeight - this.$refs.pagination.offsetHeight;
    })
  },
  components: {
    SearchDetails
  },
  methods: {
    /* 获取搜索参数 */
    getSearchParam(pageNum, pageSize, name) {
      let provideId = this.$store.state.provideId;
      return {
        provideId,
        pageNum,
        pageSize,
        name
      };
    },
    /* 查询媒资 */
    search(currentPage, pageSize, name) {
      getMediaList(this.getSearchParam(currentPage, pageSize, name))
        .then(res => {
          this.tableData = res.data.dataList;
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
    showDetails(scope) {
      const mediaId = scope.row.mediaId;
      let provideId = this.$store.state.provideId;
      getMediaDetails(provideId, mediaId)
        .then(res => {
          // console.log(res)
          this.$refs.details.beforeCompletion = res.data[0];
          this.$refs.details.afterCompletion = res.data[1];
        })
        .catch(err => {
          console.log(err);
        });
      this.$refs.details.dialogVisible = true;
    },

    /* 字符串去除数组符号，双引号 */
    array2String(str) {
      let array = JSON.parse(str || '[]')
      return array.join(',')
    },
    getInfo(info) {
      if (this.array2String(info) === "") {
        return "空";
      } else {
        return this.array2String(info);
      }
    }
  },
  created() {
    this.search(this.currentPage, this.pageSize, this.searchName);
  }
};
</script>

<style lang="less">
.content-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content-table {
    flex: 1;
    padding-right: 20px;
  }

  .content-pagination {
    text-align: center;
    padding-top: 10px;
  }
}
</style>