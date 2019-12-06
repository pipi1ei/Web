<template>
  <el-container class="home-main">
    <el-header style="height: auto; margin-top: 20px;">
      <home-main-header @getMediaByName='getMediaByName'/>
    </el-header>
    <el-main>
      <home-main-content ref="content" />
    </el-main>
  </el-container>
</template>

<script>
import HomeMainHeader from './HomeMainHeader'
import HomeMainContent from './HomeMainContent'

export default {
  name: 'HomeMain',
  components: {
    HomeMainHeader,
    HomeMainContent
  },
  methods : {
    getMediaByName(name){
      const content = this.$refs['content']
      content.searchName = name
      content.search(content.currentPage, content.pageSize, name)
    }
  }
}
</script>

<style lang="less">
</style>