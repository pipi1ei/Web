<template>
  <div class="home-recommend">
    <div v-for="item in recommends" :key="item.sort" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style lang="less">
  .home-recommend{
    display: flex;
    width: 100%;
    margin-top: 10px;
    padding-bottom: 20px;
    border-bottom: 10px solid #eee;

    .recommend-item{
      flex: 1;
      text-align: center;
      a{
        display: block;
        width: 100%;
        &:hover{
          cursor: pointer;
        }
        img{
          width: 80%;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>