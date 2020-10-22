// import select from './libs/js/select.js'

let a = [
  {name: 1, text: 'aaa'},
  {name: 2, text: 'bbb'},
  {name: 3, text: 'ccc'},
  {name: 4, text: 'ddd'},
]

let d = a.splice(0, a.length)

console.log(d, a)
console.log(d === a)