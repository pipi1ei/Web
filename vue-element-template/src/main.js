import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '@/styles/index.scss'

import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
