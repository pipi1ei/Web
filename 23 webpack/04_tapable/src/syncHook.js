// 手写 tapable 中的 syncHook

class SyncHook{
  constructor(args){  // arg => ['name']
    this.tasks = []
  }

  tap(name, task){
    this.tasks.push(task)
  }

  call(...args){
    this.tasks.forEach(task => task(...args))
  } 
}

const hook = new SyncHook(['name']);

hook.tap('react', function(name){
  console.log('react', name)
})
hook.tap('vue', function(name){
  console.log('vue', name)
})

hook.call('pipilei')