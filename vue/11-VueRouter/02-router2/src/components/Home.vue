<template>
  <div>
    <h2>我是首页</h2>
    <p>我是首页内容</p>
    <router-link to='/home/news'>新闻</router-link>
    <router-link to='/home/message'>消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      path: '/home/news'
    }
  },
  created(){
    console.log('home created')
  },

  destroyed(){
    console.log('home destroyed')
  },

  // 这个回调只有该组件在 keep-alive 标签中才会回调
  activated(){
    console.log('home activated')
    this.$router.push(this.path)
  },
  deactivated(){
    console.log('home deactivated')
    // console.log(this.$route.path)
    // 这里 $route 对象就是当前活跃的 路由
    // this.path = this.$route.path
  },
  beforeRouteLeave(to, from, next){
    console.log(this.$route.path)
    this.path = this.$route.path
    next()
  }
}
</script>

<style scoped>
  
</style>