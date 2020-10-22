const { log } = console

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

class Point {
  // 静态属性：坐标系原点
  static origin = new Point(0, 0);

  // 静态方法：计算与原点的距离
  static distanceToOrigin(p: Point) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
  }

  // 示例属性，坐标x轴的值和y轴的值
  x: number;
  y: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }

  // 示例方法：打印此点
  printPoint() {
    console.log(this.x, this.y);
  }
}

interface PointInstanceType {
  x: number;
  y: number;
  printPoint(): void;
}

// function createArray<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for(let i = 0; i < length; i++) {
//     result[i] = value;
//   }
//   return result;
// }

// createArray<string>(3, 'x');  // ['x', 'x', 'x']

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap(['seven', 7]) // [7, 'seven']

// function loggingIdentity<T>(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }

interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// loggingIdentity(7)

function copy<T extends U, U>(target: T, source: U): T {
  for(let key in source) {
    target[key] = (<T>source)[key]
  }
  return target;
}

let x = {a: 1, b: 2, c: 3}
copy(x, {b: 10, c: 20});

interface SearchFunc {
  (source: string, substring: string): boolean;
}

let mySearchFunc: SearchFunc = function(source: string, substring: string): boolean {
  return source.search(substring) !== -1;
}

interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for(let i = 0 ; i < length; i++) {
    result[i] = value;
  }
  return result;
}

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