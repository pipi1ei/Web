import Vue from 'vue'
import Router from 'vue-router'

// 这几种导入路由方式不是懒加载方式
// import Home from '../components/Home'
// import About from '../components/About'
// import User from '../components/User'

// 懒加载导入路由组件
const Home = () => import('../components/Home')
const About = () => import('../components/About')
const User = () => import('../components/User')

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
  },
  {
    path: '/user/:id',
    component: User
  }
]

// 创建路由对象
export default new Router({
  // 配置路径和组件之间的映射关系
  routes,
  mode: 'history'
})