<template>
  <div class="view-container">
    <whitelist-filter
      :filter.sync="filter"
      @handleQueryClick="handleQueryClick"
      @handleAddClick="add"
    />
    <whitelist-content 
      :tableData="tableData"
      :paging="paging"
      @handleDeleteClick="remove"
      @handleSizeChange="getWhitelistInfo"
      @handleCurrentChange="getWhitelistInfo"
    />
    <whitelist-dialog 
      ref="dialog"
      :dialogSetting.sync="dialogSetting"
      @handleConfirm="handleDialogConfirm"
    />
  </div>
</template>

<script>
// 网络请求方法
import {
  getWhitelist,
  addWhiteList,
  deleteWhitelist
} from "network/whitelist";

import WhitelistFilter from "./components/Filter";
import WhitelistContent from "./components/Content";
import WhitelistDialog from "./components/Dialog";

export default {
  name: "Whitelist",
  components: {
    WhitelistFilter,
    WhitelistContent,
    WhitelistDialog
  },
  data() {
    return {
      //过滤条件
      filter: {
        startTime: "",
        endTime: "",
        operator: ""
      },
      //分页信息
      paging: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      // 表格数据
      tableData: [],
      // 对话框
      dialogSetting: {
        title: "标签配置",
        visible: false
      }
    };
  },
  computed: {
    userName() {
      return this.$store.getters.name;
    }
  },
  methods: {
    // 获取白名单数据
    async getWhitelistInfo() {
      const reqeustParam = {
        pageNum: this.paging.pageNum,
        pageSize: this.paging.pageSize,
        userName: this.filter.operator,
        startTime: this.filter.startTime,
        endTime: this.filter.endTime
      };
      try {
        const {
          data: { urlWhiteCount, sysUrlWhiteList }
        } = await getWhitelist(reqeustParam);
        log("getWhitelistInfo: ", { urlWhiteCount, sysUrlWhiteList });
        this.tableData = sysUrlWhiteList;
        this.paging.total = urlWhiteCount;
      } catch (e) {
        console.log("getWhitelistInfo: error => ", e);
        this.tableData = [];
        this.paging.total = 0;
      }
    },
    handleQueryClick() {
      this.paging.pageNum = 1;
      this.getWhitelistInfo();
    },
    // 新增一个白名单
    add() {
      this.dialogSetting.visible = true;
    },
    // 删除一个白名单
    remove(whitelistItem) {
      log(whitelistItem)
      this.$confirm("确认删除？", "警告", {
        confirmBtnText: "确定",
        cancelBtnText: "确定",
        type: "warning"
      })
        .then(async () => {
          // 删除白名单
          const { id } = whitelistItem;
          try {
            await deleteWhitelist(id);
            this.$message.success("删除成功");
            this.getWhitelistInfo();
          } catch (e) {
            console.log("deleteWhitelist: error => ", e);
          }
        })
        .catch(() => {
          log("取消删除白名单");
        });
    },
    // 点击 dialog 确定按钮
    async handleDialogConfirm(whitelistItem) {
      const reqeustParam = {
        urlWhite: whitelistItem.whitelist,
        userName: this.userName
      };
      try {
        await addWhiteList(reqeustParam);
        this.$refs.dialog.closeDialog();
        this.$message.success("新增成功");
        this.getWhitelistInfo();
      } catch (e) {
        console.log("addWhiteList: error", e);
      }
    }
  },
  created() {
    this.getWhitelistInfo();
  }
};
</script>

<style lang="scss" scoped>
</style>