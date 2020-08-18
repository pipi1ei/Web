<template>
  <div class="view-container">
    <single-filter @handAddClick="addAll" />
    <single-content
      :tableData="tableData"
      :paging.sync="paging"
      @handOnlineClick="online"
      @handOfflineClick="offline"
      @handEditClick="edit"
      @handDeleteClick="deleteAll"
      @handleSizeChange="getAllData"
      @handleCurrentChange="getAllData"
    />
    <single-dialog
      ref="dialog"
      :dialogSetting.sync="dialogSetting"
      @handleDialogConfirm="handleDialogConfirm"
    />
  </div>
</template>

<script>
// 网络请求方法
import {
  getGlobalUpgrade,
  addGlobalUpgrade,
  deleteGlobalUpgrade,
  updateGlobalUpgrade
} from "network/upgrade";

import SingleFilter from "./components/Filter";
import SingleContent from "./components/Content";
import SingleDialog from "./components/Dialog";

export default {
  name: "All",
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
        title: "新增",
        visible: false,
        isEdit: false
      }
    };
  },
  methods: {
    // 获取全网升级数据
    async getAllData() {
      const requestParam = {
        pageNum: this.paging.pageNum,
        pageSize: this.paging.pageSize
      };
      try {
        const res = await getGlobalUpgrade(requestParam);
        log("getAllData: res => ", res);
        const {
          data: { sysGlobalUpgradeList, upgradeCount }
        } = res;
        this.tableData = sysGlobalUpgradeList;
        this.paging.total = upgradeCount;
      } catch (e) {
        console.log("getAllData: error => ", e);
      }
    },
    // 新增全网升级
    addAll() {
      this.dialogSetting.title = "新增全网";
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
        await updateGlobalUpgrade(requestParam);
        this.$message.success("上线成功");
        this.getAllData();
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
            await updateGlobalUpgrade(requestParam);
            this.$message.success("下线成功");
            this.getAllData();
          } catch (e) {
            console.log("offline: error => ", e);
          }
        })
        .catch(e => {
          log("取消下线全网升级");
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
    // 删除全网升级
    deleteAll(tableItem) {
      this.$confirm("确定删除？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await deleteGlobalUpgrade({
              strategyValue: tableItem.strategyValue
            });
            this.$message.success("删除成功");
            this.getAllData();
          } catch (e) {
            console.log("deleteAll: error => ", e);
          }
        })
        .catch(e => {
          log("取消删除全网升级");
        });
    },
    // 点击 dialog 确定键
    async handleDialogConfirm(allInfo) {
      const requestParam = { ...allInfo };
      const isEdit = this.dialogSetting.isEdit;
      if (isEdit) {
        // 编辑操作
        try {
          await updateGlobalUpgrade(requestParam);
          this.$message.success("修改成功");
          this.$refs.dialog.closeDialog();
          this.getAllData();
        } catch (e) {
          console.log("updateGrayscaleUpgrade: error => ", e);
        }
      } else {
        // 新增全网
        try {
          await addGlobalUpgrade(requestParam);
          this.$message.success("新增成功");
          this.$refs.dialog.closeDialog();
          this.getAllData();
        } catch (e) {
          console.log("updateGrayscaleUpgrade: error => ", e);
        }
      }
    }
  },
  created() {
    this.getAllData();
  }
};
</script>