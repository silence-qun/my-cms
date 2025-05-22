const http = require('http')
const io = require('socket.io')
const fs = require('fs')

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' })

  if (request.url === '/') {
    fs.readFile('./client.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        response.end(data.toString())
      }
    })
  } else {
    response.end('<html><body>Error</body></html>')
  }
})

server.listen(3000, 'localhost')

// const socket = io.listen(server)
const socket = new io.Server(server)

socket.on('connection', (sock) => {
  console.log('connection has been established')

  sock.on('message', (msg) => {
    console.log(`message: ${msg}`)
  })

  sock.on('disconnect', () => {
    console.log('connection has lost')
  })

  sock.emit('serverEvent', 'this is serverEvent')

  sock.on('clientEvent', (data) => {
    console.log(`${data.address}, ${data.age}`)
  })

  sock.on('broadcastEventClient', (message) => {
    console.log(message)
    sock.broadcast.emit('broadcastEventServer', 'you are good!')
  })

  sock.send('hello client')
})
