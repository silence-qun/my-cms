// net 模块，服务端
const net = require('net')

// server 服务，写法一
const server = net.createServer((socket) => {
  console.log('client connected')

  // console.log(socket)
  // console.log(`localPort: ${socket.localPort}`)
  // console.log(`localAddress: ${socket.localAddress}`)
  // console.log(`remotePort: ${socket.remotePort}`)
  // console.log(`remoteFamily: ${socket.remoteFamily}`)
  // console.log(`remoteAddress: ${socket.remoteAddress}`)

  const address = socket.address()
  const message = `server address is ${JSON.stringify(address)}`

  socket.write(message, () => {
    const writeSize = socket.bytesWritten
    console.log(`message: ${message}\nwriteSize: ${writeSize}`)
  })

  socket.on('data', (data) => {
    const readSize = socket.bytesRead
    console.log(`data: ${data.toString()}\nreadSize: ${readSize}`)
  })

  socket.on('error', (err) => {
    throw err
  })

  // 设置最大连接数
  // server.maxConnections = 2

  // server.getConnections((err, count) => {
  //   console.log(`client count: ${count}`)
  // })
})

// server 服务，写法二
// const server = new net.Server()

// server.on('connection', (socket) => {
//   console.log('client connected')
// })

// listen 监听，写法一
server.listen(8888, () => {
  console.log('server is listening')

  // const address = server.address()

  // console.log(`port: ${address.port}\naddress: ${address.address}\nfamily: ${address.family}`)
})

// listen 监听，写法二
// server.listen(8888)

// server.on('listening', () => {
//   console.log('server is listening')

//   server.close()
// })

// server.on('close', () => {
//   console.log('server closed')
// })

server.on('error', (err) => {
  console.log('server error')
})
