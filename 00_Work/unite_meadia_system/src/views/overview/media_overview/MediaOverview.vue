<template>
  <!-- 媒资数据概览组件 -->
  <div class="overview-container">
    <!-- 头部 -->
    <overview-top />
    <!-- 数据部分 -->
    <overview-content />
  </div>
</template>

<script>
import OverviewTop from './children/OverviewTop';
import OverviewContent from './children/OverviewContent';

export default {
  name: 'MediaOverview',
  components: {
    OverviewTop,
    OverviewContent
  }
}
</script>

<style scoped>
  .overview-container{
    padding: 10px 20px 50px;
    border-top: 13px solid #F1F3F4;
  }
</style>