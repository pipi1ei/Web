<template>
  <div class="gray-container">
    <!-- 灰度升级页 -->
    <div class="view-container">
      <single-filter @handAddClick="addGrayscale" />
      <single-content
        :tableData="tableData"
        :paging.sync="paging"
        @handOnlineClick="online"
        @handOfflineClick="offline"
        @handEditClick="edit"
        @handDeleteClick="deleteGrayscale"
        @handleSizeChange="getGrayscaleData"
        @handleCurrentChange="getGrayscaleData"
      />
      <single-dialog
        ref="dialog"
        :dialogSetting.sync="dialogSetting"
        @handleDialogConfirm="handleDialogConfirm"
      />
    </div>

    <!-- 灰度详情页 -->
    <div v-show="showDetails" class="details-container">
      <el-row :gutter="20" class="back-row">
        <el-col :span="2">
          <el-button type="primary" @click.native.prevent="back">返回</el-button>
        </el-col>
      </el-row>
      <!-- table -->
      <div class="content">
        <div class="table-container">
          <el-table height="100%" :data="detailsTableData" stripe border style="width: 100%">
            <el-table-column prop="strategyType" label="策略类型" align="center" width="80"></el-table-column>
            <el-table-column prop="strategyValue" label="策略值" align="center" width="100"></el-table-column>
            <el-table-column prop="upgradeInfo" label="升级信息" align="center" min-width="500"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center" width="150"></el-table-column>
            <el-table-column prop="description" label="描述" align="center" width="150"></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          @size-change="handleDetailsSizeChange"
          @current-change="handleDetailsCurrentChange"
          :current-page="DetailsPaging.pageNum"
          :page-sizes="[10, 20, 30]"
          :page-size="DetailsPaging.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="DetailsPaging.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// 网络请求方法
import {
  getGrayscaleUpgrade,
  addGrayscaleUpgrade,
  deleteGrayscaleUpgrade,
  updateGrayscaleUpgrade
} from "network/upgrade";

// 子组件
import SingleFilter from "./components/Filter";
import SingleContent from "./components/Content";
import SingleDialog from "./components/Dialog";

export default {
  name: "Grayscale",
  components: {
    SingleFilter,
    SingleContent,
    SingleDialog
  },
  data() {
    return {
      tableData: [],
      paging: {
        total: 100,
        pageNum: 1,
        pageSize: 10
      },
      dialogSetting: {
        title: "新增灰度",
        visible: false,
        isEdit: false
      },

      // ------------- 详情页数据 -------------
      showDetails: false,
      detailsTableData: [],
      DetailsPaging: {
        total: 200,
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    // 获取灰度升级数据
    async getGrayscaleData() {
      const requestParam = {
        pageNum: this.paging.pageNum,
        pageSize: this.paging.pageSize
      };
      try {
        const res = await getGrayscaleUpgrade(requestParam);
        log("getGrayscaleData: res => ", res);
        const {
          data: { sysGrayscaleUpgradeList, upgradeCount }
        } = res;
        this.tableData = sysGrayscaleUpgradeList;
        this.paging.total = upgradeCount;
      } catch (e) {
        console.log("getGrayscaleData: error => ", e);
      }
    },
    // 新增灰度
    addGrayscale() {
      this.dialogSetting.title = "新增灰度";
      this.dialogSetting.isEdit = false;
      this.dialogSetting.visible = true;
    },
    // 上线
    async online(tableItem) {
      const requestParam = {
        strategyValue: tableItem.strategyValue,
        status: "1"
      };
      try {
        await updateGrayscaleUpgrade(requestParam);
        this.$message.success("上线成功");
        this.getGrayscaleData();
      } catch (e) {
        console.log("online: error => ", e);
      }
    },
    // 下线
    offline(tableItem) {
      this.$confirm("确定下线？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const requestParam = {
            strategyValue: tableItem.strategyValue,
            status: "0"
          };
          try {
            await updateGrayscaleUpgrade(requestParam);
            this.$message.success("下线成功");
            this.getGrayscaleData();
          } catch (e) {
            console.log("offline: error => ", e);
          }
        })
        .catch(() => {
          log("取消下线灰度数据");
        });
    },
    // 编辑
    edit(tableItem) {
      const dialog = this.$refs.dialog;
      const keys = Object.keys(dialog.form);
      for (let key of keys) {
        dialog.form[key] = tableItem[key];
      }

      this.dialogSetting.title = "编辑";
      this.dialogSetting.isEdit = true;
      this.dialogSetting.visible = true;
    },
    // 展示详情
    showDetailsPage(tableItem) {
      this.showDetails = true;
      // 获取详情数据
    },
    // 删除灰度数据
    deleteGrayscale(tableItem) {
      this.$confirm("确定删除？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await deleteGrayscaleUpgrade({
              strategyValue: tableItem.strategyValue
            });
            this.$message.success("删除成功");
            this.getGrayscaleData();
          } catch (e) {
            console.log("deleteGrayscale: error => ", e);
          }
        })
        .catch(() => {
          log("取消删除灰度数据");
        });
    },
    // 点击 dialog 确定键
    async handleDialogConfirm(grayscaleInfo) {
      log("grayscaleInfo = ", grayscaleInfo);
      const requestParam = { ...grayscaleInfo };
      const isEdit = this.dialogSetting.isEdit;
      if (isEdit) {
        // 编辑操作
        try {
          await updateGrayscaleUpgrade(requestParam);
          this.$message.success("修改成功");
          this.$refs.dialog.closeDialog();
          this.getGrayscaleData();
        } catch (e) {
          console.log("updateGrayscaleUpgrade: error => ", e);
        }
      } else {
        // 新增操作
        try {
          await addGrayscaleUpgrade(requestParam);
          this.$message.success("新增成功");
          this.$refs.dialog.closeDialog();
          this.getGrayscaleData();
        } catch (e) {
          console.log("updateGrayscaleUpgrade: error => ", e);
        }
      }
    },

    /* -------------详情页相关方法------------- */
    // 获取详情页数据
    getDetailsData() {},
    // 返回上一级
    back() {
      this.showDetails = false;
    },
    handleDetailsSizeChange(val) {
      this.DetailsPaging.pageSize = val;
      this.getDetailsData();
    },
    handleDetailsCurrentChange(val) {
      this.DetailsPaging.pageNum = val;
      this.getDetailsData();
    }
  },
  created() {
    this.getGrayscaleData();
  }
};
</script>

<style lang="scss" scoped>
.gray-container {
  position: relative;
  height: calc(100vh - 50px);
  margin: -20px;

  .view-container {
    padding: 20px;
  }

  .details-container {
    position: absolute;
    z-index: 1000;
    width: 100%;
    height: 100%;
    padding: 20px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;

    .back-row {
      margin-bottom: 10px;
    }

    .content {
      height: calc(100% - 82px);
    }
  }
}
</style>