const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
  ctx.response.type = 'application/json'

  const responseBody = {
    result: { code: 200, description: 'success' },
    data: { username: 'zhangsan', address: 'taiyuan', age: 20 },
  }

  ctx.body = JSON.stringify(responseBody)
})

app.listen(4000)
