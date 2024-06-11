// const { SyncHook } = require('tapable')

// class STapable {
//   constructor() {
//     this.hooks = {
//       synchook: new SyncHook(['name', 'age']),
//     }

//     this.hooks.synchook.tap('event1', (name, age) => {
//       console.log('event1', name, age)
//     })
//   }

//   emit() {
//     this.hooks.synchook.call('s', 19)
//   }
// }

// const st = new STapable()
// st.emit()

const { AsyncSeriesHook } = require('tapable')

class STapable {
  constructor() {
    this.hooks = {
      asyncHook: new AsyncSeriesHook(['name', 'age']),
    }

    // this.hooks.asyncHook.tapAsync('event1', (name, age, callback) => {
    //   setTimeout(() => {
    //     console.log('async event1', name, age)
    //     callback()
    //   }, 2000)
    // })

    this.hooks.asyncHook.tapPromise('event2', (name, age) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('async event2', name, age)
          resolve()
        }, 2000)
      })
    })
  }

  emit() {
    // this.hooks.asyncHook.callAsync('s', 19, () => {
    //   console.log('finished')
    // })

    this.hooks.asyncHook.promise('s', 19).then(() => {
      console.log('finished')
    })
  }
}
