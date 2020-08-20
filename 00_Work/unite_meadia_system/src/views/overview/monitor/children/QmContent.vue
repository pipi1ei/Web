<template>
  <div class="container">
    <!-- top -->
    <div class="top-content">
      <div class="avatar">
        <img :src="$store.state.currentCp.cpIconUrl" alt="">
        <span>{{$store.state.currentCp.cpName}}</span>
      </div>
      <div class="data">
        <ul>
          <li class="line">
            <p class="desc">平均完整度</p>
            <p class="value">{{cpData.completionAverage}}%</p>
          </li>
          <li class="line">
            <p class="desc">平均有效率</p>
            <p class="value">{{cpData.efficientAverage}}%</p>
          </li>
          <li class="line">
            <p class="desc">累计同步</p>
            <p class="value">{{cpData.cpSyncNum}}</p>
          </li>
          <li>
            <el-button type="primary" class="btn" @click="jumpToMediaList">媒资列表</el-button>
          </li>
        </ul>
      </div>
    </div>

    <el-row :gutter="20" >
      <el-col :span="16">
        <completion />
      </el-col>
      <el-col :span="8">
        <sync-dis :echartsData="syncDisData" />
      </el-col>
    </el-row>
    <el-row :gutter="20" >
      <el-col :span="16">
        <efficiency />
      </el-col>
      <el-col :span="8">
        <cate-dis />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Completion from './Completion';
import Efficiency from './Efficiency';
import SyncDis from './SyncDis';
import CateDis from './CateDis';

export default {
  name: 'QmContent',
  props:{
    cpData: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      // 同步状态分布数据
      syncDisData: []
    }
  },
  watch: {
    cpData(newValue){
      log('cpData newValue  -------------> ',newValue)
      let syncDisData = [
        newValue.cpOnLineNum > 0 ? {value: newValue.cpOnLineNum, name: '已上线'} : {},
        newValue.cpCullNum > 0 ? {value: newValue.cpCullNum, name: '已剔除'} : {},
        newValue.cpOffLineNum > 0 ? {value: newValue.cpOffLineNum, name: '已下线'} : {}
      ]
      this.syncDisData = syncDisData;
    }
  },
  methods: {
    jumpToMediaList(){
      this.$router.push('/manage/list')
    }
  },
  components: {
    Completion,
    Efficiency,
    SyncDis,
    CateDis
  }
}
</script>

<style lang="less" scoped>
  .container{
    background-color: rgba(240, 242, 245, 1);
    padding: 10px 20px 50px;
  }

  .top-content{
    display: flex;
    align-items: center;
    height: 80px;
    width: 100%;
    padding: 0 15px;
    background-color: #fff;
    border-radius: 4px;

    .avatar{
      display: flex;
      align-items: center;
      img{
        width: 40px;
        border-radius: 50%;
        margin-right: 15px;
      }

      span{
        font-size: 16px;
        font-weight: 700;
      }
    }

    .data{
      flex: 1;
      height: 100%;
      margin-left: 20%;

      ul{
        height: 100%;
        li{
          float: left;
          width: 25%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          position: relative;
          .desc{
            color: rgba(0, 0, 0, 0.447059);
            font-size: 14px;
            margin-bottom: 10px;
          }

          .value{
            color: rgba(0, 0, 0, 0.847059);
            font-size: 24px;
            line-height: 1;
          }

          .btn{
            width: 100px;
            margin: 0 auto;
          }
        }
      }
    }
  }

  .line::after{
    content: "";
    position: absolute;
    right: 0;
    top: 15px;
    width: 1px;
    height: 50px;
    background-color: #ddd;
  }
</style>