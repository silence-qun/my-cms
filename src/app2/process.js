const fs = require('fs')

// console.log(process.version)

// console.log(process.versions)

// console.log(process.platform)

// console.log(process.execPath)

// console.log(process.config)

// console.log(process.pid)

// console.log(process.title)

// console.log(process.arch)

// console.log(process.memoryUsage())

// 当前工作目录：current working dir
// console.log(process.cwd())

// 修改当前目录
// console.log(process.chdir())

// console.log(process.env)

// process.env.NODE_ENV = 'dev'

// console.log(process.uptime())

// process.on('exit', () => {
//   console.log('node process exited')
// })

// process.exit(0)

// process.on('beforeExit', () => {
//   console.log('node process before exited')
// })

// process.on('uncaughtException', (err) => {
//   console.log(err)
// })

// process.on('SIGINT', () => {
//   console.log('received SIGINT info')
// })

// setTimeout(() => {
//   console.log('timeout')
// }, 1000)

const myfunction = () => {
  console.log('myFunction invoked')
}

// 在下一个同步方法完毕，或下一个异步方法之前调用
process.nextTick(myfunction)

console.log(`readFileSync: \n${fs.readFileSync('./uuid.js').toString('utf8')}`)

fs.readFile('./uuid.js', (err, data) => {
  console.log(`readFile: \n${data.toString('utf8')}`)
})
