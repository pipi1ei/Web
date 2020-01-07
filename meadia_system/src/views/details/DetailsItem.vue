<template>
  <div class="item-container">
    <el-card class="card-box">
      <el-row>
        <div class="content">
          <div class="poster ">
            <div class="poster-container">
              <slot name="poster"></slot>
            </div>
          </div>

          <div class="info ">
            <div class="name">
              <!-- <slot name="name"></slot> -->
              <span>{{data.name}}</span>
            </div>
            
            <el-row>
              <el-col :span="24">
                <span style="color: #757575; margin-right: 10px;">导演</span>
                <!-- <slot name="director"></slot> -->
                <span>{{getInfo(data.director)}}</span>
              </el-col>
            </el-row>
            <el-row>
              <span style="color: #757575; margin-right: 10px;">演员</span>
              <!-- <slot name="actor"></slot> -->
              <span>{{getInfo(data.actor)}}</span>
            </el-row>
            <el-row>
              <span style="color: #757575; margin-right: 10px;">类型</span>
              <!-- <slot name="category"></slot> -->
              <span>{{getInfo(data.type)}}</span>
            </el-row>
            <el-row>
              <span style="color: #757575; margin-right: 10px;">语言</span>
              <!-- <slot name="language"></slot> -->
              <span>{{getInfo(data.language)}}</span>
            </el-row>
            <el-row>
              <span style="color: #757575; margin-right: 10px;">地区</span>
              <!-- <slot name="region"></slot> -->
              <span>{{getInfo(data.region)}}</span>
            </el-row>
            <el-row>
              <span style="color: #757575; margin-right: 10px;">上映时间</span>
              <!-- <slot name="releaseDate"></slot> -->
              <span>{{getReleaseDate(data.releaseDate)}}</span>
            </el-row>
          </div>
        </div>

        <el-col :span="24" class="intro">
          <div style="color: #757575; margin-bottom: 8px;">简介：</div>
          <!-- <slot name="introduction"></slot> -->
          <span>{{data.introduction}}</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DetailsItem",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
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
      } else {
        return "空";
      }
    }
  }
};
</script>

<style lang="less">
.item-container {
  width: 100%;
  text-align: center;

  .card-box{
    border: 1px solid #ccc;
  }

  .title {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  .content {
    display: flex;
    width: 100%;
    min-height: 180px !important;

    .poster {
      min-width: 120px;
      // max-width: 150px;
      width: 25%;
      
      margin-right: 20px;
      border-radius: 5px;
      position: relative;

      .poster-container {
        margin: auto 0;
        width: 100%;
        border-radius: 5px;
        // position: relative;
        img {
          width: 100%;
          border-radius: 5px;
        }

        #score {
          position: absolute;
          // bottom: 3px;
          top: 0;
          right: 0;
          width: 40px;
          height: 25px;
          line-height: 25px;
          color: #fff;
          background-color: #515151;
          font-weight: 600;
          font-size: 17px;
          border-top-right-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        #hot {
          position: absolute;
          bottom: 3px;
          left: 0;
          width: 100%;
          height: 25px;
          line-height: 25px;
          background-color: #a1a1a1;
          color: #b70000;
          font-size: 17px;
          font-weight: bold;
          text-align: left;
          padding-left: 25px;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          // border-top: 50px solid red;
          // border-right: 60px solid transparent;
          img{
            width: 16px;
            height: 17px;
            position: absolute;
            left: 5px;
            top: 3px;
            display: block;
            margin-right: 10px;
          }
        }

        #hot-value {
          position: absolute;
          top: 10px;
          left: 3px;
          z-index: 100;
          color: #fff;
          font-size: 10px;
          font-weight: 600;
        }
      }
    }
  }

  .info {
    text-align: left;
    line-height: 1.5;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .name {
      font-size: 16px;
      font-weight: 600;
      line-height: 1;
    }
  }

  .intro {
    margin-top: 10px;
    text-align: justify;
    line-height: 1.5;
    min-height: 200px;
  }
}
</style>