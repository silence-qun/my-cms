// 做为客户端，向服务器发送 get 请求，方式一
const http = require('http')

let responseData = ''

// 基础示例
// http
//   .request(
//     {
//       host: 'localhost',
//       port: 3000,
//       method: 'get',
//     },
//     function (response) {
//       response.on('data', function (chunk) {
//         responseData += chunk
//       })

//       response.on('end', function () {
//         console.log(responseData)
//       })
//     }
//   )
//   .end()

// 综合示例
http
  .request(
    {
      host: 'localhost',
      port: 3000,
      method: 'get',
      path: '/login?name=zhangsan&password=hello',
    },
    function (response) {
      response.on('data', function (chunk) {
        responseData += chunk
      })

      response.on('end', function () {
        console.log(responseData)
      })
    }
  )
  .end()
