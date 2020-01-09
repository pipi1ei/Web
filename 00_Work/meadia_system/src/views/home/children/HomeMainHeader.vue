<template>
  <div class="header-box">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>媒资管理</el-breadcrumb-item>
      <el-breadcrumb-item>媒资查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter='20'>
      <!-- 搜索框 -->
      <el-col :span='8'>
        <el-input v-model='searchText' 
          placeholder='请按名称搜索媒资' 
          suffix-icon="el-icon-search"
          @keyup.enter.native="btnClick">
        </el-input>
      </el-col>
      <!-- 搜索按钮 -->
      <el-col :span='2'>
        <el-button @click="btnClick" type="primary"  size="small">搜索</el-button>
      </el-col>

      <!-- 多牌照下拉框 -->
      <el-col :span='3' :offset='11' v-if="$store.state.productName.length > 1">
        <el-dropdown  trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{productName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="max-height: 300px; overflow-y: auto">
            <el-dropdown-item v-for="item in $store.state.productName" :key="item" :command='item'>{{item}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    
    
  </div>
</template>

<script>
export default {
  name: 'HomeMainHeader',
  data(){
    return {
      searchText: '',
      productName: this.$store.state.productName[0]
    }
  },
  methods: {
    btnClick(){
      this.$emit('getMediaByName',this.searchText)
    },
    handleCommand(command){
      this.productName = command
      this.$emit('switchProvider',command)
    }
  }
}
</script>

<style lang="less">
  .header-box{
    height: auto;

    .el-breadcrumb__inner.is-link{
      color: #5273ee !important;
    }

    .el-breadcrumb__inner{
      color: #9caef1 !important;
    }

    .el-row{
      margin-top: 15px;
      display: flex;
      align-items: center;

      .el-col{
        margin-bottom: 0;
      }

      .el-input{
        input{
          height: 36px;
          &:focus,&:hover{
            box-shadow: 0 0 10px rgba(0,0,0, .2);
          }
        }
      }

      .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
      .el-dropdown-menu{
        overflow-y: scroll
      }
    }

    .el-button{
      font-size: 16px;
    }
  }
  
</style>