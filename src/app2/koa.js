// 洋葱模型
const Koa = require('koa')

const app = new Koa()

// 自定义的中间件
app.use(async (ctx, next) => {
  console.log('myFn started')
  await next()
  console.log('myFn finished')
})

app.use(async (ctx, next) => {
  console.log('myFn2 started')
  await next()
  console.log('myFn2 finished')
})

app.use(async (ctx) => {
  // ctx.body = 'Hello Koa'

  // ctx.request 和 ctx.response 是 koa 封装后的 request 和 response
  // 用 ctx.req 和 ctx.res 获取 node 原生的对象
  ctx.response.type = 'text/html'
  // ctx.body 与 ctx.response.body 等价
  ctx.response.body = '<h2>Hello Koa</h2>'
})

app.listen(3000)
