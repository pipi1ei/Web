<template>
  <el-row :gutter="20" class="operation-top">
    <el-col :span="6">
      <span class="label">内容方：</span>
      <el-select v-model="filter.cpCode" placeholder="全部" size="small"
            style="max-width:170px" @change="cpChange">
        <el-option
          v-for="item in cpList"
          :key="item.cpCode"
          :label="item.cpName"
          :value="item.cpCode">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="7">
      <span class="label">媒资名称：</span>
      <el-input
        style="width:200px"
        size="small"
        placeholder="请输入媒资名称"
        v-model="filter.name"
        clearable>
      </el-input>
    </el-col>
    <el-col :span="7">
      <span class="label">时间：</span>
      <el-date-picker
        v-model="date"
        style="width:240px"
        size="small"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" size="small" @click="queryMeidiaData">查询</el-button>
    </el-col>
  </el-row>
</template>

<script>
import {getCpList} from 'network/common'

export default {
  name: 'OperationTop',
  props: {
    filter: {
      type: Object,
      default(){
        return {
          cpCode: '',
          name: '',
          startDate: '',
          endDate: ''
        }
      }
    }
  },
  data(){
    return{
      cpList: [],
      date: ['',''],
      startDate: this.filter.startDate,
      endDate: this.filter.endDate,
    }
  },
  watch:{
    date(newDate){
      this.filter.startDate = newDate == null ? '' : newDate[0];
      this.filter.endDate = newDate == null ? '' : newDate[1];
    },
    'filter.startDate': function(newValue){
      this.date = this.date == null ? ['',''] : this.date
      this.$set(this.date,'0',newValue);
    },
    'filter.endDate': function(newValue){
      this.date = this.date == null ? ['',''] : this.date
      this.$set(this.date,'1',newValue);
    }
  },
  methods: {
    getCpList(){
      getCpList().then(res => {
        res.data.unshift({
          cpCode: '',
          cpName: '全部'
        })
        this.cpList = res.data;
      })
    },
    queryMeidiaData(){
      this.$emit('queryMeidiaData');
    },
    /* 改变cp时自动查询 */
    cpChange(cp){
      this.queryMeidiaData()
    }
  },
  created() {
    this.getCpList();
  },
}
</script>

<style scoped>
  .operation-top{
    display: flex;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 15px;
  }
  .el-col{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* justify-content: flex-end; */
    align-items: center;
    margin-right: 5px;
  }

  .operation-top .label{
    font-size: 12px;
    color: #666;
  }
</style>