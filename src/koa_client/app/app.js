const Koa = require('koa')
const path = require('path')
const combineRouters = require('koa-combine-routers')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const compress = require('koa-compress')
const userRouter = require('../router/userRouter')

const app = new Koa()

app.use(compress({ threshold: 2048 }))

// 处理请求体，使请求体可以通过 ctx.request 获取到
app.use(bodyParser())

app.use(koaStatic(path.join(__dirname, '../dist')))

const unifiedRouters = combineRouters(userRouter)()

app.use(unifiedRouters)

// 把 app 导出的目的是可以通过命令行的形式去启动项目
module.exports = app
