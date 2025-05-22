// 创建一个服务，方式二
const http = require('http')

const httpServer = new http.Server()

httpServer.on('request', function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello Node.js')
})

httpServer.listen(3000, function () {
  console.log('Node Server 2 started on port 3000')
})
