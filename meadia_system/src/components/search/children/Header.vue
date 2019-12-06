<template>
  <div class="search-header">
    <input v-model="inputValue" type="search" placeholder="请按名称搜索">
    <span @click="getMediaByName">搜索</span>
  </div>
</template>

<script>
  export default {
    name: 'SearchHeader',
    data(){
      return {
        inputValue: ''
      }
    },
    methods: {
      getMediaByName(){
        this.$emit('searchMedia',this.inputValue)
      }
    }
  }
</script>

<style lang="less">
  .search-header{
    display: flex;

    margin-bottom: 20px;
    input {
      border: 1px solid black;
      height: 40px;
      border-radius: 5px;
      width: 60%;
      margin-right: 50px;
      padding: 0 20px;
      &:focus{
        border-color: #9ecaed;
        box-shadow: 0 0 5px #9ecaed;
      }
    }

    span {
      display: inline-block;
      width: 150px;
      border: 1px solid #67c23a;
      color: #fff;
      border-radius: 5px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #67c23a;
      box-shadow: 1px 1px 2px #6ae717;
      &:hover{
        background: #85ce61;
        border-color: #85ce61;
      }
      &:active {
        background: #5daf34;
        border-color: #5daf34;
      }
    }
  }
</style>