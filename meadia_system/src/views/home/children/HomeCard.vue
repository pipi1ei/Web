<template>
  <div class="home-card" @click="click">
    
    <div class="left">
      <img :src="mediaData.thumbnails" alt="">
    </div>
    <div class="right">
      <div class="right-item name">{{mediaData.name}}</div>
      <div class="right-item"><span class="director">导演</span>{{getInfo(mediaData.director)}}</div>
      <div class="right-item"><span class="actor">演员</span>{{getInfo(mediaData.actor)}}</div>
      <div class="right-item"><span class="lang">语言</span>{{getInfo(mediaData.language)}}</div>
      <div class="right-item"><span class="region">地区</span>{{getInfo(mediaData.region)}}</div>
      <div class="right-item"><span class="date">上映日期</span>{{getReleaseDate(mediaData.releaseDate)}}</div>
    </div>
    <div class="logo">
      <img src="~assets/images/home/logo.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCard',
  props: {
    mediaData: {
      required: true
    }
  },
  methods: {
      click(){
        console.log('cardclick')
        this.$emit('showDetails')
      },
      /* 字符串去除数组符号，双引号 */
      array2String(str) {
      let array = JSON.parse(str || '[]')
      // return array.join(',')

      let result = ''
      for(let value of array){
        // 后台接口返回的数组中有空值，使用join 方法会多出 ","
        if(value){
          result += (value + ',')
        }
      }
      return result.substring(0, result.length -1)
    },
      getInfo(info) {
        if (this.array2String(info) === "") {
          return "空";
        } else {
          return this.array2String(info);
        }
      },
      getReleaseDate(date){
        if(date){
          let array = date.split('T');
          return array[0]
          // return "2001"
        }else{
          return "空"
        }
      },
      formatDate(utc_data){

      }
    },
}
</script>

<style lang="less" scoped>
  .home-card{
      position: relative;
      background-color: #fff;
      min-height: 200px;
      height: 100%;
      width: 100%;
      border: 1px solid #b1b1b1;
      padding: 10px;
      display: flex;
      border-radius: 5px;
      &:hover{
        cursor: pointer;
        border-color: #5273ee;
        transform: translate(0, -5px);
        box-shadow: 2px 2px 10px rgba(0,0,0, .5);
      }

      .left{
        width: 35%;
        height: 100%;
        margin: auto 0;
        margin-right: 10px;
        img{
          width: 100%;
          height: auto;
          display: block;
          border-radius: 5px;
          
        }
      }

      .right{
        flex: 1;
        padding: 0 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow:hidden;

        .right-item{
          font-size: 12px;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;

          span{
            color: #757575;
            margin-right: 10px;
          }
        }

        .name{
          font-weight: bold;
          font-size: 17px;
        }
      }

      .logo{
        position: absolute;
        top: -1px;;
        right: -1px;
        width: 20px;
        height: 20px;
        background-color: #5273ee;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;

        img{
          width: 100%;
          height: 100;
          display: block;
          border-top-right-radius: 5px;
          border-bottom-left-radius: 5px;
        }
      }
  }
</style>