// dgram 模块，服务端
const dgram = require('dgram')

const message = Buffer.from('This is message comes from server')

const socket = dgram.createSocket('udp4', (msg, info) => {
  socket.send(message, 0, message.length, info.port, info.address, (err, bytes) => {
    if (err) {
      console.log(err)
      return
    }

    console.log(`server has sent ${bytes} bytes message`)
  })
})

socket.bind(9999, 'localhost', () => {
  console.log('Server has binded to 9999')
})

socket.on('message', (msg, info) => {
  console.log('message event occurred')
  console.log(`message is: ${msg.toString()}`)
})
