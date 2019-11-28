<template>
  <div id="app">
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>
    <router-link :to='"/user/"+id'>用户</router-link>
    <!-- <router-link :to='profile'>档案</router-link> -->
    <button @click="proClick">档案</button>
    <!-- 将 name=Profile 的组件排除在外 -->
    <keep-alive exclude="Profile">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      id: 'zhangsan'
    }
  },
  computed: {
    profile(){
      return {
        path: '/profile',
        query:{
          name: 'pipilei'
        }
      }
    }
  },
  methods: {
    proClick(){
      this.$router.push({
        path: '/profile',
        query:{
          name: 'pipilei',
          age: 18
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
