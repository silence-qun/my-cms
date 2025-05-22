// 做为服务器，处理请求数据
const http = require('http')

const server = http.createServer(function (request, response) {
  let data = ''

  request.on('data', function (chunk) {
    data += chunk
  })

  request.on('end', function () {
    let method = request.method
    let headers = JSON.stringify(request.headers)
    let httpVersion = request.httpVersion
    let requestUrl = request.url

    response.writeHead(200, { 'Content-Type': 'text/html' })

    let responseData = `method: ${method}<br>headers: ${headers}<br>httpVersion: ${httpVersion}<br>requestUrl: ${requestUrl}`

    response.end(responseData)
  })
})

server.listen(3000, function () {
  console.log('Node Server 3 started on port 3000')
})
