const { v1: uuidv1 } = require('uuid')

console.log(uuidv1())

// process 示例：主进程与子进程互相通信
// process.on('message', (msg) => {
//   console.log(`process get message: ${msg}`)

//   process.send('welcome')
// })
