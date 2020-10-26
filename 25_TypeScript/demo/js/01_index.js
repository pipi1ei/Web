// "use strict";
const { log } = window.console && console;

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

