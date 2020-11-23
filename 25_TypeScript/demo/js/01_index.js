"use strict";
var log = console.log;
// class Point {
//   x: number;
//   y: number;
//   constructor(x: number, y:number) {
//     this.x = x;
//     this.y = y;
//   }
// }
// interface PointInstanceType {
//   x: number;
//   y: number;
// }
// interface Point3d extends Point {
//   z: number;
// }
// let point3d: Point3d = {x: 1, y: 2, z: 3}
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    // 静态方法：计算与原点的距离
    Point.distanceToOrigin = function (p) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    };
    // 示例方法：打印此点
    Point.prototype.printPoint = function () {
        console.log(this.x, this.y);
    };
    // 静态属性：坐标系原点
    Point.origin = new Point(0, 0);
    return Point;
}());
// function createArray<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for(let i = 0; i < length; i++) {
//     result[i] = value;
//   }
//   return result;
// }
// createArray<string>(3, 'x');  // ['x', 'x', 'x']
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
swap(['seven', 7]); // [7, 'seven']
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
// loggingIdentity(7)
function copy(target, source) {
    for (var key in source) {
        target[key] = source[key];
    }
    return target;
}
var x = { a: 1, b: 2, c: 3 };
copy(x, { b: 10, c: 20 });
var mySearchFunc = function (source, substring) {
    return source.search(substring) !== -1;
};
var createArray = function (length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
};
// class GenericNumber<T> {
//   zeroValue: T;
//   add(x: T, y: T): T {
//     return x + y;
//   };
//   constructor(zeroValue: T) {
//     this.zeroValue = zeroValue;
//   }
// }
// let myGenericNumber = new GenericNumber<number>(0);
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x: number, y: number) {
//   return x + y;
// }
