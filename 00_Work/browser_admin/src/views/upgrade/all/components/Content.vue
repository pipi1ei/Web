<template>
  <div class="content">
    <div class="table-container">
      <el-table height="100%" :data="tableData" stripe border style="width: 100%" align="center">
        <el-table-column fixed type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column label="状态" align="center" width="80">
          <template slot-scope="scope">
            <span :class="isOnlie(scope.row)">{{ formatterStatus(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="strategyType" label="策略类型" align="center" width="80"></el-table-column>
        <el-table-column prop="strategyValue" label="策略值" align="center" width="100"></el-table-column>
        <el-table-column prop="upgradeInfo" label="升级信息" align="center" min-width="500"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="160"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center" width="160"></el-table-column>
        <el-table-column prop="description" label="描述" align="center" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="230">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status != 1"
              size="mini"
              type="success"
              @click="handOnlineClick(scope.row)"
            >上线</el-button>
            <el-button v-else size="mini" type="warning" @click="handOfflineClick(scope.row)">下线</el-button>
            <el-button
              size="mini"
              type="primary"
              :disabled="canOperate(scope.row)"
              @click="handEditClick(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="canOperate(scope.row)"
              @click="handDeleteClick(scope.row)"
            >删除</el-button>
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
  name: "AllContent",
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
  methods: {
    // 格式化表格状态栏
    formatterStatus(tableItem) {
      return tableItem.status === "1" ? "上线" : "下线";
    },
    isOnlie(tableItem) {
      return tableItem.status === "1" ? { online: true } : { offline: true };
    },
    // 控制操作栏按钮能否点击
    canOperate(tableItem) {
      return tableItem.status === "1";
    },
    // 上线
    handOnlineClick(tableItem) {
      this.$emit("handOnlineClick", tableItem);
    },
    // 下线
    handOfflineClick(tableItem) {
      this.$emit("handOfflineClick", tableItem);
    },
    // 编辑
    handEditClick(tableItem) {
      this.$emit("handEditClick", tableItem);
    },
    // 删除
    handDeleteClick(tableItem) {
      this.$emit("handDeleteClick", tableItem);
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
  height: calc(100% - 82px);
}

.online {
  color: #00a854;
}

.offline {
  color: #f04133;
}
</style>