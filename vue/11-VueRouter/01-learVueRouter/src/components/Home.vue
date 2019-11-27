<template>
  <div>
    <h2>我是首页</h2>
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      title: '我是首页内容'
    }
  }
}
</script>

<style scoped>

</style>