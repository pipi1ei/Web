<template>
  <div id="app">
    <h1>我是App内容</h1>
    <router-link to='/home' tag='button'>首页</router-link>
    <router-link to='/about' replace>关于</router-link>
    <router-link :to='"/user/"+id' >用户</router-link>
    <p>{{ gid }}</p>
    <!-- <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button> -->
    <router-view></router-view>
  </div>
</template>

<script>
import home from './components/Home'
import about from './components/About'

export default {
  name: 'App',
  data(){
    return {
      id:'zhangsan'
    }
  },
  computed:{
    gid(){
      return this.$route.params.id
    }
  },
  components: {
    home,
    about
  },
  methods: {
    homeClick(){
      console.log('homeClick')
      this.$router.push('home')
    },
    aboutClick(){
      console.log('aboutClick')
      // this.$router.push('about')
      this.$router.replace('about')
    }
  }
}
</script>
 
<style>
 .router-link-active{
    color: #f00
  }
</style>
