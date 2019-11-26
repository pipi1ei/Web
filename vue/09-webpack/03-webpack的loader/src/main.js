// 使用 commonJs 的模块化规范
const {add, sub} = require('./mathUtils.js')

console.log(add(20,30));
console.log(sub(20,30));

// 使用 ES6 的模块化规范
import {name,age,height} from './info.js'
console.log(name);
console.log(age);
console.log(height);

require ('./css/normal.css');