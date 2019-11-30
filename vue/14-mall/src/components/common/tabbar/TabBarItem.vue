<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive" class="item-icon">
      <slot name='item-icon'></slot>
    </div>
    <div v-else  class="item-icon">
      <slot name='item-icon-active'></slot>
    </div>
    <div class="item-text" :style='finalActiveColor'>
      <slot name='item-text'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props:{
      activeColor: {
        type: String,
        default: "#d81e06"
      },
      path: {
        type: String,
        required: true
      }
    },
    computed: {
      isActive(){
        return this.path === this.$route.path
      },
      finalActiveColor(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick(){
        if(this.$route.path !== this.path){
          this.$router.push(this.path)
        }
      }
    }
  }
</script>

<style lang="less">
  .tab-bar-item{
    flex: 1;
    text-align: center;
    font-size: 12px;
    img{
      width: 24px;
      height: 24px;
      margin-top: 3px;
      margin-bottom: 3px;
      vertical-align: middle;
    }
  }
  
</style>