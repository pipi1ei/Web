<template>
  <el-dialog :visible.sync="dialogVisible" width="80%" top="10vh">
    <el-row :gutter="20" class="details-container">
      <!-- 补全前媒资 -->
      <el-col :span="12">
        <details-item>
          <h2 slot="title">媒资补全前</h2>
          <img slot="poster" :src="beforeCompletion.thumbnails" alt />
          <div slot="name">{{ beforeCompletion.name }}</div>
          <span slot="releaseDate">{{getYear(beforeCompletion.releaseDate)}}年</span>
          <span slot="director">{{getInfo(beforeCompletion.director)}}</span>
          <span slot="actor">{{getInfo(beforeCompletion.actor)}}</span>
          <span slot="introduction">{{array2String(beforeCompletion.introduction)}}</span>
        </details-item>
      </el-col>

      <!-- 补全后媒资 -->
      <el-col :span="12">
        <details-item>
          <h2 slot="title">媒资补全后</h2>

          <img slot="poster" :src="afterCompletion.thumbnails" alt />
          <div slot="poster" id="hot" v-if="afterCompletion.hot && afterCompletion.hot > 0"></div>
          <div
            slot="poster"
            id="hot-value"
            v-if="afterCompletion.hot && afterCompletion.hot > 0"
          >{{afterCompletion.hot}}</div>
          <div
            slot="poster"
            id="score"
            v-if="afterCompletion.grade && afterCompletion.grade > 0"
          >{{afterCompletion.grade}}</div>

          <div slot="name">{{ afterCompletion.name }}</div>
          <span slot="releaseDate">{{getYear(afterCompletion.releaseDate)}}年</span>
          <span slot="director">{{getInfo(afterCompletion.director)}}</span>
          <span slot="actor">{{getInfo(afterCompletion.actor)}}</span>
          <div slot="language">
            <span style="color: #f00">语言：</span>
            {{ getInfo(afterCompletion.language) }}
          </div>

          <div slot="region">
            <span style="color: #f00">区域：</span>
            {{ getInfo(afterCompletion.region) }}
          </div>
          <span slot="introduction">{{array2String(afterCompletion.introduction)}}</span>
        </details-item>
      </el-col>
    </el-row>
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
  methods: {
    array2String(str) {
      if (str) {
        return str
          .replace("[", "")
          .replace("]", "")
          .replace(new RegExp('"', "g"), "");
      }
    },
    getYear(date) {
      let d = new Date(date);
      return d.getFullYear();
    },
    getInfo(info) {
      if (this.array2String(info) === "") {
        return "空";
      } else {
        return this.array2String(info);
      }
    }
  }
};
</script>

<style lang="less">
</style>