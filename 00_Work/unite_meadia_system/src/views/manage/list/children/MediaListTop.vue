<template>
  <el-header class="top-container">
    <img class="icon-cp" :src="currentCp.iconSrc"/>
    <div>
      <span class="cpName" >{{currentCp.cpName}}</span>
      <span class="switch-cpCode" @click="showCpDropDown" id="switch" v-show="cpList.length>1">切换</span>
    </div>
    <ul v-show="isShowCpDropDown" class="cp-dropdown">
      <li v-for="item in cpList" :key="item.cpCode" @click="switchCp(item)">{{item.cpName}}</li>
    </ul>
    <div class="status">
      <ul>
        <li @click="changeStatus('')" :class="{active: currentStatus===''}">
          全部
        </li>
        <li @click="changeStatus('0')" :class="{active: currentStatus==='0'}">
          已上线
        </li>
        <li @click="changeStatus('2')" :class="{active: currentStatus==='2'}">
          已剔除
        </li>
        <li @click="changeStatus('1')" :class="{active: currentStatus==='1'}">
          已下线
        </li>
      </ul>
    </div>
  </el-header>
</template>

<script>

  export default {
    name: "MediaListTop",
    props: {
      currentCp: {
        type: Object,
        default(){
          return {
            cpName: '',
            cpCode: '',
            iconSrc: ''
          }
        }
      },
      cpList: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        isShowCpDropDown: false,
        currentStatus: '',
        status: '',
      }
    },
    methods: {
      showCpDropDown(){
        this.isShowCpDropDown = true;
      },
      switchCp(cpInfo) {
        log('switchCp ==>',cpInfo);
        this.currentCp.cpCode = cpInfo.cpCode;
        this.currentCp.cpName = cpInfo.cpName;
        this.currentCp.iconSrc = cpInfo.cpIconUrl;
        this.$store.commit('updateCurrentCp',cpInfo);
        this.$emit('switchCp');
      },
      changeStatus(status){
        this.currentStatus = status;
        this.$emit('changeStatus',status);
      }
    },
    created() {
      const that = this;
      window.addEventListener('click',function(e){
        if(e.srcElement.id != 'switch'){
          that.isShowCpDropDown = false;
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .top-container {
    background-color: #fff;
    position: relative;
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0;

    // cp图标样式
    .icon-cp {
      width: 30px;
      margin-right: 20px;
      border-radius: 50%;
    }

    //cpName样式
    .cpName {
      margin-right: 10px;
      font-weight: 700;
    }

    //切换文字样式
    .switch-cpCode {
      color: #aaa;
      cursor: pointer;
      font-size: 14px;
    }

    //牌照商下拉列表样式
    .cp-dropdown {
      max-height: 180px;
      width: 120px;
      overflow-y: auto;
      position: absolute;
      top: 100%;
      left: 50px;
      z-index: 1000;
      background-color: #fff;
      border: 1px solid rgba(240, 242, 245, 1);
      border-top: none;
      box-shadow: 0 0 5px rgba(0,0,0,.1);

      li {
        height: 30px;
        width: 100%;
        line-height: 30px;
        background-color: #fff;
        cursor: pointer;

        &:hover{
          background-color: #ecf5ff;
          color: #66b1ff;
        }
      }
    }
  }
 
  .status{
    flex: 1;
    display: flex;
    justify-content: center;
    height: 100%;

    ul{
      display: flex;
      justify-content: space-around;
      height: 100%;
      width: 800px;

      li{
        height: 100%;
        line-height: 60px;
        padding: 0;
        width: 100px;
        cursor: pointer;

        &.active,
        &:hover{
          color: #007FF7;
          border-bottom: 3px solid #007FF7;
        }
      }
    }
  }
</style>