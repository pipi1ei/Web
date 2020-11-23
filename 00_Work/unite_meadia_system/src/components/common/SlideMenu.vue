<template>
  <div class="slide" :style="'width:'+slideWidth+'px'">
    <el-container class="slide-container" ref="ttt">
      <el-aside
        class="home-aside"
        :style="'width: auto; background-color:' + slideBackgroundColor"
      >
        <!-- 标题 -->
        <h1 class="slide-title">{{menuTitle}}</h1>
        <!-- 菜单项 -->
        <el-menu
          :collapse="isCollapse"
          :default-active="$route.path"
          class="home-nav-menu"
          :background-color="menuBackgroundColor"
          :active-text-color="activeTextColor"
          router
        >
          <!-- 数据概览 -->
          <el-submenu index="1" v-if="showSubMenu">
            <template slot="title">
              <i class="el-icon-s-data" v-show="isCollapse"></i>
              <span>数据概览</span>
            </template>
            <el-menu-item class="home-menu-item" index="/overview/media_overview">
              媒资数据概览
            </el-menu-item>
            <el-menu-item class="home-menu-item" index="/overview/monitor">
              CP媒资质量监控
            </el-menu-item>
          </el-submenu>

          <!-- 媒资管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-operation" v-show="isCollapse"></i>
              <span>CP媒资管理</span>
            </template>
            <el-menu-item class="home-menu-item" index="/manage/list">
              CP媒资列表
            </el-menu-item>
          </el-submenu>

          <!-- 媒资运营 -->
          <el-submenu index="3" v-if="showSubMenu">
            <template slot="title">
              <i class="el-icon-bangzhu" v-show="isCollapse"></i>
              <span>媒资运营</span>
            </template>
            <el-menu-item class="home-menu-item" index="/operate/online">
              已上线媒资
            </el-menu-item>
            <el-menu-item class="home-menu-item" index="/operate/eliminate">
              已剔除媒资
            </el-menu-item>
            <el-menu-item class="home-menu-item" index="/operate/offline">
              已下线媒资
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "SlideMenu",
  props: {
    slideBackgroundColor: {
      type: String,
      default: "rgba(0,21,41,1)"
    },
    menuBackgroundColor: {
      type: String,
      default: "rgba(0,21,41,1)"
    },
    textColor: {
      type: String,
      default: "#fff"
    },
    activeTextColor: {
      type: String,
      default: "#40A9FF"
    },
  },
  data(){
    return {
      isCollapse: false,
      menuTitle: '安徽移动媒资管理后台',
      slideWidth: '210'
    }
  },
  computed: {
    showSubMenu(){
      return this.$store.state.userInfo.roleId == '1';
    }
  },
  watch: {
    isCollapse(){
      if(this.isCollapse){
        this.menuTitle = '';
        this.slideWidth = '64'
      }else {
        this.menuTitle = '安徽移动媒资管理后台';
        this.slideWidth = '210'
      }
    }
  },
  methods: {
  },
};
</script>

<style lang="less">
.slide {
  position: relative;
  transition: width .3s;

  .slide-title{
    height: 53px;
    line-height: 53px;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
}
.slide-container {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.home-aside {
  width: auto;
  color: #272749;
}

.home-nav-menu {
  border: none;

  .el-submenu__title {
    color: rgba(255, 255, 255, .7);
    transition: width .3s;

    &:hover {
      background-color: transparent !important;
      color: #40A9FF !important;
    }
  }

  .el-submenu.is-active .el-submenu__title {
    color: #40A9FF !important;
  }

  .home-menu-item {
    background-color: rgba(0,35,69, .8) !important;
    color: rgba(255, 255, 255, .7);
    &:hover {
      color: rgba(64,169,255, 1) !important;

      i[class*=el-icon]{
        color: #fff !important;
      }
    }

    &.is-active{
      background-color: rgba(0,127,247, .8) !important;
      color: #fff !important;

      i[class*=el-icon]{
        color: #fff !important;
      }
    }
  }


}

.home-nav-menu:not(.el-menu--collapse) {
  width: 210px;
}
</style>