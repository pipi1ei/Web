<template>
  <div class="content">
    <div class="table-container">
      <el-table height="100%" :data="tableData" stripe border style="width: 100%" align="center">
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="tagName" label="标签名称" align="center" width="180"></el-table-column>
        <el-table-column prop="tagUrl" label="打开页" align="center"></el-table-column>
        <el-table-column prop="urlWhite" label="白名单" align="center"></el-table-column>
        <el-table-column prop="info" label="说明" align="center"></el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center" width="160"></el-table-column>
        <el-table-column prop="userName" label="操作人" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDeleteClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.pageNum"
        :page-sizes="[10, 20, 30]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagContent",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    paging: {
      type: Object,
      default() {
        return {
          total: 0,
          pageNum: 1,
          pageSize: 10
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    handleDeleteClick(tableItem) {
      this.$emit("handleDeleteClick", tableItem);
    },
    // 每页展示数量改变
    handleSizeChange(pageSize) {
      this.paging.pageSize = pageSize;
      this.$emit("handleSizeChange");
    },
    // 页数改变
    handleCurrentChange(pageNum) {
      this.paging.pageNum = pageNum;
      this.$emit("handleCurrentChange");
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: calc(100% - 72px);
}
</style>