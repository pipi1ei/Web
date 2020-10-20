let { AsyncParallelHook } = require('tapable')

class Lesson{
  constructor(){
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }

  tap(){
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb()
      }, 1000)
    });
    this.hooks.arch.tapAsync('vue', (name, cb) => {
      setTimeout(() => {
        console.log('vue', name)
        cb()
      }, 1000)
    });
  }

  start(){
    this.hooks.arch.callAsync('pipilei', () => {
      console.log('end')
    })
  }
}

let l = new Lesson()
l.tap()
l.start()