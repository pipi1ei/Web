<template>
  <div class="panel">
    <div class="title">{{title}}</div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
  .panel{
    width: 100%;
    height: 395px;
    border: 1px solid rgba(235, 235, 235, 1);
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    .title{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid rgba(235, 235, 235, 1);
      padding: 0 15px;
      color: #666;
      font-size: 16px;
      font-weight: 700;
    }

    .content{
      flex: 1;
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
  }
</style>