import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import {log} from './utils/utils'
window.log = log

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$Message = ElementUI.Message

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');