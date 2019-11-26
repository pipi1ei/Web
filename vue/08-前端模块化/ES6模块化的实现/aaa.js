// ES5 模块化实现

/* var moduleA = (function () {  
  var name = '小明'
  var flag = true
  function sum(num1, num2) {
    console.log(num1 + num2)
  };

  if (flag) {
    sum(20, 30)
  }

  var obj = {};
  obj.flag = flag;
  obj.sum = sum;
  return obj
})() */


// ES6 模块化
var name = '小明'
var flag = true
function sum(num1, num2) {
  console.log(num1 + num2)
};

if (flag) {
  sum(20, 30)
}

// 导出方式1
export {
  flag,
  sum
}

// 导出方式2
export var flag = true;
export var name = 'pipilei'
export function sum(num1, num2) {  
  return num1 + num2
}