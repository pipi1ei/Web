<template>
  <el-dialog :visible.sync="dialogVisible" width="80%" top="5vh">
    <div class="d-box">
      <!-- 补全前媒资数据 -->
      <div class="before">
        <h2 style="text-align:center; margin-bottom:10px;">before</h2>
        <details-item :data='beforeCompletion'>
          <div v-if="beforeCompletion.thumbnails" slot="poster">
            <img :src="beforeCompletion.thumbnails" />
          </div>
        </details-item>
      </div>

      <!-- 中间右箭头 -->
      <div class="center">
        <img src="~assets/images/details/right_arrow.png" alt="">
      </div>

      <!-- 补全后媒资数据 -->
      <div class="after">
        <h2 style="text-align:center; margin-bottom:10px;">after</h2>
        <details-item :data='afterCompletion'>
          <div v-if="afterCompletion.thumbnails" slot="poster">
            <img :src="afterCompletion.thumbnails" />
            <div id="hot" v-if="afterCompletion.hot && afterCompletion.hot > 0">
              <img src="~assets/images/home/hot.png" alt="">
              {{afterCompletion.hot}}</div>
            <div
              id="score"
              v-if="afterCompletion.grade && afterCompletion.grade > 0"
            >{{afterCompletion.grade}}</div>
          </div>
        </details-item>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import DetailsItem from "./DetailsItem";

export default {
  name: "Details",
  data() {
    return {
      dialogVisible: false, // 对话框是否显示
      beforeCompletion: {}, // 补全前的媒资
      afterCompletion: {} // 补全后的媒资
    };
  },
  components: {
    DetailsItem
  },
};
</script>

<style lang="less">
  .el-dialog__body{
    padding-top: 0;
  }
  .d-box{
    width: 100%;
    display: flex;

    .center{
      width: 60px;
      position: relative;
      img{
        width: 40px;
        height: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -20px;
        margin-left: -20px;
      }
    }

    .before,
    .after{
      flex: 1;
    }
  }
</style>