<template>
  <div id="tab-bar" :style='"background-color:" + backgroundColor'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    backgroundColor: {
      type: String,
      default: '#f2f2f2'
    }
  }
}
</script>

<style lang="less" scoped>
  #tab-bar{
    display: flex;
    height: 49px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(100,100,100, .2);
  }
</style>