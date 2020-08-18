<template>
  <div class="view-container">
    <single-filter @handAddClick="addSingle" />
    <single-content
      :tableData="tableData"
      :paging.sync="paging"
      @handDeleteClick="deleteSingle"
      @handleSizeChange="getSingleData"
      @handleCurrentChange="getSingleData"
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
  getSingleUpgrade,
  addSingleUpgrade,
  deleteSingleUpgrade
} from "network/upgrade";

import SingleFilter from "./components/Filter";
import SingleContent from "./components/Content";
import SingleDialog from "./components/Dialog";

export default {
  name: "Single",
  components: {
    SingleFilter,
    SingleContent,
    SingleDialog
  },
  data() {
    return {
      tableData: [],
      paging: {
        total: 0,
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
    // 获取单点升级数据
    async getSingleData() {
      const requestParam = {
        pageNum: this.paging.pageNum,
        pageSize: this.paging.pageSize
      };
      try {
        const res = await getSingleUpgrade(requestParam);
        log("getSingleData: res => ", res);
        const {
          data: { sysSingleUpgradeList, upgradeCount }
        } = res;
        this.tableData = sysSingleUpgradeList;
        this.paging.total = upgradeCount;
      } catch (e) {
        console.log(e);
      }
    },
    // 新增单点
    addSingle() {
      this.dialogSetting.title = "新增单点";
      this.dialogSetting.isEdit = false;
      this.dialogSetting.visible = true;
    },
    // 删除单点
    deleteSingle(tableItem) {
      log(tableItem);
      this.$confirm("确认删除？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await deleteSingleUpgrade({
              strategyValue: tableItem.strategyValue
            });
            this.$message.success("删除成功");
            this.getSingleData();
          } catch (e) {
            console.log(e);
          }
        })
        .catch(e => {
          log("取消删除单点升级");
        });
    },
    // 点击新增对话框确定按钮
    async handleDialogConfirm(singleInfo) {
      const requestParam = { ...singleInfo };
      try {
        await addSingleUpgrade(requestParam);
        this.$message.success("新增成功");
        this.$refs.dialog.closeDialog();
        this.getSingleData();
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    this.getSingleData();
  }
};
</script>