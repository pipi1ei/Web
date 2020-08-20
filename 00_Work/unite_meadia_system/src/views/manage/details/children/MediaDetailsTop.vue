<template>
  <el-header>
    <div class="left">
      <img v-if="headerData.thumbnails" class="thumbnails" :src="headerData.thumbnails"/>
      <img v-else class="defalut-thumbnails" src="~assets/images/manage/thumbnails.png"/>
      <div class="info">
        <div class="box-top">
          <div class="name">{{headerData.name}}</div>
          <div v-show="headerData.category" class="category">{{arr2string(headerData.category)}}</div>
        </div>
        <div class="director">导演: {{arr2string(headerData.director)}}</div>
        <div class="sync-time">同步时间: {{getDate(headerData.updateTime)}}</div>
      </div>
    </div>
    <ul class="right">
      <li class="line">
        <p class="desc">媒资完整度</p>
        <p class="value">{{headerData.completionRatio}}%</p>
      </li>
      <li class="line">
        <p class="desc">媒资有效率</p>
        <p class="value">{{headerData.efficientRatio}}%</p>
      </li>
      <li>
        <p class="desc">状态</p>
        <p class="value" v-if="headerData.status==='0'">已上线</p>
        <p class="value" v-else-if="headerData.status==='1'">已下线</p>
        <p class="value" v-else>已剔除</p>
      </li>
    </ul>

    <!-- <div class="back" @click="backToList" title="返回">
      <img src="~/assets/images/manage/back.png" alt="">
    </div> -->
    <el-tooltip class="back" effect="dark" content="返回" placement="left">
      <img src="~/assets/images/manage/back.png" alt="" @click="backToList">
    </el-tooltip>
  </el-header>
</template>

<script>
export default {
  name: "MediaDetailsTop",
  props: {
    headerData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    /* 字符串去除数组符号，双引号 */
    arr2string(str) {
      let array = JSON.parse(str || "[]");
      let result = "";
      for (let value of array) {
        if (value) {
          result += value + "，";
        }
      }
      return result.substring(0, result.length - 1) || '空';
    },
    getDate(strDate) {
      if(strDate){
        let date = strDate.split(".");
        return date[0];
      }
      return '';
    },
    /* 返回列表页 */
    backToList(){
      this.$router.push('/manage/list');
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: white;
  position: relative;
  height: 100px !important;
  width: 100%;
  display: flex;
  align-items: center;
  border-left: 10px solid rgba(240, 242, 245, 1);
  border-right: 10px solid rgba(240, 242, 245, 1);
  border-top: 1px solid rgba(240, 242, 245, 1);
}
.left {
  display: flex;
  align-items: center;
  height: 80px;
  .thumbnails {
    width: 60px;
    height: 80px;
    border-radius: 3px;
    margin-left: 20px;
    margin-right: 10px;
  }

  .defalut-thumbnails{
    width: 60px;
    height: 60px;
    border-radius: 3px;
    margin-left: 20px;
    margin-right: 10px;
  }

  .info{
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

    .box-top {
      .name {
        font-size: 18px;
        font-weight: bold;
        display: inline-block;
      }

      .category {
        font-size: 12px;
        background-color: rgba(255, 170, 0, 1);
        display: inline-block;
        border-radius: 3px;
        margin: 0 5px;
        padding: 3px 10px;
        color: #fff;
      }
    }

    .director {
      font-size: 12px;
      color: #989898;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 300px;
      cursor: pointer;

      &:hover {
        overflow: visible;
      }
    }

    .sync-time {
      font-size: 12px;
      color: #989898;
      text-align: left;
    }
  }
}

.right {
  flex: 1;
  height: 100%;

  li {
    float: left;
    width: 33.333%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .desc {
      color: rgba(0, 0, 0, 0.447059);
      font-size: 14px;
      margin-bottom: 10px;
    }

    .value {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.847059);
    }
  }
}

.line::after {
  content: "";
  position: absolute;
  right: 0;
  top: 15%;
  width: 1px;
  height: 70%;
  background-color: #ddd;
}

.back{
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;

  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>