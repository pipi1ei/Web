// "use strict";
const { log } = console;

var __extends = 
  (this && this.__extends) || 
  function (Target, Source) {
    for(var key in Source) {
      if(Source.hasOwnProperty(key)) {
        Target[key] = Source[key]
      }
    }

    function __() {
      this.constructor = Target;
    }

    Target.prototype = Source === null ? 
      Object.create(Source) : ((__.prototype = Source.prototype), new __())
  };

var A = (function(){
  function A(name) {
    this.name = name;
  }
  return A;
})();

var B = (function(_super){
  __extends(B, _super);
  function B() {
    _super.apply(this. arguments);
  }
  B.prototype.sayName = function(){
    log(this.name)
  }
  return B;
})(A);

var b = new B('tom');
b.sayName();


function currying(fn, n) {
  return function(m) {
    return fn.call(this, m, n)
  }
}

function trampoline(f) {
  while(f && f instanceof Function) {
    f = f()
  }
  return f
}


var arr1 = [0, 1, 2]
var arr2 = [3, 4, 5]
// Array.prototype.push.apply(arr1, arr2)
arr1.push(...arr2)
log(arr1)

Number.prototype[Symbol.iterator] = function* (){
  let i = 0;
  let num = this.valueOf();
  while(i < num) {
    yield i++;
  }
}

for(let v of 5) {
  log(v)
}

const toArray = () => Array.from ? Array.from : obj => [].slice.call(obj)

function typesof(){
  return Array.from(arguments, arg => typeof arg)
}

const x = {
  name: 'pipilei',
  age: 20,
  [Symbol.iterator]: function*(){
    let keys = Object.keys(this);
    for(let key of keys) {
      yield this[key]
    }
  }
}

for(let v of x) {
  log(v)
}