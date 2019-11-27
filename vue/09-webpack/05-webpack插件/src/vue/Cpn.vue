<template>
  <div>
    <h1 class="title">我是组件标题</h1>
    <p>我是组件内容</p>
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: 'Cpn',
  data(){
    return {
      name: '我是组件名'
    }
  }
}
</script>

<style scoped>
  .title{
    color: yellow;
  }
</style>