class AsyncParalleHook{
  constructor(args){
    this.tasks = []
  }

  tapAsync(name, task){
    this.tasks.push(task)
  }

  callAsync(...args){
    let finalCallback = args.pop()

    let index = 0

    let done = () => {
      index++
      if(index === this.tasks.length){
        finalCallback()
      }
    }

    this.tasks.forEach(task => task(...args, done))
  }

  tapPromise(name, task){
    this.tasks.push(task)
  }

  promise(...args){
    let tasks = this.tasks.map(task => task(...args))
    return Promise.all(tasks)
  }
}

let hook = new AsyncParalleHook()

hook.tapPromise('react', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name)
      resolve()
    })
  }, 1000)
})

hook.tapPromise('vue', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('vue', name)
      resolve()
    }, 1000)
  })
})

hook.promise('pipilei').then(() => {
  console.log('end')
}) 


let hook2 = new AsyncParalleHook()

hook2.tapAsync('react', (name, cb) => {
  setTimeout(() => {
    console.log('react', name)
    cb()
  }, 1000)
})

hook2.tapAsync('vue', (name, cb) => {
  setTimeout(() => {
    console.log('vue', name)
    cb()
  })
})

hook2.callAsync('pipilei', () => {
  console.log('end')
}, 1000)