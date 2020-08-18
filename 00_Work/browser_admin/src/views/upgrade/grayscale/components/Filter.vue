<template>
  <el-row :gutter="20" class="container">
    <el-col :span="2">
      <el-button type="primary" @click.native.prevent="handBtnClick">新增</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "GrayscaleFilter",
  methods: {
    handBtnClick() {
      this.$emit("handAddClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 10px;
  height: 40px;
}
</style>