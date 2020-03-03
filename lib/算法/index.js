/* 数组冒泡排序算法: 从小到大排列 */
var arr = [1,3,4,5,23,321,42,3,55,6,8];
for(let j = arr.length-1; j > 0; j--){
  for(let i = 0; i < j; i++){
    if(arr[i] > arr[i+1]){
      let temp = arr[i];
      arr[i] = arr[i+1];
      arr[i+1] = temp;
    }
  }
}

/* 非递归实现获取斐波那契数列第n个数，n从0开始 */
function getFibo(n) {  
  if(n === 0 || n === 1){
    return 1;
  }
  var num1 = 1;
  var num2 = 1;
  var sum = num1 + num2;
  for(var i = 2; i < n; i++){
    num1 = num2;
    num2 = sum;
    sum = num1 + num2;
  }
  return sum;
}