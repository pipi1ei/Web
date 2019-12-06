<template>
  <el-container class="home-container">
    <home-slide />
    <router-view />
  </el-container>
</template>

<script>
import HomeSlide from './children/HomeSlide'

export default {
  name: 'Home',
  components: {
    HomeSlide,
  }
}
</script>

<style lang="less">
  .home-container{
    height: 100% !important;
  } 
 
</style>