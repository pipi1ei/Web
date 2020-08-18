<template>
  <el-row :gutter="20" class="filter-container">
    <el-col :span="5">
      <span class="label">标签名称：</span>
      <el-input size="small" v-model="filter.tagName" placeholder="请输入参数名称" clearable></el-input>
    </el-col>
    <el-col :span="9">
      <span class="label">添加时间：</span>
      <el-date-picker
        v-model="filter.startTime"
        size="small"
        placeholder="请选择开始时间"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <span class="separator">~</span>
      <el-date-picker
        v-model="filter.endTime"
        size="small"
        placeholder="请选择结束时间"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </el-col>
    <el-col :span="6">
      <span class="label">操作人：</span>
      <el-input
        size="small"
        v-model="filter.operator"
        placeholder="请输入操作人"
        style="min-width: 110px"
        clearable
      ></el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
      <el-button type="primary" size="small" @click="handleAddClick">新增</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "TagFilter",
  props: {
    filter: {
      type: Object,
      default() {
        return {
          tagName: "",
          startTime: "",
          endTime: "",
          operator: "",
        };
      }
    }
  },
  data() {
    return {
      // 设置日期选择器范围
      pickerOptions: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let oneMonthTime = 30 * 24 * 3600 * 1000;
          let oneMonth = curDate - oneMonthTime;
          return time.getTime() > Date.now() || time.getTime() < oneMonth;
        }
      }
    };
  },
  methods: {
    handleQueryClick() {
      this.$emit("handleQueryClick");
    },
    handleAddClick() {
      this.$emit("handleAddClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-container {
  font-size: 14px;

  .el-col {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .label {
      display: inline-block;
      min-width: 80px;
      text-align: right;
    }
  }
}

.separator {
  display: inline-block;
  margin: 0 5px;
}
</style>