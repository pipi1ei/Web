import $ from 'jquery'

import './css/index.css'

$(function () {  
  $('li:odd').css('backgroundColor','blue')
  $('li:even').css('backgroundColor',() => '#f00')

  console.log('2' / '3')
})

class Person{
  static info = {name : 'zs', age: 15}
}

console.log(Person.info)