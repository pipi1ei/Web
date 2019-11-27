<template>
  <div>
    <h1 class="title">{{msg}}</h1>
    <button @click="btnClick">按钮</button>
    <Cpn></Cpn>
  </div> 
</template>

<script>
  // 导入 Cpn 组件
  import Cpn from './Cpn.vue'

  export default {
    name: 'App',
    data() {
      return {
        msg: 'hello vue'
      }
    },
    components:{
      Cpn
    },
    methods: {
      btnClick() {
        console.log('btnClick')
      }
    }
  }
</script>

<style scoped>
  .title{
    color: red;
  }
</style>