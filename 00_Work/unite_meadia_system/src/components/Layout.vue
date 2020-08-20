<template>
  <el-container class="layout-container">
    <slide-menu ref="slideMenu" />
    <el-main class="content">
      <top-bar @collapseMenu="collapseMenu" />
      <!-- 路由保活。将 name=MediaDetails,MediaList 的组件排除在外 -->
      <!-- <keep-alive exclude="MediaOverview,MediaQualityMonitor,MediaDetails,MediaList">
        <router-view />
      </keep-alive> -->
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import SlideMenu from './common/SlideMenu';
import TopBar from './TopBar';

export default {
  name: 'Layout',
  methods: {
    collapseMenu(isCollapse){
      this.$refs.slideMenu.isCollapse = isCollapse;
    }
  },
  components: {
    SlideMenu,
    TopBar
  }
}
</script>

<style scoped>
.layout-container {
  min-height: 100% !important;
  min-width: 1280px;
}

.layout-container .content{
  padding: 0;
  display: flex;
  flex-direction: column;
}
</style>