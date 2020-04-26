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


### 暂时性死区
+ 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
+ “暂时性死区”也意味着 typeof 不再是一个百分之百安全的操作。
``` javascript
    var tmp = 123;

    if (true) {
        tmp = 'abc'; // ReferenceError
        let tmp;
    }

    typeof x; // ReferenceError
    let x;
```

+ 有些“死区”比较隐蔽，不太容易发现。
``` javascript
    function bar(x = y, y = 2) {
        return [x, y];
    }

    bar(); // 报错

    // 报错
    let x = x;  //在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。
```
  - 上面代码中，调用bar函数之所以报错（某些实现可能不报错），是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于“死区”。如果y的默认值是x，就不会报错，因为此时x已经声明了。