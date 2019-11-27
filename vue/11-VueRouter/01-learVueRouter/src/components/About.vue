<template>
  <div>
    <h2>我是关于页面</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'About',
  data(){
    return {
      content: '我是关于页面内容'
    }
  }
}
</script>