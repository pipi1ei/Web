<template>
  <div class="item-container">
    <el-card class="card-box">
      <el-row>
        <el-col :span="24" class="title">
          <slot name="title"></slot>
        </el-col>

        <div class="content">
          <div class="poster card">
            <div class="poster-container">
              <slot name="poster"></slot>
            </div>
          </div>

          <div class="info card">
            <!-- <slot name="info"></slot> -->
            <div class="name">
              <slot name="name"></slot>
            </div>
            <el-row>
              <el-col :span="24">
                <span style="color: #f00">上映时间：</span>
                <slot name="releaseDate"></slot>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span style="color: #f00">导演：</span>
                <slot name="director"></slot>
              </el-col>
            </el-row>
            <el-row>
              <span style="color: #f00">演员：</span>
              <slot name="actor"></slot>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <slot name="language"></slot>
              </el-col>
              <el-col :span="12">
                <slot name="region"></slot>
              </el-col>
            </el-row>
          </div>
        </div>

        <el-col :span="24" class="intro card">
          <span style="color: #f00">简介：</span>
          <slot name="introduction"></slot>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DetailsItem",
  data() {
    return {};
  }
};
</script>

<style lang="less">
.item-container {
  width: 100%;
  text-align: center;

  .title {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  .content {
    display: flex;
    width: 100%;

    .poster {
      min-width: 120px;
      max-width: 150px;
      margin-right: 10px;
      height: 100%;

      .poster-container {
        margin: auto 0;
        width: 100%;
        position: relative;
        img {
          width: 100%;
          // height: 100%;
        }

        #score {
          position: absolute;
          bottom: 3px;
          left: 0;
          width: 40px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          background-color: #ff0000;
          font-weight: 600;
          font-size: 12px;
        }

        #hot {
          position: absolute;
          top: 0;
          left: 0;
          color: #fff;
          border-top: 50px solid red;
          border-right: 60px solid transparent;
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
  }
}

.card {
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 10px;
}
</style>