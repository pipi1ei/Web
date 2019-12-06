<template>
<div class="details">
  <el-dialog title="" :visible.sync="dialogVisible" width='60%' top='10vh'>
    <div class="details-container">
      <details-item>
        <h2 slot="title">媒资补全前</h2>
        <div slot='left' class="left">
          <div class="left-content">
            <img :src="beforeCompletion.thumbnails" alt="">
          </div>
        </div>

        <div slot="right" class="right">
          <div class="item name">{{ beforeCompletion.name }}</div>
          <div class="item">
            <span style="color:red">导演：</span>
            {{ array2String(beforeCompletion.director) }}
          </div>
          <div class="item">
            <span style="color:red">演员：</span>
            {{ array2String(beforeCompletion.actor) }}
          </div>
          <div class="item">
            <span style="color:red">上映日期：</span>
            {{ resolvingDate(beforeCompletion.releaseDate) }}
          </div>
        </div>

        <div slot="introduction" class="introduction"><span style="color: red">简介：</span>{{ beforeCompletion.introduction }}</div>


      </details-item>
      <div class="line"></div>
      <details-item>
        <h2 slot="title">媒资补全后</h2>

        <div slot='left' class="left">
          <div class="left-content">
            <div v-if='afterCompletion.hot && afterCompletion.hot > 0'>
              <div class="hot-value">{{afterCompletion.hot}}</div>
              <div class='hot-style'></div>
            </div>
            
            <div v-if='afterCompletion.grade && afterCompletion.grade > 0'>
              <div class="grade">{{ afterCompletion.grade }}</div>
            </div>
            
            <img :src="afterCompletion.thumbnails" alt="">
          </div>
        </div>

        <div slot="right" class="right">
          <div class="item name">{{ afterCompletion.name }}</div>
          <div class="item">
            <span style="color:red">导演：</span>
            {{ array2String(afterCompletion.director) }}
          </div>
          <div class="item">
            <span style="color:red">演员：</span>
            {{ array2String(afterCompletion.actor) }}
          </div>
          <div class="item">
            <span style="color:red">上映日期：</span>
            {{resolvingDate(afterCompletion.releaseDate)}}
            </div>
          <div class="item slot">
            <div class="lan">
              <div slot="lan">
                <span style="color: red">语言：</span>
                {{ array2String(afterCompletion.language) }}
              </div>
            </div>
            <div class="area">
              <div slot="area">
                <span style="color: red">区域：</span>
                {{ array2String(afterCompletion.region) }}
              </div>
            </div>
          </div>
        </div>

        <div slot="introduction" class="introduction">
          <span style="color: red">简介：</span>
          {{ afterCompletion.introduction }}
        </div>
        
      </details-item>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import DetailsItem from './DetailsItem'

  export default {
    name: "Details",
    data() {
      return {
        dialogVisible: false,
        beforeCompletion: {},
        afterCompletion: {}
      }
    },
    components: {
      DetailsItem
    },
    methods: {
      array2String(str){
        if(str){
          return str.replace('[', '').replace(']', '').replace(new RegExp('\"', "g"), '')
        }
      },
      resolvingDate(date){
        let d = new Date(date);
        let month = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
        let day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
        let hours = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
        let min = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
        let sec = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();

        let times=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
        return times
      }
    }
  };
</script>

<style lang="less">
  .details{
    // width: 80%;
    // height: 90%;
    // display: flex;
    // position: relative;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%,-50%);

    // .line{
    //   width: 25px;
    // }
  }

  .details-container{
    display: flex;
    .line{
      width: 25px;
    }
  }
</style>
