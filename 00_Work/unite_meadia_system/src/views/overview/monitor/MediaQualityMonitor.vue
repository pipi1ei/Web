<template>
  <!-- CP媒资质量监控组件 -->
  <div class="monitor-container">
    <!-- 导航 -->
    <qm-nav :navList="cpList" @changeCp="changeCp" />
    <!-- 内容 -->
    <qm-content :cpData="cpData" />
  </div>
</template>

<script>
import QmNav from './children/QmNav';
import QmContent from './children/QmContent';

import { getCpInfo, getCpSyncOverview } from 'network/overview/qualityMonitor'

export default {
  name: 'MediaQualityMonitor',
  data(){
    return {
      //cp 列表
      cpList: [],
      //当前cp总览数据
      cpData: {}
    }
  },
  methods: {
    getCpList(){
      getCpInfo().then(res => {
        log('获取cp列表,结果: ',res);
        if(res.data.length > 0){
          this.cpList = res.data;
          this.$store.commit('updateCurrentCp',res.data[0]);
        }
        this.getCpSyncOverview()
      });
    },

    /* 获取单个cp总览数据 */
    getCpSyncOverview(){
      getCpSyncOverview(this.$store.state.currentCp.cpCode).then(res => {
        log('获取单个cp总览数据: ',res);
        this.cpData = res.data;
      })
    },

    /* 改变cp */
    changeCp(cpInfo){
      this.getCpSyncOverview();
    }
  },
  created() {
    this.getCpList();
  },
  components: {
    QmNav,
    QmContent
  }
}
</script>

<style scoped>
  .monitor-container{
    flex: 1;
  }
</style>