import './css/index.css'

console.log('ok')

// es6 中提供的新语法，实现 ES6 中面向对象的编程方式
class Person{
  // 使用 static 关键字可以定义静态属性，静态数据就是可以直接通过类名直接访问的属性
  // 实例属性是只能通过类的实例来访问的属性
  static info = {name: 'zs', age: 20}
}

var p1 = new Person();