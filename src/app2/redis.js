const http = require('http')
const querystring = require('querystring')
const url = require('url')
const userController = require('./user/controller/userController')

const server = http.createServer((request, response) => {
  let data = ''

  request.on('data', (chunk) => {
    data += chunk
  })

  request.on('end', () => {
    const requestUrl = request.url
    const requestMethod = request.method

    console.log(requestUrl)

    const requestParams = url.parse(requestUrl)
    const queryObj = querystring.parse(requestParams.query)

    console.log(queryObj)

    if (requestUrl.includes('login') && requestMethod === 'GET') {
      userController.userLogin(queryObj.username, queryObj.password)

      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.end(`username: ${queryObj.username}, password: ${queryObj.password}`)
    } else if (requestUrl.includes('logout') && requestMethod === 'GET') {
      userController.userLogout(queryObj.userSessionId)

      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.end('user logout')
    } else {
      if (!requestUrl.includes('favicon.ico')) {
        userController.userOtherOperation(queryObj.userSessionId)

        response.writeHead(200, { 'Content-Type': 'text/plain' })
        response.end('user other operation')
      }
    }
  })
})

server.listen(3000, () => {
  console.log('listening to port 3000')
})
