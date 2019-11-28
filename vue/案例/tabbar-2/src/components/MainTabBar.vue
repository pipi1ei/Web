<template>
  <tab-bar>
      <tab-bar-item path='/home'>
        <img slot="item-icon" src="@/assets/images/tabbar/home.png">
        <img slot="item-icon-active" src="@/assets/images/tabbar/home_active.png">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category'>
        <img slot="item-icon" src="@/assets/images/tabbar/category.png">
        <img slot="item-icon-active" src="@/assets/images/tabbar/category_active.png">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path='/shopcart'>
        <img slot="item-icon" src="@/assets/images/tabbar/shopcart.png">
        <img slot="item-icon-active" src="@/assets/images/tabbar/shopcart_active.png">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/profile'>
        <img slot="item-icon" src="@/assets/images/tabbar/profile.png">
        <img slot="item-icon-active" src="@/assets/images/tabbar/profile_active.png">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '@/components/tabbar/TabBar'
import TabBarItem from '@/components/tabbar/TabBarItem'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>