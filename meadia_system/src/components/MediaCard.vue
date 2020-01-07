<template>
  <div @click="click">
    <el-card class="media-card-container" shadow="never">
      <div class="left">
        <img v-if="mediaData.thumbnails" :src="mediaData.thumbnails" />
      </div>
      <div class="right">
        <div class="right-item name">
          <div class="zzz">{{mediaData.name}}</div>
        </div>
        <div class="right-item">
          <div class="zzz">
            <span>导演</span>
            {{getInfo(mediaData.director)}}
          </div>
        </div>
        <div class="right-item">
          <div class="zzz">
            <span>演员</span>
            {{getInfo(mediaData.actor)}}
          </div>
        </div>
        <div class="right-item">
          <div class="zzz">
            <span>语言</span>
            {{getInfo(mediaData.language)}}
          </div>
        </div>
        <div class="right-item">
          <div class="zzz">
            <span>地区</span>
            {{getInfo(mediaData.region)}}
          </div>
        </div>
        <div class="right-item">
          <div class="zzz">
            <span>上映日期</span>
            {{getReleaseDate(mediaData.releaseDate)}}
          </div>
        </div>
      </div>
      <div class="logo" v-if="isCompletion">
        <img src="~assets/images/home/logo.png" alt />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MediaCard",
  props: {
    mediaData: {
      required: true
    }
  },
  computed: {
    isCompletion() {
      if (
        this.mediaData.resultState === "4" ||
        this.mediaData.resultState === "5" ||
        this.mediaData.resultState === "9"
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    click() {
      this.$emit("showDetails");
    },
    /* 字符串去除数组符号，双引号 */
    array2String(str) {
      let array = JSON.parse(str || "[]");
      // return array.join(',')

      let result = "";
      for (let value of array) {
        // 后台接口返回的数组中有空值，使用join 方法会多出 ","
        if (value) {
          result += value + " / ";
        }
      }
      return result.substring(0, result.length - 3);
    },
    getInfo(info) {
      if (this.array2String(info) === "") {
        return "空";
      } else {
        return this.array2String(info);
      }
    },
    getReleaseDate(date) {
      if (date) {
        let array = date.split("T");
        return array[0];
        // return "2001"
      } else {
        return "空";
      }
    },
    formatDate(utc_data) {}
  }
};
</script>

<style lang="less">
.media-card-container {
  width: 100%;
  border: 1px solid #b1b1b1;
  position: relative;
  box-sizing: border-box;
  // min-height: 200px;
  // display: flex;
  // align-items: center;
  &:hover {
    cursor: pointer;
    border-color: #5273ee;
    transform: translate(0, -5px);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  }

  .el-card__body {
    padding: 15px;
    width: 100%;
    display: flex;

    .left {
      width: 35%;
      height: 0;
      padding-bottom: 47%;
      overflow: hidden;
      margin-right: 15px;
      border-radius: 5px;
      img {
        width: 100%;
        border-radius: 5px;
        display: block;
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      overflow: hidden;
      .right-item {
        flex: 1;
        font-size: 12px;
        overflow: hidden;
        display: flex;
        align-items: center;
        .zzz {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .name {
        font-size: 17px;
        font-weight: bold;
      }
      span {
        color: #757575;
        margin-right: 10px;
      }
    }

    .logo {
      position: absolute;
      top: -1px;
      right: -1px;
      width: 20px;
      height: 20px;
      background-color: #5273ee;
      border-top-right-radius: 5px;
      border-bottom-left-radius: 5px;

      img {
        width: 100%;
        display: block;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
  }
}
</style>