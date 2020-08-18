<template>
  <div class="view-container">
    <tag-filter
      :filter.sync="filter"
      @handleQueryClick="handleQueryClick"
      @handleAddClick="add"
    />
    <tag-content
      :tableData="tableData"
      :paging="paging"
      @handleDeleteClick="remove"
      @handleSizeChange="getTagList"
      @handleCurrentChange="getTagList"
    />
    <tag-dialog
      ref="dialog"
      :dialogSetting.sync="dialogSetting"
      @handleConfirm="handleDialogConfirm"
    />
  </div>
</template>

<script>
// 网络请求方法
import {
  getTagList,
  addTag,
  deleteTag
} from "network/tag";

// 子组件
import TagFilter from "./components/Filter";
import TagContent from "./components/Content";
import TagDialog from "./components/Dialog";

export default {
  name: "Tag",
  components: {
    TagFilter,
    TagContent,
    TagDialog
  },
  data() {
    return {
      //过滤条件
      filter: {
        tagName: "",
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
    // 获取标签数据
    async getTagList() {
      const reqeustParam = {
        pageNum: this.paging.pageNum,
        pageSize: this.paging.pageSize,
        userName: this.filter.operator,
        tagName: this.filter.tagName,
        startTime: this.filter.startTime,
        endTime: this.filter.endTime
      };
      try {
        const {
          data: { tagCount, sysTagUrlList }
        } = await getTagList(reqeustParam);
        log("getTagList: ", { tagCount, sysTagUrlList });
        this.tableData = sysTagUrlList;
        this.paging.total = tagCount;
      } catch (e) {
        console.log("getTagList: error => ", e);
        this.tableData = [];
        this.paging.total = 0;
      }
    },
    handleQueryClick() {
      this.paging.pageNum = 1;
      this.getTagList();
    },
    // 新增一个标签
    add() {
      this.dialogSetting.visible = true;
    },
    // 删除一个标签
    remove(tableItem) {
      this.$confirm("确认删除？", "警告", {
        confirmBtnText: "确定",
        cancelBtnText: "确定",
        type: "warning"
      })
        .then(async () => {
          const { id } = tableItem;
          try {
            const res = await deleteTag(id);
            this.$message.success("删除成功");
            this.getTagList();
          } catch (e) {
            console.log("deleteTag: error => ", e);
          }
        })
        .catch(() => {
          log("取消删除标签");
        });
    },
    // 点击 dialog 确定按钮
    async handleDialogConfirm(tagItem) {
      log(tagItem)
      const reqeustParam = {
        tagName: tagItem.tagName,
        tagUrl: tagItem.tagUrl,
        urlWhite: tagItem.urlWhite,
        info: tagItem.info,
        userName: this.userName
      };
      try {
        await addTag(reqeustParam);
        this.$refs.dialog.closeDialog();
        this.getTagList();
      } catch (e) {
        console.log("addTag: error", e);
      }
    }
  },
  created() {
    this.getTagList();
  }
};
</script>

<style lang="scss" scoped>
</style>