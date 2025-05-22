const childProcess = require('child_process')

// 创建子进程方式一: spawn, 没有回调函数
// const nodeChildProcess = childProcess.spawn('node', ['child_process_shell'])

// nodeChildProcess.stdout.on('data', (data) => {
//   console.log(data.toString())
//   console.log(`child process node id: ${nodeChildProcess.pid}`)
// })

// nodeChildProcess.on('exit', (code, signal) => {
//   console.log(`node exit code: ${code}`)
// })

// 创建子进程方式二: fork (专门开启 node 命令), 没有回调函数
// 默认公用一个控制台，指定 silent: true 在不同控制台输出
// 执行时控制台只打印该代码的输出，uuid 的输出可通过 Debugger 来查看
// const forkProcess = childProcess.fork('./uuid', { silent: true })

// forkProcess.on('message', (msg) => {
//   console.log(`forkProcess get message: ${msg}`)
// })

// 与主进程通信是通过 IPC 机制
// forkProcess.send('hello world')

// 创建子进程方式三: exec
// childProcess.exec('node uuid', (err, stdout, stderr) => {
//   if (err) {
//     console.log(err)
//     throw err
//   }
//   console.log(stdout.toString())
// })

// 创建子进程方式四: execFile
childProcess.execFile('node', ['uuid'], (err, stdout, stderr) => {
  if (err) {
    console.log(err)
    throw err
  }
  console.log(stdout.toString())
})
