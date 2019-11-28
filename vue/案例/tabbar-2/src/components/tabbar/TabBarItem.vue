<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name='item-icon'></slot>
    </div>
    <div v-else>
      <slot name='item-icon-active'></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: {
      type: String,
      required: true
    },
    activeColor: {
      type: String,
      default: '#d81e06'
    }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      if(this.$route.path !== this.path){
        this.$router.replace(this.path)
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
      margin-bottom: 2px;
      vertical-align: middle;
    }
  }
</style>