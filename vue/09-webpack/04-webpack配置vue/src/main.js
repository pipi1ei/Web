// 使用 commonJs 的模块化规范
const {add, sub} = require('./js/mathUtils.js')

console.log(add(20,30));
console.log(sub(20,30));

// 使用 ES6 的模块化规范
import {name,age,height} from './js/info.js'
console.log(name);
console.log(age);
console.log(height);

// 导入 Vue
import Vue from 'vue';
import App from './vue/App.vue'

// const App ={
//   template: `
//     <div>
//       <h1 class="title">{{msg}}</h1>
//       <button @click="btnClick">按钮</button>
//     </div> 
//   `,
//   data(){
//     return {
//       msg: 'hello vue'
//     }
//   },
//   methods: {
//     btnClick() {
//       console.log('btnClick')
//     }
//   }
// }

new Vue({
  el: '#app',
  template: `<App/>`,
  components: {
    App
  }
})