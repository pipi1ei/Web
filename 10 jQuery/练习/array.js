const { log } = console;

class Test {
  _count = 0;

  get value(){
    log(`get value`)
    return this._count
  }

  add(){
    this._count++
  }
}

const t1 = new Test()
log(t1.value)
t1.add()
log(t1.value)