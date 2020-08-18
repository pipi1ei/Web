import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss'  // global css

import md5 from 'js-md5'      //js-md5

import store from './store'
import router from './router'

import '@/icons';   // icon
import '@/permission'  // 权限控制

Vue.use(ElementUI)

import { log } from './utils/utils'
window.log = log

Vue.prototype.$md5 = md5

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
