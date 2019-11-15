## let
1. for 循环的计数器，很适合用let命令
for(let i = 0; i < 10; i++){
    ...
}
console.log(i) //ReferenceError: i is not defined
如果使用var
var a = [];
for(var i = 0; i < 10; i++){
    a[i] = function(){
        console.log(i)
    }
}
a[6]()  // 10
// 变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。