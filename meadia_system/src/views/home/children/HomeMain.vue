<template>
  <el-container class="home-main">
    <el-header style="height: auto; margin-top: 20px;">
      <home-main-header @getMediaByName="getMediaByName" @switchProvider='switchProvider' />
    </el-header>
    <el-main>
      <!-- <home-main-content ref="content" /> -->
      <home-content2 ref="content"></home-content2>
    </el-main>
  </el-container>
</template>

<script>
import HomeMainHeader from "./HomeMainHeader";
import HomeMainContent from "./HomeMainContent";
import HomeContent2 from "./HomeContent2";

export default {
  name: "HomeMain",
  components: {
    HomeMainHeader,
    HomeMainContent,
    HomeContent2
  },
  methods: {
    getMediaByName(name) {
      const content = this.$refs["content"];
      content.searchName = name;
      content.currentPage = 1;
      content.search(content.currentPage, content.pageSize, name);
    },
    switchProvider(productName){
      const content = this.$refs["content"];
      content.productName = productName
      content.search(content.currentPage,content.pageSize,"")
    }
  }
};
</script>

<style lang="less">
.home-main{
  background-color: #f5f5f5;
  max-width: 100%;

  .el-main{
    padding: 5px 20px;
    padding-top: 15px;
  }
}
</style>