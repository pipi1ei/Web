<template>
  <div class="header-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>媒资管理</el-breadcrumb-item>
      <el-breadcrumb-item>媒资查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter='0'>
      <el-col :span='14'>
        <el-input v-model='searchText' 
          placeholder='请按名称搜索媒资' 
          suffix-icon="el-icon-search">
        </el-input>
      </el-col>
      <el-col :span='3' :offset='2'>
        <el-button @click="btnClick" type="primary" style="width:100px">搜索</el-button>
      </el-col>
      <el-col :span='2' :offset='3'>
        <!-- <el-button type="info" icon="el-icon-setting" circle></el-button> -->
        <el-dropdown @command="handleCommand">
          <el-button type="info" circle>
            <i class=" el-icon-setting"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='logout'>退出登录</el-dropdown-item>
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
      searchText: ''
    }
  },
  methods: {
    btnClick(){
      this.$emit('getMediaByName',this.searchText)
    },
    handleCommand(command){
      console.log(command)
      if(command === 'logout'){
        console.log('退出登录')
        window.sessionStorage.clear()
        this.$router.replace('/login')
      }
    }
  }
}
</script>

<style lang="less">
  .header-box{
    height: auto;

    el-breadcrumb{
      font-size: 10px;
    }

    .el-row{
      margin-top: 15px;
    }

    .el-button{
      font-size: 16px;
    }
  }
</style>