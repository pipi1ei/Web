const { log } = console

// let a: number = undefined
// let a:void = null
interface LikeArr {
  [index: number]:number;
  length: number;
  callee:Function;
}



function r(x: number): number;
function r(x: string): string;
function r(x: string | number): string | number {
  if(typeof x === 'number') {
    return x.toString()
  } 
  return x
}