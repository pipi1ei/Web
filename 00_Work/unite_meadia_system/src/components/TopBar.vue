<template>
  <el-row class="top-bar">
    <el-col :span="1">
        <img v-if="isCollapse" src="~assets/images/topbar/icon-show.png" class="collapse" @click="collapseMenu" alt="">
        <img v-else src="~assets/images/topbar/icon-hidden.png" class="collapse" @click="collapseMenu" alt="">
    </el-col>
    <el-col :span="4" :offset="19" class="avatar-box">
      <div class="avatar">
        <img src="~assets/images/topbar/icon-user.png" alt="">
        <i class="bottom-arrow"></i>
        <ul class="dropdown">
          <li class="username">{{userName}}</li>
          <li @click="logout" class="logout">
            <i></i>
            退出登录
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TopBar.vue',
  data(){
    return {
      isCollapse: false,
      userName: this.$store.state.userInfo.userName
    }
  },
  methods: {
    collapseMenu(){
      this.isCollapse = !this.isCollapse;
      this.$emit('collapseMenu', this.isCollapse);
    },
    logout(){
      // 退出登录时清空 sessionStorage 和 vuex 中的数据
      window.sessionStorage.clear()
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          {
            userInfo: {},
            currentCp: {},
            mediaDetails: {}
          }
        )
      );
      this.$router.replace('/login')
    }
  },
}
</script>

<style scoped>
  .top-bar{
    height: 53px;
    line-height: 53px;
    border-bottom: 1px solid #F1F3F4;
    padding: 0 20px;
  }

  .top-bar .el-col{
    height: 100%;
    display: flex;
    align-items: center;
  }

  .avatar-box{
    justify-content: flex-end;
  }

  .collapse{
    width: 17px;
    cursor: pointer;
  }

  .avatar{
    position: relative;
    width: 56px;
    height: 53px;
    text-align: center;
    float: right;
  }
  .avatar:hover{
    cursor: pointer;
    background-color: #001C37;
  }
  .avatar:hover .bottom-arrow{
    display: none;
  }
  .avatar:hover .dropdown{
    display: block;
  }
  .avatar > img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-top: 11px;
  }

  .avatar .bottom-arrow{
    display: inline-block;
    border-top: 5px solid #999;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid transparent;
    position: absolute;
    top: 50%;
    right: 0;
    border-radius: 3px;
  }

  .avatar .dropdown{
    position: absolute;
    top: 53px;
    right: 0;
    width: 135px;
    color: rgba(0,0,0,.7);
    background-color: #fff;
    box-shadow:0px 1px 4px 0px rgba(0,0,0,0.1);
    border-radius:0px 0px 3px 3px;
    display: none;
    z-index: 10000;
  }
  .avatar .dropdown > li{
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    padding: 0 17px;
    text-align: left;
    position: relative;
  }
  .avatar .dropdown > li.username::after{
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0, .1);
  }
  .avatar .dropdown > li.logout:hover{
    background-color: #007FF7;
    color: #fff;
  }

  .avatar .dropdown > li.logout > i{
    display: inline-block;
    width: 18px;
    height: 18px;
    position: relative;
    top: 4px;
    background-image: url('~assets/images/topbar/logout.png');
    background-size: 100% 100%;
  }

  .avatar .dropdown > li.logout:hover > i{
    background-image: url('~assets/images/topbar/logout-hover.png');
  }
</style>