declare const jQuery: (selector: string) => any;

declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;

declare class Animal {
  name: string;
  constructor(name: string);
  sayHi() {
    return console.log(this.name)
  }
}
