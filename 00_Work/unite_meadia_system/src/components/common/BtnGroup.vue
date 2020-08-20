<template>
  <div class="btn-group" ref='btnGroup'>
    <span 
      v-for="(item, index) in btnsData" 
      :key="index"
      :class="{active: index == currentIndex}"
      @click="itemClick(item,index)">{{item.fieIdName}}</span>
  </div>
</template>

<script>
export default {
  name: "BtnGroup",
  props: {
    btnsData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(item,index){
      this.currentIndex = index;
      this.$emit('itemClick', item);
    }
  }
};
</script>

<style lang="less" scoped>
.btn-group {
  font-size: 12px;
  color: rgb(96, 98, 102);
  span {
    display: inline-block;
    border: 1px solid #dcdfe6;
    padding: 6px 15px;
    margin-right: -1px;
    margin-bottom: 10px;
    cursor: pointer;

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &:hover,
    &.active {
      color: #108ee9;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
}
</style>