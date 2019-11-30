<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners='banners' />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'

import {getHomeMultiData} from 'network/home'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper
  },
  data(){
    return {
      banners: null,
      recommend: null
    }
  },
  created(){
    // 1. 请求多个数据
    getHomeMultiData().then(res => {
      this.banners = res.data.data.banner.list
      this.recommend = res.data.data.recommend.list
    })
  }
}
</script>

<style lang="less">
  .home-nav{
    background-color: var(--color-tint);
    color: #fff
  }
</style>