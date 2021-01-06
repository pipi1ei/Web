(function(){
  var x = foo()
  var foo = function foo() {
    return 'hello'
  }
  return x
})()