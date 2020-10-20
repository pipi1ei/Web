let tom: [string, number] = ['a', 123]

class Animal {
  name:string;
  static isAnimal(a:any) {
    return a instanceof Animal
  }
  constructor(name:string) {
    this.name = name;
  }
}

let a = new Animal("jack");
// a.isAnimal(a)
Animal.isAnimal(a)