<template>
  <ul class="nav">
    <li v-for="(item, index) in navList" :key="index" :class="{active:currentIndex == index}" @click="navItemClick(index,item)">{{item.cpName}}</li>
  </ul>
</template>

<script>
export default {
  name: 'QmNav',
  props: {
    navList:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  methods: {
    navItemClick(index,item){
      log('navItemClick: ',item)
      this.currentIndex = index;
      this.$store.commit('updateCurrentCp',item);
      this.$emit('changeCp',item);
    }
  }
}
</script>

<style scoped>
  .nav{
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
    padding: 0 15px;
    overflow-x: auto;
  }

  .nav > li{
    float: left;
    padding: 0 16px;
    vertical-align: middle;
    height: 100%;
    cursor: pointer;
    margin-right: 5px;
  }
  .nav > li.active,
  .nav > li:hover{
    color: rgb(24, 144, 255);
    border-bottom: 2px solid rgb(24, 144, 255);
  }
</style>