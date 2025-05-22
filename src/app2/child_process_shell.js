const childProcess = require('child_process')

// 创建子进程方式一: spawn
// spawn 第一个参数可以是 node 命令，也可以是系统 shell 命令
// 列出当前目录下所有信息
// ls 是 Unix/Linux/maxOS 系统命令
// Windows 上会抛出 Error: spawn ls ENOENT
// const lsChildProcess = childProcess.spawn('ls', ['-al', './'])
const lsChildProcess = childProcess.spawn('cmd', ['/c', 'dir', '/a', '.\\'])

lsChildProcess.stdout.on('data', (data) => {
  console.log(data.toString('utf8'))
  console.log(`child process shell id: ${lsChildProcess.pid}`)
})

lsChildProcess.on('exit', (code, signal) => {
  console.log(`shell exit code: ${code}`)
})
