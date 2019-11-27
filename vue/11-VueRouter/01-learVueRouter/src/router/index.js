import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'

// 通过 vue.use() 来安装插件
Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]

// 创建路由对象
export default new Router({
  // 配置路径和组件之间的映射关系
  routes,
  mode: 'history'
})