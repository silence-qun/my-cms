// 单个 node 实例是运行在单个线程中，cluster 可以充分利用多核系统的优势
const cluster = require('cluster')
const http = require('http')
const os = require('os')

const cpuCount = os.cpus().length

// console.log(cpuCount)

// cluster 调用子进程策略，一般不需要修改
// cluster.schedulingPolicy = cluster.SCHED_RR

// Master - Worker 模式
// 主进程将任务分发给子进程，不做其他任何处理

if (cluster.isPrimary) {
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker id: ${worker.pid}`)
  })
} else {
  const httpServer = http.createServer((request, response) => {
    let data = ''

    request.on('data', (chunk) => {
      data += chunk
    })

    request.on('end', () => {
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.end(`process id: ${process.pid}`)
    })
  })

  // 本质上，只有主进程在监听 3000 端口号
  httpServer.listen(3000, () => {
    console.log('listening to port 3000')
  })
}
