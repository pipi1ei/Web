<template>
    <!-- 媒资详情组件 -->
    <el-container class="md-content">
      <media-details-top :headerData="data"></media-details-top>
      <media-details-content :contentData="data"></media-details-content>
    </el-container>
</template>

<script>
import MediaDetailsTop from "./children/MediaDetailsTop";
import MediaDetailsContent from "./children/MediaDetailsContent";

export default {
  name: 'MediaDetails',
  components: {
    MediaDetailsContent,
    MediaDetailsTop
  },
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.data = this.$store.state.mediaDetails;
  },
  mounted() {

  }
}
</script>

<style scoped>
  .md-content{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>