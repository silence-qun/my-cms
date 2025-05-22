// net 模块，客户端
const net = require('net')

const client = new net.Socket()

client.connect(8888, 'localhost', () => {
  console.log('connected to the server')

  client.write('message from client')
})

client.on('data', (data) => {
  console.log(`data from server: ${data.toString()}`)

  client.write('hello world')
})

client.on('end', () => {
  console.log('end event')
})
