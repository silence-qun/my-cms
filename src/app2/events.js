// const http = require('http')
const events = require('events')

// const httpServer = http.createServer()

// 最多每个事件注册 10 个监听器，可通过 setMaxListeners(n) 改变
// httpServer.setMaxListeners(2)

// addListener 与 on 等效，添加监听
// httpServer.addListener('request', (request, response) => {
//   if (request.url === '/') {
//     console.log('addListener')

//     if (!response.writableEnded) response.end('end')
//   }
// })

// httpServer.on('request', (request, response) => {
//   if (request.url === '/') {
//     console.log('on')
//     // response.end('end')
//   }
// })

// 监听一次
// httpServer.once('request', (request, response) => {
//   if (request.url === '/') {
//     console.log('once')
//   }
// })

// removeListener 与 off 等效，移除监听
// const listener = (request, response) => {
//   if (request.url === '/') {
//     console.log('hello world')

//     if (!response.writableEnded) response.end('welcome')
//   }
// }

// httpServer.on('request', listener)
// httpServer.on('request', listener)
// httpServer.on('request', listener)

// httpServer.removeListener('request', listener)

// 移除所有监听
// httpServer.removeAllListeners('request')

// 默认最大事件监听数
// console.log(`default max listener count: ${events.EventEmitter.defaultMaxListeners}`)

// 自定义事件
// 先监听，后发射事件
// httpServer.on('serverEvent', (params1, params2, parmas3) => {
//   console.log(`${params1} ${params2} ${parmas3}`)
// })

// httpServer.emit('serverEvent', 'hello', 'world', 'welcome')

const emitter = new events()

// emitter.on('myEvent', function myListener() {
//   console.log('myListener')
// })

// emitter.on('myEvent', function myListener2(param1, param2) {
//   console.log(`myListener2: ${param1} ${param2}`)
// })

// emitter.on('myEvent', function myListener3(...params) {
//   const val = params.join(', ')
//   console.log(`myListener3: ${val}`)
// })

// console.log(emitter.listeners('myEvent'))

// emitter.emit('myEvent', 'a', 'b', 'c', 'd', 'e', 'f')

// newListener 使用
emitter.once('newListener', (event, listener) => {
  if (event === 'myEvent') {
    emitter.on('myEvent', function () {
      console.log('hello')
    })
  }
})

emitter.on('myEvent', () => {
  console.log('world')
})

emitter.emit('myEvent')

// httpServer.listen(3000, () => {
//   console.log('listening to port 3000')
// })
