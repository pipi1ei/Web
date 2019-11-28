<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
  #tab-bar{
    display: flex;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #f5f5f5;
    box-shadow: 0 -1px 1px rgba(100,100,100,.2);
    height: 49px;
  }
</style>