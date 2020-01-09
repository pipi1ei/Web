<template>
  <div class="slide">
    <el-container class="slide-container">
      <el-aside
        :width="slideWidth"
        class="home-aside"
        :style="'background-color:' + slideBackgroundColor"
      >
        <!-- 菜单项 -->
        <el-menu
          :default-active="$route.path"
          class="home-nav-menu"
          :background-color="menuBackgroundColor"
          :text-color="textColor"
          :active-text-color="activeTextColor"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>媒资管理</span>
            </template>
            <el-menu-item class="home-menu-item" index="/home/search">
              <i class="el-icon-search" style="color: #909399"></i>
              媒资查询
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>

    <!-- 退出登录按钮 -->
    <div class="log-out" @click="logout">退出登录</div>
  </div>
</template>

<script>
export default {
  name: "HomeSlide",
  props: {
    slideBackgroundColor: {
      type: String,
      default: "#304156"
    },
    menuBackgroundColor: {
      type: String,
      default: "#304156"
    },
    textColor: {
      type: String,
      default: "#fff"
    },
    activeTextColor: {
      type: String,
      default: "#409EFF"
    },
    slideWidth: {
      type: String,
      default: "200px"
    }
  },
  methods: {
    logout(){
      window.sessionStorage.clear()
      this.$router.replace('/login')
    }
  },
};
</script>

<style lang="less">
.slide {
  height: 100%;
  position: relative;

  .log-out{
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 70%;
    height: 40px;
    border: 1px solid #3b528e;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
    color: #5273ee;
    &:hover{
      background-color: #001528;
      cursor: pointer;
    }
  }
}
.slide-container {
  height: 100%;
}

.home-aside {
  color: #272749;
}

.home-nav-menu {
  border: none;

  .el-submenu__title {
    color: #fff;

    &:hover {
      background-color: rgb(38, 52, 69) !important;
    }
  }

  .home-menu-item {
    background-color: rgb(38, 52, 69) !important;
    color: #fff;
    &:hover {
      background-color: #001528 !important;
    }
  }
}
</style>