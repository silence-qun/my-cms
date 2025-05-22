// dgram 模块，客户端
const dgram = require('dgram')

const message = Buffer.from('This message comes from client')
const socket = dgram.createSocket('udp4')

socket.send(message, 0, message.length, 9999, 'localhost', (err, bytes) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`client has sent ${bytes} bytes message`)
})

socket.on('message', (msg, info) => {
  const msg2send = 'hello world'
  socket.send(msg2send, 0, msg2send.length, 9999, 'localhost')
})
